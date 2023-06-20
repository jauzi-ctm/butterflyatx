import React from "react";
import { View, Text, FlatList, Button, StyleSheet, StatusBar, ScrollView } from "react-native";
import InputField from "./InputField";
import { addEventFormFields } from "../utilities/formInfo";


const Form = props => {
  

    return (
        <View style={styles.container}>
        <Text style={formStyles.titleText}>{"Add Event"}</Text>
        <FlatList data={addEventFormFields} style = {formStyles.container} renderItem={({ item }) => <InputField label={item.label} placeholder={item.placeholder}/>} />
        <Button title={"Add"} color={"gray"} onPress={() => { console.log("add event"); } }></Button>
        </View>
    )
    
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: StatusBar.currentHeight + 32
	}
});

const formStyles = StyleSheet.create({
  container: {
      flex: 1,
      marginHorizontal: 32,
      paddingHorizontal: 16,
      width: '80%'
  },
  titleText: {
      textAlign: "center",
      fontSize: 24,
      marginBottom: 16
  }
});

export default Form;