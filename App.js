import React from "react";
import { ScrollView, StyleSheet, StatusBar } from 'react-native';
import Form from "./src/components/Form";
import { addEventFormFields } from "./src/utilities/formInfo";

const App = () => {
	return (
		<ScrollView style={styles.container}>
			<Form title={"Add Event"} fields={addEventFormFields} submitText={"Add"} onSubmit={() => { console.log("add event"); }} />
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: StatusBar.currentHeight + 32
	}
});

export default App;