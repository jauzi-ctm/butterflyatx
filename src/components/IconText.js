import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

const IconText = ({ data, alignItems }) => {
  const { imageSrc, text } = data;

  return (
    <View style={[styles.imageTextContainer, { alignItems }]}>
      <Image source={imageSrc} style={styles.image} />
      <View style={styles.textContainer}>
        <Text>{text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageTextContainer: {
    flexDirection: 'row',
  },
  image: {
    width: 100,
    height: 50,
    marginTop: 100,
  },
  textContainer: {
    flex: 2,
  },
});

export default IconText;


// How to use this:
// Add image source in assets folder, copy the relative src and add this variable in this format:
// const whatever name= 
// {
//   imageSrc: require({the img source}), 
//   text: 'watever text'
// };
// Under return, add this:
// <IconText data ={whatever name u typed before} alignItems = 'whatever looks best'/>

// options for alignItems: "center", "flex-start", "flex-end", or "baseline"