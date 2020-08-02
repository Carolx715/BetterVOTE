import styles from "../styles/organizations";
import { TouchableOpacity, View, Text } from "react-native";
import React from "react";

export default function add({ onPress, text }) {
	return (
		<TouchableOpacity onPress={onPress} style={styles.addNewBtn}>
			<View style={styles.textPlusContainer}>
				<Text style={styles.plus}>{text}</Text>
			</View>
		</TouchableOpacity>
	);
}
