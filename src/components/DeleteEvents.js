import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';

const App = () => {
  const [events, setEvents] = useState([
    { id: 1, title: 'Event 1' },
    { id: 2, title: 'Event 2' },
    { id: 3, title: 'Event 3' },
  ]);

  const deleteEvent = (id) => {
    const updatedEvents = events.filter((event) => event.id !== id);
    setEvents(updatedEvents);
  };

  return (
    <View>
      {events.map((event) => (
        <View key={event.id}>
          <Text>{event.title}</Text>
          <Button title="Delete" onPress={() => deleteEvent(event.id)} />
        </View>
      ))}
    </View>
  );
};

export default App;