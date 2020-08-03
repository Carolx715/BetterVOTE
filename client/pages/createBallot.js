import React from "react";
import {
	SafeAreaView,
	ScrollView,
	TextInput,
	ActivityIndicator,
	Text,
	View,
	Image,
	Keyboard,
	TouchableWithoutFeedback,
} from "react-native";

import styles from "../styles/welcomepage";
import formStyles from "../styles/formStyling";
import { Formik } from "formik";
import * as yup from "yup";
import Button from "../components/button";
import { withOrientation } from "react-navigation";
import AsyncStorage from "@react-native-community/async-storage";

const validationSchema = yup.object().shape({
	name: yup.string().required(),
	description: yup.string().required(),
});

const url = "http://159.203.16.113:3000/organizations/create";

async function createNewOrg(info) {
	try {
		const jwt = await AsyncStorage.getItem("Token").catch((err) => {
			console.log("Error accessing jwt token", error);
		});
		return fetch(url, {
			method: "POST",
			headers: {
				"Content-type": "application/json",
				Authorization: `Bearer ${jwt}`,
			},
			body: JSON.stringify(info),
		}).then((response) => {
			if (response.ok) {
				return {
					success: true,
				};
			} else if (response.json()) {
				return response.json();
			} else {
				return {
					error: "Unknown Error",
				};
			}
		});
	} catch (error) {
		console.log(error);
	}
}

export default (props) => (
	<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
		<SafeAreaView style={styles.container}>
			<Image
				source={require("../assets/background.jpg")}
				style={styles.backgroundImage}
			/>
			<ScrollView
				style={formStyles.formContainerRegister}
				contentContainerStyle={{ flexGrow: 1, alignItems: "center" }}
			>
				<Text style={formStyles.formTitleCreateNew}>
					Create a Ballot
				</Text>
                <Text style={{color: "white", textAlign: "center", width: "90%"}}>
					Create a new ballot in *organization name* that people can vote on.
				</Text>
				<Formik
					initialValues={{ name: "", description: "" }}
					onSubmit={(values, actions) => {
						alert(JSON.stringify(values));
						setTimeout(() => {
							actions.setSubmitting(false);
						}, 1000);
					}}
					validationSchema={validationSchema}
				>
					{(formikProps) => (
						<React.Fragment>
							<View style={formStyles.formTextboxes}>
								<Text style={formStyles.formText}>Name of Ballot</Text>
								<TextInput
									placeholder="Ballot Name"
									placeholderTextColor="#AAAAAA"
									style={formStyles.textbox}
									onChangeText={formikProps.handleChange("name")}
									onBlur={formikProps.handleBlur("name")}
								/>
								<Text style={{ color: "red" }}>
									{formikProps.touched.name && formikProps.errors.name}
								</Text>

								<Text style={formStyles.formText}>Description</Text>
								<TextInput
									placeholder="Describe the ballot here"
									placeholderTextColor="#AAAAAA"
									multiline={true}
									style={formStyles.textarea}
									onChangeText={formikProps.handleChange("description")}
									onBlur={formikProps.handleBlur("description")}
									secureTextEntry
								/>
								<Text style={{ color: "red" }}>
									{formikProps.touched.description &&
										formikProps.errors.description}
								</Text>
							</View>

							<View style={formStyles.btnComponent}>
								{formikProps.isSubmitting ? (
									<ActivityIndicator />
								) : (
									<Button
										text="Create"
										onPress={() => {
											Keyboard.dismiss();
											try {
												createNewOrg(formikProps.values).then((response) => {
													if (!response?.error) {
														formikProps.handleSubmit; //submit form
														props.navigation
															.getParam("retrieveData")()
															.then((response) => {
																props.navigation.getParam("setData")(response);
																alert("Successfully submitted", response);
																props.navigation.navigate("Organizations");
															});
													} else {
														alert(response.error.message);
													}
												});
											} catch {
												alert("Unknown Error");
											}
										}}
									/>
								)}
							</View>
						</React.Fragment>
					)}
				</Formik>
			</ScrollView>
		</SafeAreaView>
	</TouchableWithoutFeedback>
);
