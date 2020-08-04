import React, { useState } from "react";
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

import styles from "../styles/globalStyles";
import { Formik } from "formik";
import * as yup from "yup";
import Button from "../components/button";
import { withOrientation } from "react-navigation";
import AsyncStorage from "@react-native-community/async-storage";
import { vh, vw } from "react-native-expo-viewport-units";
import { KeyboardAvoidingView } from "react-native";

export default function welcome(props) {
	const validationSchema = yup.object().shape({
		title: yup.string().required(),
		description: yup.string().required(),
		voteThreshold: yup.string().required(),
		endTime: yup.string().required(),
	});

	const url = "http://159.203.16.113:3000/ballots/create";

	async function createNewBallot(info) {
		console.log(JSON.stringify(info));

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

	const onChange = (event, selectedDate) => {
		const currentDate = selectedDate || date;
		setShow(Platform.OS === "ios");
		setDate(currentDate);
	};

	// sets to today's date and time
	const [date, setDate] = useState(new Date());
	const [mode, setMode] = useState("date");
	const [show, setShow] = useState(false);

	const showMode = (currentMode) => {
		setShow(true);
		setMode(currentMode);
	};

	// switches to date picker
	const showDatepicker = () => {
		showMode("date");
	};

	// switches to time picker
	const showTimepicker = () => {
		showMode("time");
	};

	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<SafeAreaView style={styles.container}>
				<Image
					source={require("../assets/background.jpg")}
					style={styles.backgroundImage}
				/>
				<View
					style={{
						...styles.formContainer,
						top: vh(8),
					}}
				>
					<KeyboardAvoidingView
						behavior="position"
						keyboardVerticalOffset={-80}
					>
						<ScrollView
							style={{ maxWidth: "95%", minWidth: "95%" }}
							contentContainerStyle={{ margin: 20 }}
							showsVerticalScrollIndicator={false}
						>
							<Text style={styles.formTitleCreateNew}>Create a Ballot</Text>
							<Text
								style={{
									color: "white",
									textAlign: "center",
									marginBottom: vh(3),
									marginLeft: vw(4.3),
								}}
							>
								Create a ballot that members can vote on.
							</Text>

							{/* Form begins */}
							<View style={{ marginLeft: vw(10) }}>
								<Formik
									initialValues={{
										title: "",
										description: "",
										voteThreshold: "",
										endTime: date,
									}}
									onSubmit={(values, actions) => {
										alert(JSON.stringify(values));
										setTimeout(() => {
											actions.setSubmitting(false);
										}, 1000);
										console.log(values);
									}}
									validationSchema={validationSchema}
								>
									{(formikProps) => (
										<React.Fragment>
											<Text style={styles.formText}>Name of Ballot</Text>
											<TextInput
												placeholder="Ballot Name"
												placeholderTextColor="#AAAAAA"
												style={styles.formTextbox}
												onChangeText={formikProps.handleChange("title")}
												onBlur={formikProps.handleBlur("title")}
											/>
											<Text style={{ color: "red" }}>
												{formikProps.touched.title && formikProps.errors.title}
											</Text>

											<Text style={styles.formText}>Description</Text>
											<TextInput
												placeholder="Describe the ballot here"
												placeholderTextColor="#AAAAAA"
												multiline={true}
												style={styles.textarea}
												onChangeText={formikProps.handleChange("description")}
												onBlur={formikProps.handleBlur("description")}
											/>
											<Text style={{ color: "red" }}>
												{formikProps.touched.description &&
													formikProps.errors.description}
											</Text>

											<Text style={styles.formText}>Percent to Pass</Text>
											<TextInput
												keyboardType="numeric"
												placeholder="e.g. 55%"
												placeholderTextColor="#AAAAAA"
												style={styles.formTextbox}
												onChangeText={formikProps.handleChange("voteThreshold")}
												onBlur={formikProps.handleBlur("voteThreshold")}
											/>
											<Text style={{ color: "red" }}>
												{formikProps.touched.voteThreshold &&
													formikProps.errors.voteThreshold}
											</Text>

											{/* END DATE STARTS HERE */}
											<Text style={styles.formText}>Ballot End Date/Time</Text>
											<TextInput
												placeholder="YYYY-MM-DDTHH:MM:SSZ"
												placeholderTextColor="#AAAAAA"
												style={styles.formTextbox}
												onChangeText={formikProps.handleChange("endTime")}
												onBlur={formikProps.handleBlur("endTime")}
											/>
											{/* END DATE ENDS */}

											<View style={styles.btnComponent}>
												{formikProps.isSubmitting ? (
													<ActivityIndicator />
												) : (
													<View
														style={{ marginTop: vh(5), marginRight: vw(8) }}
													>
														<Button
															text="Create"
															onPress={() => {
																Keyboard.dismiss();
																try {
																	console.log(formikProps.values.endTime);
																	// formikProps.values.endTime = date;
																	console.log(
																		Date.parse(formikProps.values.endTime)
																	);

																	createNewBallot({
																		title: formikProps.values.title,
																		description: formikProps.values.description,
																		endTime: Date.parse(
																			formikProps.values.endTime
																		),
																		voteThreshold:
																			formikProps.values.voteThreshold / 100,
																		organizationID: props.navigation.getParam(
																			"_id"
																		),
																	}).then((response) => {
																		if (!response?.error) {
																			formikProps.handleSubmit; //submit form
																			alert("Successfully submitted");
																			props.navigation.navigate(
																				"OrganizationDetails",
																				{
																					_id: props.navigation.getParam("_id"),
																				}
																			);
																		} else {
																			alert(response.error.message);
																		}
																	});
																} catch {
																	alert("Unknown Error");
																}
															}}
														/>
													</View>
												)}
											</View>
										</React.Fragment>
									)}
								</Formik>
							</View>
						</ScrollView>
					</KeyboardAvoidingView>
				</View>
			</SafeAreaView>
		</TouchableWithoutFeedback>
	);
}
