import React from 'react'
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'

// function to add button
// eslint-disable-next-line react/prop-types
const ButtonUjval = ({ data, text }) => {
  // eslint-disable-next-line react/prop-types
  const { label, whatAction } = data
  return (
    <TouchableOpacity style={styles.button} onPress={whatAction}>
      <Text style={[styles.buttonText, { textAlign: text }]}>{label}</Text>
    </TouchableOpacity>
  )
  // return (
  //   <View style={styles.container}>
  //     <TouchableOpacity style={styles.button} onPress={whatAction}>
  //       <Text style={styles.buttonText}>{label}</Text>
  //     </TouchableOpacity>
  //   </View>
  // )
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    // alignSelf: 'center',
    margin: 10
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  }
})

export default ButtonUjval

// How to use this:
// const whatever name=
// {
//   label: 'the name of the button',
//   whatAction: () => what action dou want it to do
// };
// Under return, add this:
// <ButtonUjval data ={whatever name u typed before} />
