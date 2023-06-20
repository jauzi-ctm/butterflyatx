import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ExploreEvents from './src/components/ExploreEvents.js';
import Form from './src/components/Form.js'; // Update the import statement
import { addEventFormFields } from "./src/utilities/formInfo.js";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{}}>
        <Stack.Screen name="ExploreEvents" component={ExploreEvents} />
        <Stack.Screen name="Form">
          {() => <Form title={"Add Event"} fields={addEventFormFields} submitText={"Add"} onSubmit={() => { console.log("add event"); }} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default App;
