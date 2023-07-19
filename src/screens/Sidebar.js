import React from 'react'
import { useNavigation, StackActions } from '@react-navigation/native'
import ButtonUjval from '../components/ButtonUjval'
import { View, Text, StyleSheet } from 'react-native'
import IconText from '../components/IconText'
import AsyncStorage from '@react-native-async-storage/async-storage'
// import { getAllEventIds } from './EventDetails'

export let storedUserData = null

export const setStoredUserData = (userData) => {
  storedUserData = userData
}

export const getStoredUserData = () => {
  return storedUserData
}

export const retrieveUserData = async () => {
  try {
    const value = await AsyncStorage.getItem('userData')
    if (value !== null) {
      const userData = JSON.parse(value)
      setStoredUserData(userData) // Update the storedUserData value
      console.log('Retrieved username:', userData.username)
      console.log('Retrieved age:', userData.age)
      console.log('Retrieved email:', userData.email)
      console.log('Retrieved userID:', userData.id)
      return userData
    }
  } catch (error) {
    console.log('Error retrieving user data:', error)
  }
}

const Sidebar = ({ route }) => {
  let previousPage = "Explore Events";

  if (route.params) {
    previousPage = route.params.previousPage;
  }

  const navigation = useNavigation()
  // getAllEventIds()

  const handleEventDetailsPress = {
    label: 'My Events',
    whatAction: () => navigation.navigate('My Events')
  }

  const handleExploreEventsPress = {
    label: 'Explore Events',
    whatAction: () => navigation.navigate('Explore Events')
  }

  const handleSettingPress = {
    label: 'Update Settings',
    whatAction: () => navigation.navigate('Settings')
  }
  const handleClosePress = {
    label: 'Close',
    whatAction: () => {
      navigation.navigate(previousPage);
    }
  }

  const profilePicture = {
    imageSrc: 'person-outline',
    text: storedUserData?.username ? `Welcome ${storedUserData.username}!` : 'Welcome User!'
  }

  return (
    <View style={{ flex: 1, alignItems: 'flex-start', padding: 20, backgroundColor: '#74C5FF', width: 300 }}>
      <Text style={styles.text}>ButterflyATX</Text>
      <IconText data={profilePicture} alignItems={'center'} sizePic={30} />
      <View style={styles.container}>
        <ButtonUjval style={styles.button} data={handleEventDetailsPress} />
        <ButtonUjval style={styles.button} data={handleExploreEventsPress} />
        <ButtonUjval style={styles.button} data={handleSettingPress} />
        <ButtonUjval style={styles.button} data={handleClosePress} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    paddingTop: 30,
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
    paddingBottom: 60
  },
  container: {
    paddingTop: 50,
    width: 250,
    height: 1000,
    marginHorizontal: -5,
    justifyContent: 'flex-start'
  }
})

export default Sidebar
