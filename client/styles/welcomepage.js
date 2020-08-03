import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
var { vw, vh } = require("../node_modules/react-native-expo-viewport-units");
const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#dab",
		alignItems: "center",
		justifyContent: "center",
		maxHeight: height,
		height: "auto",
		marginTop: vh(3),
	},
	container2: {
		flex: 1,
		backgroundColor: "#dab",
		alignItems: "center",
		justifyContent: "center",
		maxHeight: height,
		height: "auto",
		paddingBottom: vh(15),
	},
	flatlistContainer: {
		flex: 1,
		backgroundColor: "rgba(0, 0, 0, 0)",
		maxHeight: height,
		height: "auto",
		paddingBottom: vh(8),
	},
	containerOrgDesc: {
		flex: 1,
		backgroundColor: "#dab",
		alignItems: "center",
		justifyContent: "center",
		maxHeight: height,
		height: "auto",
		paddingBottom: vh(5),
	},

	backgroundImage: {
		flex: 1,
		resizeMode: "contain", // or 'stretch'
		// position: "absolute",
		transform: [
			{ scaleY: 1.5 },
			{ scaleX: 1.5 },
			{ rotate: "140deg" },
			{ translateX: 0 },
			{ translateY: vh(10) },
		],
	},
	backgroundImage2: {
		flex: 1,
		resizeMode: "contain", // or 'stretch'
		position: "absolute",
		transform: [
			{ scaleY: 1.5 },
			{ scaleX: 1.5 },
			{ rotate: "140deg" },
			{ translateX: 0 },
			{ translateY: vh(10) },
		],
	},

	textContainer: {
		fontWeight: "bold",
		color: "white",
		position: "absolute", // child
		top: vh(20),
		marginLeft: vw(3),
	},

	text: {
		fontWeight: "bold",
		color: "white",
		fontSize: 18,
		margin: vw(2.2),
		marginVertical: vh(0),
	},
	textTitle: {
		fontWeight: "bold",
		color: "white",
		fontSize: 40,
		margin: vw(2.2),
		marginTop: vh(0),
	},
	textTitle2: {
		fontWeight: "bold",
		color: "white",
		fontSize: 30,
		textAlign: "center",
		margin: vw(2.2),
	},
	textTitle3: {
		fontWeight: "bold",
		color: "black",
		fontSize: 30,
		textAlign: "center",
		margin: vw(2.2),
	},
	subText: {
		color: "white",
		marginBottom: vh(2),
	},
	text2: {
		fontWeight: "bold",
		color: "black",
		fontSize: 18,
		margin: vw(2.2),
		marginVertical: 0,
		textAlign: "center",
		marginBottom: 10,
	},
	text3: {
		fontWeight: "bold",
		color: "black",
		fontSize: 10,
		margin: vw(2.2),
		marginVertical: 0,
		marginBottom: 10,
	},
	buttonContainer: {
		marginBottom: vh(13.3),
	},

	loginButton: {
		marginTop: 0,
		marginHorizontal: vw(5.6),
		marginBottom: vh(4.4),
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#66C",
		padding: 20,
		elevation: 8,
		borderRadius: 10,
		shadowColor: "black",
		shadowOpacity: 0.5,
		shadowOffset: { width: 5, height: 5 },
		width: 260,
	},
	imageTitle: {
		flexDirection: "row",
		justifyContent: "center",
		marginBottom: height * 0.025,
	},
	inputContainer: {
		marginLeft: width * 0.06,
		marginRight: width * 0.02,
	},
});

export default styles;
