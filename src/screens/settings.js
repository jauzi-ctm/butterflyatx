import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Alert, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ButtonUjval from '../components/ButtonUjval';
import { HamburgerButton } from '../components/HamburgerButton';

const SettingScreen = () => {
  const [username, setUsername] = useState('');
  const [age, setAge] = useState('');
  const [storedUserData, setStoredUserData] = useState(null);

  useEffect(() => {
    retrieveUserData();
  }, []);

  const saveUserData = async () => {
    try {
      const userData = { username, age };
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      Alert.alert('Success', 'User data saved successfully!');
      setStoredUserData(userData);
    } catch (error) {
      console.log('Error saving user data:', error);
    }
  };

  const retrieveUserData = async () => {
    try {
      const value = await AsyncStorage.getItem('userData');
      if (value !== null) {
        const userData = JSON.parse(value);
        setStoredUserData(userData);
      }
    } catch (error) {
      console.log('Error retrieving user data:', error);
    }
  };

  return (
    <><HamburgerButton /><View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TextInput
        style={{ width: '80%', height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
        placeholder="Enter your username"
        onChangeText={text => setUsername(text)}
        value={username} />
      <TextInput
        style={{ width: '80%', height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
        placeholder="Enter your age"
        onChangeText={text => setAge(text)}
        value={age}
        keyboardType="numeric" />
      <ButtonUjval data={{ label: "Add", whatAction: () => { saveUserData; } }} />
    </View></>
  );
};

export default SettingScreen;

