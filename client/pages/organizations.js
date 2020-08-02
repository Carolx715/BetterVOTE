import React, { useState } from "react";
import { Text, View, FlatList, TouchableOpacity } from "react-native";
import Card from "../components/card";
import NewOrgBtn from "../components/addNewOrgBtn";
import AddOrgMenu from "../components/addNewOrgMenu";
import styles from "../styles/welcomepage";
import AsyncStorage from "@react-native-community/async-storage";

export default function organizations(props) {
	const [data, setData] = useState();
	const url = "http://159.203.16.113:3000/organizations/getList";

	async function retrieveData() {
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
			let responseJson = await response.json();
			setData(responseJson);
		} catch (error) {
			console.log(error);
		}
	}

	//retrieve data from database
	if (!data) {
		retrieveData();
	}

	const [isVisible, setIsVisible] = useState(false);

	const onPressPlus = () => {
		setIsVisible((prev) => !prev);
		console.log(isVisible);
	};

	const renderItem = ({ item }) => (
		<TouchableOpacity
			onPress={() => props.navigation.navigate("OrganizationDetails", item)}
		>
			<Card>
				<Text>{item.name}</Text>
				<Text>{item.description}</Text>
			</Card>
		</TouchableOpacity>
	);

	return (
		<View style={styles.container2}>
			<Text style={styles.textTitle2}> Organizations </Text>
			<FlatList
				style={styles.flatlistContainer}
				data={data}
				renderItem={renderItem}
				keyExtractor={(item) => item._id}
			/>
			<NewOrgBtn text="+" onPress={onPressPlus}></NewOrgBtn>
			<AddOrgMenu props={props} isVisible={isVisible}></AddOrgMenu>
		</View>
	);
}
