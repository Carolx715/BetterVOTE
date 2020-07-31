import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Navigator from "./routes/mainStack";

export default function App() {
	return (
		<View style={styles.container}>
			<Navigator />
		</View>
	);
}