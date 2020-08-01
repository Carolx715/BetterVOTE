import React from "react";
import {
    SafeAreaView,
    ScrollView,
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
	name: yup.string().required(),
	description: yup.string().required(),
});

const url = "http://159.203.16.113:3000/organizations/create";

async function createNewOrg(info) {
    try {
        return fetch(url, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFkYW0gU21pdGgiLCJlbWFpbCI6ImNhcGl0YWxpc21AZ21haWwuY29tIiwiaWF0IjoxNTk2MzE3MTUyfQ.aPfLjjQRp1f8wMGu2SuXqlcKaC26k-Sl95bA-cyLwIg'
            },
            body: JSON.stringify(info),
        }).then((response) => response.json());
        console.log("this runs");
    } catch (error) {
        console.log(error);
    }
}

export default () => (
	<SafeAreaView style={styles.container}>
		<Image
			source={require("../assets/background.jpg")}
			style={styles.backgroundImage}
		/>
		<ScrollView style={formStyles.formContainerRegister} contentContainerStyle={{ flexGrow: 1 }}>
			<Text style={formStyles.formTitleCreateNew}>Create a New Organization</Text>
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
							<Text style={formStyles.formText}>Name of Organization</Text>
							<TextInput
								placeholder="Name your organization!"
								placeholderTextColor = "#AAAAAA"
								style={formStyles.textbox}
								onChangeText={formikProps.handleChange("name")}
								onBlur={formikProps.handleBlur("name")}
								autoFocus
							/>
							<Text style={{ color: "red" }}>
								{formikProps.touched.name && formikProps.errors.name}
							</Text>

							<Text style={formStyles.formText}>Description</Text>
							<TextInput
								placeholder="Describe your organization here..."
                                placeholderTextColor = "#AAAAAA"
                                multiline = {true}
								style={formStyles.textarea}
								onChangeText={formikProps.handleChange("description")}
								onBlur={formikProps.handleBlur("description")}
								secureTextEntry
							/>
							<Text style={{ color: "red" }}>
								{formikProps.touched.description && formikProps.errors.description}
							</Text>
						</View>

						<View style={formStyles.btnComponent}>
                            {formikProps.isSubmitting ? (
                                <ActivityIndicator />
                            ) : (
                                <Button 
                                    text="Create" 
                                    onPress={() => {
                                        console.log(formikProps.values);
                                        try {
                                            createNewOrg(formikProps.values).then((response) => {
												if (!response.error) {
													formikProps.handleSubmit; //submit form
                                                    console.log(response);
												} else {
                                                    console.log(response.error.message);
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
);
