import React, { useState, useEffect } from "react";
import moment from "moment";
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

    {/* Will be fixed on monday to get unique id for each ballot from orgdetails
    id = props.navigation.getParam("_id"); */}
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

    const supports = data.arguments["support"].map((s) => (
		<Text key = {s}>{`\u2022 ${s}`}</Text>
        
    ));

    const against = data.arguments["against"].map((a) => (
		<Text key = {a}>{`\u2022 ${a}`}</Text>
    ));
    
    return(
        <ScrollView>
        <View>
        {!data.hasVoted ? 
               <Text style = {styles.textTitle3}>Not Yet Voted</Text> 
               : null
        }
            <Text style = {styles.text2}>Voting Subject: {data.title}</Text>
            <View style = {styles.buttonContainer}>
            <Text style = {styles.text3}>{}</Text> 
            
            <Text style = {styles.text3}>Description: {data.description}</Text>
            <Card>
                <Text style = {styles.text2}>Proposed By:</Text> 
                <Text>{data.creator["username"]}</Text>
            </Card>
            <Card>
                <Text style = {styles.text2}>Points For:</Text>
                    {supports}
            </Card>
            <Card>
                <Text style = {styles.text2}>Points Against:</Text>
                    {against}
            </Card>
            {!data.hasVoted ?
            <Card>
                <Text style = {styles.text2}>Threshold to Pass</Text>
                <Text>{`${data.voteThreshold*100}%`}</Text>
            </Card> : null
            }
            <Card>
                 <Text style = {styles.text2}>Voter Turnout</Text>
                 <Text>{`${(data.totalVotes/data.maxVotes*100).toFixed(2)}%`}</Text>
                 </Card>
            {data.status === "active" ? 
            <Card>
                <Text style = {styles.text2}>End Date</Text>
                <Text>{moment(data.endTime).format('MMMM Do YYYY [at] h:mm:ss a')} ({moment(data.endTime).fromNow()})</Text>
            </Card> : null
            }
            {!data.hasVoted ?
                <Button text = "VOTE" onPress={() => props.navigation.navigate("Vote", {des: data.title})} />
                : null
            }
             </View>
        </View>
        </ScrollView>
    );
}
