import React from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";
import Hyperlink from "react-native-hyperlink";
import IconText from "../components/IconText";
import ButtonUjval from "../components/ButtonUjval";

const EventDetails = () => {
    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>4th of July Firework Celebration</Text>
                    <IconText data={{ imageSrc: "info", text: "More information about the event and the line-up schedule can be found here: https://www.aaabookfest.org/2023-festival-lineup" }} alignItems={"flex-start"} />
                </View>
                <View style={styles.hostInfoContainer}>
                    <Hyperlink linkDefault={true} linkText={url => "Austin Symphony Orchestra"} linkStyle={styles.link}>
                        <Text style={styles.hostInfo}>Host: https://my.austinsymphony.org/julyfour</Text>
                    </Hyperlink>
                </View>
                <View style={styles.detailsContainer}>
                    <IconText data={{ imageSrc: "calendar", text: "07/04/2023" }} alignItems={"center"} style={styles.details} />
                    <IconText data={{ imageSrc: "clock", text: "7:00pm - 9:00pm" }} alignItems={"center"} style={styles.details} />
                    <IconText data={{ imageSrc: "dollar-sign", text: "Free" }} alignItems={"center"} style={styles.details} />
                    <IconText data={{ imageSrc: "map-pin", text: "Vic Mathias Shores 900 West Riverside" }} alignItems={"center"} style={styles.details} />
                </View>
                <View style={styles.buttonContainer}>
                    <ButtonUjval data={{ label: "Add to My Events" }} />
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "skyblue",
        borderRadius: 16,
        margin: 16
    },
    title: {
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