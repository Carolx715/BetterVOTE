import React from "react";
import { Text, View, Image } from "react-native";
import styles from "../styles/welcomepage";
import Button from "../components/button";
import NewOrgBtn from "../components/addNewOrgBtn";

export default function welcome(props) {
	const onPress = () => props.navigation.navigate("Login");
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
				<Button text="Login" onPress={onPress} />
				<Button text="Register" />
			</View>

			{/* testing */}
			<NewOrgBtn text="+"></NewOrgBtn>
		</View>
	);
}
