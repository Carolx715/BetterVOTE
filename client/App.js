import { StatusBar } from "expo-status-bar";
import React from "react";
import { Image, Text, View, Button } from "react-native";
import styles from "./styles/homepage";

export default function App() {
	return (
		<View style={styles.container}>
			<Image
				source={require("./assets/background.jpg")}
				style={styles.backgroundImage}
			/>
			<View style={styles.textContainer}>
				<Text style={styles.text}>WELCOME TO</Text>
				<Text style={styles.textTitle}>BetterVOTE</Text>
				<Text style={styles.text}>
					Organizing communities, one vote at a time.
				</Text>
				<Button style={styles.loginButton} title="Sign In" color="white" />
				<Button
					style={styles.loginButton}
					title="Create Account"
					color="white"
				/>
			</View>
		</View>
	);
}
