import React, { useEffect, useState } from "react";
import { View, ScrollView, Text, FlatList, StyleSheet } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import EventItem from "../components/EventItem";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import ButtonUjval from "../components/ButtonUjval";
import { PICKUP_GAMES_API, INDIVIDUAL_EVENTS_API, COMMUNITY_EVENTS_API } from "@env";
import { HamburgerButton } from "../components/HamburgerButton";
import { HamburgerButtonBack } from "../components/HamburgerButtonBack"

const Item = props => {
    const navigation = useNavigation();

    return (
        <ScrollView style={styles.itemContainer}>
            <Text style={{ fontSize: 25, fontWeight: "bold" }}>{props.title}</Text>
            <ButtonUjval data={{
                label: "More Info", whatAction: () => navigation.navigate("EventDetails", {
                    title: props.title,
                    description: props.description,
                    date: props.date,
                    hostName: props.hostName,
                    hostURL: props.hostURL,
                    startTime: props.startTime,
                    endTime: props.endTime,
                    cost: props.cost,
                    location: props.location
                })
            }} />
        </ScrollView>
    );
};

const PickupGamesScreen = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get(PICKUP_GAMES_API).then(response => {
            console.log("worked!");
            setData(response.data);
        }, reject => {
            console.log("failed!");
        });
    }, []);

    return (
        <><HamburgerButton /><View style={styles.container}>
            <FlatList
                data={data}
                renderItem={({ item }) => (
                    <Item title={item["Sport/Category"]}
                        description={item["Description"]}
                        date={item["Date"]}
                        startTime={item["Start Time"]}
                        endTime={item["End Time"]}
                        location={item["Location"]} />
                )}
                keyExtractor={(_item, index) => index.toString()} />
        </View></>
    );
};

const IndividualEventsScreen = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get(INDIVIDUAL_EVENTS_API).then(response => {
            console.log("worked!");
            setData(response.data);
        }, reject => {
            console.log("failed!");
        });
    }, []);

    return (
        <><HamburgerButton /><View style={styles.container}>
            <FlatList
                data={data}
                renderItem={({ item }) => (
                    <Item title={item["Event Title"]}
                        description={item["Description"]}
                        date={item["Date"]}
                        startTime={item["Start Time"]}
                        endTime={item["End Time"]}
                        cost={item["Cost"]}
                        location={item["Location"]} />
                )}
                keyExtractor={(item, index) => index.toString()} />
        </View></>
    );
};

const CommunityEventsScreen = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get(COMMUNITY_EVENTS_API).then(response => {
            console.log("worked 2!");
            setData(response.data);
        }, reject => {
            console.log("failed 2!");
        });
    }, []);

    return (
        <><HamburgerButton /><View style={styles.container}>
            <FlatList
                data={data}
                renderItem={({ item }) => (
                    <Item title={item["Event Name"]}
                        description={item["Description of Event"]}
                        date={item["Date"]}
                        startTime={item["Start Time"]}
                        endTime={item["End Time"]}
                        cost={item["Cost"]}
                        location={item["Address"]}
                        hostName={item["Host of Event (Company, Organization, Sponsor)"]}
                        hostURL={item["Website Affiliated with Event"]} />
                )}
                keyExtractor={(item, index) => index.toString()} />
        </View></>
    );
};

const Tab = createBottomTabNavigator();

const ExploreEvents = () => {
    return (
        <Tab.Navigator screenOptions={{
            tabBarActiveTintColor: "dodgerblue",
            tabBarInactiveTintColor: "gray",
            tabBarStyle: {
                paddingTop: 4,
                paddingBottom: 8
            },
            headerTitleStyle: {
                fontWeight: "bold",
                fontSize: 24,
                color: "dodgerblue"
            }
        }}>
            <Tab.Screen name={"Pickup Games"} component={PickupGamesScreen} options={{
                tabBarIcon: ({ focused }) => (<MaterialIcons name={"sports-cricket"} size={25} color={focused ? "dodgerblue" : "lightgray"} />)
            }} />
            <Tab.Screen name={"Individual Events"} component={IndividualEventsScreen} options={{
                tabBarIcon: ({ focused }) => (<MaterialCommunityIcons name={"party-popper"} size={25} color={focused ? "dodgerblue" : "lightgray"} />)
            }} />
            <Tab.Screen name={"Community Events"} component={CommunityEventsScreen} options={{
                tabBarIcon: ({ focused }) => (<MaterialIcons name={"house"} size={25} color={focused ? "dodgerblue" : "lightgray"} />)
            }} />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16
    },
    itemContainer: {
        backgroundColor: "lightblue",
        borderRadius: 16,
        padding: 16,
        marginBottom: 16
    }
});

export default ExploreEvents;