import React, { useState } from "react";
import {
	Text,
	View,
	FlatList,
	TouchableOpacity,
} from "react-native";
import Card from "../components/card";
import NewOrgBtn from "../components/addNewOrgBtn";
import AddOrgMenu from "../components/addNewOrgMenu";
import styles from "../styles/welcomepage";

export default function organizations(props) {
	const [data, setData] = useState();
	const url = "http://159.203.16.113:3000/organizations/getList";
	async function retrieveData() {
		let jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFkYW0gU21pdGgiLCJlbWFpbCI6ImNhcHRpYWxpc21AZ21haWwuY29tIiwiaWF0IjoxNTk2MjI2NTM4fQ.b9LId0Y192Ii5uqjPCsJAkBxkf2RxlTWiLNNXgTntto';
		try {
			let response = await fetch(url, {
				method: 'GET',
				headers: {
					'Authorization': `Bearer ${jwt}`
				}
			});
			let responseJson = await response.json();
			setData(responseJson);
		} catch (error) {
			console.log(error);
		}
	}
	if (!data) {
		retrieveData();
	}

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

	const renderItem = ({ item }) => (
		<TouchableOpacity
			onPress={() =>
				props.navigation.navigate("OrganizationDetails", item)
			}
		>
			<Card>
				<Text>{item.name}</Text>
				<Text>{item.description}</Text>
			</Card>
		</TouchableOpacity>
	);

	return (
		<View style={styles.container}>
			<Text style={{marginTop: 100}}> Organizations </Text>
			<FlatList
				data={data}
				renderItem={renderItem}
				keyExtractor={(item) => item.id}
			/>
			<NewOrgBtn text="+" onPress={onPressPlus}></NewOrgBtn>
			<AddOrgMenu props={props} isVisible={isVisible}></AddOrgMenu> 
		</View>
	);
}

// const styles = StyleSheet.create({
// 	container: {
// 		//Carol Fill this in
// 	},
// });
