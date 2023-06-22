import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text } from 'react-native';
import { userFormFields } from '../utilities/formInfo';
import Form from '../components/Form';
import { formStyles } from '../styles/formStyles';

const UserInfo = () => {
  const formData = {};

  for (const inputField of userFormFields) {
    formData[inputField.label] = "";
  }

  const storeUserData = async (name, phoneNumber, age) => {
    try {
      const userData = JSON.stringify({ name, phoneNumber, age });
      await AsyncStorage.setItem('userData', userData);
      console.log('User data stored successfully');
    } catch (error) {
      console.log('Error storing user data:', error);
    }
  };

  const getUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      if (userData !== null) {
        const { firstName, lastName, age } = JSON.parse(userData);
        console.log('User data:', firstName, lastName, age);
      } else {
        console.log('User data not found');
      }
    } catch (error) {
      console.log('Error retrieving user data:', error);
    }
  };

  useEffect(() => {
    // Call the function to retrieve user data
    getUserData();
  }, []);

  return (
    <>
      <Form
        title={"Import your data"}
        fields={userFormFields}
        submitText={"Create"}
        submitForm={() => {
          // Call the function to store user data
          storeUserData(formData.firstName, formData.lastName, formData.age);
          {useEffect}
        }}
        formData={Object.entries(formData).map(([label, value]) => ({ label, value }))}
        styles={formStyles} // Pass the styles object as a prop
      />
    </>
  );
};

export default UserInfo;