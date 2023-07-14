/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react'
import { View, ActivityIndicator, Text, FlatList, Alert, StyleSheet } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native'
import ButtonUjval from '../components/ButtonUjval'
import { PICKUP_GAMES_API, INDIVIDUAL_EVENTS_API, COMMUNITY_EVENTS_API, USER_API } from '@env'
import { toDateObject, isPast } from '../utilities/DateTime'
import EventItem from '../components/EventItem'

const EventListScreen = ({ url, form }) => {
  const [ready, setReady] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const [data, setData] = useState([])
  const [dataLoaded, setDataLoaded] = useState(false)
  const [userData, setUserData] = useState([])
  const [userDataLoaded, setUserDataLoaded] = useState(false)
  const navigation = useNavigation()

  useEffect(() => {
    axios.get(url).then(response => {
      const upcomingEvents = []

      for (const item of response.data) {
        if (!isPast(toDateObject(item.Date))) upcomingEvents.push(item)
      }

      upcomingEvents.sort((a, b) => toDateObject(a.Date) - toDateObject(b.Date))
      setData(upcomingEvents)
      setDataLoaded(true)
    }, reject => {
      console.error('An error has occurred while connecting to the database.')
    })
  }, [refresh])

  useEffect(() => {
    axios.get(USER_API).then(response => {
      setUserData(response.data)
      setUserDataLoaded(true)
    }, reject => {
      console.error('An error has occurred while connecting to the database.')
    })
  }, [refresh])

  // add the spinny loading screen while waiting for data
  if (!ready) {
    if (dataLoaded && userDataLoaded) {
      setReady(true)
    }

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={'large'} />
      </View>
    )
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <ButtonUjval style={styles.postButton} data={{
            label: 'Create a new event',
            whatAction: () => {
              if (form) {
                navigation.navigate(form)
              }

              if (url === COMMUNITY_EVENTS_API) {
                Alert.alert('Post a Community Event', 'Please email teamjauzi@gmail.com to submit your community event! We will review and post the event to the app as soon as possible.')
              }
            }
          }} />
          <ButtonUjval data={{
            label: 'Refresh',
            whatAction: () => { setDataLoaded(false); setUserDataLoaded(false); setReady(false); setRefresh(!refresh) }
          }} />
        </View>
        <FlatList
          style={{ marginTop: 16 }}
          data={data}
          renderItem={({ item }) => (
            <EventItem title={item['Sport/Category'] || item['Event Title'] || item['Event Name']}
              description={item.Description || item['Description of Event']}
              location={item.Location || item.Address}
              cost={item.Cost}
              date={item.Date}
              startTime={item['Start Time']}
              endTime={item['End Time']}
              hostName={item['Host of Event (Company, Organization, Sponsor)'] || (userData[item.userId] && userData[item.userId].Username)}
              hostURL={item['Website Affiliated with Event'] || (userData[item.userId] && userData[item.userId]['Email Address'])}
              usersJoined={item['Users Joined']}
              eventId={item['eventId']} />
          )}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={() => (<Text style={{ textAlign: 'center' }}>Looks like there are no upcoming events. Add your own by pressing the "Create a new event" button above!</Text>)} />
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
      },
      headerShown: false
    }}>
      <Tab.Screen name={'Pickup Games'} options={{
        tabBarIcon: ({ focused }) => (<MaterialIcons name={'sports-cricket'} size={25} color={focused ? 'dodgerblue' : 'lightgray'} />)
      }}>
        {() => <EventListScreen url={PICKUP_GAMES_API} form={'Pickup Game Form'} />}
      </Tab.Screen>
      <Tab.Screen name={'Individual Events'} options={{
        tabBarIcon: ({ focused }) => (<MaterialCommunityIcons name={'party-popper'} size={25} color={focused ? 'dodgerblue' : 'lightgray'} />)
      }}>
        {() => <EventListScreen url={INDIVIDUAL_EVENTS_API} form={'Individual Event Form'} />}
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
