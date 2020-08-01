import { StyleSheet } from "react-native";
import { Dimensions } from 'react-native';
var {vw, vh, vmin, vmax} = require('../node_modules/react-native-expo-viewport-units');
const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#dab",
		alignItems: "center",
		justifyContent: "center",
		maxHeight: screenHeight,
		height: "auto",
	}, container2: {
		flex: 1,
		backgroundColor: "#dab",
		alignItems: "center",
		justifyContent: "center",
		maxHeight: screenHeight,
		height: "auto",
		paddingBottom: vh(15),
		paddingTop: vh(10)
	}, flatlistContainer: {
		flex: 1,
		backgroundColor: "#dab",
		maxHeight: screenHeight,
		height: "auto",
		paddingBottom: vh(15)
	}, 

	backgroundImage: {
		flex: 1,
		resizeMode: "contain", // or 'stretch'
		//   position: "absolute",
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
		fontSize: 20,
		margin: vw(2.2),
		marginVertical: 0,
	},
	textTitle: {
		fontWeight: "bold",
		color: "white",
		fontSize: 50,
		margin: vw(2.2),
		marginTop: 0,
	},textTitle2: {
		fontWeight: "bold",
		color: "white",
		fontSize: 40,
		margin: vw(2.2),
	},
	subText: {
		color: "white",
		marginBottom: vh(2)
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
});

export default styles;
