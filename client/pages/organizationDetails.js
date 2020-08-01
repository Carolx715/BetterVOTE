import React, { useState } from "react";
import { Text, View, FlatList, TouchableOpacity, ScrollView, StyleSheet	} from "react-native";
import Card from "../components/card";
import styles from "../styles/welcomepage";

export default function OrganizationDetails(props) {

	const renderItem = ({ item }) => (
		<TouchableOpacity>
			<Card>
				<Text>{props.navigation.getParam("description")}</Text>
			</Card>
			<Card>
				<Text> {props.navigation.getParam("representatives")}</Text>
			</Card>
		</TouchableOpacity>
	);

	return (
		<ScrollView>
			<View style>
			<Text style={styles.textTitle2}>{props.navigation.getParam("name")}</Text>
			<TouchableOpacity>
				<Card>
					<Text>DESCRIPTION</Text>
					<Text>{props.navigation.getParam("description")}</Text>
				</Card>
			</TouchableOpacity>
			<TouchableOpacity>
				<Card>
					<Text>YOUR REPRESENTATIVE</Text>
					<Text>John Doe</Text>
					<Text> {props.navigation.getParam("representatives")}</Text>
				</Card>
			</TouchableOpacity>
			<TouchableOpacity>
				<Card>
					<Text>On the Ballot</Text>
				</Card>
			</TouchableOpacity>
			</View>
		</ScrollView>
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
		backgroundColor: 'pink',
		marginHorizontal: 20,
	  },	
	cardContent: {
		marginHorizontal: 18,
		marginVertical: 20,
		width: "100%"
	},
});
