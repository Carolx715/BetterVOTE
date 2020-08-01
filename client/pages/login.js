import React from "react";
import axios from 'axios';
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
	<SafeAreaView style={{ marginTop: 90 }}>
		<Text> Login </Text>
		<View>
		<Formik
			initialValues={{ email: "", password: "" }}
			onSubmit={(values, actions) => {
                console.log(values); 
                axios.post('http://localhost:8000/users/authenticate', values)
                .then(res => console.log(JSON.stringify(res.data))); 
				alert(JSON.stringify(values));
				setTimeout(() => {
					actions.setSubmitting(false);
				}, 1000);
			}}
			validationSchema={validationSchema}>

			{(formikProps) => (
				<React.Fragment>
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
