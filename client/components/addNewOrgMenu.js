import styles from "../styles/organizations";
import {
    Modal, StyleSheet, Text, TouchableOpacity, View
} from "react-native";
import React from "react";

export default function modal({ onPress, visible}) {
	return (
        <View style={styles.centeredView} visible={visible}>
                <View style={styles.modal}>
                <TouchableOpacity style={styles.menuitem} onPress={onPress}>
                    <Text style={styles.text}>Create New Organization</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuitem} onPress={onPress}>
                    <Text style={styles.text}>Join Existing Organization</Text>
                </TouchableOpacity>
            </View>
        </View>
	);
}