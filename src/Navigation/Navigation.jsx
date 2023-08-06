import { createStackNavigator } from '@react-navigation/stack';
import RegistrationScreen from '../Screens/RegistrationScreen';
import LoginScreen from '../Screens/LoginScreen';
import Home from './BottomNavіgator';
import CreatePostsScreen from '../Screens/CreatePostsScreen';
import ProfileScreen from '../Screens/ProfileScreen';

const MainStack = createStackNavigator();

const Navigation = () =>{
    return (
    <MainStack.Navigator initialRouteName='Login' screenOptions={{headerShown: false}}>
       <MainStack.Screen name='Login' component={LoginScreen}/>
       <MainStack.Screen name='Registratione' component={RegistrationScreen}/>
       <MainStack.Screen name='Home' component={Home} options={{title: 'Публікації'}}/> 
       <MainStack.Screen name='CreatePostsScreen' component={CreatePostsScreen}  options={{title: 'Створити публікацію'}}/> 
       <MainStack.Screen name='ProfileScreen' component={ProfileScreen}/> 
    </MainStack.Navigator>
  );
};

export default Navigation;