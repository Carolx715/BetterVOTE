import styles from "../styles/globalStyles";
import { TouchableOpacity, View, Image } from "react-native";
import React from "react";
import { vh } from "react-native-expo-viewport-units";

export default function add({ onPress }) {
	return (
		<TouchableOpacity onPress={onPress} style={styles.addNewBtn}>
			<View style={{ justifyContent: "center", alignItems: "center" }}>
				<View
					style={{
						...styles.userPicBtnContainer,
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Image
						source={require("../assets/plus.png")}
						style={{ width: vh(6), height: vh(6) }}
					/>
				</View>
			</View>
		</TouchableOpacity>
	);
}
