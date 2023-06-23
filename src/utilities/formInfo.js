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
  { label: "Event Title", type: "TextInput", placeholder: "Garage Sale" },
  { label: "Description", type: "TextInput", placeholder: "Come buy stuff!" },
  { label: "Date", type: "TextInput", placeholder: "07/01/2023" },
  { label: "Time", type: "TextInput", placeholder: "4:00pm" },
  { label: "Location", type: "TextInput", placeholder: "123 Street Avenue" }
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
