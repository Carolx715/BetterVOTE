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
    
    modal: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },

	text: {
		fontSize: 18,
        marginVertical: vw(3),

    },

    centeredView: {
        flex: 1,
        bottom: vh(15),
        right: 0,
        marginTop: 22,
        position: "absolute",
    },

    modalContentContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        width: "90%",
        height: "50%",
        padding: vw(10),
        backgroundColor: "white",
        borderRadius: 10,
        shadowColor: "black",
        shadowOpacity: 0.3,
        shadowOffset: { width: 1, height: 1 }
    },
    close: {
        position: "absolute",
        top: vh(2),
        right: vh(2)
    }

});

export default styles;