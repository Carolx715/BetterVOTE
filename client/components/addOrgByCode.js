import styles from "../styles/organizations";
import { Text, TouchableOpacity, View } from "react-native";
import React from "react";

export default function popup({ props, modalOpen }) {
	return modalOpen ? (
		<View style={styles.centeredView}>
			<View style={styles.modal}>
                <Text style={styles.text}>Join Organization By Code</Text>

                <Formik 
                initialValues={{ joinCode: "" }}
                onSubmit={(value) => {
                    console.log(value);
                }}>
                    {(formikprops) => (
                        <View>
                            <TextInput
                                style={styless.input}
                                placeholder="Enter code here"
                                onChangeText={formikprops.handleChange('joinCode')}
                                value={formikprops.values.joinCode}>
                                
                            </TextInput>
                            <Button text="Send Join Request" onPress={formikprops.handleSubmit}>
                            </Button>
                        </View>
                    )}
                </Formik>

			</View>
		</View>
	) : null;
}