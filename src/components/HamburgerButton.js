import React from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';

export const HamburgerButton = ( data ) => {
    const where = data
    const navigation = useNavigation();

    const openSidebar = () => {
        navigation.navigate('Sidebar');
    };

    return (
        <TouchableOpacity onPress={openSidebar}>
            <Image source={require("../../assets/hamburger.png")} style={styles.logoButton} />
        </TouchableOpacity>
    );
};

export const HamburgerButtonBack = () => {
    const navigation = useNavigation();

    const opengoBack = () => {
        navigation.goBack;
    };

    return (
        <TouchableOpacity onPress={opengoBack}>
            <Image source={require("../../assets/goBack.png")} style={styles.logoButton} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    logoButton: {
        width: 60,
        height: 60,
    },
});