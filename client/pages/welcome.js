import React from "react";
import { Text, View, Image } from "react-native";
import styles from "../styles/welcomepage";
import Button from "../components/button";
// Testing
import NewOrgBtn from "../components/addNewOrgBtn";
import AddOrgMenu from "../components/addNewOrgMenu";
import { useState } from "react";

export default function welcome(props) {
	const onPress = () => props.navigation.navigate("Login");
	const [isVisible, setIsVisible] = useState(false);

	const onPressPlus = () => {
		setIsVisible(prev => !prev);
		console.log(isVisible);
	}
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
			</View>

			{/* testing */}
		</View>
	);
}
