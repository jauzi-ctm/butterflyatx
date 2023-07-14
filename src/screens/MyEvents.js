import React, { useCallback, useEffect, useState } from 'react'
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native'
import { PICKUP_GAMES_API, INDIVIDUAL_EVENTS_API, COMMUNITY_EVENTS_API, USER_API } from '@env'
import EventItem from '../components/EventItem'
import { getAllEventIds } from '../screens/EventDetails'
import axios from 'axios'
import { useFocusEffect } from '@react-navigation/native'
import { toDateObject, isPast } from '../utilities/DateTime'

const MyEvents = ({ item }) => {
    // const [usersJoined, setUsersJoined] = useState('');
    // const [sportCategory, setSportCategory] = useState('');
    // const [description, setDescription] = useState('');
    // const [date, setDate] = useState('');
    // const [startTime, setStartTime] = useState('');
    // const [endTime, setEndTime] = useState('');
    // const [location, setLocation] = useState('');

    const [ready, setReady] = useState(false);
    const [events, setEvents] = useState([]);
    const [userData, setUserData] = useState([]);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [userDataLoaded, setUserDataLoaded] = useState(false);

    useFocusEffect(
        useCallback(() => {
            (async () => {
                // fetchEventData();
                const myEvents = await getAllEventIds();
                let eventsToDisplay = [];

                for (const eventId of myEvents) {
                    let url;

                    if (eventId % 3 == 1) {
                        url = `${PICKUP_GAMES_API}/query?eventId=__eq(${eventId})`;
                    }

                    if (eventId % 3 == 2) {
                        url = `${INDIVIDUAL_EVENTS_API}/query?eventId=__eq(${eventId})`;
                    }

                    if (eventId % 3 == 0) {
                        url = `${COMMUNITY_EVENTS_API}/query?eventId=__eq(${eventId})`;
                    }

                    const response = await axios.get(url);
                    const item = response.data[0]

                    if (!isPast(toDateObject(item.Date))) eventsToDisplay.push(item)
                }

                eventsToDisplay.sort((a, b) => toDateObject(a.Date) - toDateObject(b.Date))

                setEvents(eventsToDisplay);
                setDataLoaded(true);
            })();
        }, [])
    );

    useFocusEffect(
        useCallback(() => {
            axios.get(USER_API).then(response => {
                setUserData(response.data)
                setUserDataLoaded(true)
            }, reject => {
                console.error('An error has occurred while connecting to the database.')
            })
        }, [])
    )

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

    // const fetchEventData = async () => {
    //     try {
    //         const url = PICKUP_GAMES_API_SAVED.replace('{hello}', item);
    //         const response = await axios.get(url);

    //         // Assuming response.data is an object with relevant keys, adjust this based on your actual response structure
    //         setUsersJoined(response.data.usersJoined);
    //         setSportCategory(response.data.sportCategory);
    //         setDescription(response.data.description);
    //         setDate(response.data.date);
    //         setStartTime(response.data.startTime);
    //         setEndTime(response.data.endTime);
    //         setLocation(response.data.location);
    //     } catch (error) {
    //         console.error('Error fetching event data:', error);
    //     }
    // };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                This is the list of events you are interested in. If you wish to remove an event from this list, click on "More Info" then "Remove from My Events".
            </Text>
            <FlatList
                style={{ marginTop: 16 }}
                data={events}
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
                ListEmptyComponent={() => (<Text style={{ textAlign: 'center' }}>Looks like there are no upcoming events. Add to this list by going to an event page and clicking on the "Add to My Events" button!</Text>)} />
        </View>
    )
}

// const EventItem = () => {
//   getAllEventIds()
//   for (let i = 0; i++; i > eventId.length) {
//     AllBoxes(eventId[i])
//   }
// }

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
    text: {
        textAlign: "center",
        margin: 16
    }
})

export default MyEvents;