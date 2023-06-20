import React from "react";
import { View, Text, FlatList, Button } from "react-native";
import InputField from "./InputField";
import { formStyles } from "../styles/formStyles";

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

export default Form;