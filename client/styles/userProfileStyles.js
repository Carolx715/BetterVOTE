import { StyleSheet } from "react-native";
import { Dimensions } from 'react-native';
var {vw, vh, vmin, vmax} = require('../node_modules/react-native-expo-viewport-units');
const screenHeight = Dimensions.get('window').height;

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
    
    userPic: {
        width: vh(10),
        height: vh(10),
    },

    text: {
        fontWeight: "bold",
		color: "white",
		fontSize: 20,
        marginVertical: 0,
        display: "flex",
    }, subTitle: {
        fontWeight: "bold",
		color: "white",
		fontSize: 30,
        marginVertical: vh(2.2),
        display: "flex",
    }

});

export default styles;