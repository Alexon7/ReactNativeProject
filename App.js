import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  ImageBackground,
  View,
  } from "react-native";
import React, { useState } from "react";
import LoginScreen from './src/Screens/LoginScreen';
import RegistrationScreen from './src/Screens/RegistrationScreen';

const backgroundImage = require("./src/Source/Photo_BG.png");

export default function App() {

  const [activeScreen, setActiveScreen] = useState(0);
  const changeScreenFunction = value => {setActiveScreen(value)};

  return (
   
      <View style={styles.mainContainer}>
        <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
          {activeScreen === 0 ? <LoginScreen changeScreen={changeScreenFunction} /> : <RegistrationScreen changeScreen={changeScreenFunction} />}
        </ImageBackground>
        <StatusBar style="auto" />
      </View>
    
  );
}


const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "flex-end",
    width: '100%',
  },
});
