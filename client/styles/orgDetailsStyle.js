import { StyleSheet } from "react-native";
var {
	vw,
	vh,
	vmin,
	vmax,
} = require("../node_modules/react-native-expo-viewport-units");

const styles = StyleSheet.create({
	textTitleOrg: {
		fontWeight: "bold",
		color: "black",
		fontSize: 40,
		textAlign: "center",
		margin: vw(2.2),
		marginTop: vh(5),
		marginBottom: 10
    }, textTitleBallot: {
		fontWeight: "bold",
		color: "black",
		fontSize: 32,
		textAlign: "center",
		margin: vw(2.2),
		marginTop: vh(5),
		marginBottom: 10
    }, textTitleUserlist: {
		fontWeight: "bold",
		color: "rgba(0,0,0,0.7)",
		fontSize: 20,
		textAlign: "center",
		margin: vw(2.2),
		marginBottom: 10
    }, 
    
    textSubitleBallot: {
		fontWeight: "bold",
		color: "black",
		fontSize: 20,
		textAlign: "center",
		margin: vw(2.2),
		marginBottom: 10
    }

});

export default styles;