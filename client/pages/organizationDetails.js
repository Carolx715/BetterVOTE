import React, { useState, useEffect } from "react";
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
	function formatDate(epoch) {
		const dateFormat = {
			weekday: "long",
			year: "numeric",
			month: "long",
			day: "numeric",
		};
		const timeFormat = {
			hour: "numeric",
			minute: "numeric",
			second: "numeric",
			hour12: true,
		};
		let date = new Date(epoch);
		if (date.getDay() === new Date().getDay()) {
			return `Today at ${date.toLocaleString("en-US", timeFormat)}`;
		} else if (date.getDay() === new Date().getDay() + 1) {
			return `Tomorrow at ${date.toLocaleString("en-US", timeFormat)}`;
		} else {
			return `${date.toLocaleString("en-US", dateFormat)}`;
		}
	}

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
			<Card>
				{ballot.hasVoted ? (
					<View style={{ alignItems: "center", justifyContent: "center" }}>
						<Text>
							<View style={cardStyles.iconContainer}>
								<Image
									source={require("../assets/checkmark.png")}
									style={cardStyles.icon}
								/>
							</View>
							<Text style={{ fontSize: 15 }}>&nbsp; Status: Voted</Text>
						</Text>
					</View>
				) : (
					<View style={{ alignItems: "center", justifyContent: "center" }}>
						<Text>
							<View style={cardStyles.iconContainer}>
								<Image
									source={require("../assets/redx.png")}
									style={cardStyles.icon}
								/>
							</View>
							<Text style={{ fontSize: 15 }}>&nbsp; Status: Has Not Voted</Text>
						</Text>
					</View>
				)}
				<Text numberOfLines={1} style={styles.textSubtitleBallot}>
					{ballot.title}
				</Text>
				<Text numberOfLines={3} style={cardStyles.textOrgDesc}>
					{ballot.description}
				</Text>
				<Text>Vote Ends {formatDate(ballot.endTime)}</Text>
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
