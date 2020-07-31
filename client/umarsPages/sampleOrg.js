import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Card} from 'galio-framework'; 

export default function sampleOrg() {
  return (
    <View style={styles.container}>
      <Text>This is the page for a sample organization. </Text>
      <Card>
          flex
          borderless
          style = {style.card}
          title = "temp organization"
          caption = "This is the temp organization"
          location = "Toronto"
      </Card>
      <StatusBar style="auto" />
    </View>
  );
}