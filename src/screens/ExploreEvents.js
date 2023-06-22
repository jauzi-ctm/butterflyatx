import React from 'react';
import { useNavigation } from '@react-navigation/native';
import ButtonUjval from '../components/ButtonUjval'; // Updated import statement

const ExploreEvents = () => {
  const navigation = useNavigation();

  const handlePickupGamesPress = {
    label: "Pickup Games",
    whatAction: () => console.log('PickupGames button pressed'), 
  };

  const handleIndividualEventsPress = {
    label: "Individual Events",
    whatAction: () => console.log('IndividualEvents button pressed'), 
  };

  const handleCommunityEventsPress =  {
    label: "Community Events",
    whatAction: () => console.log('CommunityEvents button pressed'), 
  };

  const handlePostButtonPress = {
    label: 'Post Events',
    whatAction: () => navigation.navigate('PostScreen'),  
  };

  const handleUserInfoPress = {
    label: 'Settings',
    whatAction: () => navigation.navigate('UserInfo'),  
  };

  return (
    <>
      <ButtonUjval data={handlePickupGamesPress} />
      <ButtonUjval data={handleIndividualEventsPress} />
      <ButtonUjval data={handleCommunityEventsPress} />
      <ButtonUjval data={handlePostButtonPress} />
      <ButtonUjval data={handleUserInfoPress} />
    </>
  );
};

export default ExploreEvents

