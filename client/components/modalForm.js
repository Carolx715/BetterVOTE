import React from "react";
import { Text, View } from "react-native";
import Button from "./button";
import styles from "../styles/globalStyles";
import AsyncStorage from "@react-native-community/async-storage";

import * as yup from "yup";
import { Formik } from "formik";
import { TextInput } from "react-native";

export default function form({ setData, retrieveData }) {
	const validationSchema = yup.object().shape({
		inviteCode: yup.string().required(),
	});

	const url = "http://159.203.16.113:3000/organizations/join";

	async function joinOrg(info) {
		try {
			const jwt = await AsyncStorage.getItem("Token").catch((err) => {
				console.log("Something went wrong", err);
			});
			return fetch(url, {
				method: "POST",
				headers: {
					"Content-type": "application/json",
					Authorization: `Bearer ${jwt}`,
				},
				body: JSON.stringify(info),
			}).then(async (response) => {
				if (response.ok) {
					return {
						success: true,
					};
				} else {
					let data = await response.json();
					return data;
				}
			});
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<View>
			<Formik
				initialValues={{ inviteCode: "" }}
				validationSchema={validationSchema}
				onSubmit={(value) => {
					console.log(value);
				}}
			>
				{(formikprops) => (
					<View>
						<TextInput
							style={styles.textboxModal}
							placeholder="Enter code here"
							onChangeText={formikprops.handleChange("inviteCode")}
							value={formikprops.values.inviteCode}
						></TextInput>

						<Text style={{ color: "red" }}>
							{formikprops.touched.inviteCode && formikprops.errors.inviteCode}
						</Text>

						<Button
							text="Send Join Request"
							onPress={() => {
								try {
									console.log(formikprops.values);
									joinOrg(formikprops.values).then((response) => {
										if (!response?.error) {
											formikprops.handleSubmit; //submit form
											retrieveData().then((response) => {
												setData(response);
												alert("Successfully submitted", response);
											});
										} else {
											alert(response.error);
										}
									});
								} catch {
									alert("Unknown Error");
								}
							}}
						/>
					</View>
				)}
			</Formik>
		</View>
	);
}
