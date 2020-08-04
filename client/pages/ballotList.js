import React, { useState, useEffect } from "react";
import moment from "moment";
import { Text, View, TouchableOpacity, ScrollView, Image } from "react-native";
import Card from "../components/card";
import cardStyles from "../styles/cardStyles";
import styles from "../styles/globalStyles";
import AsyncStorage from "@react-native-community/async-storage";
import { vh, vw } from "react-native-expo-viewport-units";

export default function ballotList(props) {
	const [id, setID] = useState();
	const [data, setData] = useState();
	if (!id) {
		setID(props.navigation.getParam("_id"));
	}

	const fetchData = async () => {
		const url = `http://159.203.16.113:3000/ballots/getList?orgid=${id}`;
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
		// willFocus listener will run when the view is focused again (for example, user navigates to different page and then back)
		props.navigation.addListener("willFocus", () => {
			fetchData();
		});
		fetchData();
	}, []);

	if (!data) {
		return null;
	}

	const ballots = data.map((ballot) => {
		return (
			<TouchableOpacity
				key={ballot._id}
				onPress={() =>
					props.navigation.navigate("votingPage", { _id: ballot._id })
				}
			>
				<Card key={ballot._id}>
					<View style={{ alignItems: "center", justifyContent: "center" }}>
						<Text numberOfLines={1} style={styles.textSubtitleBallot}>
							{ballot.title}
						</Text>
						<Text style={{ fontSize: 15, marginBottom: vh(2) }}>
							{ballot.status === "active"
								? ballot.hasVoted
									? "✅ Status: Voted"
									: "❌ Status: Has Not Voted"
								: ballot.result === "passed"
								? "✅ Legislation Passed"
								: "❌ Failed to Pass"}
						</Text>
						<Text numberOfLines={3} style={cardStyles.textOrgDesc}>
							{ballot.description}
						</Text>
						<Text>
							{ballot.status === "active"
								? `Voting ends ${moment(ballot.endTime).calendar()} (
					${moment(ballot.endTime).fromNow()})`
								: `Voting ended ${moment(ballot.endTime).calendar()} (
					${moment(ballot.endTime).fromNow()})`}
						</Text>
					</View>
				</Card>
			</TouchableOpacity>
		);
	});

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
				<Text
					style={{
						...styles.textTitleOrgDetails,
						color: "white",
						marginHorizontal: vw(5),
					}}
				>
					All Ballots
				</Text>

				{Object.keys(ballots).length === 0 ? (
					<Card>
						<Text style={{ color: "grey", fontSize: 16 }}>
							There are no ballots at this moment. Why not make one?
						</Text>
					</Card>
				) : (
					ballots
				)}
			</ScrollView>
		</View>
	);
}
