/* eslint-disable react/prop-types */
import React from 'react'
import { View, ScrollView, Text, StyleSheet } from 'react-native'
import Hyperlink from 'react-native-hyperlink'
import IconText from '../components/IconText'
import ButtonUjval from '../components/ButtonUjval'
import { HamburgerButtonBack } from '../components/HamburgerButtonBack'
import AsyncStorage from '@react-native-async-storage/async-storage'

const EventDetails = ({ route }) => {
  const { title, description, hostName, hostURL, date, startTime, endTime, cost, location, eventId } = route.params
  const { container, titleContainer, hostInfoContainer, detailsContainer, titleText, link, details } = styles

  const handleAddToMyEvents = async () => {
    try {
      // Retrieve the existing list of eventIds from AsyncStorage
      const storedEventIds = await AsyncStorage.getItem('eventIds')
      let existingEventIds = []

      if (storedEventIds) {
        existingEventIds = JSON.parse(storedEventIds)
      }

      // Check if the eventId already exists in the list
      const eventExists = existingEventIds.includes(eventId)

      if (!eventExists) {
        // Append the new eventId to the existing list
        const updatedEventIds = [...existingEventIds, eventId]

        // Store the updated list in AsyncStorage
        await AsyncStorage.setItem('eventIds', JSON.stringify(updatedEventIds))

        console.log('EventId stored successfully:', eventId)
      } else {
        console.log('EventId already exists:', eventId)
      }
    } catch (error) {
      console.log('Error storing EventId:', error)
    }
  }

  const getAllEventIds = async () => {
    try {
      const storedEventIds = await AsyncStorage.getItem('eventIds')
      if (storedEventIds) {
        const eventIds = JSON.parse(storedEventIds)
        console.log('All eventIds:', eventIds)
        return eventIds
      } else {
        console.log('No eventIds found.')
        return []
      }
    } catch (error) {
      console.log('Error retrieving eventIds:', error)
      return []
    }
  }

  const retrieveEventIds = async () => {
    try {
      const eventIds = await getAllEventIds();
      // Use the eventIds array here or perform any other operations
    } catch (error) {
      // Handle the error if any occurred during retrieval
      console.log('Error retrieving eventIds:', error);
    }
  };

  return (
    <>
      <HamburgerButtonBack />
      <ScrollView>
        <View style={container}>
          <View style={titleContainer}>
            <Text style={titleText}>{title}</Text>
            <IconText data={{ imageSrc: 'info', text: description }} alignItems={'flex-start'} sizePic={30} />
            <IconText data={{ imageSrc: 'key', text: eventId }} alignItems={'flex-start'} sizePic={30} />
          </View>
          <View style={hostInfoContainer}>
            <Hyperlink linkDefault={true} linkText={url => hostName} linkStyle={link}>
              <Text style={styles.hostInfo}>Host: {hostURL}</Text>
            </Hyperlink>
          </View>
          <View style={detailsContainer}>
            <IconText data={{ imageSrc: 'calendar', text: date }} alignItems={'center'} style={details} sizePic={30} />
            <IconText
              data={{ imageSrc: 'clock', text: `${startTime} - ${endTime}` }}
              alignItems={'center'}
              style={details}
              sizePic={30}
            />
            <IconText data={{ imageSrc: 'dollar-sign', text: cost }} alignItems={'center'} style={details} sizePic={30} />
            <IconText data={{ imageSrc: 'map-pin', text: location }} alignItems={'center'} style={details} sizePic={30} />
          </View>
          <View style={styles.buttonContainer}>
            <ButtonUjval data={{ label: 'Add to My Events', whatAction: () => { handleAddToMyEvents(); retrieveEventIds() } }} />
          </View>
        </View>
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'skyblue',
    borderRadius: 16,
    margin: 16
  },
  titleText: {
    fontSize: 32,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  titleContainer: {
    paddingHorizontal: 32,
    paddingVertical: 16
  },
  hostInfoContainer: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    backgroundColor: 'lightgray'
  },
  hostInfo: {
    fontWeight: 'bold',
    marginVertical: 8
  },
  link: {
    color: 'dodgerblue',
    textDecorationLine: 'underline',
    fontWeight: 'normal'
  },
  detailsContainer: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  details: {
    flex: 1
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  }
})

export default EventDetails
