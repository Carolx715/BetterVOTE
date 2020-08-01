import React from "react";
import { StyleSheet, Text, View, Image, Modal } from "react-native";
import Button from "./button";
import { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "../styles/formStyling"

import { Formik } from "formik";
import { TouchableOpacity, TextInput } from "react-native";

export default function form() {

    return(
        <View >
            <Formik 
                initialValues={{ joinCode: "" }}
                onSubmit={(value) => {
                    console.log(value);
                }}>
                    {(formikprops) => (
                        <View>
                            <TextInput
                                style={styles.textboxModal}
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
        
    )
}

const styless = StyleSheet.create({ 

})