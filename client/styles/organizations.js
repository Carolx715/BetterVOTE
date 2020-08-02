import { StyleSheet } from "react-native";
var {
	vw,
	vh,
	vmin,
	vmax,
} = require("../node_modules/react-native-expo-viewport-units");

const styles = StyleSheet.create({
	backgroundImage: {
		flex: 1,
		resizeMode: "contain", // or 'stretch'
		transform: [
			{ scaleY: 1.5 },
			{ scaleX: 1.7 },
			{ rotate: "325deg" },
			{ translateX: vw(-20) },
			{ translateY: vh(-1) },
		],
		position: "absolute",
		top: vh(-10),
	},

	textTitle2: {
		fontWeight: "bold",
		color: "white",
		fontSize: 30,
		textAlign: "center",
		margin: vw(2.2),
		// marginTop: vh(10)
	},

	addNewBtn: {
		height: vh(8),
		width: vh(8),
		borderRadius: 100,
		backgroundColor: "#66C",

		justifyContent: "center",
		alignItems: "center",

		padding: 0,
		margin: 0,
		position: "absolute",

		bottom: vh(4),
		right: vh(4),

		shadowColor: "black",
		shadowOpacity: 0.5,
		shadowOffset: { width: 5, height: 5 },
		flex: 1,
	},

	textContainer: {
		width: "100%",
		height: "100%",
		flex: 1,
	},
	textPlusContainer: {
		width: "100%",
		height: "100%",
		justifyContent: "center",
		alignItems: "center",

		position: "absolute",
		left: vw(0.4),
		top: vw(-1),
	},

	plus: {
		color: "white",
		fontSize: 56,
		textAlign: "center",
		textAlignVertical: "center",
	},

	modal: {
		margin: 20,
		backgroundColor: "white",
		borderRadius: 20,
		padding: 35,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},

	text: {
		fontSize: 18,
		marginVertical: vw(3),
	},

	textContainer: {
		fontWeight: "bold",
		color: "white",
		justifyContent: "center",
		alignItems: "center",
		textAlign: "center",
		top: vh(10),
		marginBottom: vh(2),
		marginLeft: vw(3),
	},

	menuView: {
		flex: 1,
		bottom: vh(-2),
		left: vh(-16),
		marginTop: 22,
		position: "absolute",
	},

	modalContentContainer: {
		flex: 1,
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	modalContent: {
		// width: "90%",
		height: "50%",
		padding: vw(10),
		backgroundColor: "white",
		borderRadius: 10,
		shadowColor: "black",
		shadowOpacity: 0.3,
		shadowOffset: { width: 1, height: 1 },
	},
	close: {
		position: "absolute",
		top: vh(2),
		right: vh(2),
	},
});

export default styles;
