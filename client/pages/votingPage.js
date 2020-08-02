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

export default function votingPage(props)
{
    return(
        <ScrollView>
        <View>
        <Text style={styles.textTitle3}>Sample Vote</Text>
        <Card>
            <Text  style = {styles.text2}>Voting On:</Text>
            {/*needs to be pulled from props once i figure that out*/}
            <View style = {styles.buttonContainer}>
            <Text style = {styles.text3}>Sample Vote Description: War with Fake greece</Text> 
            {/*passed from orgdetails*/}
            <Text style = {styles.text3}>Proposed by: Sample person get from org detail</Text>
            <Card>
                <Text style = {styles.text2}>Points For:</Text>
            </Card>
            <Card>
                <Text style = {styles.text2}>Points Against:</Text>
            </Card>
            <Card>
                <Text style = {styles.text2}>Votes For:</Text>
            </Card>
            <Card>
                <Text style = {styles.text2}>Votes Against:</Text>
            </Card>
            <Card>
                <Text style = {styles.text2}>Voter Turnout</Text>
            </Card>
                <Button text = "VOTE" onPress={() => props.navigation.navigate("Vote")} />
                {/*}
                <Button text = "VOTE AGAINST"/>
                <Button text = "SUBMIT"/>**/}
             </View>
         </Card>
        </View>
        </ScrollView>
    );
}
