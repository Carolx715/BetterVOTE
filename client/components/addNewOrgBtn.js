import styles from "../styles/organizations";
import styles2 from "../styles/userProfileStyles";
import { TouchableOpacity, View, Image } from "react-native";
import React from "react";

export default function add({ onPress }) {
	return (
		<TouchableOpacity onPress={onPress} style={styles.addNewBtn}>
			<View style={{ justifyContent: "center", alignItems: "center" }}>
				<View style={styles2.userPicBtnContainer}>
					<Image
						source={require("../assets/plus.png")}
						style={{...styles2.userPic}}
					/>
				</View>
			</View>
		</TouchableOpacity>
	);
}
