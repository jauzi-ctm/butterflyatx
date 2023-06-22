import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

  return (
    <Form
      title={"Import your data"}
      fields={userFormFields}
      submitText={"Create"}
      submitForm={() => {
        useEffect(() => {
          // Call the function to store user data
          storeUserData(formData);
        }, []);
      }}
      formData={formData}
      styles={formStyles} // Pass the styles object as a prop
    />
  );
};

export default UserInfo;
