import { StyleSheet } from "react-native";
var {vw, vh, vmin, vmax} = require('../node_modules/react-native-expo-viewport-units');

const styles = StyleSheet.create({ 
    addNewBtn: {
        height: vh(10),
        width: vh(10),
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
        flex: 1
    },

    textContainer: {
        width: "100%",
        height: "100%",
        // justifyContent: "center",
        // alignItems: "center",
        flex: 1
    },

    plus: {
        fontWeight: "bold",
        color: "white",
        fontSize: 56,
        textAlign: "center",
        textAlignVertical: "center",
	},

});

export default styles;