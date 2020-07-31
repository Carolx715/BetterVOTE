import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#dab',
      alignItems: 'center',
      justifyContent: 'center',
    },
    backgroundImage: {
      flex: 1,
      resizeMode: 'contain', // or 'stretch'
    //   position: "absolute",
      transform: [
        { scaleY: 1.5 },
        { scaleX: 1.5 },
        { rotate: '135deg' },
        { translateX: -50 },
        { translateY: 150 }
      ],},
    textContainer: {
        fontWeight: "bold",
        color: "white",
        position: "absolute", // child
        top: 190, 
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
    loginButton: {
        margin: 50
    }
  });
  
export default styles;