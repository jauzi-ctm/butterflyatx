import React, { useState, useEffect } from 'react'
import { View, TextInput, StyleSheet, Alert, Text } from 'react-native'
import { HamburgerButton } from '../components/HamburgerButton'
import ButtonUjval from '../components/ButtonUjval'
import AsyncStorage from '@react-native-async-storage/async-storage'
import IconText from '../components/IconText'

const ProfileSettings = () => {
  const [age, setAge] = useState('')
  const [username, setUsername] = useState('')
  const [storedUserData, setStoredUserData] = useState(null)

  useEffect(() => {
    retrieveUserData()
  }, [])

  const saveUserData = async () => {
    try {
      const userData = { username, age }
      await AsyncStorage.setItem('userData', JSON.stringify(userData))
      Alert.alert('Success', 'User data saved successfully!')
      setStoredUserData(userData)
    } catch (error) {
      console.log('Error saving user data:', error)
    }
  }

  const retrieveUserData = async () => {
    try {
      const value = await AsyncStorage.getItem('userData')
      if (value !== null) {
        const userData = JSON.parse(value)
        setStoredUserData(userData)
        console.log('Retrieved username:', userData.username)
        console.log('Retrieved age:', userData.age)
      }
    } catch (error) {
      console.log('Error retrieving user data:', error)
    }
  }
  const profilePicture = {
    imageSrc: 'user',
    text: storedUserData?.username ? `Welcome ${storedUserData.username}!` : 'Welcome User!'
  }

  return (
    <>
      <View style = {styles.background}>
      <HamburgerButton />
      <View style = {styles.top}>
        <IconText data ={profilePicture} alignItems = 'center' sizePic = {100}/>
      </View>
      <View style={styles.container}>
        <Text>Update your Profile:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your username"
          onChangeText={text => setUsername(text)}
          value={username}
        />
        <TextInput
          style={styles.input} // Corrected the prop name from `styles` to `style`
          placeholder="Enter your age"
          onChangeText={text => setAge(text)}
          value={age}
          keyboardType="numeric"
        />
      </View>
      <ButtonUjval data={{
        label: 'Save Profile',
        whatAction: () => {
          saveUserData()
          if (storedUserData !== null) {
            console.log('Retrieved username:', storedUserData.username)
            console.log('Retrieved age:', storedUserData.age)
          } else {
            console.log('No user data retrieved')
          }
        }
      }}
/>
  </View>
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
    padding: 16
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8
  },
  top: {
    justifyContent: 'center',
    paddingHorizontal: 105,
    height: 100
  }
})

export default ProfileSettings
