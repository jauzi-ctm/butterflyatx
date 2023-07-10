import React, { useState } from "react";
import { View, Text, TextInput, Alert, StyleSheet } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import DateTimePicker from "@react-native-community/datetimepicker";
import { DateTime, isPast } from "../utilities/DateTime";

const InputField = props => {
    const { label, type, required, multiline, options, placeholder = "", updateData } = props;
    const { container, labelText, textBox, dropdownList } = inputStyles;

    const [focus, setFocus] = useState(false); // stores whether user is focused (typing) on the input field
    const [selected, setSelected] = useState(""); // used for select dropdown list only
    const [dateTime, setDateTime] = useState(new DateTime(type)); // used for datetime picker only
    const [showModal, setShowModal] = useState(false); // used for datetime picker only

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
        case "DatePicker": // date input fields
        case "TimePicker": // time input fields
            inputCode = (
                <View>
                    {showModal ? (
                        <DateTimePicker mode={type == "DatePicker" ? "date" : "time"}
                            value={dateTime.dateObject}
                            onChange={(event, date) => {
                                if (event.type == "set" && type == "DatePicker" && isPast(date, type)) {
                                    Alert.alert("Invalid Input", "Please select a date that hasn't passed already.");
                                    return;
                                }

                                if (event.type == "set") {
                                    dateTime.set(date);
                                    updateData(label, dateTime.toString());
                                }

                                setShowModal(false);
                                setFocus(false);
                            }} />
                    ) : ""}
                    <TextInput editable placeholder={placeholder}
                        showSoftInputOnFocus={false} // disable the keyboard from popping up
                        onFocus={() => { setFocus(true) }} // darker border color when focused
                        onPressOut={() => { setShowModal(true) }} // open the datetime picker modal
                        onChangeText={text => { updateData(label, text) }} // update the form data using the given updateData prop
                        value={dateTime.toString()}
                        style={[textBox, { borderColor: focus ? "black" : "gray" }]} />
                </View>
            );
            break;
        case "TextInput": // text input fields
            inputCode = (
                <TextInput editable placeholder={placeholder}
                    multiline={multiline}
                    onFocus={() => { setFocus(true) }} // darker border color when focused
                    onEndEditing={() => { setFocus(false) }} // lighter border color when not focused
                    onChangeText={text => { updateData(label, text) }} // update the form data using the given updateData prop
                    onPressOut={() => { setShowModal(true) }} // open the datetime picker modal
                    style={[textBox, { borderColor: focus ? "black" : "gray" }]} />
            );
            break;
    }

    return (
        <View style={container}>
            <Text style={labelText}>{label} {required ? "*" : ""}</Text>
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
        paddingVertical: 4,
        alignContent: "flex-start"
    }
});

export default InputField;