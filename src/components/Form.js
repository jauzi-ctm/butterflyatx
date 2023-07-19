/* eslint-disable eqeqeq */
/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import React, { useEffect } from 'react'
import { View, Text, FlatList, Alert, StyleSheet } from 'react-native'
import InputField from './InputField'
import { HamburgerButtonBack } from './HamburgerButtonBack'
import { useNavigation } from '@react-navigation/native'
import ButtonUjval from './ButtonUjval'
import { retrieveUserData } from '../screens/Sidebar'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { PICKUP_GAMES_API, INDIVIDUAL_EVENTS_API } from "@env";
import axios from "axios";

const resetFormData = (formData, formFields) => {
  for (let inputField of formFields) {
    if (inputField.type == "Button") {
      continue;
    }

    formData[inputField.label] = "";
  }
}

const Form = (props) => {
  const { title, fields, submitText = 'Submit', submitForm, formData } = props
  const { container, titleText, instructionText, buttonContainer } = styles
  const navigation = useNavigation()

  useEffect(() => {
    resetFormData(formData, fields)
  }, [])

  // Function to update the given formData prop
  const updateData = (label, text) => {
    formData[label] = text
  }

  const submitAction = async () => {
    for (const item of fields) {
      if (item.type == 'Button') {
        continue
      }

      if (!item.required && item.default && formData[item.label].length == 0) {
        formData[item.label] = item.default;
        continue;
      }

      if (item.type == "hidden") {
        let userData = await retrieveUserData();
        console.log(userData);
        formData[item.label] = userData.id;
        continue;
      }

      if (item.required && formData[item.label].length == 0) {
        Alert.alert('Invalid Input', 'Please fill in all of the required items.')
        return
      }

      if (!item.required && formData[item.label].length == 0) {
        formData[item.label] = item.default
      }
    }

    submitForm()
    Alert.alert('Success', 'New event was created!', [{ onPress: navigation.goBack }])

    let eventId;

    if (fields[0].label == "Sport/Category") {
      let response = await axios.get(PICKUP_GAMES_API);
      // console.log("1", response);
      eventId = "" + (parseInt(response.data[response.data.length - 1]["eventId"]) + 3);
    }

    if (fields[0].label == "Event Title") {
      let response = await axios.get(INDIVIDUAL_EVENTS_API);
      // console.log("2", response);
      eventId = "" + (parseInt(response.data[response.data.length - 1]["eventId"]) + 3);
    }

    // console.log("3", eventId);

    try {
      // Retrieve the existing list of eventIds from AsyncStorage
      const storedEventIds = await AsyncStorage.getItem('eventIds')
      let existingEventIds = []

      if (storedEventIds) {
        existingEventIds = JSON.parse(storedEventIds)
      }

      existingEventIds.push(eventId);
      await AsyncStorage.setItem('eventIds', JSON.stringify(existingEventIds))
    } catch (error) {
      console.log('Error storing EventId:', error)
    }
  }

  return (
    <>
      <View style={container}>
        <Text style={titleText}>{title}</Text>
        <Text style={instructionText}>* indicates required fields</Text>
        <FlatList
          style={{ flex: 9, paddingHorizontal: 16 }}
          data={fields} // Render the input fields as a flat list
          renderItem={({ item }) => {
            if (item.type == "Button") {
              return (
                <View style={buttonContainer}>
                  <ButtonUjval data={{ label: submitText, whatAction: submitAction }} />
                  <ButtonUjval data={{ label: "Cancel", whatAction: navigation.goBack }} />
                </View>
              );
            }

            if (item.type != "hidden") {
              return (
                <InputField
                  label={item.label}
                  type={item.type}
                  required={item.required}
                  multiline={item.multiline}
                  options={item.options}
                  placeholder={item.placeholder}
                  updateData={updateData}
                />
              );
            }
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16
  },
  titleText: {
    textAlign: 'center',
    fontSize: 24,
    margin: 16
  },
  instructionText: {
    marginHorizontal: 16,
    marginBottom: 16,
    fontStyle: 'italic'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  }
})

export default Form

// to-do: clear input fields after submit