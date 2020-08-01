import styles from "../styles/organizations";
import { Text, TouchableOpacity, View } from "react-native";
import React from "react";

export default function popup({ props, isVisible }) {
	return isVisible ? (
		<View style={styles.centeredView}>
			<View style={styles.modal}>
                <Text>Join Organization By Code</Text>

				{/* Some sort of Formik object. 1 line text input */}

				<TouchableOpacity style={styles.menuitem} >
					<Text style={styles.text}>Send Join Request</Text>
				</TouchableOpacity>

			</View>
		</View>
	) : null;
}