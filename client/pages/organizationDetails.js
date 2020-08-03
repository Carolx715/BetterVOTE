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
import baseStyles from "../styles/welcomepage";
import orgStyles from "../styles/orgDetailsStyle";
import styles from "../styles/welcomepage";
import AsyncStorage from "@react-native-community/async-storage";
import cardStyles from "../styles/cardStyles";

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
			<Text>{user.username}</Text>
		</View>
	));
	const ballots = data.activeBallots.map((ballot) => (
		<Card key={ballot._id}>
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
			<Text numberOfLines={1} style={orgStyles.textSubitleBallot}>
				{ballot.title}
			</Text>
			<Text numberOfLines={3} style={cardStyles.textOrgDesc}>
				{ballot.description}
			</Text>
			<Text>Vote Ends {formatDate(ballot.endTime)}</Text>
		</Card>
	));

	return (
		<View style={baseStyles.containerOrgDesc}>
			<ScrollView showsVerticalScrollIndicator={false}>
				<View style={baseStyles.container}>
					<Text style={orgStyles.textTitleOrg}>{data.name}</Text>
					<Card>
						<View style={{ alignItems: "center" }}>
							<Text style={cardStyles.textOrgDesc}>{data.description}</Text>
							<Text style={{ marginTop: 8, marginBottom: 5 }}>
								<Text style={{ fontWeight: "bold" }}>
									Your Representative:{" "}
								</Text>{" "}
								{data.representatives[0].username}
							</Text>
							<Text style={{ marginTop: 8, marginBottom: 5 }}>
								<Text style={{ fontWeight: "bold" }}>User Count: </Text>
								{data.memberCount}
							</Text>
							<Text style={{ marginTop: 8, marginBottom: 5 }}>
								<Text style={{ fontWeight: "bold" }}>Invite Code: </Text>{" "}
								{data.inviteCode}
							</Text>
							<Text style={{ marginTop: 8, marginBottom: 5 }}>
								<Text style={{ fontWeight: "bold" }}>Date Created: </Text>{" "}
								{formatDate(data.createdDate)}
							</Text>
						</View>
					</Card>

					<Card>
						<Text style={orgStyles.textTitleUserlist}>Users List:</Text>
						{users}
					</Card>

					{/* <View
						style={{
							width: "95%",
							borderBottomColor: "rgba(0,0,0,0.6)",
							borderBottomWidth: 5,
							borderRadius: 5,
						}}
					/> */}

					<Text style={orgStyles.textTitleBallot}>Ballots</Text>
					<TouchableOpacity
						onPress={() => props.navigation.navigate("votingPage",)}
					>
						{ballots}
					</TouchableOpacity>

					<View
						style={{
							width: "95%",
							borderBottomColor: "rgba(0,0,0,0.6)",
							borderBottomWidth: 5,
							borderRadius: 5,
						}}
					/>
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
