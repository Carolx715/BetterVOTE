import styles from "../styles/userProfileStyles";
import { Image, TouchableOpacity, View, Text } from "react-native";
import React from "react";

export default function button({ text, onPress }) {
	return (
		<View>
			<TouchableOpacity style={styles.profileButton} onPress={onPress}>
				<View style={{ justifyContent: "center", alignItems: "center" }}>
					<View style={styles.userPicBtnContainer}>
						<Image
							source={require("../assets/profilepic.png")}
							style={styles.userPicButton}
						/>
					</View>
				</View>
			</TouchableOpacity>
		</View>
	);
}
