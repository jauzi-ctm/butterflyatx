import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const EventComponent = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Event Title</Text>
      <Text style={styles.time}>Event Time</Text>
      <Text style={styles.location}>Event Location</Text>
      <Text style={styles.category}>Event Category</Text>
      <TouchableOpacity style={styles.button} onPress={() => console.log('Join button pressed')}>
        <Text style={styles.buttonText}>Join</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => console.log('More Info button pressed')}>
        <Text style={styles.buttonText}>More Info</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  time: {
    fontSize: 18,
    marginBottom: 5,
  },
  location: {
    fontSize: 18,
    marginBottom: 5,
  },
  category: {
    fontSize: 18,
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default EventItem;