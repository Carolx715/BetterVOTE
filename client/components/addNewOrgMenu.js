import styles from "../styles/organizations";
import { StyleSheet, Text, TouchableOpacity, View, Modal } from "react-native";
import React from "react";
import { useState } from "react";
import Form from "./modalForm";
import { MaterialIcons } from "@expo/vector-icons";

export default function menu({ props, isVisible }) {
	const [modalOpen, setModalOpen] = useState(false);
	return isVisible ? (
		<View style={styles.centeredView}>
			<View style={styles.modal}>
				<TouchableOpacity
					style={styles.menuitem}
					onPress={() => props.navigation.navigate("CreateOrganization")}
				>
					<Text style={styles.text}>Create New Organization</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.menuitem}
					onPress={() => setModalOpen(true)}
				>
					<Text style={styles.text}>Join Existing Organization</Text>
				</TouchableOpacity>
			</View>

			{/* Modal */}
			<Modal transparent={true} visible={modalOpen} animationType="fade">
				<View style={styles.modalContentContainer}>
					<View style={styles.modalContent}>
						<Text style={styles.text}>Join Organization By Code</Text>
						<Form></Form>
						<MaterialIcons
							style={styles.close}
							name="close"
							size={24}
							onPress={() => setModalOpen(false)}
						/>
					</View>
				</View>
			</Modal>
		</View>
	) : null;
}
