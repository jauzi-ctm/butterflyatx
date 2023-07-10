import React from 'react'
import { Image, StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { retrieveUserData } from '../screens/Sidebar'

export const HamburgerButton = () => {
  const navigation = useNavigation()

  const openSidebar = () => {
    navigation.navigate('Sidebar', { update: true })
    retrieveUserData()
  }

  return (
        <TouchableOpacity onPress={openSidebar}>
            <Image source={require('../../assets/hamburger.png')} style={styles.logoButton} />
        </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  logoButton: {
    width: 60,
    height: 60
  }
})
