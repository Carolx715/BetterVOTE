import React, { useState, useEffect } from "react";
import { ScrollView, Text, TextInput, View, Image } from "react-native";

import styles from "../styles/globalStyles";

import Button from "../components/button";
import AsyncStorage from "@react-native-community/async-storage";

export default function welcome(props) {
	useEffect(() => {
		getUserData();
	}, []);

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
		<View style={styles.profileContainer}>
			<Image
				source={require("../assets/background.jpg")}
				style={{ ...styles.backgroundImage, position: "absolute" }}
			/>

			<ScrollView showsVerticalScrollIndicator={false}>
				<View style={styles.profileTextContainer}>
					<View style={styles.imageTitle}>
						<Text style={styles.profileTitle}>My Profile</Text>
						{/* <View style={profileStyles.userPicContainer}> */}
						<Image
							source={require("../assets/profilepic.png")}
							style={styles.userPic}
						/>
						{/* </View> */}
					</View>
					<View style={styles.inputContainer}>
						<Text style={styles.profileText}>Name: </Text>
						<TextInput
							editable={false}
							placeholder={data.username}
							placeholderTextColor="#AAAAAA"
							style={styles.textbox2}
						/>
						<Text style={styles.profileText}>Email: </Text>
						<TextInput
							editable={false}
							placeholder={data.email}
							placeholderTextColor="#AAAAAA"
							style={styles.textbox2}
						/>
					</View>
					<Text style={styles.profileText}></Text>
				</View>
				<View style={{ alignItems: "center" }}>
					<View style={styles.subTitleContainer}>
						<Text style={styles.profileSubTitle}>View Organizations</Text>
					</View>
					<Button
						text="My Organizations"
						onPress={() => props.navigation.navigate("Organizations")}
					/>

					<View style={styles.subTitleContainer}>
						<Text style={styles.profileSubTitle}>More Information</Text>
					</View>

					<View style={styles.buttonContainer}>
						<Button
							text="Terms of Service"
							onPress={() => props.navigation.navigate("TOS")}
						/>
						<Button
							text="Logout"
							onPress={() => {
								AsyncStorage.removeItem("Token").then(() => {
									props.navigation.navigate("Welcome");
								});
							}}
						/>
					</View>
				</View>
			</ScrollView>
		</View>
	);
}
