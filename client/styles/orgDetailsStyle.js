import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
const screenHeight = Dimensions.get("window").height;
var {
	vw,
	vh,
	vmin,
	vmax,
} = require("../node_modules/react-native-expo-viewport-units");

const styles = StyleSheet.create({
	textTitleOrg: {
		fontWeight: "bold",
		color: "white",
		fontSize: 40,
		marginTop: screenHeight * 0.07,
		marginBottom: screenHeight * 0.02,
	},
	textTitleBallot: {
		fontWeight: "bold",
		color: "black",
		fontSize: 32,
		textAlign: "center",
		margin: vw(2.2),
		marginTop: vh(5),
		marginBottom: 10,
	},
	textTitleUserlist: {
		fontWeight: "bold",
		color: "rgba(0,0,0,0.7)",
		fontSize: 20,
		textAlign: "center",
		margin: vw(2.2),
		marginBottom: screenHeight * 0.02,
		marginTop: screenHeight * 0.002,
	},

	textSubitleBallot: {
		fontWeight: "bold",
		color: "black",
		fontSize: 20,
		textAlign: "center",
		margin: vw(2.2),
		marginBottom: 10,
	},
});

export default styles;
