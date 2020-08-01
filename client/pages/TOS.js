import React from "react";
import { View, Text, Image } from "react-native";
import styles from "../styles/welcomepage";

export default function TOS() {
	return (
		<View style = {styles.container}>
            <Image
				source={require("../assets/background.jpg")}
				style={styles.backgroundImage}
			/>
			<Text>This is the TOS page. </Text>
		</View>
	);
}
