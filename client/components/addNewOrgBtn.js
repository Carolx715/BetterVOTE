import styles from "../styles/organizations";
import { TouchableOpacity, View, Text } from "react-native";
import React from "react";

export default function add({text}) {
	return (
			<TouchableOpacity style={styles.addNewBtn}>
				<View style={styles.textContainer}>
					<Text style={styles.plus}>{text}</Text>
				</View>
			</TouchableOpacity>
	);
}