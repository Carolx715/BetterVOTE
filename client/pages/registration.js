import React from "react";
import {
	SafeAreaView,
	TextInput,
	Button,
	ActivityIndicator,
	Text,
	View,
	Image,
} from "react-native";

import styles from "../styles/welcomepage";
import formStyles from "../styles/formStyling";

import { Formik } from "formik";
import * as yup from "yup";

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
	<SafeAreaView style={{ marginTop: 90 }}>
		<Text> Registration </Text>
		<Formik
			initialValues={{ name: "", email: "", password: "", confirmPassword: "" }}
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
						<Text style={{ marginBottom: 3 }}>Name</Text>
						<TextInput
							placeholder="John Doe"
							style={{
								borderWidth: 1,
								borderColor: "black",
								padding: 10,
								marginBottom: 3,
							}}
							onChangeText={formikProps.handleChange("name")}
							onBlur={formikProps.handleBlur("name")}
							autoFocus
						/>
						<Text style={{ color: "red" }}>
							{formikProps.touched.name && formikProps.errors.name}
						</Text>
					</View>

					<View style={{ marginHorizontal: 20, marginVertical: 5 }}>
						<Text style={{ marginBottom: 3 }}>Email</Text>
						<TextInput
							placeholder="johndoe@example.com"
							style={{
								borderWidth: 1,
								borderColor: "black",
								padding: 10,
								marginBottom: 3,
							}}
							onChangeText={formikProps.handleChange("email")}
							onBlur={formikProps.handleBlur("email")}
							autoFocus
						/>
						<Text style={{ color: "red" }}>
							{formikProps.touched.email && formikProps.errors.email}
						</Text>
					</View>

					<View style={{ marginHorizontal: 20, marginVertical: 5 }}>
						<Text style={{ marginBottom: 3 }}>Password</Text>
						<TextInput
							placeholder="password"
							style={{
								borderWidth: 1,
								borderColor: "black",
								padding: 10,
								marginBottom: 3,
							}}
							onChangeText={formikProps.handleChange("password")}
							onBlur={formikProps.handleBlur("password")}
							secureTextEntry
						/>
						<Text style={{ color: "red" }}>
							{formikProps.touched.password && formikProps.errors.password}
						</Text>
					</View>

					<View style={{ marginHorizontal: 20, marginVertical: 5 }}>
						<Text style={{ marginBottom: 3 }}>Confirm Password</Text>
						<TextInput
							placeholder="password"
							style={{
								borderWidth: 1,
								borderColor: "black",
								padding: 10,
								marginBottom: 3,
							}}
							onChangeText={formikProps.handleChange("confirmPassword")}
							onBlur={formikProps.handleBlur("confirmPassword")}
							secureTextEntry
						/>
						<Text style={{ color: "red" }}>
							{formikProps.touched.confirmPassword &&
								formikProps.errors.confirmPassword}
						</Text>
					</View>

					{formikProps.isSubmitting ? (
						<ActivityIndicator />
					) : (
						<View style={styles.formGroup}>
							<Button title="Register" onPress={formikProps.handleSubmit} />
						</View>
					)}
				</React.Fragment>
			)}
		</Formik>
	</SafeAreaView>
);
