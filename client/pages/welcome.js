import React from "react";
import { Text, View, Image } from "react-native";
import styles from "../styles/homepage";
import Button from "../components/button";

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
					Organizing communities, one vote at a time
				</Text>
			</View>

			<View style={styles.buttonContainer}>
				<Button text="Login" />
				<Button text="Register" />
			</View>
		</View>
	);
}
