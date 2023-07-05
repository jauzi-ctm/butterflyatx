import React, { useEffect } from "react";
import { View, Text, FlatList, Alert, StyleSheet } from "react-native";
import InputField from "./InputField";
import { useNavigation } from "@react-navigation/native";
import ButtonUjval from "./ButtonUjval";

const resetFormData = (formData, formFields) => {
  for (inputField of formFields) {
    formData[inputField.label] = "";
  }
};

const Form = (props) => {
  const { title, fields, submitText = "Submit", submitForm, formData } = props;
  const { container, titleText, instructionText, buttonContainer } = styles;
  const navigation = useNavigation();

  useEffect(() => {
    resetFormData(formData, fields);
  }, []);

  // Function to update the given formData prop
  const updateData = (label, text) => {
    formData[label] = text;
  };

  const submitAction = () => {
    for (let item of fields) {
      if (item.type == "Button") {
        continue;
      }

      if (item.required && formData[item.label].length == 0) {
        Alert.alert("Invalid Input", "Please fill in all of the required items.");
        return;
      }

      if (!item.required && formData[item.label].length == 0) {
        formData[item.label] = item.default;
      }
    }

    submitForm();
    Alert.alert("Success", "New event was created!", [{ onPress: navigation.goBack }]);
  };

  return (
    <View style={container}>
      <Text style={titleText}>{title}</Text>
      <Text style={instructionText}>* indicates required fields</Text>
      <FlatList
        style={{ flex: 9, paddingHorizontal: 16 }}
        data={fields} // Render the input fields as a flat list
        renderItem={({ item }) => {
          if (item.type == "Button") {
            return (
              <View style={buttonContainer}>
                <ButtonUjval data={{ label: submitText, whatAction: submitAction }} />
                <ButtonUjval data={{ label: "Cancel", whatAction: navigation.goBack }} />
              </View>
            );
          }

          return (
            <InputField
              label={item.label}
              type={item.type}
              required={item.required}
              multiline={item.multiline}
              options={item.options}
              placeholder={item.placeholder}
              updateData={updateData}
            />
          );
        }}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
  titleText: {
    textAlign: "center",
    fontSize: 24,
    margin: 16,
  },
  instructionText: {
    marginHorizontal: 16,
    marginBottom: 16,
    fontStyle: "italic"
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  }
});

export default Form;


//to-do: clear input fields after submit