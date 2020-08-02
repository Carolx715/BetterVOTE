import React, { useState } from "react";
import {
	Text,
	View,
	FlatList,
	TouchableOpacity,
	TouchableWithoutFeedback,
	Image,
} from "react-native";
import Card from "../components/card";
import NewOrgBtn from "../components/addNewOrgBtn";
import AddOrgMenu from "../components/addNewOrgMenu";
import styles from "../styles/welcomepage";
import orgStyles from "../styles/organizations";
import AsyncStorage from "@react-native-community/async-storage";
import Button from "../components/button";

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
		<TouchableWithoutFeedback onPress={() => setIsVisible(false)}>
			<View style={styles.container2}>
				<Image
					source={require("../assets/background-logged-in.jpg")}
					style={orgStyles.backgroundImage}
				/>
				<View style={orgStyles.textContainer}>
					<Text style={styles.textTitle2}>My Organizations</Text>
					<View style={styles.flatlistContainer}>
						<FlatList
							data={data}
							renderItem={renderItem}
							keyExtractor={(item) => item._id}
						/>
					</View>

				<Button
					text="(Temp) Profile"
					onPress={() => {
						AsyncStorage.removeItem("Token").then(() => {
							props.navigation.navigate("Profile");
						});
					}}
				/>

				</View>
				<NewOrgBtn text="+" onPress={onPressPlus}></NewOrgBtn>
				<AddOrgMenu props={props} isVisible={isVisible}></AddOrgMenu>
				
			</View>
		</TouchableWithoutFeedback>
	);
}
