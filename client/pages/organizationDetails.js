import React, { useState, useEffect } from "react";
import moment from "moment";
import {
	Text,
	View,
	Image,
	TouchableOpacity,
	ScrollView,
	StyleSheet,
} from "react-native";

import Card from "../components/card";
import AsyncStorage from "@react-native-community/async-storage";
import cardStyles from "../styles/cardStyles";
import styles from "../styles/globalStyles";
import { vh } from "react-native-expo-viewport-units";

export default function OrganizationDetails(props) {
	const [id, setID] = useState();
	const [data, setData] = useState();
	if (!id) {
		setID(props.navigation.getParam("_id"));
	}

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

	useEffect(() => {
		fetchData();
		props.navigation.addListener("willFocus", () => {
			fetchData();
		});
	}, []);
	// empty array makes it so that the page doesn't rerender upon update instead renders upon component mounting

	if (!data) {
		return null;
	}

	const users = data.users.map((user) => (
		<View style={{ alignItems: "center" }} key={user.email}>
			<Text style={{ fontStyle: "italic", marginBottom: vh(1) }}>
				{user.username}
			</Text>
		</View>
	));
	const ballots = data.activeBallots.map((ballot) => (
		<TouchableOpacity
			key={ballot._id}
			onPress={() =>
				props.navigation.navigate("votingPage", { _id: ballot._id })
			}
		>
			<Card key={ballot._id}>
				{ballot.hasVoted ? (
					<View style={{ alignItems: "center", justifyContent: "center" }}>
						<Text>
							<Text style={{ fontSize: 15 }}>✅ Status: Voted</Text>
						</Text>
					</View>
				) : (
					<View style={{ alignItems: "center", justifyContent: "center" }}>
						<Text>
							<Text style={{ fontSize: 15 }}>❌ Status: Has Not Voted</Text>
						</Text>
					</View>
				)}
				<Text numberOfLines={1} style={styles.textSubtitleBallot}>
					{ballot.title}
				</Text>
				<Text numberOfLines={3} style={cardStyles.textOrgDesc}>
					{ballot.description}
				</Text>
				<Text>
					Voting ends {moment(ballot.endTime).calendar()} (
					{moment(ballot.endTime).fromNow()})
				</Text>
			</Card>
		</TouchableOpacity>
	));

	return (
		<View style={styles.containerOrgDesc}>
			<Image
				source={require("../assets/background-logged-in.jpg")}
				style={styles.organizationBackgroundImage}
			/>
			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<Text style={{ ...styles.textTitleOrgDetails, color: "white" }}>
					{data.name}
				</Text>
				<Card>
					<View style={{ alignItems: "center" }}>
						<Text style={cardStyles.textOrgDesc}>{data.description}</Text>
						<Text style={styles.organizationDetailsContainer}>
							<Text style={{ fontWeight: "bold" }}>Your Representative: </Text>{" "}
							{data.representatives[0].username}
						</Text>
						<Text style={styles.organizationDetailsContainer}>
							<Text style={{ fontWeight: "bold" }}>User Count: </Text>
							{data.memberCount}
						</Text>
						<Text style={styles.organizationDetailsContainer}>
							<Text style={{ fontWeight: "bold" }}>Invite Code: </Text>{" "}
							{data.inviteCode}
						</Text>
						<Text style={styles.organizationDetailsContainer}>
							<Text style={{ fontWeight: "bold" }}>Date Created: </Text>{" "}
							{formatDate(data.createdDate)}
						</Text>
					</View>
				</Card>
				<View style={styles.br} />

				<Text style={styles.BallotTitle}>Ballots</Text>

				{Object.keys(ballots).length === 0 ? (
					<Card>
						<Text style={{ color: "grey", fontSize: 16 }}>
							There are no active ballots right now.
						</Text>
					</Card>
				) : (
					ballots
				)}

				<View style={styles.br} />
				<View style={{ marginTop: vh(3.1) }}>
					<Card>
						<Text style={styles.OrgDescUserListTitle}>Users List:</Text>
						{users}
					</Card>
				</View>
			</ScrollView>
		</View>
	);
}
