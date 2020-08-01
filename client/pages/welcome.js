import React from "react";
import { StyleSheet, Text, View, Image, Modal } from "react-native";
import styles from "../styles/welcomepage";
import Button from "../components/button";
import { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";


export default function welcome(props) {
	const [modalOpen, setModalOpen] = useState(false);
	const onPress = (route) => props.navigation.navigate(route);
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
				<Button text="Login" onPress={() => onPress("Login")} />
				<Button text="Register" onPress={() => onPress("Registration")} />
				<Button text="Organizations" onPress={() => onPress("Organizations")} />
				{/*<Button text = "Terms of Service" onPress = {() => onPress("TOS")} /> */}
			</View>
		</View>
	);
}
