import React from 'react'
import { Image, StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { retrieveUserData } from '../screens/Sidebar'

export const HamburgerButton = (data) => {
  const navigation = useNavigation()

  const openSidebar = () => {
    navigation.navigate('Sidebar', { update: true })
    retrieveUserData()
  }

  return (
        <SafeAreaView>
            <TouchableOpacity onPress={openSidebar}>
                <Image source={require('../../assets/hamburger.png')} style={styles.logoButton} />
            </TouchableOpacity>
        </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  logoButton: {
    width: 60,
    height: 60
  }
})
