import React from "react";
import {
	SafeAreaView,
	ScrollView,
	View,
	TextInput,
	ActivityIndicator,
	Text,
	Image,
	Keyboard,
	TouchableWithoutFeedback,
} from "react-native";

import styles from "../styles/globalStyles";
import Button from "../components/button";
import { Formik } from "formik";
import * as yup from "yup";
import AsyncStorage from "@react-native-community/async-storage";
import { vw, vh } from "react-native-expo-viewport-units";

export default function Registration(props) {
	const validationSchema = yup.object().shape({
		name: yup.string().label("Name").required(),
		email: yup.string().label("Email").email().required(),
		password: yup
			.string()
			.label("Password")
			.required()
			.min(8, "Too short, must be a minimum of eight characters"),
		confirmPassword: yup
			.string()
			.label("Confirm Password")
			.required()
			.test("check-confirmpassword", "Password doesn't match", function (
				value
			) {
				return this.parent.password === value;
			}),
	});

	const url = "http://159.203.16.113:3000/users/register";

	async function register(info) {
		try {
			return fetch(url, {
				method: "POST",
				headers: {
					"Content-type": "application/json",
				},
				body: JSON.stringify(info),
			}).then((response) => response.json());
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<SafeAreaView style={styles.container}>
				<Image
					source={require("../assets/background.jpg")}
					style={styles.backgroundImage}
				/>
				<ScrollView style={{ ...styles.formContainerRegister, top: vh(5) }}>
					<Text style={styles.formTitleRegister}>Registration</Text>
					<Formik
						initialValues={{
							username: "",
							email: "",
							password: "",
							confirmPassword: "",
						}}
						onSubmit={(actions) => {
							setTimeout(() => {
								actions.setSubmitting(false);
							}, 1000);
						}}
						validationSchema={validationSchema}
					>
						{(formikProps) => (
							<React.Fragment>
								<View style={styles.registerCenterContainer}>
									<Text style={styles.formTextRegister}>Name</Text>
									<TextInput
										placeholder="John Doe"
										placeholderTextColor="#AAAAAA"
										style={styles.formTextbox}
										onChangeText={formikProps.handleChange("username")}
										onBlur={formikProps.handleBlur("username")}
										value={formikProps.values.username}
									/>
									<Text style={{ color: "red" }}>
										{formikProps.touched.username &&
											formikProps.errors.username}
									</Text>
								</View>

								<View style={styles.registerCenterContainer}>
									<Text style={styles.formTextRegister}>Email</Text>
									<TextInput
										placeholder="johndoe@example.com"
										placeholderTextColor="#AAAAAA"
										style={styles.formTextbox}
										onChangeText={formikProps.handleChange("email")}
										onBlur={formikProps.handleBlur("email")}
										value={formikProps.values.email.toLowerCase()}
									/>
									<Text style={{ color: "red" }}>
										{formikProps.touched.email && formikProps.errors.email}
									</Text>
								</View>

								<View style={styles.registerCenterContainer}>
									<Text style={styles.formTextRegister}>Password</Text>
									<TextInput
										placeholder="Password"
										placeholderTextColor="#AAAAAA"
										style={styles.formTextbox}
										onChangeText={formikProps.handleChange("password")}
										onBlur={formikProps.handleBlur("password")}
										secureTextEntry
										value={formikProps.values.password}
									/>
									<Text style={{ color: "red" }}>
										{formikProps.touched.password &&
											formikProps.errors.password}
									</Text>
								</View>

								<View style={styles.registerCenterContainer}>
									<Text style={styles.formTextRegister}>Confirm Password</Text>
									<TextInput
										placeholder="Password"
										placeholderTextColor="#AAAAAA"
										style={styles.formTextbox}
										onChangeText={formikProps.handleChange("confirmPassword")}
										onBlur={formikProps.handleBlur("confirmPassword")}
										secureTextEntry
									/>
									<Text style={{ color: "red" }}>
										{formikProps.touched.confirmPassword &&
											formikProps.errors.confirmPassword}
									</Text>
									{/* 
							<View style = {{flexDircetion: "row", alignItems: "center"}}>
								<CheckBox 
									value = {formikProps.values['isAgreed']}
									onValueChange = {valye => formikProps.setFieldValue('isAgree', value)}/>
								<Text>I agree with the TOS. </Text>
							</View> */}

									{formikProps.isSubmitting ? (
										<ActivityIndicator />
									) : (
										<View
											style={{
												marginLeft: vw(2),
												marginRight: vw(13),
												marginTop: vh(3),
												...styles.btnComponent,
											}}
										>
											<Button
												text="Register"
												onPress={() => {
													try {
														register(formikProps.values).then((response) => {
															Keyboard.dismiss();
															if (response.jwt) {
																AsyncStorage.setItem("Token", response.jwt)
																	.then(() => {
																		alert("You are registered!");
																		props.navigation.navigate("Organizations");
																	})
																	.catch((err) => {
																		console.log(err);
																	});
															} else if (response.error) {
																alert(response.error);
															} else {
																alert("Unknown Registration Error");
															}
														});
													} catch (err) {
														console.log(err);
													}
												}}
											/>
										</View>
									)}
								</View>
							</React.Fragment>
						)}
					</Formik>
				</ScrollView>
			</SafeAreaView>
		</TouchableWithoutFeedback>
	);
}
