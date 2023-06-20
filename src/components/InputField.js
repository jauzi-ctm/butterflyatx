import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";
import { inputStyles } from "../styles/inputStyles";

const InputField = props => {
    const { label, placeholder = "" } = props;
    const { container, labelText, textBox } = inputStyles;

    const [focus, setFocus] = useState(false);

    return (
        <View style={container}>
            <Text style={labelText}>{label}</Text>
            <TextInput editable placeholder={placeholder}
                onFocus={() => { setFocus(true) }}
                onEndEditing={() => { setFocus(false) }}
                style={[textBox, { borderColor: focus ? "black" : "gray" }]} />
        </View>
    );
};

export default InputField;