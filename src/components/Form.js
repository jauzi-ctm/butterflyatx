import React from "react";
import { View, Text, FlatList, Button, StyleSheet } from "react-native";
import InputField from "./InputField";

const Form = props => {
    const { title, fields, submitText = "Submit", submitForm, formData } = props;
    const { container, titleText } = formStyles;

    const updateData = (text, label) => {
        formData[label] = text;
    };

    return (
        <View style={container}>
            <Text style={titleText}>{title}</Text>
            <FlatList data={fields} renderItem={({ item }) => <InputField label={item.label} placeholder={item.placeholder} updateData={updateData} />} />
            <Button title={submitText} color={"gray"} onPress={submitForm} />
        </View>
    );
};

const formStyles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 32
    },
    titleText: {
        textAlign: "center",
        fontSize: 24,
        marginBottom: 16
    }
});

export default Form;

//to-do: clear input fields after submit