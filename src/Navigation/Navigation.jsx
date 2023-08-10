import { createStackNavigator } from '@react-navigation/stack';
import RegistrationScreen from '../Screens/RegistrationScreen';
import LoginScreen from '../Screens/LoginScreen';
import Home from './BottomNavіgator';
import CreatePostsScreen from '../Screens/CreatePostsScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import CommentsScreen from '../Screens/CommentsScreen';
import MapScreen from '../Screens/MapScreen';


const MainStack = createStackNavigator();

const Navigation = () =>{
    return (
    <MainStack.Navigator initialRouteName='Login' screenOptions={{headerShown: false}}>
       <MainStack.Screen name='Login' component={LoginScreen}/>
       <MainStack.Screen name='Registratione' component={RegistrationScreen}/>
       <MainStack.Screen name='Home' component={Home}/> 
       <MainStack.Screen name='CreatePostsScreen' component={CreatePostsScreen}/> 
        <MainStack.Screen name='ProfileScreen' component={ProfileScreen} /> 
        <MainStack.Screen name='CommentsScreen' component={CommentsScreen} screenOptions={{ headerShown: true }} /> 
         <MainStack.Screen name='MapScreen' component={MapScreen} options={{ headerShown: true }}/> 
    </MainStack.Navigator>
  );
};

export default Navigation;