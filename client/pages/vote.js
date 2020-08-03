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
    const url = "http://159.203.16.113:3000/ballots/vote";
    console.log("on Vote page");
    async function vote(info) {
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
                props.navigation.navigate("OrganizationDetails"); 
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

    return(
        <ScrollView>
            <Text style = {styles.textTitle3}>Voting On:</Text>
            <Card>
                <Text style = {styles.text2}>{resp}</Text>
                <Button 
                    text = "VOTE FOR"
                    onPress = {() => 
                        vote({ballotID: "5f2729afde3e578ec4ab40c1", vote: "support"})
                    }
                />
                <Button 
                    text = "VOTE AGAINST"
                    onPress = {() => 
                        vote({ballotID: "5f2729afde3e578ec4ab40c1", vote: "against"})
                    }

                />
                <Button 
                    text = "VOTE ABSTAIN"
                    onPress = {() => 
                        vote({ballotID: "5f2729afde3e578ec4ab40c1", vote: "abstain"})
                    }
                />
                {/*submitting should lead you back to original votingPage.js*/}
            </Card>
        </ScrollView>
    );
}
