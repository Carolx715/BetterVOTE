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
import styles from "../styles/welcomepage";
import baseStyles from "../styles/welcomepage";
import orgStyles from "../styles/orgDetailsStyle";
import cardStyles from "../styles/cardStyles";

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
				<View style={{alignItems: "center", justifyContent: "center"}}>
					<Text>
						<View style={cardStyles.iconContainer}>
							<Image
								source={require("../assets/checkmark.png")}
								style={cardStyles.icon}
							/>
						</View>
						<Text style={{fontSize: 15}}>
							&nbsp; Status: Voted
						</Text>
					</Text>
				</View>
			) : (
				<View style={{alignItems: "center", justifyContent: "center"}}>
					<Text>
						<View style={cardStyles.iconContainer}>
							<Image
								source={require("../assets/redx.png")}
								style={cardStyles.icon}
							/>
						</View>
						<Text style={{fontSize: 15}}>
							&nbsp; Status: Has Not Voted
						</Text>
					</Text>
				</View>
			)}
			<Text 
				numberOfLines={1}
				style={orgStyles.textSubitleBallot}>{ballot.title}</Text>
			<Text 
				numberOfLines={3}
				style={cardStyles.textOrgDesc}>{ballot.description}</Text>
			<Text>{ballot.endTime}</Text>
		</Card>
	));

	return (
		<View style={baseStyles.containerOrgDesc}>
			<ScrollView 
				showsVerticalScrollIndicator={false}>

				<View style={baseStyles.container}>
					<Text style={orgStyles.textTitleOrg}>{data.name}</Text>
					{/* Put all these styles in files later */}
					<View style={{backgroundColor: "rgba(255,255,255,1)",
						borderRadius: 1,
						padding: 20,
								
						marginHorizontal: 4,
						marginBottom: 30,
						marginTop: 30,
						minWidth: "95%",
						maxWidth: "95%",}}>

						<Text style={cardStyles.textOrgDesc}>Description: {data.description}</Text>
						<Text style={cardStyles.textOrgCount}>Your Representative: {data.representatives[0].username}</Text>
						<Text style={cardStyles.textOrgCount}>User Count: {data.memberCount}</Text>
						<Text style={{marginTop: 10}}>Invite Code: {data.inviteCode}</Text>
						<Text>Date Created: {data.createdDate}</Text>
					</View>


					<View
						style={{
							width: "95%",
							borderBottomColor: 'rgba(0,0,0,0.6)',
							borderBottomWidth: 5,
							borderRadius: 5
						}}
					/>

					<Text style={orgStyles.textTitleBallot}>Ballots</Text>
					<TouchableOpacity
						onPress={() => props.navigation.navigate("votingPage")}
					>
						{ballots}
					</TouchableOpacity>

					<View
						style={{
							width: "95%",
							borderBottomColor: 'rgba(0,0,0,0.6)',
							borderBottomWidth: 5,
							borderRadius: 5
						}}
					/>



				<View style={{backgroundColor: "rgba(255,255,255,1)",
						borderRadius: 1,
						padding: 20,
								
						marginHorizontal: 4,
						marginBottom: 30,
						marginTop: 30,
						minWidth: "95%",
						maxWidth: "95%",}}>
					<Text style={orgStyles.textTitleUserlist}>Users List:</Text>
						{users} 
					</View>
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
