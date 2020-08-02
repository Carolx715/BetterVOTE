import React, { useState, useEffect } from "react";
import {
	Text,
	View,
	FlatList,
	TouchableOpacity,
	ScrollView,
	StyleSheet,
} from "react-native";
import Card from "../components/card";
import styles from "../styles/welcomepage";
import AsyncStorage from "@react-native-community/async-storage";
import Button from "../components/button";

export default function votingPage()
{
    return(
        <ScrollView>
        <View style={styles.flatlistContainer}>
        <Text style={styles.textTitle3}>Sample Vote</Text>
        <Card>
            <Text  style = {styles.text2}>Voting On:</Text>
            {/*needs to be pulled from props once i figure that out*/}
            <View style = {styles.buttonContainer}>
            <Text>Sample Vote Description</Text> 
                <Button text = "VOTE FOR"/>
                <Button text = "VOTE AGAINST"/>
                <Button text = "SUBMIT"/>
             </View>
         </Card>
        </View>
        </ScrollView>
    );
}
