import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
var { vw, vh, vmin, vmax } = require("react-native-expo-viewport-units");
const screenHeight = Dimensions.get("window").height;

const formStyling = StyleSheet.create({
	formTitle: {
		fontWeight: "bold",
		color: "white",
		fontSize: 50,
		textAlign: "center",
		marginBottom: vh(2),
	},
	formTitleRegister: {
		fontWeight: "bold",
		color: "white",
		fontSize: 40,
		textAlign: "center",
	},
	formTitleCreateNew: {
		fontWeight: "bold",
		color: "white",
		fontSize: 35,
		marginBottom: vh(3),
		textAlign: "center",
	},

	formText: {
		fontWeight: "bold",
		color: "white",
		fontSize: 20,
	},
	formTextRegister: {
		fontWeight: "bold",
		color: "white",
		fontSize: 15,
	},

	formContainer: {
		fontWeight: "bold",
		color: "white",
		position: "absolute", // child
		top: vh(15),
		marginLeft: vw(3),
	},
	formContainerRegister: {
		fontWeight: "bold",
		color: "white",
		position: "absolute", // child
		top: vh(10),
		marginLeft: vw(3),
		flex: 1,
		height: "auto",
		maxHeight: screenHeight,

		width: "100%",
	},

	textbox: {
		borderWidth: 1,
		borderColor: "white",
		color: "white",
		padding: 10,
		marginBottom: 3,

		maxWidth: "90%",
	},
	textboxModal: {
		borderWidth: 1,
		borderColor: "#DBD",
		padding: 10,
		fontSize: 18,
		margin: vh(2),
	},
	textbox2: {
		borderWidth: 0,
		borderColor: "white",
		borderBottomWidth: 2,
		color: "white",
		paddingVertical: 10,
		marginBottom: 3,

		maxWidth: "90%",
	},

	textarea: {
		borderWidth: 1,
		borderColor: "white",
		color: "white",
		padding: 10,
		marginBottom: 3,
		minHeight: vh(10),
		maxHeight: vh(30),
		maxWidth: "90%",
		minWidth: "90%",
	},

	formComponent: {
		marginBottom: vh(1),
	},
	formTextboxes: {
		marginBottom: vh(1),
		paddingLeft: vw(6),
	},
	btnComponent: {
		marginBottom: vh(1),
		justifyContent: "center",
		alignItems: "center",
	},
});

export default formStyling;
