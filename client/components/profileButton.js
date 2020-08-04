import styles from "../styles/globalStyles";
import { Image, TouchableOpacity, View } from "react-native";
import React from "react";

export default function button({ onPress }) {
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
