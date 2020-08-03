import React, { useState, useEffect } from "react";
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
import DateTimePicker from '@react-native-community/datetimepicker';

import styles from "../styles/welcomepage";
import formStyles from "../styles/formStyling";
import userStyles from "../styles/userProfileStyles";
import { Formik } from "formik";
import * as yup from "yup";
import Button from "../components/button";
import { withOrientation } from "react-navigation";
import AsyncStorage from "@react-native-community/async-storage";

export default function welcome(props) {

const validationSchema = yup.object().shape({
	ballot: yup.string().required(),
    description: yup.string().required(),
    percentToPass: yup.string().required()
    
});

const url = "http://159.203.16.113:3000/organizations/create";

async function createNewOrg(info) {
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
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
};


const [date, setDate] = useState(new Date());
const [mode, setMode] = useState('date');
const [show, setShow] = useState(false);

const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

const showDatepicker = () => {
    showMode('date');
};

  const showTimepicker = () => {
    showMode('time');
};

return (
	<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
		<SafeAreaView style={userStyles.container}>
			<Image
				source={require("../assets/background.jpg")}
				style={styles.backgroundImage}
			/>
			<ScrollView
                style={{maxWidth: "90%"}}
                showsVerticalScrollIndicator={false}>
				<Text style={formStyles.formTitleCreateNew}>
					Create a Ballot
				</Text>
                <Text style={{color: "white", textAlign: "center", width: "90%"}}>
					Create a new ballot in *organization name* that people can vote on.
				</Text>
				<Formik
                    initialValues={{ ballot: "", description: "", percentToPass: ''}}
                    
					onSubmit={(values, actions) => {
						alert(JSON.stringify(values));
						setTimeout(() => {
							actions.setSubmitting(false);
                        }, 1000);
                        console.log(values)
					}}
					validationSchema={validationSchema}
				>
					{(formikProps) => (
						<React.Fragment>
							<View style={formStyles.formTextboxes}>
								<Text style={formStyles.formText}>Name of Ballot</Text>
								<TextInput
									placeholder="Ballot Name"
									placeholderTextColor="#AAAAAA"
									style={formStyles.textbox}
									onChangeText={formikProps.handleChange("ballot")}
									onBlur={formikProps.handleBlur("ballot")}
								/>
								<Text style={{ color: "red" }}>
									{formikProps.touched.ballot && formikProps.errors.ballot}
								</Text>

								<Text style={formStyles.formText}>Description</Text>
								<TextInput
									placeholder="Describe the ballot here"
									placeholderTextColor="#AAAAAA"
									multiline={true}
									style={formStyles.textarea}
									onChangeText={formikProps.handleChange("description")}
									onBlur={formikProps.handleBlur("description")}
									
								/>
								<Text style={{ color: "red" }}>
									{formikProps.touched.description &&
										formikProps.errors.description}
								</Text>

								<Text style={formStyles.formText}>Percent to Pass</Text>
								<TextInput
                                    keyboardType="numeric"
									placeholder="e.g. 55%"
									placeholderTextColor="#AAAAAA"
									style={formStyles.textbox}
									onChangeText={formikProps.handleChange("percentToPass")}
									onBlur={formikProps.handleBlur("percentToPass")}
									
								/>
								<Text style={{ color: "red" }}>
									{formikProps.touched.percentToPass &&
										formikProps.errors.percentToPass}
								</Text>

								<Text style={formStyles.formText}>Ballot End Date/Time</Text>
                                <View>
                                    <Button onPress={showDatepicker} text="Show date picker!" />
                                </View>
                                <View>
                                    <Button onPress={showTimepicker} text="Show time picker!" />
                                </View>
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={date}
                                    mode={mode}
                                    is24Hour={true}
                                    display="default"
                                    onChange={onChange}
                                />
							</View>

							<View style={formStyles.btnComponent}>
								{formikProps.isSubmitting ? (
									<ActivityIndicator />
								) : (
									<Button
										text="Create"
										onPress={() => {
											Keyboard.dismiss();
											try {
												createNewOrg(formikProps.values).then((response) => {
													if (!response?.error) {
														formikProps.handleSubmit; //submit form
														props.navigation
															.getParam("retrieveData")()
															.then((response) => {
																props.navigation.getParam("setData")(response);
																alert("Successfully submitted", response);
																props.navigation.navigate("Organizations");
															});
													} else {
														alert(response.error.message);
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
	</TouchableWithoutFeedback>
);

}