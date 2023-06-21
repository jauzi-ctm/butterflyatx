import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";

const InputField = props => {
    const { label, type, options, placeholder = "", updateData } = props;
    const { container, labelText, textBox, dropdownList } = inputStyles;

    const [focus, setFocus] = useState(false); // stores whether user is focused (typing) on the input field
    const [selected, setSelected] = useState(""); // used for select dropdown list only

    let inputCode;

    switch (type) {
        case "SelectList": // dropdown menu input fields
            inputCode = (
                <SelectList setSelected={setSelected}
                    data={options}
                    save="value"
                    search={false}
                    boxStyles={[textBox, { paddingVertical: 8 }]} // for the input box
                    dropdownStyles={[textBox, { paddingHorizontal: 0, borderColor: "lightgray" }]} // for the dropdown box
                    onSelect={() => { updateData(label, selected) }} />
            );
            break;
        case "TextInput": // text input fields
            inputCode = (
                <TextInput editable placeholder={placeholder}
                    onFocus={() => { setFocus(true) }} // darker border color when focused
                    onEndEditing={() => { setFocus(false) }} // lighter border color when not focused
                    onChangeText={text => { updateData(label, text) }} // update the form data using the given updateData prop
                    style={[textBox, { borderColor: focus ? "black" : "gray" }]} />
            );
            break;
    }

    return (
        <View style={container}>
            <Text style={labelText}>{label}</Text>
            {inputCode}
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