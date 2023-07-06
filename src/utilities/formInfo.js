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
  { label: "Event Title", type: "TextInput", required: true, placeholder: "Garage Sale" },
  { label: "Description", type: "TextInput", multiline: true, required: false, placeholder: "Come buy stuff!", default: "No description provided." },
  { label: "Cost", type: "TextInput", required: false, placeholder: "Free", default: "N/A" },
  { label: "Location", type: "TextInput", required: true, placeholder: "123 Street Avenue" },
  { label: "Date", type: "DatePicker", required: true, placeholder: "07/01/2023" },
  { label: "Start Time", type: "TimePicker", required: true, placeholder: "4:00pm" },
  { label: "End Time", type: "TimePicker", required: false, placeholder: "6:00pm", default: "" },
  { type: "Button" }
];

const startPickupGameFormFields = [
  {
    label: 'Sport/Category',
    type: 'SelectList',
    required: true,
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
  { label: 'Date', type: 'DatePicker', required: true, placeholder: '06/21/2023' },
  { label: 'Start Time', type: 'TimePicker', required: true, placeholder: '3:00pm' },
  { label: 'Location', type: 'TextInput', required: true, placeholder: '123 Park Avenue' },
  { type: "Button" }
];

export { userFormFields, addEventFormFields, startPickupGameFormFields };
