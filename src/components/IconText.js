import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const IconText = ({ data, alignItems, sizePic }) => {
  const { imageSrc, text } = data

  return (
    <View style={[styles.imageTextContainer, { alignItems }]}>
      {/* <Image source={imageSrc} style={styles.image} /> */}
      <MaterialIcons name={imageSrc} size={30} color={"black"} style={styles.image} />
      <View style={styles.textContainer}>
        <Text>{text}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  imageTextContainer: {
    flexDirection: 'row',
    marginTop: 32
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 16
  },
  textContainer: {
    flex: 1
  }
})

export default IconText

// Add image source in assets folder, copy the relative src and add this variable in this format:
// const whatever name=
// {
//   imageSrc: require({the img source}),
//   text: 'watever text'
// };
// Under return, add this:
// <IconText data ={whatever name u typed before} alignItems = 'whatever looks best'/>

// options for alignItems: "center", "flex-start", "flex-end", or "baseline"
