import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ExploreEvents from './src/components/ExploreEvents.js';
import Form from './src/components/Form.js'; // Update the import statement
import { addEventFormFields, startPickupGameFormFields } from "./src/utilities/formInfo.js";
import axios from "axios";

const Stack = createStackNavigator();
const API_URL = "https://sheet.best/api/sheets/f11b44a1-6d15-430c-9ac2-b30911b4e72c"; // should move to .env

const App = () => {
  const formData = {};

  for (inputField of startPickupGameFormFields) {
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
              axios.post(API_URL, formData).then(response => { // POST request to Google Sheets with the given form data
                console.log("success!"); // request was successful
              }, reject => {
                console.log("failed"); // there was an error
              });
            }}
            formData={formData} />}
        </Stack.Screen>
        <Stack.Screen name="AnotherForm">
          {() => <Form title={"Create a Pickup Game"}
            fields={startPickupGameFormFields}
            submitText={"Create"}
            submitForm={() => console.log(formData)}
            formData={formData} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;