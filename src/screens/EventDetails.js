/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import { View, ScrollView, Text, StyleSheet, Alert } from 'react-native'
import Hyperlink from 'react-native-hyperlink'
import IconText from '../components/IconText'
import ButtonUjval from '../components/ButtonUjval'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { PICKUP_GAMES_API, INDIVIDUAL_EVENTS_API, COMMUNITY_EVENTS_API } from '@env'
import axios from 'axios'
// import { HamburgerButtonBack } from '../components/HamburgerButtonBack'

// export let eventIds

export const getAllEventIds = async () => {
  let eventIds = [];

  try {
    const storedEventIds = await AsyncStorage.getItem('eventIds')

    if (storedEventIds) {
      eventIds = JSON.parse(storedEventIds)
      console.log('All eventIds:', eventIds)
    } else {
      console.log('No eventIds found.')
    }
  } catch (error) {
    console.log('Error retrieving eventIds:', error)
  } finally {
    return eventIds;
  }
}

// const EventDetails = ({ route }) => {
//   const { title, description, hostName, hostURL, date, startTime, endTime, cost, location, eventId } = route.params
//   const { container, titleContainer, hostInfoContainer, detailsContainer, titleText, link, details } = styles

// const handleAddToMyEvents = async () => {
//   try {
//     // Retrieve the existing list of eventIds from AsyncStorage
//     const storedEventIds = await AsyncStorage.getItem('eventIds')
//     let existingEventIds = []

//     if (storedEventIds) {
//       existingEventIds = JSON.parse(storedEventIds)
//     }

//     // Check if the eventId already exists in the list
//     const eventExists = existingEventIds.includes(eventId)

//     if (!eventExists) {
//       // Append the new eventId to the existing list
//       const updatedEventIds = [...existingEventIds, eventId]

//       // Store the updated list in AsyncStorage
//       await AsyncStorage.setItem('eventIds', JSON.stringify(updatedEventIds))

//       console.log('EventId stored successfully:', eventId)
//     } else {
//       console.log('EventId already exists:', eventId)
//     }
//   } catch (error) {
//     console.log('Error storing EventId:', error)
//   }
// }

//   return (
//     <>
//       <HamburgerButtonBack />
//       <ScrollView>
//         <View style={container}>
//           <View style={titleContainer}>
//             <Text style={titleText}>{title}</Text>
//             <IconText data={{ imageSrc: 'info', text: description }} alignItems={'flex-start'} sizePic={30} />
//             <IconText data={{ imageSrc: 'key', text: eventId }} alignItems={'flex-start'} sizePic={30} />
//           </View>
//           <View style={hostInfoContainer}>
//             <Hyperlink linkDefault={true} linkText={url => hostName} linkStyle={link}>
//               <Text style={styles.hostInfo}>Host: {hostURL}</Text>
//             </Hyperlink>
//           </View>
//           <View style={detailsContainer}>
//             <IconText data={{ imageSrc: 'calendar', text: date }} alignItems={'center'} style={details} sizePic={30} />
//             <IconText
//               data={{ imageSrc: 'clock', text: `${startTime} - ${endTime}` }}
//               alignItems={'center'}
//               style={details}
//               sizePic={30}
//             />
//             <IconText data={{ imageSrc: 'dollar-sign', text: cost }} alignItems={'center'} style={details} sizePic={30} />
//             <IconText data={{ imageSrc: 'map-pin', text: location }} alignItems={'center'} style={details} sizePic={30} />
//           </View>
//           <View style={styles.buttonContainer}>
//             <ButtonUjval data={{ label: 'Add to My Events', whatAction: () => { handleAddToMyEvents(); getAllEventIds() } }} />
//           </View>
//         </View>
//       </ScrollView>
//     </>

const EventDetails = ({ route }) => {
  const { title, description, hostName, hostURL, date, startTime, endTime, cost, location, usersJoined, eventId } = route.params
  const { container, titleContainer, hostInfoContainer, detailsContainer, titleText, link, details } = styles

  const [isAdded, setIsAdded] = useState(false);
  const [users, setUsers] = useState(usersJoined ? parseInt(usersJoined) : 0);

  useEffect(() => {
    (async () => {
      const myEvents = await getAllEventIds();

      if (myEvents && myEvents.includes(eventId)) {
        setIsAdded(true);
      }
    })();
  }, [])

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

        let url;

        if (eventId % 3 == 1) {
          url = `${PICKUP_GAMES_API}/eventId/${eventId}`;
        }

        if (eventId % 3 == 2) {
          url = `${INDIVIDUAL_EVENTS_API}/eventId/${eventId}`;
        }

        if (eventId % 3 == 0) {
          url = `${COMMUNITY_EVENTS_API}/eventId/${eventId}`;
        }

        axios.patch(url, { "eventId": "", "Users Joined": users + 1 + "" })
        setUsers(users + 1);

        // console.log('EventId stored successfully:', eventId)
        Alert.alert("Success", "Event was added to your list!");
        setIsAdded(true);
      } else {
        // console.log('EventId already exists:', eventId)
        Alert.alert("Error", "This event is already added to your list!");
      }
    } catch (error) {
      console.log('Error storing EventId:', error)
    }
  }

  const handleRemoveFromMyEvents = async () => {
    try {
      // Retrieve the existing list of eventIds from AsyncStorage
      const storedEventIds = await AsyncStorage.getItem('eventIds')
      let existingEventIds = []

      if (storedEventIds) {
        existingEventIds = JSON.parse(storedEventIds)
      }

      // Check if the eventId already exists in the list
      const eventExists = existingEventIds.includes(eventId)

      if (eventExists) {
        // Append the new eventId to the existing list
        const updatedEventIds = existingEventIds.filter(event => event != eventId);

        // Store the updated list in AsyncStorage
        await AsyncStorage.setItem('eventIds', JSON.stringify(updatedEventIds))

        let url;

        if (eventId % 3 == 1) {
          url = `${PICKUP_GAMES_API}/eventId/${eventId}`;
        }

        if (eventId % 3 == 2) {
          url = `${INDIVIDUAL_EVENTS_API}/eventId/${eventId}`;
        }

        if (eventId % 3 == 0) {
          url = `${COMMUNITY_EVENTS_API}/eventId/${eventId}`;
        }

        axios.patch(url, { "eventId": "", "Users Joined": users - 1 + "" })
        setUsers(users - 1);

        // console.log('EventId stored successfully:', updatedEventIds)
        Alert.alert("Success", "Event was removed to your list!");
        setIsAdded(false);
      }
    } catch (error) {
      console.log('Error storing EventId:', error)
    }
  }

  return (
    <><ScrollView>
      <View style={container}>
        <View style={titleContainer}>
          <Text style={titleText}>{title}</Text>
          <IconText data={{ imageSrc: 'info-outline', text: description }} alignItems={'flex-start'} />
          {/* <IconText data={{ imageSrc: 'vpn-key', text: eventId }} alignItems={'center'} sizePic={30} /> */}
        </View>
        <View style={hostInfoContainer}>
          <Hyperlink linkDefault={true} linkText={url => hostName} linkStyle={link}>
            <Text style={styles.hostInfo}>Host: {hostURL}</Text>
          </Hyperlink>
        </View>
        <View style={detailsContainer}>
          <IconText data={{ imageSrc: 'calendar-today', text: date }} alignItems={'center'} style={details} />
          <IconText data={{ imageSrc: 'access-time', text: `${startTime}${endTime ? ' - ' + endTime : ''}` }} alignItems={'center'} style={details} />
          <IconText data={{ imageSrc: 'attach-money', text: cost || 'N/A' }} alignItems={'center'} style={details} />
          <IconText data={{ imageSrc: 'location-pin', text: location }} alignItems={'center'} style={details} />
          <IconText data={{ imageSrc: 'people-outline', text: `${users} people joined` }} alignItems={'center'} style={details} />
        </View>
        <View style={styles.buttonContainer}>
          {isAdded ? (<ButtonUjval data={{ label: 'Remove from My Events', whatAction: handleRemoveFromMyEvents }} />) : (<ButtonUjval data={{ label: 'Add to My Events', whatAction: handleAddToMyEvents }} />)}
        </View>
      </View>
    </ScrollView></>
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

// import eventIds and getAllEventIds, and at the starting o the program, type getAllEventIds()
