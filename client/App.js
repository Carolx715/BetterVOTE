import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import styles from "./styles/homepage";

export default function App() {
  return (
    <View style={styles.container}>
      <Image source={require('./assets/background.jpg')} style={styles.backgroundImage} />
      <View style={styles.textContainer}>
        <Text style={styles.text}>WELCOME TO</Text>
        <Text style={styles.textTitle}>BetterVOTE</Text>
        <Text style={styles.text}>Organizing communities, one vote at a time.</Text>


        {/* Buttons */}
        <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.text}>Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.text}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
