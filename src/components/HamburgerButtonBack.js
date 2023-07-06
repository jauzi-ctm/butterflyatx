import React from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from "react-native-safe-area-context";

export const HamburgerButtonBack = () => {
    const navigation = useNavigation();

    const opengoBack = () => {
        navigation.goBack();
    };

    return (
        <SafeAreaView>
            <TouchableOpacity onPress={opengoBack}>
                <Image source={require("../../assets/goBack.png")} style={styles.logoButton} />
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    logoButton: {
        width: 60,
        height: 60,
    },
});
