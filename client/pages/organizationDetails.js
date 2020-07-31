import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default function OrganizationDetails(props) {
	return (
		<View>
			<Text>{props.navigation.getParam("name")}</Text>
			<Text>{props.navigation.getParam("description")}</Text>
			<Text> {props.navigation.getParam("representatives")}</Text>
		</View>
	);
}
