import React, { useState } from "react";
import { Text, View, FlatList, TouchableOpacity } from "react-native";
import Card from "../components/card";
import styles from "../styles/welcomepage";

export default function OrganizationDetails(props) {

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
		<View style = {styles.container}>
			<Text style={styles.textTitle2}>{props.navigation.getParam("name")}</Text>
			<Card>
				<Text>DESCRIPTION</Text>
				<Text>{props.navigation.getParam("description")}</Text>
			</Card>
			<Card>
				<Text>YOUR REPRESENTATIVE</Text>
				<Text>John Doe</Text>
				<Text> {props.navigation.getParam("representatives")}</Text>
			</Card>
			<Card>
				<Text>On the Ballot</Text>
			</Card>
		</View>
	);
}
