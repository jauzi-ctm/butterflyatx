/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { View, ActivityIndicator, Text, FlatList, StyleSheet } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native'
import ButtonUjval from '../components/ButtonUjval'
import { PICKUP_GAMES_API, INDIVIDUAL_EVENTS_API, COMMUNITY_EVENTS_API } from '@env'
import { HamburgerButton } from '../components/HamburgerButton'
import { toDateObject, isPast } from '../utilities/DateTime'

const Item = props => {
  const navigation = useNavigation()

  return (
        <View style={styles.itemContainer}>
            <Text style={{ fontSize: 25, fontWeight: 'bold' }}>{props.title}</Text>
            <ButtonUjval data={{
              label: 'Join',
              whatAction: () => navigation.navigate('EventDetails', {
                title: props.title,
                description: props.description,
                date: props.date,
                hostName: props.hostName,
                hostURL: props.hostURL,
                startTime: props.startTime,
                endTime: props.endTime,
                cost: props.cost,
                location: props.location, // add number
                eventID: props.eventId
              })
            }} />
        </View>
  )
}

const EventListScreen = ({ url, form }) => {
  const [loaded, setLoaded] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const [data, setData] = useState([])
  const navigation = useNavigation()

  useEffect(() => {
    axios.get(url).then(response => {
      const upcomingEvents = []

      for (const item of response.data) {
        if (!isPast(toDateObject(item.Date))) upcomingEvents.push(item)
      }

      upcomingEvents.sort((a, b) => toDateObject(a.Date) - toDateObject(b.Date))

      setLoaded(true)
      setData(upcomingEvents)
    }, reject => {
      console.error('An error has occurred while connecting to the database.')
    })
  }, [refresh])

  // add the spinny loading screen while waiting for data
  if (!loaded) {
    return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size={'large'} />
            </View>
    )
  }

  return (
        <>
          <HamburgerButton />
          <View style={styles.container}>
              <View style={styles.buttonContainer}>
                  <ButtonUjval style={styles.postButton} data={{
                    label: 'Create a new event',
                    whatAction: () => { if (form) navigation.navigate(form) }
                  }} />
                  <ButtonUjval data={{
                    label: 'Refresh',
                    whatAction: () => { setLoaded(false); setRefresh(!refresh) }
                  }} />
              </View>
              <FlatList
                  style={{ marginTop: 16 }}
                  data={data}
                  renderItem={({ item }) => (
                      <Item title={item['Sport/Category'] || item['Event Title'] || item['Event Name']}
                          description={item.Description || item['Description of Event']}
                          location={item.Location || item.Address}
                          cost={item.Cost}
                          date={item.Date}
                          startTime={item['Start Time']}
                          endTime={item['End Time']}
                          hostName={item['Host of Event (Company, Organization, Sponsor)']}
                          hostURL={item['Website Affiliated with Event']} /> // add eventID
                  )}
                  keyExtractor={(item, index) => index.toString()} />
          </View>
        </>
  )
}

const Tab = createBottomTabNavigator()

const ExploreEvents = () => {
  return (
        <Tab.Navigator screenOptions={{
          tabBarActiveTintColor: 'dodgerblue',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            paddingTop: 4,
            paddingBottom: 8
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 24,
            color: 'dodgerblue'
          }
        }}>
            <Tab.Screen name={'Pickup Games'} options={{
              tabBarIcon: ({ focused }) => (<MaterialIcons name={'sports-cricket'} size={25} color={focused ? 'dodgerblue' : 'lightgray'} />)
            }}>
                {() => <EventListScreen url={PICKUP_GAMES_API} form={'pickupForm'} />}
            </Tab.Screen>
            <Tab.Screen name={'Individual Events'} options={{
              tabBarIcon: ({ focused }) => (<MaterialCommunityIcons name={'party-popper'} size={25} color={focused ? 'dodgerblue' : 'lightgray'} />)
            }}>
                {() => <EventListScreen url={INDIVIDUAL_EVENTS_API} form={'individualForm'} />}
            </Tab.Screen>
            <Tab.Screen name={'Community Events'} options={{
              tabBarIcon: ({ focused }) => (<MaterialIcons name={'house'} size={25} color={focused ? 'dodgerblue' : 'lightgray'} />)
            }}>
                {() => <EventListScreen url={COMMUNITY_EVENTS_API} />}
            </Tab.Screen>
        </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  itemContainer: {
    backgroundColor: 'lightblue',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16
  },
  postButton: {
    height: 100
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  }
})

export default ExploreEvents
