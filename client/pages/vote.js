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

export default function vote(props)
{
    const resp = props.navigation.getParam("des");
    console.log(JSON.stringify(resp)); 
    return(
        <ScrollView>
            <Text style = {styles.textTitle3}>Voting On:</Text>
            <Card>

                <Text style = {styles.text2}>{resp}</Text>
                <Button text = "VOTE FOR"/>
                <Button text = "VOTE AGAINST"/>
                <Button text = "VOTE ABSTAIN"/>
                {/*submitting should lead you back to original votingPage.js*/}
            </Card>
        </ScrollView>
    );
}
