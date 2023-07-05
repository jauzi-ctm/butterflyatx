import React from "react";
import { View, Text, FlatList, Button, StyleSheet } from "react-native";
import InputField from "./InputField";
import { HamburgerButtonBack }  from "./HamburgerButtonBack";
import ButtonUjval from "./ButtonUjval";

const Form = (props) => {
  const { title, fields, submitText = "Submit", submitForm, formData, styles } = props;
  const { container, titleText } = styles;

  // Function to update the given formData prop
  const updateData = (label, text) => {
    formData[label] = text;
  };

  return (
    <><HamburgerButtonBack /><View style={container}>
      <Text style={titleText}>{title}</Text>
      <FlatList
        data={fields} // Render the input fields as a flat list
        renderItem={({ item }) => (
          <InputField
            label={item.label}
            type={item.type}
            options={item.options}
            placeholder={item.placeholder}
            updateData={updateData} />
        )}
        keyExtractor={(item, index) => index.toString()} />
      <ButtonUjval data = {{label: "Create", whatAction: submitForm}}  />
    </View></>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 32,
    marginTop: 10
  },
  titleText: {
    textAlign: "center",
    fontSize: 24,
  },
});

export default Form;


//to-do: clear input fields after submit