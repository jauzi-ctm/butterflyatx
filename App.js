import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Sidebar from './src/screens/Sidebar.js';
import ExploreEvents from './src/screens/ExploreEvents.js';
import EventDetails from './src/screens/EventDetails.js';
import Form from './src/components/Form.js'; // Update the import statement
import { addEventFormFields, startPickupGameFormFields } from "./src/utilities/formInfo.js";
import axios from "axios";
import PostScreen from './src/screens/PostScreen.js';
import { StyleSheet, SafeAreaView, Settings } from 'react-native'; // Add this import statement
import { PICKUP_GAMES_API, INDIVIDUAL_EVENTS_API } from "@env";
import ProfileSettings from './src/screens/ProfileSettings.js';
import SafeViewAndroid from './src/components/SafeViewAndroid.js';

const Stack = createStackNavigator();

const App = () => {
  const formData1 = {};
  const formData2 = {};

  return (
    <SafeAreaView style = { SafeViewAndroid.AndroidSafeArea}>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="ExploreEvents" component={ExploreEvents} />
        <Stack.Screen name="Sidebar" component={Sidebar} />
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
          // styles={styles} // Pass the styles object as a prop
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
          // styles={styles} // Pass the styles object as a prop
          />}
        </Stack.Screen>
        <Stack.Screen name='PostScreen' component={PostScreen} />
        <Stack.Screen name = 'ProfileSettings' component={ProfileSettings} />
      </Stack.Navigator>
    </NavigationContainer>
    </SafeAreaView>
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
