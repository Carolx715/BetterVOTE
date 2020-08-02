import styles from "../styles/organizations";
import { Text, TouchableOpacity, View, Modal } from "react-native";
import React, { useState } from "react";
import Form from "./modalForm";
import { MaterialIcons } from "@expo/vector-icons";

export default function menu({ props, isVisible, setIsVisible }) {
	const [modalOpen, setModalOpen] = useState(false);
	return (
		<View>
			{isVisible ? (
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
							onPress={() => {
								setModalOpen(true);
								setIsVisible(false);
							}}
						>
							<Text style={styles.text}>Join Existing Organization</Text>
						</TouchableOpacity>
					</View>
				</View>
			) : null}
			{modalOpen ? (
				<View style={styles.centeredView}>
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
			) : null}
		</View>
	);
}
