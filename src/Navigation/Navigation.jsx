import { createStackNavigator } from '@react-navigation/stack';
import RegistrationScreen from '../Screens/RegistrationScreen';
import LoginScreen from '../Screens/LoginScreen';
import BottomNavigator from './BottomNavіgator';
import CreatePostsScreen from '../Screens/CreatePostsScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import CommentsScreen from '../Screens/CommentsScreen';
import MapScreen from '../Screens/MapScreen';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../config';
import { useState, useEffect } from 'react';



const MainStack = createStackNavigator();

const Navigation = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
		onAuthStateChanged(auth, user => {
			if (user) {
				setIsLoggedIn(true);
				
			} else {
				setIsLoggedIn(false);
							}
		});
	}, []);

    return (
      <MainStack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }}>
        {!isLoggedIn ? (
          <MainStack.Group screenOptions={{ headerShown: false }}>
            <MainStack.Screen name='Login' component={LoginScreen} />
            <MainStack.Screen name='Registratione' component={RegistrationScreen} />
          </MainStack.Group>
        ) : (
          <>
            <MainStack.Group screenOptions={{ headerShown: false }}>
              <MainStack.Screen
                name='BottomNavigator' component={BottomNavigator}
              />
            </MainStack.Group>
           
       
            <MainStack.Screen name='CreatePostsScreen' component={CreatePostsScreen} />
            <MainStack.Screen name='ProfileScreen' component={ProfileScreen} />
            <MainStack.Screen name='CommentsScreen' component={CommentsScreen} options={{
              title: "Коментарі",
              headerShown: true,
              headerTitleAlign: "center",
            }} />
            <MainStack.Screen name='MapScreen' component={MapScreen} options={{
              title: "Карта",
              headerShown: true,
              headerTitleAlign: "center",
            }} />
          </>
        )
        }
    </MainStack.Navigator>
  );
};

export default Navigation;