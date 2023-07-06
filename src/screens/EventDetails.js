import React from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";
import Hyperlink from "react-native-hyperlink";
import IconText from "../components/IconText";
import ButtonUjval from "../components/ButtonUjval";
import { HamburgerButtonBack } from "../components/HamburgerButtonBack";

const EventDetails = ({ route }) => {
    const { title, description, hostName, hostURL, date, startTime, endTime, cost, location, usersJoined } = route.params;
    const { container, titleContainer, hostInfoContainer, detailsContainer, titleText, link, details } = styles;

    return (
        <><HamburgerButtonBack /><ScrollView>
            <View style={container}>
                <View style={titleContainer}>
                    <Text style={titleText}>{title}</Text>
                    <IconText data={{ imageSrc: "info-outline", text: description }} alignItems={"flex-start"} />
                </View>
                <View style={hostInfoContainer}>
                    <Hyperlink linkDefault={true} linkText={url => hostName} linkStyle={link}>
                        <Text style={styles.hostInfo}>Host: {hostURL}</Text>
                    </Hyperlink>
                </View>
                <View style={detailsContainer}>
                    <IconText data={{ imageSrc: "calendar-today", text: date }} alignItems={"center"} style={details} />
                    <IconText data={{ imageSrc: "access-time", text: `${startTime}${endTime ? " - " + endTime : ""}` }} alignItems={"center"} style={details} />
                    <IconText data={{ imageSrc: "attach-money", text: cost || "N/A" }} alignItems={"center"} style={details} />
                    <IconText data={{ imageSrc: "location-pin", text: location }} alignItems={"center"} style={details} />
                    <IconText data={{ imageSrc: "people-outline", text: `${usersJoined || "0"} people joined` }} alignItems={"center"} style={details} />
                </View>
                <View style={styles.buttonContainer}>
                    <ButtonUjval data={{ label: "Add to My Events" }} />
                </View>
            </View>
        </ScrollView></>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "skyblue",
        borderRadius: 16,
        margin: 16
    },
    titleText: {
        fontSize: 32,
        textAlign: "center",
        fontWeight: "bold"
    },
    titleContainer: {
        paddingHorizontal: 32,
        paddingVertical: 16,
    },
    hostInfoContainer: {
        paddingHorizontal: 32,
        paddingVertical: 16,
        backgroundColor: "lightgray"
    },
    hostInfo: {
        fontWeight: "bold",
        marginVertical: 8,
    },
    link: {
        color: "dodgerblue",
        textDecorationLine: "underline",
        fontWeight: "normal"
    },
    detailsContainer: {
        paddingHorizontal: 32,
        paddingVertical: 16,
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap"
    },
    details: {
        flex: 1
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "center",
    }
});

export default EventDetails;