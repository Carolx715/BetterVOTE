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
	// dummy data needs to be replaced...
	const organizations = [
		{
			name: "Random Name1",
			description: "Random Description 1",
			representatives: "Random Representative 1",
		},
		{
			name: "Random Name 2",
			description: "Random Description 2 ",
			representatives: "Random Representative 2",
		},
	];

	const [isVisible, setIsVisible] = useState(false);

	const onPressPlus = () => {
		setIsVisible((prev) => !prev);
		console.log(isVisible);
	};

	return (
		<View>
			<Text> Organizations </Text>
			<FlatList
				data={organizations}
				renderItem={({ item }) => (
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
			<AddOrgMenu visible={isVisible}></AddOrgMenu>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		//Carol Fill this in
	},
});