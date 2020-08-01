import React from "react";
import {
	SafeAreaView,
	TextInput,
	ActivityIndicator,
	Text,
	View,
	Image,
} from "react-native";

import styles from "../styles/welcomepage";
import formStyles from "../styles/formStyling";
import { Formik } from "formik";
import * as yup from "yup";
import Button from "../components/button";

export default function Login(props) {
	const validationSchema = yup.object().shape({
		email: yup.string().label("Email").email().required(),
		password: yup
			.string()
			.label("Password")
			.required()
			.min(5, "Seems a bit short..."),
	});

	const url = "http://159.203.16.113:3000/users/authenticate";

	async function authenticate(info) {
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
			<View style={formStyles.formContainer}>
				<Text style={formStyles.formTitle}>Login</Text>
				<Formik
					initialValues={{ email: "", password: "" }}
					onSubmit={(values, actions) => {
						alert("You are logged in!");
						actions.resetForm();
						setTimeout(() => {
							actions.setSubmitting(false);
						}, 1000);
					}}
					validationSchema={validationSchema} //validate input information based upon above schema
				>
					{(formikProps) => (
						<React.Fragment>
							<View style={formStyles.formComponent}>
								<Text style={formStyles.formText}>Email</Text>
								<TextInput
									placeholder="johndoe@example.com"
									placeholderTextColor="#AAAAAA"
									style={formStyles.textbox}
									onChangeText={formikProps.handleChange("email")} //
									onBlur={formikProps.handleBlur("email")}
									autoFocus
									value={formikProps.values.email}
								/>
								<Text style={{ color: "red" }}>
									{formikProps.touched.email && formikProps.errors.email}
								</Text>
							</View>

							<View style={formStyles.formComponent}>
								<Text style={formStyles.formText}>Password</Text>
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

							<View style={formStyles.formComponent}></View>
							{formikProps.isSubmitting ? (
								<ActivityIndicator />
							) : (
								<Button
									text="Submit"
									onPress={() => {
										try {
											authenticate(formikProps.values).then((response) => {
												if (response.jwt) {
													props.navigation.getParam("transferJwt")(
														response.jwt
													);
													console.log(response.jwt);
													formikProps.handleSubmit; //submit form
												} else {
													alert("Unknown Error");
												}
											});
										} catch (err) {
											console.log(err);
										}
									}}
								/>
							)}
						</React.Fragment>
					)}
				</Formik>
			</View>
		</SafeAreaView>
	);
}
