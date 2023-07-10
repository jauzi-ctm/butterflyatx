import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import DateTimePicker from "@react-native-community/datetimepicker";

const parseDate = (date) => {
    if (date == null) {
        return null;
    }

    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
}

const parseTime = (date) => {
    if (date == null) {
        return null;
    }

    let hour = date.getHours();
    let isAM = true;

    if (hour > 12) {
        hour -= 12;
        isAM = false;
    }

    if (hour == 0) {
        hour = 12;
    }

    if (hour == 12) {
        isAM = false;
    }

    let minutes = date.getMinutes();

    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    return `${hour}:${minutes}${isAM ? "am" : "pm"}`;
}

const InputField = props => {
    const { label, type, options, placeholder = "", updateData } = props;
    const { container, labelText, textBox, dropdownList } = inputStyles;

    const [focus, setFocus] = useState(false); // stores whether user is focused (typing) on the input field
    const [selected, setSelected] = useState(""); // used for select dropdown list only
    const [dateTime, setDateTime] = useState(new Date()); // used for datetime picker only
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
            if (showModal) {
                inputCode = (
                    <DateTimePicker mode={type == "DatePicker" ? "date" : "time"}
                        value={dateTime}
                        onChange={(event, date) => {
                            if (event.type == "set") {
                                setDateTime(date);
                                updateData(label, type == "DatePicker" ? parseDate(date) : parseTime(date));
                            }

                            setShowModal(false);
                            setFocus(false);
                        }} />
                );
            } else {
                inputCode = (
                    <TextInput editable placeholder={placeholder}
                        onFocus={() => { setFocus(true) }} // darker border color when focused
                        onPressOut={() => { setShowModal(true) }} // open the datetime picker modal
                        onChangeText={text => { updateData(label, text) }} // update the form data using the given updateData prop
                        value={type == "DatePicker" ? parseDate(dateTime) : parseTime(dateTime)}
                        style={[textBox, { borderColor: focus ? "black" : "gray" }]} />
                )
            }
            break;
        case "TextInput": // text input fields
            inputCode = (
                <TextInput editable placeholder={placeholder}
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