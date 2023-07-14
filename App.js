import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Sidebar, { retrieveUserData } from './src/screens/Sidebar.js'
import ExploreEvents from './src/screens/ExploreEvents.js'
import EventDetails from './src/screens/EventDetails.js'
import Form from './src/components/Form.js'
import { addEventFormFields, startPickupGameFormFields } from './src/utilities/formInfo.js'
import axios from 'axios'
import PostScreen from './src/screens/PostScreen.js'
import { SafeAreaView } from 'react-native'
import { PICKUP_GAMES_API, INDIVIDUAL_EVENTS_API } from '@env'
import ProfileSettings from './src/screens/ProfileSettings.js'
import SafeViewAndroid from './src/components/SafeViewAndroid.js'
import { Provider as PaperProvider } from 'react-native-paper'
import { theme } from './src/styles/formStyles.js'
import { HamburgerButton } from './src/components/HamburgerButton.js'
import MyEvents from './src/screens/MyEvents.js'

const Stack = createStackNavigator()

const App = () => {
  const formData1 = {}
  const formData2 = {}
  useEffect(() => {
    retrieveUserData()
  }, [])

  return (
    <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Explore Events" component={ExploreEvents} options={{ headerLeft: () => (<HamburgerButton />) }} />
            <Stack.Screen name="Sidebar" component={Sidebar} options={{ headerShown: false }} />
            <Stack.Screen name="Event Details" component={EventDetails} />
            {/* <Stack.Screen name="PostScreen" component={PostScreen} /> */}
            <Stack.Screen name="Settings" component={ProfileSettings} options={{ headerLeft: () => (<HamburgerButton />) }} />
            <Stack.Screen name="My Events" component={MyEvents} options={{ headerLeft: () => (<HamburgerButton />) }} />
            <Stack.Screen name="Individual Event Form">
              {() => (
                <Form
                  title={'Create an Individual Event'}
                  fields={addEventFormFields}
                  submitText={'Create'}
                  submitForm={() => {
                    axios
                      .post(INDIVIDUAL_EVENTS_API, formData2)
                    // .then(
                    //   (response) => {
                    //     console.log('success!') // request was successful
                    //   },
                    //   (reject) => {
                    //     console.log('failed') // there was an error
                    //   }
                    // )
                  }}
                  formData={formData2}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="Pickup Game Form">
              {() => (
                <Form
                  title={'Create a Pickup Game'}
                  fields={startPickupGameFormFields}
                  submitText={'Create'}
                  submitForm={() => {
                    formData1.Description = `Join us for some ${formData1['Sport/Category'].toLowerCase()}!`
                    axios.post(PICKUP_GAMES_API, formData1)
                    // .then(
                    //   (response) => {
                    //     console.log('yay')
                    //   },
                    //   (reject) => {
                    //     console.log('no')
                    //   }
                    // )
                  }}
                  formData={formData1}
                />
              )}
            </Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaView>
  )
}

export default App
