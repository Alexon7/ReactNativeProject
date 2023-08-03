import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  ImageBackground,
  View,
  } from "react-native";
import React, { useState } from "react";
import LoginScreen from './src/Screens/LoginScreen';
import RegistrationScreen from './src/Screens/RegistrationScreen';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import Home from './src/Screens/Home';

const MainStack = createStackNavigator();

const backgroundImage = require("./src/Source/Photo_BG.png");

export default function App() {

  const [activeScreen, setActiveScreen] = useState(0);
  const changeScreenFunction = value => {setActiveScreen(value)};

  return (
   
      <View style={styles.mainContainer}>
        <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
          {activeScreen === 0 ? <LoginScreen changeScreen={changeScreenFunction} /> : <RegistrationScreen changeScreen={changeScreenFunction} />}
      </ImageBackground>
      <NavigationContainer>
        <MainStack.Navigator
						screenOptions={{ headerShown: false }}
						initialRouteName="Login"
					><MainStack.Screen
							name="Registration"
							component={RegistrationScreen}
						/>
						<MainStack.Screen name="Login" component={LoginScreen} />
						<MainStack.Screen name="Home" component={Home} />
					</MainStack.Navigator>
      </NavigationContainer>
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
