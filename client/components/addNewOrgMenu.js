import styles from "../styles/globalStyles";
import { Text, TouchableOpacity, View, Modal } from "react-native";
import React, { useState } from "react";
import ModalForm from "./modalForm";
import { MaterialIcons } from "@expo/vector-icons";
import { vh } from "react-native-expo-viewport-units";

export default function menu({
	props,
	isVisible,
	setIsVisible,
	retrieveData,
	setData,
}) {
	const [modalOpen, setModalOpen] = useState(false);
	return (
		<View>
			{isVisible ? (
				<View style={{ ...styles.menuView, left: vh(-18), bottom: vh(-5.42) }}>
					<View style={styles.modal}>
						<TouchableOpacity
							// style={styles.menuitem}
							onPress={() => {
								setIsVisible(false);
								props.navigation.navigate("CreateOrganization", {
									retrieveData: retrieveData,
									setData: setData,
								});
							}}
						>
							<Text style={styles.organizationText}>
								Create New Organization
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							// style={styles.menuitem}
							onPress={() => {
								setModalOpen(true);
								setIsVisible(false);
							}}
						>
							<Text style={styles.organizationText}>
								Join Existing Organization
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			) : null}
			{modalOpen ? (
				<Modal transparent={true} visible={modalOpen} animationType="fade">
					<View style={styles.modalContentContainer}>
						<View style={styles.modalContent}>
							<Text style={styles.organizationText}>
								Join Organization By Code
							</Text>
							<ModalForm retrieveData={retrieveData} setData={setData} />
							<MaterialIcons
								style={styles.close}
								name="close"
								size={24}
								onPress={() => setModalOpen(false)}
							/>
						</View>
					</View>
				</Modal>
			) : null}
		</View>
	);
}
