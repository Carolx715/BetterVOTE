import React from "react";
import { StyleSheet, Text, View, Image, Button } from "react-native";
import styles from "../styles/homepage";

export default function welcome() {
	return (
		<View style={styles.container}>
			<Image
				source={require("../assets/background.jpg")}
				style={styles.backgroundImage}
			/>
			<View style={styles.textContainer}>
				<Text style={styles.text}>WELCOME TO</Text>
				<Text style={styles.textTitle}>BetterVOTE</Text>
				<Text style={styles.text}>
					Organizing communities, one vote at a time.
				</Text>
			</View>
		</View>
	);
}
