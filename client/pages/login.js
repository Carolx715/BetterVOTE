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
import { withOrientation } from "react-navigation";

const validationSchema = yup.object().shape({
	email: yup.string().label("Email").email().required(),
	password: yup
		.string()
		.label("Password")
		.required()
		.min(5, "Seems a bit short..."),
});

export default () => (
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
					alert(JSON.stringify(values));
					setTimeout(() => {
						actions.setSubmitting(false);
					}, 1000);
				}}
				validationSchema={validationSchema}
			>
				{(formikProps) => (
					<React.Fragment>
						<View style={formStyles.formComponent}>
							<Text style={formStyles.formText}>Email</Text>
							<TextInput
								placeholder="johndoe@example.com"
								placeholderTextColor = "#AAAAAA"
								style={formStyles.textbox}
								onChangeText={formikProps.handleChange("email")}
								onBlur={formikProps.handleBlur("email")}
								autoFocus
							/>
							<Text style={{ color: "red" }}>
								{formikProps.touched.email && formikProps.errors.email}
							</Text>
						</View>

						<View style={formStyles.formComponent}>
							<Text style={formStyles.formText}>Password</Text>
							<TextInput
								placeholder="Password"
								placeholderTextColor = "#AAAAAA"
								style={formStyles.textbox}
								onChangeText={formikProps.handleChange("password")}
								onBlur={formikProps.handleBlur("password")}
								secureTextEntry
							/>
							<Text style={{ color: "red" }}>
								{formikProps.touched.password && formikProps.errors.password}
							</Text>
						</View>

						<View style={formStyles.formComponent}></View>
						{formikProps.isSubmitting ? (
							<ActivityIndicator />
						) : (
							<Button text="Submit" onPress={formikProps.handleSubmit} />
						)}
					</React.Fragment>
				)}
			
			</Formik>
		</View>
	</SafeAreaView>
);
