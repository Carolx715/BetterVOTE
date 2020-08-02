import React, { useState, useEffect } from "react";
import { ScrollView, Text, TextInput, View, Image } from "react-native";

import baseStyles from "../styles/welcomepage";
import styles from "../styles/userProfileStyles";
import formStyles from "../styles/formStyling";

import Button from "../components/button";
import AsyncStorage from "@react-native-community/async-storage";

export default function welcome(props) {
    useEffect(() => {
        getUserData();
    });
    
	const [data, setData] = useState();
    const url = "http://159.203.16.113:3000/users/isloggedin";

    if (!data) {
        return null;
    }
    
    async function getUserData() {
        // get token store in variable jwt
		let jwt = await AsyncStorage.getItem("Token").catch((err) => {
			console.log(err);
        });
        try {
            // get info from url
			let response = await fetch(url, {
				method: "GET",
				headers: {
					Authorization: `Bearer ${jwt}`,
				},
            });
            // convert to JSON
            let responseJson = await response.json();
            // set constant data to the value responseJson
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
                        placeholder={data.username}
                        placeholderTextColor="#AAAAAA"
                        style={formStyles.textbox2}
                    />
                    <Text style={styles.text}>Email: </Text>
                    <TextInput
                        editable={false}
                        placeholder={data.email}
                        placeholderTextColor="#AAAAAA"
                        style={formStyles.textbox2}
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
