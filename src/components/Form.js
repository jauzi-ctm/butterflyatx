import React from "react";
import { View, Text, FlatList, Button, StyleSheet } from "react-native";
import InputField from "./InputField";

const Form = props => {
    const { title, fields, submitText = "Submit", onSubmit } = props;
    const { container, titleText } = formStyles;

    return (
        <View style={container}>
            <Text style={titleText}>{title}</Text>
            <FlatList data={fields} renderItem={({ item }) => <InputField label={item.label} placeholder={item.placeholder} />} />
            <Button title={submitText} color={"gray"} onPress={onSubmit} />
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