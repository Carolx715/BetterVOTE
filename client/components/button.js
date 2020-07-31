import styles from "../styles/homepage";
import { TouchableOpacity, View, Text } from "react-native";
import React from "react";

export default function welcome({ text }) {
	return (
		<View>
			<TouchableOpacity style={styles.loginButton}>
				<Text style={styles.text}>{text}</Text>
			</TouchableOpacity>
		</View>
	);
}
