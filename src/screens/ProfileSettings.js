import React, { useState, useEffect } from 'react'
import { View, TextInput, StyleSheet, Alert, Text } from 'react-native'
import { HamburgerButton } from '../components/HamburgerButton'
import ButtonUjval from '../components/ButtonUjval'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { setStoredUserData, getStoredUserData, retrieveUserData } from './Sidebar'

const ProfileSettings = () => {
  const [age, setAge] = useState('')
  const [username, setUsername] = useState('')

  useEffect(() => {
    retrieveUserData()
  }, [])

  const saveUserData = async () => {
    try {
      const userData = { username, age }
      await AsyncStorage.setItem('userData', JSON.stringify(userData))
      Alert.alert('Success', 'User data saved successfully!')
      setStoredUserData(userData) // Update the storedUserData value
    } catch (error) {
      console.log('Error saving user data:', error)
    }
  }

  return (
    <>
      <View style={styles.background}>
        <HamburgerButton />
        <View style={styles.container}>
          <Text>Update your Profile:</Text>
          <TextInput
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
        </View>
        <ButtonUjval
          data={{
            label: 'Save Profile',
            whatAction: () => {
              saveUserData()
              try {
                const storedUserData = getStoredUserData() // Retrieve the storedUserData value
                if (storedUserData !== null) {
                  console.log('Retrieved username:', storedUserData.username)
                  console.log('Retrieved age:', storedUserData.age)
                } else {
                  console.log('No user data retrieved')
                }
              } catch (error) {
                // Handle the error silently
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
  }
})

export default ProfileSettings
