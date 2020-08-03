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
    },

    br: {
            width: "95%",
            borderBottomColor: 'rgba(0,0,0,0.6)',
            borderBottomWidth: 5,
            borderRadius: 5

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

    }

});

export default styles;