import React from "react";
import { View, ScrollView, Image } from "react-native";
import { Dimensions } from "react-native";
const { height, width } = Dimensions.get("window");
import Card from "../components/card";
import styles from "../styles/globalStyles";
import AsyncStorage from "@react-native-community/async-storage";
import Button from "../components/button";

export default function vote(props) {
	const resp = props.navigation.getParam("des");
	console.log(JSON.stringify(resp));
	const url = "http://159.203.16.113:3000/ballots/vote";
	console.log("on Vote page");
	async function vote(info) {
		try {
			const jwt = await AsyncStorage.getItem("Token").catch((err) => {
				console.log("Error accessing jwt token", error);
			});
			return fetch(url, {
				method: "POST",
				headers: {
					"Content-type": "application/json",
					Authorization: `Bearer ${jwt}`,
				},
				body: JSON.stringify(info),
			}).then((response) => {
				if (response.ok) {
					alert("You have voted!");
					props.navigation.navigate("OrganizationDetails");
					return {
						success: true,
					};
				} else if (response.json()) {
					return response.json();
				} else {
					return {
						error: "Unknown Error",
					};
				}
			});
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<View
			style={{
				marginTop: height * 0.25,
				marginLeft: width * 0.05,
				marginRight: width * 0.05,
			}}
		>
			<Card>
				{/* <Text style={styles.text2}>{resp}</Text> */}
				{/* <View style={{ alignItems: "center", justifyContent: "center" }}> */}
				<Button
					text="VOTE FOR"
					onPress={() =>
						vote({
							ballotID: props.navigation.getParam("_id"),
							vote: "support",
						})
					}
				/>
				<Button
					text="VOTE AGAINST"
					onPress={() =>
						vote({
							ballotID: props.navigation.getParam("_id"),
							vote: "against",
						})
					}
				/>
				<Button
					text="VOTE ABSTAIN"
					onPress={() =>
						vote({
							ballotID: props.navigation.getParam("_id"),
							vote: "abstain",
						})
					}
				/>
				{/* </View> */}
				{/*submitting should lead you back to original votingPage.js*/}
			</Card>
		</View>
	);
}
