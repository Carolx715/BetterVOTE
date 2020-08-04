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
	title: yup.string().required(),
    description: yup.string().required(),
    voteThreshold: yup.string().required()
    
});

const url = "http://159.203.16.113:3000/ballots/create";


async function createNewBallot(info) {
	console.log(JSON.stringify(info));
	{/*}
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
*/}

}

const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
};


// sets to today's date and time
const [date, setDate] = useState(new Date());
const [mode, setMode] = useState('date');
const [show, setShow] = useState(false);

const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

// switches to date picker
const showDatepicker = () => {
    showMode('date');
};

// switches to time picker
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
                style={{maxWidth: "95%"}}
                contentContainerStyle={{margin: 20}}
                showsVerticalScrollIndicator={false}>
				<Text style={formStyles.formTitleCreateNew}>
					Create a Ballot
				</Text>
                <Text style={{color: "white", textAlign: "center",}}>
					Create a new ballot in *organization name* that people can vote on.
				</Text>

                {/* Form begins */}
				<Formik
                    initialValues={{ title: "", description: "", voteThreshold: "", endTime: date}}
                    
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
									onChangeText={formikProps.handleChange("title")}
									onBlur={formikProps.handleBlur("title")}
								/>
								<Text style={{ color: "red" }}>
									{formikProps.touched.title && formikProps.errors.title}
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
									onChangeText={formikProps.handleChange("voteThreshold")}
									onBlur={formikProps.handleBlur("voteThreshold")}
									
								/>
								<Text style={{ color: "red" }}>
									{formikProps.touched.voteThreshold &&
										formikProps.errors.voteThreshold}	e
								</Text>

                                {/* END DATE STARTS HERE */}

								<Text style={formStyles.formText}>Ballot End Date/Time</Text>
								<TextInput
                                    editable={false}
									placeholder={date.toUTCString()} // SUNNY HOW DO YOU STYLE THE DATE
									placeholderTextColor="#FFF"
									style={formStyles.textbox}
									onChangeText={formikProps.handleChange("endTime")}
									onBlur={formikProps.handleBlur("endTime")}
								/>
                                <View>
                                    <Button onPress={showDatepicker} text="Change Date" />
                                </View>
                                <View>
                                    <Button onPress={showTimepicker} text="Change Time" />
                                </View>
                                {show && (
                                    <DateTimePicker
                                        testID="dateTimePicker"
                                        value={date}
                                        mode={mode}
                                        is24Hour={true}
                                        display="default"
                                        onChange={onChange}
                                    />
                                )}
							</View>

                            {/* END DATE ENDS */}

							<View style={formStyles.btnComponent}>
								{formikProps.isSubmitting ? (
									<ActivityIndicator />
								) : (
									<Button
										text="Create"
										onPress={() => {
											Keyboard.dismiss();
											try{
												console.log(formikProps.values.endTime);
												console.log(Date.parse(formikProps.values.endTime)); 
												createNewBallot({
													title: formikProps.values.title, 
													description: formikProps.values.description, 
													endTime: Date.parse(formikProps.values.endTime),
													voteThreshold: formikProps.values.voteThreshold / 100,
													organizationID: props.navigation.getParam("_id"),
												 }).then((response) => {
													if (!response?.error) { 
														formikProps.handleSubmit; //submit form
                                                        alert("Successfully submitted");
                                                        props.navigation.navigate("OrganizationDetails", {_id: props.navigation.getParam("_id")});
															
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