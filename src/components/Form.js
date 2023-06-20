import React from "react";
import { View, Text, FlatList, Button, StyleSheet, StatusBar, ScrollView } from "react-native";
import InputField from "./InputField";
import { formStyles } from "../styles/formStyles";
import { addEventFormFields } from "../utilities/formInfo";


const Form = props => {
    const { title, fields, submitText = "Submit", onSubmit } = props;
    const { container, titleText } = formStyles;

    return (
        <View style={styles.container}>
        <Text style={titleText}>{"Add Event"}</Text>
        <FlatList data={addEventFormFields} renderItem={({ item }) => <InputField label={item.label} placeholder={item.placeholder} />} />
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

export default Form;