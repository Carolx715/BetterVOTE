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
	textTitleOrgDetails: {
		fontWeight: "bold",
		color: "white",
		fontSize: 40,
		marginTop: screenHeight * 0.07,
		marginBottom: screenHeight * 0.02,
	},
	BallotTitle: {
		fontWeight: "bold",
		color: "black",
		fontSize: 32,
		textAlign: "center",
		margin: vw(2.2),
		marginTop: vh(5),
		marginBottom: 10,
	},
	OrgDescUserListTitle: {
		fontWeight: "bold",
		color: "rgba(0,0,0,0.7)",
		fontSize: 20,
		textAlign: "center",
		margin: vw(2.2),
		marginBottom: screenHeight * 0.02,
		marginTop: screenHeight * 0.002,
	},

	textSubtitleBallot: {
		fontWeight: "bold",
		color: "black",
		fontSize: 20,
		textAlign: "center",
		margin: vw(2.2),
		marginBottom: 10,
	},

	br: {
		width: "95%",
		borderBottomColor: "rgba(0,0,0,0.6)",
		borderBottomWidth: 5,
		borderRadius: 5,
	},
	textBoxDetails: {
		backgroundColor: "rgba(255,255,255,0.8)",
		borderRadius: 1,
		padding: 20,
		marginHorizontal: 4,
		marginBottom: 30,
		marginTop: 30,
		minWidth: "95%",
		maxWidth: "95%",
	},
});

export default styles;
