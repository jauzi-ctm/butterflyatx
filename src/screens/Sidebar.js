import React from 'react';
import { useNavigation } from '@react-navigation/native';
import ButtonUjval from '../components/ButtonUjval';
import { View, Text, StyleSheet } from 'react-native';

const Sidebar = () => {
  const navigation = useNavigation();

  const handleEventDetailsPress = {
    label: 'Event Details',
    whatAction: () => navigation.navigate('EventDetails'),
  };

  const handleExploreEventsPress = {
    label: 'Explore Events',
    whatAction: () => navigation.navigate('ExploreEvents'),
  };

  const handlePostButtonPress = {
    label: 'Post Events',
    whatAction: () => navigation.navigate('PostScreen'),
  };

  const handleSettingPress = {
    label: 'Settings',
    whatAction: () => navigation.navigate('ProfileSettings'),
  };

  return (
    <View style={{ flex: 1, alignItems: 'flex-start', padding: 20, backgroundColor: '#74C5FF', width: 300 }}>

      <Text style={styles.text}>ButterflyATX</Text>
      <View style={styles.container}>
        <ButtonUjval data={handleEventDetailsPress} />
        <ButtonUjval data={handleExploreEventsPress} />
        <ButtonUjval data={handlePostButtonPress} />
        <ButtonUjval data={handleSettingPress} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    paddingTop: 30,
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
    paddingBottom: 60,
  },
  container: {
    paddingTop: 20, 
    width: 250,
    height: 1000,
    marginHorizontal: -45,
  },
});

export default Sidebar;

