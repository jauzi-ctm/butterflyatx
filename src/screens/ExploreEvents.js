import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  // Function to handle the button press for PickupGames
  const handlePickupGamesPress = () => {
    console.log('PickupGames button pressed');
  };

  // Function to handle the button press for IndividualEvents
  const handleIndividualEventsPress = () => {
    console.log('IndividualEvents button pressed');
  };

  // Function to handle the button press for CommunityEvents
  const handleCommunityEventsPress = () => {
    console.log('CommunityEvents button pressed');
  };

  // Function to handle the button press for PostButton
  const handlePostButtonPress = () => {
    // Navigate to the Form screen
    navigation.navigate('AnotherForm');
  };

  return (
    <View style={styles.container}>
      {/* Button for PickupGames */}
      <Button title="PickupGames" onPress={handlePickupGamesPress} />

      {/* Button for IndividualEvents */}
      <Button title="IndividualEvents" onPress={handleIndividualEventsPress} />

      {/* Button for CommunityEvents */}
      <Button title="CommunityEvents" onPress={handleCommunityEventsPress} />

      {/* Button for PostButton */}
      <Button title="PostButton" onPress={handlePostButtonPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default HomeScreen;