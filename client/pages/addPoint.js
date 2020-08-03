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
        type: yup.string().required(),
        argument: yup.string().required(),
    });  

    const url = "http://159.203.16.113:3000/ballots/addArgument";

    async function addPoint(info) {
        
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

export default (props) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
		<SafeAreaView style={styles.container}>
        <Image
				source={require("../assets/background.jpg")}
				style={styles.backgroundImage}
			/>
			<ScrollView
				style={formStyles.formContainerRegister}
				contentContainerStyle={{ flexGrow: 1 }}
			>
				<Text style={formStyles.formTitleCreateNew}>
					Add a new Argument
				</Text>
				<Formik
					initialValues={{ type: "", argument: "" }}
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
								<Text style={formStyles.formText}>Type of Argument</Text>
								<TextInput
									placeholder="Support/Against"
									placeholderTextColor="#AAAAAA"
									style={formStyles.textbox}
									onChangeText={formikProps.handleChange("type")}
									onBlur={formikProps.handleBlur("type")}
								/>
								<Text style={{ color: "red" }}>
									{formikProps.touched.type && formikProps.errors.type}
								</Text>

								<Text style={formStyles.formText}>Argument</Text>
								<TextInput
									placeholder="Enter your argument here..."
									placeholderTextColor="#AAAAAA"
									multiline={true}
									style={formStyles.textarea}
									onChangeText={formikProps.handleChange("argument")}
									onBlur={formikProps.handleBlur("argument")}
									secureTextEntry
								/>
								<Text style={{ color: "red" }}>
									{formikProps.touched.argument &&
										formikProps.errors.argument}
								</Text>
							</View>

							<View style={formStyles.btnComponent}>
								{formikProps.isSubmitting ? (
									<ActivityIndicator />
								) : (
									<Button
										text="Add"
										onPress={() => {
                                            Keyboard.dismiss();
                                            
                                            try {
												addPoint({type: formikProps.values.type.toLowerCase().trim(), ballotID: props.navigation.getParam("_id"), argument: formikProps.values.argument,}).then((response) => {
													if (!response?.error) {
                                                        console.log(formikProps.values.type.toLowerCase().trim()); 
														formikProps.handleSubmit; //submit form
                                                        alert("Successfully submitted");
                                                        props.navigation.navigate("votingPage", {_id: props.navigation.getParam("_id")});
															
													} else {
														alert(response.error.message);
													}
												});
											} catch {
												alert("Unknown Error");
											}
                                        }
                                    }
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