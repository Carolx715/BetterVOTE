import styles from "../styles/organizations";
import { Text, TouchableOpacity, View } from "react-native";
import React from "react";

export default function menu({ props, isVisible }) {
	return isVisible ? (
		<View style={styles.centeredView}>
			<View style={styles.modal}>
				<TouchableOpacity
					style={styles.menuitem}
					onPress={() => props.navigation.navigate("CreateOrganization")}
				>
					<Text style={styles.text}>Create New Organization</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.menuitem}>
					<Text style={styles.text}>Join Existing Organization</Text>
				</TouchableOpacity>
			</View>
		</View>
	) : null;
}
