import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

const InputField = props => {
    const { label, placeholder = "", updateData } = props;
    const { container, labelText, textBox } = inputStyles;

    const [focus, setFocus] = useState(false);

    return (
        <View style={container}>
            <Text style={labelText}>{label}</Text>
            <TextInput editable placeholder={placeholder}
                onFocus={() => { setFocus(true) }}
                onEndEditing={() => { setFocus(false) }}
                onChangeText={text => { updateData(text, label) }}
                style={[textBox, { borderColor: focus ? "black" : "gray" }]} />
        </View>
    );
};

const inputStyles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 16
    },
    labelText: {
        marginBottom: 8,
    },
    textBox: {
        borderWidth: 2,
        borderStyle: "solid",
        borderRadius: 4,
        paddingHorizontal: 16,
        paddingVertical: 4
    }
});

export default InputField;