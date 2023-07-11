import React, { useState, useEffect } from 'react'
import { View, TextInput, StyleSheet, Alert, Text, ScrollView } from 'react-native'
import { HamburgerButton } from '../components/HamburgerButton'
import ButtonUjval from '../components/ButtonUjval'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { setStoredUserData, getStoredUserData, retrieveUserData } from './Sidebar'
import { USER_API } from "@env";
import InputField from '../components/InputField'
import axios from "axios";
// AsyncStorage.clear();
const ProfileSettings = () => {
  const randomNum = randomNumber()

  const [age, setAge] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [userID, setUserID] = useState("");
  const [ready, setReady] = useState(false);

  let [formData, setFormData] = useState({
    "Username": "",
    "Email Address": "",
    "userId": ""
  });

  useEffect(() => {
    (async () => {
      const userData = await retrieveUserData();

      if (userData) {
        formData["Username"] = userData.username;
        formData["Email Address"] = userData.email;
        formData["userId"] = userData.id;

        if (userData.id) {
          axios.get(USER_API).then(response => {
            let currentUserData = response.data[userData.id];
            formData["Username"] = currentUserData["Username"];
            formData["Email Address"] = currentUserData["Email Address"];
          });
        }
      }

      setReady(true);
    })();
  }, []);

  const saveUserData = async () => {
    if (formData["Username"].length == 0 || formData["Email Address"].length == 0) {
      Alert.alert("Invalid Input", "Please fill in all of the required fields.");
      return;
    }

    try {
      if (!formData["userId"]) {
        console.log("hey")
        axios.post(USER_API, formData).then(response => { console.log("yay") });
        axios.get(USER_API).then(response => {
          formData["userId"] = "" + (parseInt(response.data[response.data.length - 1]["userId"]) + 1);
          saveAsync();
        });
      } else {
        console.log("ho")
        axios.put(`${USER_API}/userId/${formData["userId"]}`, { "Username": formData["Username"], "Email Address": formData["Email Address"] }).then(response => { console.log("yay"); saveAsync(); });
      }

      Alert.alert('Success', 'User data was saved successfully!')
    } catch (error) {
      console.log('Error saving user data:', error)
    }
  };

  const saveAsync = async () => {
    const userData = { username: formData["Username"], age, email: formData["Email Address"], id: formData["userId"] }
    await AsyncStorage.setItem('userData', JSON.stringify(userData))
    setStoredUserData(userData) // Update the storedUserData value
  };

  const updateData = (label, text) => {
    formData[label] = text;
  }

  return (
    <>
      <ScrollView style={styles.background}>
        <View style={styles.container}>
          <Text style={styles.title}>Update Profile</Text>
          <InputField label={"Username"} type={"TextInput"} required={true} placeholder={formData["Username"]} updateData={updateData} />
          <InputField label={"Email Address"} type={"TextInput"} required={true} placeholder={formData["Email Address"]} updateData={updateData} />
          {/* <TextInput
            style={styles.input}
            placeholder="Enter your username"
            onChangeText={(text) => setUsername(text)}
            value={username}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter your age"
            onChangeText={(text) => setAge(text)}
            value={age}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            onChangeText={(text) => setEmail(text)}
            value={email}
          /> */}
          <ButtonUjval
            text={"center"}
            data={{
              label: 'Save Profile',
              whatAction: () => {
                saveUserData()
                try {
                  const storedUserData = getStoredUserData() // Retrieve the storedUserData value
                  if (storedUserData !== null) {
                    console.log('Retrieved username:', storedUserData.username)
                    console.log('Retrieved age:', storedUserData.age)
                    console.log('Retrieved email:', storedUserData.email)
                  } else {
                    console.log('No user data retrieved')
                  }
                } catch (error) { }
              }
            }}
          />
        </View>
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#F2F2F2'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    marginHorizontal: 16
  },
  input: {
    borderWidth: 2,
    borderStyle: 'solid',
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 4,
    alignContent: 'flex-start'
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    margin: 16
  },
  button: {
    textAlign: "center"
  }
})

const randomNumber = () => {
  const min = 1 // minimum value
  const max = 10000000000 // maximum value

  // Generate a random number within the range (min - max)
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min

  return randomNumber
}

export default ProfileSettings
