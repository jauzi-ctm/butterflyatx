import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

const EventItem = () => {
  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Text style={styles.profileText}>Profile of organizer</Text>
        <Text style={styles.organizerName}>Organizer Name Here</Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Event Title</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>Price: $10</Text>
          <Text style={styles.infoText}>Address: Event Location</Text>
          <Text style={styles.infoText}>Notifications: Enabled</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => console.log('Join button pressed')}>
          <Text style={styles.buttonText}>Join</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => console.log('More Info button pressed')}>
          <Text style={styles.buttonText}>More Info</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
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
