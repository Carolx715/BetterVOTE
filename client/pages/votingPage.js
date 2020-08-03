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
    const [data, setData] = useState();
	id = "5f2729afde3e578ec4ab40c1"; 

	useEffect(() => {
		const fetchData = async () => {
			const url = `http://159.203.16.113:3000/ballots/getBallot?id=${id}`;
			let jwt = await AsyncStorage.getItem("Token").catch((err) => {
				console.log(err);
			});
			try {
				let response = await fetch(url, {
					method: "GET",
					headers: {
						Authorization: `Bearer ${jwt}`,
					},
				});
                let data = await response.json();
                console.log(JSON.stringify(data)); 
				setData(data);
			} catch (error) {
				console.log(error);
			}
		};
		fetchData();
	}, []);
	// empty array makes it so that the page doesn't rerender upon update instead renders upon component mounting

	if (!data) {
		return null;
	}
    return(
        <ScrollView>
        <View>
        <Text style={styles.textTitle3}>Sample Vote: Not Yet Voted</Text>
        <Card>
            <Text style = {styles.text2}>Voting On: {data.title}</Text>
            <View style = {styles.buttonContainer}>
            <Text style = {styles.text3}>{}</Text> 
            {/*passed from orgdetails*/}
            <Text style = {styles.text3}>{data.description}</Text>
            <Card>
                <Text style = {styles.text2}>Points For:</Text>
            </Card>
            <Card>
                <Text style = {styles.text2}>Points Against:</Text>
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
