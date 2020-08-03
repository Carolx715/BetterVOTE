import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
var {
	vw,
	vh,
	vmin,
	vmax,
} = require("../node_modules/react-native-expo-viewport-units");
const screenHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
	textContainer: {
		fontWeight: "bold",
		color: "white",
		marginTop: vh(10),
		marginLeft: vw(3),
	},
	container: {
		flex: 1,
		backgroundColor: "#dab",
		alignItems: "center",
		maxHeight: screenHeight,
		height: "auto",
	},
	subTitleContainer: {
		fontWeight: "bold",
		color: "white",
		marginLeft: vw(3),
	},
	userPicContainer: {
		width: vh(11),
		height: vh(11),
		justifyContent: "center",
		alignItems: "center",
		position: "absolute",
		right: vh(4),
		top: vh(-8),
	},
	userPic: {
		width: vh(7.5),
		height: vh(7.5),
	},
	userPicButton: {
		width: vh(7),
		height: vh(7),
	},
	userPicBtnContainer: {
		width: vh(7),
		height: vh(7),
	},

	text: {
		fontWeight: "bold",
		color: "white",
		fontSize: 20,
		marginVertical: 0,
		display: "flex",
	},
	subTitle: {
		fontWeight: "bold",
		color: "white",
		fontSize: 28,
		marginVertical: vh(2.2),
		display: "flex",
		alignItems: "center",
	},

	profileButton: {
		margin: vh(2),

		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#66C",
		elevation: 8,
		borderRadius: 60,

		shadowColor: "black",
		shadowOpacity: 0.5,
		shadowOffset: { width: 5, height: 5 },

		width: vh(8),
		height: vh(8),
		position: "absolute",
		top: vh(1),
		left: vh(-22),
	},
});

export default styles;
