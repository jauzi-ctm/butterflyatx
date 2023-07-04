// app.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from './src/screens/HomePage.js';
import ExploreEvents from './src/screens/ExploreEvents.js';
import EventDetails from './src/screens/EventDetails.js';
import Form from './src/components/Form.js'; // Update the import statement
import { addEventFormFields, startPickupGameFormFields } from "./src/utilities/formInfo.js";
import axios from "axios";
import PostScreen from './src/screens/PostScreen.js';
import { StyleSheet } from 'react-native'; // Add this import statement
import { PICKUP_GAMES_API, INDIVIDUAL_EVENTS_API } from "@env";

const Stack = createStackNavigator();

const App = () => {
  const formData1 = {};
  const formData2 = {};

  for (inputField of startPickupGameFormFields) {
    formData1[inputField.label] = "";
  }

  for (inputField of addEventFormFields) {
    formData2[inputField.label] = "";
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{}}>
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="ExploreEvents" component={ExploreEvents} />
        <Stack.Screen name="EventDetails" component={EventDetails} />
        <Stack.Screen name="individualForm">
          {() => <Form
            title={"Create an Individual Event"}
            fields={addEventFormFields}
            submitText={"Create"}
            submitForm={() => {
              axios.post(INDIVIDUAL_EVENTS_API, formData2).then(response => { // POST request to Google Sheets with the given form data
                console.log("success!"); // request was successful
              }, reject => {
                console.log("failed"); // there was an error
              });
            }}
            formData={formData2}
            styles={styles} // Pass the styles object as a prop
          />}
        </Stack.Screen>
        <Stack.Screen name="pickupForm">
          {() => <Form
            title={"Create a Pickup Game"}
            fields={startPickupGameFormFields}
            submitText={"Create"}
            submitForm={() => {
              formData1["Description"] = `Join us for a game of ${formData1["Sport/Category"]}!`;
              axios.post(PICKUP_GAMES_API, formData1).then(response => {
                console.log("yay");
              }, reject => {
                console.log("no");
              });
            }}
            formData={formData1}
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
