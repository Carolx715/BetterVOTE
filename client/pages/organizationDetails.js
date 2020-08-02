import React, { useState, useEffect } from "react";
import {
	Text,
	View,
	FlatList,
	TouchableOpacity,
	ScrollView,
	StyleSheet,
} from "react-native";
import Card from "../components/card";
import styles from "../styles/welcomepage";
import AsyncStorage from "@react-native-community/async-storage";

export default function OrganizationDetails(props) {
	const [data, setData] = useState();
	id = props.navigation.getParam("_id");

	useEffect(() => {
		const fetchData = async () => {
			const url = `http://159.203.16.113:3000/organizations/getOrg?id=${id}`;
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
				let data = await response.json();
				setData(data);
			} catch (error) {
				console.log(error);
			}
		};
		fetchData();
	}, []);
	// empty array makes it so that the page doesn't rerender upon update instead renders upon component mounting

	if (!data) {
		return null;
	}

	return (
		<ScrollView>
			<View style={styles.flatlistContainer}>
				<Text style={styles.textTitle3}>{data.name}</Text>
				<Card>
					<Text>DESCRIPTION</Text>
					<Text>Test</Text>
					<Text>{data.description}</Text>
				</Card>
				<Card>
					<Text>YOUR REPRESENTATIVE</Text>
					<Text>YOUR REPRESENTATIVE</Text>
					<Text>{data.representatives[0].username}</Text>
				</Card>

				<Text style={styles.textTitle3}>On the Ballot</Text>
				{/*votes will probably be pulled from an arry*, onPress = {() => props.navigation.navigate("votingPage", item)}, item will contain all the info about the vote*/}
				
				<TouchableOpacity onPress = {() => props.navigation.navigate("votingPage")}>
					<Card>
						<Text>Sample Vote 1</Text>
					</Card>
				</TouchableOpacity>
			</View>
		</ScrollView>
	);
}

const styles2 = StyleSheet.create({
	card: {
		borderRadius: 6,
		elevation: 3,
		backgroundColor: "#fff",
		shadowOffset: { width: 1, height: 1 },
		shadowColor: "#333",
		shadowOpacity: 0.3,
		shadowRadius: 2,
		marginHorizontal: 15,
		marginVertical: 30,
		padding: 20,
		width: 10,
		height: 10,
		flex: 2,
	},
	scrollView: {
		backgroundColor: "pink",
		marginHorizontal: 20,
	},
	cardContent: {
		marginHorizontal: 18,
		marginVertical: 20,
		width: "100%",
	},
});
