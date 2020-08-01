import React from "react";
import {
	SafeAreaView,
	ScrollView,
	View,
	TextInput,
	ActivityIndicator,
	Text,
	Image,
	CheckBox,
} from "react-native";

import styles from "../styles/welcomepage";
import formStyles from "../styles/formStyling";
import Button from "../components/button";

import { Formik } from "formik";
import * as yup from "yup";
import axios from 'axios'; 

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
		.test("cek-confirmpassword", "Password doesn't match", function (value) {
			return this.parent.password === value;
		}),
});

export default () => (
	<SafeAreaView style={styles.container}>
		<Image
			source={require("../assets/background.jpg")}
			style={styles.backgroundImage}
		/>
		<ScrollView style={formStyles.formContainerRegister}>
			<Text style={formStyles.formTitleRegister}>Registration</Text>
			<Formik
				initialValues={{ name: "", email: "", password: "", confirmPassword: "", isAgree: false }}
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
						<View style={{ marginHorizontal: 20, marginVertical: 5 }}>
							<Text style={formStyles.formTextRegister}>Name</Text>
							<TextInput
								placeholder="John Doe"
								placeholderTextColor="#AAAAAA"
								style={formStyles.textbox}
								onChangeText={formikProps.handleChange("name")}
								onBlur={formikProps.handleBlur("name")}
								autoFocus
							/>
							<Text style={{ color: "red" }}>
								{formikProps.touched.name && formikProps.errors.name}
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
							/>
							<Text style={{ color: "red" }}>
								{formikProps.touched.password && formikProps.errors.password}
							</Text>
						</View>

						<View style={{ marginHorizontal: 20, marginVertical: 5 }}>
							<Text style={formStyles.formTextRegister}>Confirm Password</Text>
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
						</View>

						<View style = {{flexDircetion: "row", alignItems: "center"}}>
							<CheckBox 
								value = {formikProps.values['isAgreed']}
								onValueChange = {valye => formikProps.setFieldValue('isAgree', value)}/>
							<Text>I agree with the TOS. </Text>
						</View>

						{formikProps.isSubmitting ? (
							<ActivityIndicator />
						) : (
							<View>
								<Button text="Register" onPress={formikProps.handleSubmit} />
							</View>
						)}
					</React.Fragment>
				)}
			</Formik>
		</ScrollView>
	</SafeAreaView>
);
