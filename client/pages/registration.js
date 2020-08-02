import React from "react";
import {
	SafeAreaView,
	ScrollView,
	View,
	TextInput,
	ActivityIndicator,
	Text,
	Image,
} from "react-native";

import styles from "../styles/welcomepage";
import formStyles from "../styles/formStyling";
import Button from "../components/button";
import { Formik } from "formik";
import * as yup from "yup";
import AsyncStorage from "@react-native-community/async-storage";


export default function Registration() {
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
		<SafeAreaView style={styles.container}>
			<Image
				source={require("../assets/background.jpg")}
				style={styles.backgroundImage}
			/>
			<ScrollView style={formStyles.formContainerRegister}>
				<Text style={formStyles.formTitleRegister}>Registration</Text>
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
							<View style={{ marginHorizontal: 20, marginVertical: 5 }}>
								<Text style={formStyles.formTextRegister}>Name</Text>
								<TextInput
									placeholder="John Doe"
									placeholderTextColor="#AAAAAA"
									style={formStyles.textbox}
									onChangeText={formikProps.handleChange("username")}
									onBlur={formikProps.handleBlur("username")}
									autoFocus
									value={formikProps.values.username}
								/>
								<Text style={{ color: "red" }}>
									{formikProps.touched.username && formikProps.errors.username}
								</Text>
							</View>

							<View style={{ marginHorizontal: 20, marginVertical: 5 }}>
								<Text style={formStyles.formTextRegister}>Email</Text>
								<TextInput
									placeholder="johndoe@example.com"
									placeholderTextColor="#AAAAAA"
									style={formStyles.textbox}
									onChangeText={formikProps.handleChange("email")}
									onBlur={formikProps.handleBlur("email")}
									autoFocus
									value={formikProps.values.email}
								/>
								<Text style={{ color: "red" }}>
									{formikProps.touched.email && formikProps.errors.email}
								</Text>
							</View>

							<View style={{ marginHorizontal: 20, marginVertical: 5 }}>
								<Text style={formStyles.formTextRegister}>Password</Text>
								<TextInput
									placeholder="Password"
									placeholderTextColor="#AAAAAA"
									style={formStyles.textbox}
									onChangeText={formikProps.handleChange("password")}
									onBlur={formikProps.handleBlur("password")}
									secureTextEntry
									value={formikProps.values.password}
								/>
								<Text style={{ color: "red" }}>
									{formikProps.touched.password && formikProps.errors.password}
								</Text>
							</View>

							<View style={{ marginHorizontal: 20, marginVertical: 5 }}>
								<Text style={formStyles.formTextRegister}>
									Confirm Password
								</Text>
								<TextInput
									placeholder="Password"
									placeholderTextColor="#AAAAAA"
									style={formStyles.textbox}
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
									<View>
										<Button
											text="Register"
											onPress={() => {
												try {
													register(formikProps.values).then((response) => {
														if (response.jwt) {
															AsyncStorage.setItem("Token", response.jwt).then(() => {
																alert("You are registered!");
																props.navigation.navigate("Organizations");
															}).catch((err) => {
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
	);
}
