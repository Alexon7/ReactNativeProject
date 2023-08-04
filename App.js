// import { StatusBar } from 'expo-status-bar';
// import {
//   StyleSheet,
//   ImageBackground,
//   View,
//   } from "react-native";
import React, { useState } from "react";
// import LoginScreen from './src/Screens/LoginScreen';
// import RegistrationScreen from './src/Screens/RegistrationScreen';
import Navigation from './src/Navigation/Navigation';
import { NavigationContainer } from '@react-navigation/native';






export default function App() {

  // const [activeScreen, setActiveScreen] = useState(0);
  // const changeScreenFunction = value => {setActiveScreen(value)};

  return (
     <NavigationContainer>
      <Navigation /> 
      </NavigationContainer>
               
    
  );
}


// const styles = StyleSheet.create({
//   mainContainer: {
//     flex: 1,
//     alignItems: "center",
//   },
//   backgroundImage: {
//     flex: 1,
//     justifyContent: "flex-end",
//     width: '100%',
//   },
// });
