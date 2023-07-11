import React from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from "react-native-safe-area-context";
import { retrieveUserData } from '../screens/Sidebar'
import { Feather } from "@expo/vector-icons";

export const HamburgerButton = (data) => {
  const where = data
  const navigation = useNavigation();

  const openSidebar = () => {
    navigation.navigate('Sidebar', { update: true })
    retrieveUserData()
  }

  return (
    <SafeAreaView>
      <TouchableOpacity onPress={openSidebar}>
        {/* <Image source={require("../../assets/hamburger.png")} style={styles.logoButton} /> */}
        <Feather name={"menu"} size={24} color={"black"} style={{ marginLeft: 16 }} />
      </TouchableOpacity>
    </SafeAreaView>
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
    height: 60
  }
})
