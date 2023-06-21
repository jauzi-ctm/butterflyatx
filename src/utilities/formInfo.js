import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 8,
  },
});

const handleChangeText = (inputText) => {
  setText(inputText);
};

const userFormFields = [
  <>
    <TextInput
      placeholder="First Name"
      onChangeText={handleChangeText}
      style={styles.input}
    />
    <TextInput
      placeholder="Last Name"
      onChangeText={handleChangeText}
      style={styles.input}
    />
    <TextInput
      placeholder="Age"
      onChangeText={handleChangeText}
      style={styles.input}
    />
  </>
];

const addEventFormFields = [
    <>
    <TextInput
      placeholder="Event Title"
      onChangeText={handleChangeText}
      style={styles.input}
    />
    <TextInput
      placeholder="Description"
      onChangeText={handleChangeText}
      style={styles.input}
    />
    <TextInput
      placeholder="Date"
      onChangeText={handleChangeText}
      style={styles.input}
    />
    <TextInput
      placeholder="Time"
      onChangeText={handleChangeText}
      style={styles.input}
    />
    <TextInput
      placeholder="Location"
      onChangeText={handleChangeText}
      style={styles.input}
    />
  </>
 
];

const startPickupGameFormFields = [
  {
    label: 'Category',
    type: 'SelectList',
    options: [
      { value: 'Frisbee' },
      { value: 'Football' },
      { value: 'Basketball' },
      { value: 'Baseball' },
      { value: 'Chess' },
      { value: 'Tennis' },
      { value: 'Badminton' },
      { value: 'Jogging' },
      { value: 'Swimming' },
      { value: 'Volleyball' },
    ],
  },
  { label: 'Date', type: 'TextInput', placeholder: '06/21/2023' },
  { label: 'Time', type: 'TextInput', placeholder: '3:00pm' },
  { label: 'Location', type: 'TextInput', placeholder: '123 Park Avenue' },
];

export { userFormFields, addEventFormFields, startPickupGameFormFields };
