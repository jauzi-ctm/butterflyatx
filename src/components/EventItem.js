import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { PICKUP_GAMES_API_SAVED } from '@env'
import { eventId, getAllEventIds } from '../screens/EventDetails'
import axios from 'axios'

const AllBoxes = ({ item }) => {
  const [usersJoined, setUsersJoined] = useState('');
  const [sportCategory, setSportCategory] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    fetchEventData();
  }, []);

  const fetchEventData = async () => {
    try {
      const url = PICKUP_GAMES_API_SAVED.replace('{hello}', item);
      const response = await axios.get(url);

      // Assuming response.data is an object with relevant keys, adjust this based on your actual response structure
      setUsersJoined(response.data.usersJoined);
      setSportCategory(response.data.sportCategory);
      setDescription(response.data.description);
      setDate(response.data.date);
      setStartTime(response.data.startTime);
      setEndTime(response.data.endTime);
      setLocation(response.data.location);
    } catch (error) {
      console.error('Error fetching event data:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{sportCategory}</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>Description: {description}</Text>
          <Text style={styles.infoText}>Date: {date}</Text>
          <Text style={styles.infoText}>Time: {startTime} - {endTime}</Text>
          <Text style={styles.infoText}>Location: {location}</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => console.log('Join button pressed')}>
          <Text style={styles.buttonText}>Join</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => console.log('More Info button pressed')}>
          <Text style={styles.buttonText}>More Info</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const EventItem = () => {
  getAllEventIds()
  for (let i = 0; i++; i > eventId.length) {
    AllBoxes(eventId[i])
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  profileContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginBottom: 20
  },
  profileText: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  organizerName: {
    fontSize: 14
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
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
  },
  button: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10
  },
  buttonText: {
    color: 'blue',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  }
})

export default EventItem
