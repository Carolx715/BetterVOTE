import React from "react";
import { Text, View, Image } from "react-native";
import styles from "../styles/welcomepage";
import Button from "../components/button";
import AsyncStorage from "@react-native-community/async-storage";

export default function welcome(props) {
	const getToken = async () => {
		try {
			//item is given back as string
			return AsyncStorage.getItem("Token");
		} catch (error) {
			console.log("Something went wrong", error);
		}
	};

	getToken().then((response) => {
		if (response) {
			props.navigation.navigate("Organizations");
		} else {
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
							onPress={() => props.navigation.navigate("Login")}
						/>
						<Button
							text="Register"
							onPress={() => props.navigation.navigate("Registration")}
						/>
						{/* <Button
							text="Organizations"
							onPress={() => props.navigation.navigate("Organizations")}
						/> */}
						{/*<Button text = "Terms of Service" onPress = {() => onPress("TOS")} /> */}
					</View>
				</View>
			);
		}
	});
}
