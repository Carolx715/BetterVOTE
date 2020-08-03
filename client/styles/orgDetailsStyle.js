import { StyleSheet } from "react-native";
var {
	vw,
	vh,
	vmin,
	vmax,
} = require("../node_modules/react-native-expo-viewport-units");

const styles = StyleSheet.create({
	textTitleOrg:{
		fontWeight: "bold",
		color: "black",
		fontSize: 45,
		textAlign: "center",
		margin: vw(2.2),
		marginTop: vh(5),
		marginBottom: 10
	},

});

export default styles;