import React, { useState } from "react";
import {
	Text,
	View,
	FlatList,
	TouchableOpacity,
	StyleSheet,
} from "react-native";
import Card from "../components/card";
import NewOrgBtn from "../components/addNewOrgBtn";
import AddOrgMenu from "../components/addNewOrgMenu";

export default function organizations(props) {
	const url = "https://localhost:8000/organizations/getList";
	async function retrieveData() {
		try {
			let response = await fetch(url);
			let responseJson = await response.json();
			console.log("Hi");
			console.log(responseJson); //data
		} catch (error) {
			console.log(error);
		}
	}
	retrieveData();

	// const organizations = [
	// 	{
	// 		name: "Random Name1",
	// 		description: "Random Description 1",
	// 		representatives: "Random Representative 1",
	// 	},
	// 	{
	// 		name: "Random Name 2",
	// 		description: "Random Description 2 ",
	// 		representatives: "Random Representative 2",
	// 	},
	// ];

	const [isVisible, setIsVisible] = useState(false);

	const onPressPlus = () => {
		setIsVisible((prev) => !prev);
		console.log(isVisible);
	};

	return (
		<View>
			{/* <Text> Organizations </Text>
			<FlatList
				data={organizations}
				renderItem={({ data }) => (
					<TouchableOpacity
						onPress={() =>
							props.navigation.navigate("OrganizationDetails", item)
						}
					>
						<Card>
							<Text>{item.name}</Text>
							<Text>{item.description}</Text>
							<Text>{item.representatives}</Text>
						</Card>
					</TouchableOpacity>
				)}
			/>
			<NewOrgBtn text="+" onPress={onPressPlus}></NewOrgBtn>
			<AddOrgMenu isVisible={isVisible}></AddOrgMenu> */}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		//Carol Fill this in
	},
});
