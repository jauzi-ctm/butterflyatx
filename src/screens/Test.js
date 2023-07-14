/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react'
import { View, Platform } from 'react-native'
import * as Device from 'expo-device'
import * as Notifications from 'expo-notifications'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false
  })
})

Notifications.scheduleNotificationAsync({
  content: {
    title: "What do you call a guy who can't stand?",
    body: 'Neil.'
  },
  trigger: {
    seconds: 10
  }
})

const setUpNotificationsAsync = async () => {
  let token

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#ff231f7c'
    })
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync()
    let finalStatus = existingStatus

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync()
      finalStatus = status
    }

    if (finalStatus !== 'granted') {
      console.log('Failed to get permissions for notifications :(')
      return
    }

    token = (await Notifications.getExpoPushTokenAsync({
      projectId: '981eb6b0-d562-48d2-a30d-c358f1a12446'
    })).data
    console.log(token)
  }
}

const Test = () => {
  const [token, setToken] = useState('')
  const [notification, setNotification] = useState(false)
  const notificationListener = useRef()
  const responseListener = useRef()

  useEffect(() => {
    setUpNotificationsAsync().then(token => setToken(token))

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification)
    })

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response)
    })

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current)
      Notifications.removeNotificationSubscription(responseListener.current)
    }
  }, [])

  return (<View></View>)
}

export default Test
