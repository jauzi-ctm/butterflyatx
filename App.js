import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ExploreEvents from './src/components/ExploreEvents.js';
import Form from './src/components/Form.js'; // Update the import statement
import { addEventFormFields } from "./src/utilities/formInfo.js";
import axios from "axios";

const Stack = createStackNavigator();
const API_URL = "https://sheet.best/api/sheets/f11b44a1-6d15-430c-9ac2-b30911b4e72c";

const App = () => {
  const formData = {};

  for (inputField of addEventFormFields) {
    formData[inputField.label] = "";
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{}}>
        <Stack.Screen name="ExploreEvents" component={ExploreEvents} />
        <Stack.Screen name="Form">
          {() => <Form title={"Add Event"}
            fields={addEventFormFields}
            submitText={"Add"}
            submitForm={() => {
              console.log("New Event:");
              for (inputField of addEventFormFields) {
                console.log(inputField.label, formData[inputField.label]);
              }
              axios.post(API_URL, formData).then(response => {
                console.log("success!");
              }, reject => {
                console.log("failed");
              });
            }}
            formData={formData} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;