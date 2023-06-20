import { StyleSheet } from "react-native";

const inputStyles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 16
    },
    labelText: {
        marginBottom: 8,
    },
    textBox: {
        borderWidth: 2,
        borderStyle: "solid",
        borderRadius: 4,
        paddingHorizontal: 16,
        paddingVertical: 4
    }
});

export { inputStyles };