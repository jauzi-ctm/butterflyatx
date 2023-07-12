import React from 'react'
import { useNavigation } from '@react-navigation/native'
import ButtonUjval from '../components/ButtonUjval'
import { View, Text, StyleSheet } from 'react-native'
import IconText from '../components/IconText'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getAllEventIds, eventIds } from './EventDetails'

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
    }
  } catch (error) {
    console.log('Error retrieving user data:', error)
  }
}

const Sidebar = () => {
  const navigation = useNavigation()
  getAllEventIds()

  const handleEventDetailsPress = {
    label: 'My Events',
    whatAction: () => navigation.navigate('MyEvents')
  }

  const handleExploreEventsPress = {
    label: 'Explore Events',
    whatAction: () => navigation.navigate('ExploreEvents')
  }

  const handleSettingPress = {
    label: 'Update Settings',
    whatAction: () => navigation.navigate('ProfileSettings')
  }

  const profilePicture = {
    imageSrc: 'user',
    text: storedUserData?.username ? `Welcome ${storedUserData.username}!` : 'Welcome User!'
  }

  return (
    <View style={{ flex: 1, alignItems: 'flex-start', padding: 20, backgroundColor: '#74C5FF', width: 300 }}>
      <Text style={styles.text}>ButterflyATX</Text>
      <IconText data = {profilePicture} alignItems={'center'} sizePic={30}/>
      <View style={styles.container}>
        <ButtonUjval data={handleEventDetailsPress} />
        <ButtonUjval data={handleExploreEventsPress} />
        <ButtonUjval data={handleSettingPress} />
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
    marginHorizontal: -45
  }
})

export default Sidebar
