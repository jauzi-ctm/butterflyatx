import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import EventItem from "../components/EventItem";

const PickupGamesScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Pickup Games</Text>
            <EventItem />
        </View>
    );
};

const IndividualEventsScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Individual Events</Text>
            <EventItem />
        </View>
    );
};

const CommunityEventsScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Community Events</Text>
            <EventItem />
        </View>
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
        flex: 1
    }
});

export default ExploreEvents;