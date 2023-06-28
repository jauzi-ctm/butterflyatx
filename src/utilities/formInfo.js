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
  { label: "Event Title", placeholder: "July 4th Firework Show" },
  { label: "Description", placeholder: "Wow!" },
  { label: "Date", placeholder: "07/04/2023" },
  { label: "Time", placeholder: "09:00pm" },
  { label: "Location", placeholder: "Brushy Creek Park" }
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
  { label: 'Date', type: 'DatePicker', placeholder: '06/21/2023' },
  { label: 'Time', type: 'TimePicker', placeholder: '3:00pm' },
  { label: 'Location', type: 'TextInput', placeholder: '123 Park Avenue' },
];

export { userFormFields, addEventFormFields, startPickupGameFormFields };
