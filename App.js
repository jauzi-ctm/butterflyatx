// app.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ExploreEvents from './src/screens/ExploreEvents.js';
import Form from './src/components/Form.js'; // Update the import statement
import { addEventFormFields, startPickupGameFormFields } from "./src/utilities/formInfo.js";
import axios from "axios";
import PostScreen from './src/screens/PostScreen.js';
import { StyleSheet } from 'react-native'; // Add this import statement

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
        <Stack.Screen name="individualForm">
          {() => <Form
            title={"Create an Individual Event"}
            fields={addEventFormFields}
            submitText={"Create"}
            submitForm={() => {
              axios.post(API_URL, formData).then(response => { // POST request to Google Sheets with the given form data
                console.log("success!"); // request was successful
              }, reject => {
                console.log("failed"); // there was an error
              });
            }}
            formData={formData}
            styles={styles} // Pass the styles object as a prop
          />}
        </Stack.Screen>
        <Stack.Screen name="pickupForm">
          {() => <Form
            title={"Create a Pickup Game"}
            fields={startPickupGameFormFields}
            submitText={"Create"}
            submitForm={() => console.log(formData)}
            formData={formData}
            styles={styles} // Pass the styles object as a prop
          />}
        </Stack.Screen>
        <Stack.Screen name='PostScreen' component={PostScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 32
  },
  titleText: {
    textAlign: "center",
    fontSize: 24,
    marginBottom: 16
  }
});

export default App;
