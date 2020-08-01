import React from "react";
import { StyleSheet, Text, View, Image, Modal } from "react-native";
import styles from "../styles/welcomepage";
import Button from "../components/button";
import { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";

export default function welcome(props) {
	const [jwt, setJwt] = useState("");
	const transferJwt = (jwt) => {
		setJwt(jwt);
	};

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
				<Button
					text="Login"
					onPress={() =>
						props.navigation.navigate("Login", { transferJwt: transferJwt })
					}
				/>
				<Button
					text="Register"
					onPress={() => props.navigation.navigate("Registration")}
				/>
				<Button
					text="Organizations"
					onPress={() =>
						props.navigation.navigate("Organizations", { token: jwt })
					}
				/>
				{/*<Button text = "Terms of Service" onPress = {() => onPress("TOS")} /> */}
			</View>
		</View>
	);
}
