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
import baseStyles from "../styles/welcomepage";
import orgStyles from "../styles/orgDetailsStyle";

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

	const users = data.users.map((user) => (
		<Text key={user.email}>{user.username}</Text>
	));
	const ballots = data.activeBallots.map((ballot) => (
		<Card key={ballot._id}>
			{/*Carol: Below title should be a subtitle :) */}
			<Text style={styles.textTitleOrg}>{ballot.title}</Text>
			{ballot.hasVoted ? (
				<Text>Status: Voted</Text>
			) : (
				<Text>Status: Has Not Voted</Text>
			)}
			<Text>{ballot.description}</Text>
			<Text>{ballot.endTime}</Text>
		</Card>
	));

	return (
		<View style={baseStyles.container2}>
			<ScrollView>
				<View style={baseStyles.flatlistContainer}>
					<Text style={orgStyles.textTitleOrg}>{data.name}</Text>
					<Card>
						<Text>Description: {data.description}</Text>
						<Text>Your Representative: {data.representatives[0].username}</Text>
						<Text>User Count: {data.memberCount}</Text>
						<Text>Users List:</Text>
						{users}
						<Text>Invite Code: {data.inviteCode}</Text>
						<Text>Date Created: {data.createdDate}</Text>
					</Card>

					<Text style={styles.textTitleOrg}>Ballots</Text>
					<TouchableOpacity
						onPress={() => props.navigation.navigate("votingPage")}
					>
						{ballots}
					</TouchableOpacity>
				</View>
			</ScrollView>
		</View>
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
