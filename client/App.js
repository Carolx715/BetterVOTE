import { StatusBar } from "expo-status-bar";
import React from "react";
import { Image, Text, View, Button } from "react-native";
import styles from "./styles/homepage";
import Navigator from "./routes/mainStack";

export default function App() {
	return <Navigator />;
}
