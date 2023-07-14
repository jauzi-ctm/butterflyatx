// import React, { useEffect, useState } from 'react'
// import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
// import { PICKUP_GAMES_API_SAVED } from '@env'
// import { eventId, getAllEventIds } from '../screens/EventDetails'
// import axios from 'axios'

// const AllBoxes = ({ item }) => {
//   const [usersJoined, setUsersJoined] = useState('');
//   const [sportCategory, setSportCategory] = useState('');
//   const [description, setDescription] = useState('');
//   const [date, setDate] = useState('');
//   const [startTime, setStartTime] = useState('');
//   const [endTime, setEndTime] = useState('');
//   const [location, setLocation] = useState('');

//   useEffect(() => {
//     fetchEventData();
//   }, []);

//   const fetchEventData = async () => {
//     try {
//       const url = PICKUP_GAMES_API_SAVED.replace('{hello}', item);
//       const response = await axios.get(url);

//       // Assuming response.data is an object with relevant keys, adjust this based on your actual response structure
//       setUsersJoined(response.data.usersJoined);
//       setSportCategory(response.data.sportCategory);
//       setDescription(response.data.description);
//       setDate(response.data.date);
//       setStartTime(response.data.startTime);
//       setEndTime(response.data.endTime);
//       setLocation(response.data.location);
//     } catch (error) {
//       console.error('Error fetching event data:', error);
//     }
//   };
  
/* eslint-disable react/prop-types */
import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const EventItem = props => {
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Text style={styles.profileText}>with {props.hostName}</Text>
        {/* <Text style={styles.organizerName}>Organizer Name Here</Text> */}
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{props.title}</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>Date: {props.date}</Text>
          <Text style={styles.infoText}>Time: {props.startTime}</Text>
        </View>
        {/* <TouchableOpacity style={styles.button} onPress={() => console.log('Join button pressed')}>
          <Text style={styles.buttonText}>Join</Text>
        </TouchableOpacity> */}
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Event Details', {
          title: props.title,
          description: props.description,
          date: props.date,
          hostName: props.hostName,
          hostURL: props.hostURL,
          startTime: props.startTime,
          endTime: props.endTime,
          cost: props.cost,
          location: props.location,
          usersJoined: props.usersJoined
        })}>
          <Text style={styles.buttonText}>More Info</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const EventItem = () => {
  getAllEventIds()
  for (let i = 0; i++; i > eventId.length) {
    AllBoxes(eventId[i])
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 32
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  profileContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginBottom: 8
  },
  profileText: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  organizerName: {
    fontSize: 14
  },
  contentContainer: {
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: 'lightblue',
    borderRadius: 10,
    padding: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
    textAlign: 'center'
  },
  infoContainer: {
    marginBottom: 20,
    alignItems: 'center'
  },
  infoText: {
    fontSize: 18,
    marginBottom: 10,
    color: 'white'
    marginBottom: 8,
    // color: 'white',
    textAlign: 'center'
  },
  infoContainer: {
    marginBottom: 8,
    alignItems: 'center'
  },
  infoText: {
    fontSize: 16,
    marginBottom: 8
    // color: 'white',
  },
  button: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5
    // marginBottom: 10,
  },
  buttonText: {
    color: 'blue',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  }
})

export default EventItem
