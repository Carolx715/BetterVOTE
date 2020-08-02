import React from "react";
import { ScrollView, Text, TextInput, View, Image } from "react-native";

import baseStyles from "../styles/welcomepage";
import styles from "../styles/userProfileStyles";
import formStyles from "../styles/formStyling";

import Button from "../components/button";
import AsyncStorage from "@react-native-community/async-storage";

export default function welcome(props) {
	// AsyncStorage.getItem("Token")
	// 	.then((response) => {
	// 		if (response) {
	// 			props.navigation.navigate("Organizations");
	// 		}
	// 	})
	// 	.catch((err) => {
	// 		console.log(`Error when checking if token exists: ${err}`);
    //     });
    
    const url = "http://159.203.16.113:3000/users/isloggedin";
    
    async function getUserData() {
		let jwt = await AsyncStorage.getItem("Token").catch((err) => {
			console.log(err);
		});
        try {
			let response = await fetch(url, {
				method: "GET",
				headers: {
					Authorization: `Bearer ${jwt}`,
				},
			});
			let responseJson = await response.json();
			setData(responseJson);
		} catch (error) {
			console.log(error);
		}
    }

	return (
		<View style={styles.container}>
			<Image
				source={require("../assets/background.jpg")}
				style={baseStyles.backgroundImage2}
			/>

            <ScrollView>
			<View style={styles.textContainer}>
				<Text style={baseStyles.textTitle}>My Profile</Text>
                <View>
                    <Text style={styles.subTitle}>Profile</Text>
                    {/* <Image
                        source={require("../assets/profilepic.png")}
                        style={styles.userPic}
                    /> */}
                    <Text style={styles.text}>Name: </Text>
                    <TextInput
                        editable={false}
                        placeholder="u"
                        placeholderTextColor="#AAAAAA"
                        style={formStyles.textbox2}
                        // value={formikProps.values.email.toLowerCase()}
                    />
                    <Text style={styles.text}>Email: </Text>
                    <TextInput
                        editable={false}
                        placeholder="Update email here"
                        placeholderTextColor="#AAAAAA"
                        style={formStyles.textbox2}
                        // value={formikProps.values.email.toLowerCase()}
                    />
                </View>
            </View>

            <Text style={styles.subTitle}>View and Manage Organizations</Text>
            <Text style={styles.text}></Text>
			<Button text = "My Organizations" onPress = {() => props.navigation.navigate("Organizations")} />

            <View>
                <Text style={styles.subTitle}>More Information</Text>
			</View>
            
			<View style={baseStyles.buttonContainer}>
				<Button text = "Terms of Service" onPress = {() => props.navigation.navigate("TOS")} />
				<Button text = "Voting Systems"/>
				<Button
					text="Logout"
					onPress={() => {
						AsyncStorage.removeItem("Token").then(() => {
							props.navigation.navigate("Welcome");
						});
					}}
				/>
			</View>
            </ScrollView>
		</View>
	);
}
