import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#dab",
		alignItems: "center",
		justifyContent: "center",
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
            { translateY: 90 },
		],
	},
	textContainer: {
		fontWeight: "bold",
		color: "white",
		position: "absolute", // child
		top: 190,
		marginLeft: 30,
	},
	text: {
		fontWeight: "bold",
		color: "white",
		fontSize: 20,
		margin: 20,
		marginVertical: 0,
	},
	textTitle: {
		fontWeight: "bold",
		color: "white",
		fontSize: 50,
		margin: 20,
		marginTop: 0,
	},
	buttonContainer: {
		marginBottom: 120,
	},
	loginButton: {
		marginTop: 0,
		marginHorizontal: 50,
		marginBottom: 40,
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
