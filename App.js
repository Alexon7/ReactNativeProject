
import React, { useState } from "react";
import { useFonts } from 'expo-font';
import Navigation from './src/Navigation/Navigation';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './Redux/store';





export default function App() {
const [fontsLoaded] = useFonts({
		'Roboto-Regular': require('./src/fonts/Roboto-Bold.ttf'),
		'Roboto-Medium': require('./src/fonts/Roboto-Medium.ttf'),
		'Roboto-Bold': require('./src/fonts/Roboto-Bold.ttf'),
	});

	if (!fontsLoaded) {
		return null;
	}
  
  return (
    <Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
     <NavigationContainer>
      <Navigation /> 
      </NavigationContainer>
  	</PersistGate>
		</Provider>               
     );
}


