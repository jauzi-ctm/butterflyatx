import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

// function to add button
const ButtonUjval = ({ data }) =>
{
    const { label, whatAction } = data;
    return (
        <View style={styles.container}>
          <TouchableOpacity style={styles.button} onPress={whatAction}>
            <Text style={styles.buttonText}>{label}</Text>
          </TouchableOpacity>
        </View>
      );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
    margin: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ButtonUjval;

// How to use this:
// Add image source in assets folder, copy the relative src and add this variable in this format:
// const whatever name= 
// {
//   label: 'the name of the button',
//   whatAction: () => what action dou want it to do
// };
// Under return, add this:
// <whatAction data ={whatever name u typed before} />

