import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";
import React from "react";
import { AntDesign, SimpleLineIcons, Feather, Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CreatePost from "../Screens/CreatePostsScreen";
import PostsScreen from "../Screens/PostsScreen";
import ProfileScreen from "../Screens/ProfileScreen";
import { useDispatch } from 'react-redux';
import { logOut } from '../Redux/userSlice';
import { auth } from '../../config';


const BottomTabs = createBottomTabNavigator(); 

const BottomNavigator = ({ navigation }) => {
  const dispatch = useDispatch();

	const handleLogOut = () => {
		auth.signOut();
		dispatch(logOut());
  };
  
    return (
        <BottomTabs.Navigator initialRouteName="Posts" 
        screenOptions={{
            tabBarShowLabel: false,
            tabBarStyle: { height: 80 }
            }}>

                {/* GRID */}
                <BottomTabs.Screen 
          options={{
                      title: 'Публікації',
                   tabBarIcon: ({focused,size, color}) =>{
                       return <SimpleLineIcons name="grid" size={20} color={focused ? '#FF6C00' : color}
                                              />
                   },
                   headerTitleAlign:"center",
                   headerRightContainerStyle: { paddingRight: 20 },
                   headerRight: () => (
                    <TouchableOpacity style={ styles.logoutButton } activeOpacity={0.5} onPress={handleLogOut} >
                       <Feather name="log-out" size={24} color="gray" />
                    </TouchableOpacity>)
                }} name='PostsScreen' component={PostsScreen}/>

                {/* ADD BUTTON */}
        <BottomTabs.Screen options={{
          title: 'Створити публікацію',
                   unmountOnBlur: true,
                   tabBarIcon: ({ focused }) => {
                   return <View style={ [
                        styles.addButton
                   ]}
                     activeOpacity={0.5} onPress={() => navigation.navigate('CreatePostsScreen')} >
                    <Text style={styles.addButtonText}>+</Text>
                    </View>
          },
                   headerLeft: () => (
                    <TouchableOpacity style={ styles.logoutButton } activeOpacity={0.5} onPress={()=>navigation.navigate(('PostsScreen'))} >
                       <Ionicons name="arrow-back-sharp" size={24} color="#212121CC" />
                    </TouchableOpacity>),
                                     headerLeftContainerStyle: { paddingLeft: 10 },
                   headerTitleAlign:"center",
                   headerTitleStyle: { paddingBottom: 5 },
                    tabBarStyle: { display: "none" },
                   headerTitleAlign: "center",
                }} name='CreatePost' component={CreatePost}/>
             
                {/* PROFILE BUTTON */}
                <BottomTabs.Screen options={{
                   tabBarIcon: ({focused,size, color}) =>{
                    return <AntDesign name="user" size={20} color={focused ? '#FF6C00' : color}
                     />
                   },
                   headerShown: false,
                }} name='ProfileScreen' component={ProfileScreen}/>
          </BottomTabs.Navigator>
    );   
}

const styles = StyleSheet.create({
    registerButton: {
      backgroundColor: '#FF6C00',
      height: 50,
      width: 343, 
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 100,
      marginTop: 44,
    },
    registerButtonText:{
       color: '#fff',
       fontWeight: '400'
    },
    loginLink:{
      marginTop: 16,
      marginBottom: 66
    },
    loginLinkText:{
      fontStyle: 'normal',
      fontWeight: '400',
      fontSize: 16,
      lineHeight: 19,
    },
    footer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      width: '100%',
      borderTopColor: '#999999',
      borderTopWidth: 1,
    },
  addButton: {
      color: '#ffffff',
      backgroundColor: '#FF6C00',
      height: 40,
      width: 70, 
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 20,
    },
    addButtonText:{
      color: '#ffffff',
      fontSize: 18,
    },
    gridButton:{
      marginRight: 40,
    },
    userButton:{
      marginLeft: 40,
    },
  });

export default BottomNavigator;