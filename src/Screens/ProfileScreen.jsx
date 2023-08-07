import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, SafeAreaView,FlatList, ScrollView } from "react-native";
import React from "react";
import { Feather } from '@expo/vector-icons';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const backImage = require('../Source/Photo_BG.png');
const buttonImg = require('../Source/add.png');
const profilePhoto = require('../Source/Ava.png');

const postImg = require('../Source/View.png');
import data from '../Source/posts'
import Post from "../Components/Post";

const BottomTabsProf = createBottomTabNavigator(); 

function ProfileScreen({navigation}) {
    return (
       
    //  <SafeAreaView>
    //   <ScrollView showsVerticalScrollIndicator={false} >
    //    <ImageBackground source={backImage} style={styles.backImg}> 
    //     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    //         <View style={ styles.container }>
    //            <View style={ styles.pfotoContainer }>
    //              <ImageBackground source={profilePhoto} style={{width: '100%', height: '100%'}}></ImageBackground>
    //              <TouchableOpacity style={ styles.addbutton } activeOpacity={0.5}>
    //                <ImageBackground source={buttonImg} style={{width: '100%', height: '100%'}}></ImageBackground>
    //              </TouchableOpacity>
    //            </View>
    //              <TouchableOpacity style={ styles.logoutButton } activeOpacity={0.5}  onPress={()=>navigation.navigate('Home', { screen: 'PostsScreen' })}>
    //                <Feather name="log-out" size={24} color="gray" />
    //              </TouchableOpacity>
    //            <Text style={ styles.title }>Natali Romanova</Text>      
    //         { data.map (el => 
    //         <Post key={ el.id } img = { postImg } text={ el.name } msgs = { 0 } location={ el.location }/>      
    //         )}
    //         </View>  
    //     </View>
    //    </ImageBackground>
    //   </ScrollView>
    // </SafeAreaView>
    
   <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <ImageBackground source={backImage} style={styles.backImg}> 
        <FlatList
          data={[{ key: "header" }, ...data]} // Добавляем заголовок в начало списка
          keyExtractor={(item) => item.id?.toString() || item.key} 
          renderItem={({ item }) => {
            if (item.key === "header") {
              return (
                <View style={styles.container}>
                  <View style={styles.pfotoContainer}>
                    <ImageBackground source={profilePhoto} style={{ width: '100%', height: '100%' }}></ImageBackground>
                    <TouchableOpacity style={styles.addbutton} activeOpacity={0.5}>
                      <ImageBackground source={buttonImg} style={{ width: '100%', height: '100%' }}></ImageBackground>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity style={styles.logoutButton} activeOpacity={0.5} onPress={() => navigation.navigate('Login', { screen: 'LoginScreen' })}>
                    <Feather name="log-out" size={24} color="gray" />
                  </TouchableOpacity>
                  <Text style={styles.title}>Natali Romanova</Text>
                </View>
              );
            } else {
              return (
                <Post key={item.id} img={postImg} text={item.name} msgs={0} location={item.location} />
              );
            }
          }}
          showsVerticalScrollIndicator={false} 
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }} // Добавляем стиль для контента FlatList
        />
      </ImageBackground>
    </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    scrollContainer:{
        justifyContent: "flex-start",
        alignItems: "center", 
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderTopRightRadius: 25,
        borderTopLeftRadius:25,
    },
    logoutButton:{
        marginLeft: 350,
        marginTop: -40,
    },
      container: {
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        width: '100%',
        borderTopRightRadius: 25,
        borderTopLeftRadius:25,
        marginTop: 200
      },
      containerKeyB: {
        justifyContent: "flex-end",
      },
      pfotoContainer: {
        marginTop: -60,
        height: 120,
        width: 120,
        backgroundColor: '#F6F6F6',
        borderRadius: 16,
        overflow: "visible"
      },
  
      addbutton: {
        marginTop: -40,
        left: '90%',
        height: 25,
        width: 25,
        pointerEvents: "auto",
      },
      addButton:{
        backgroundColor: '#FF6C00',
        height: 40,
        width: 70, 
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
      },
      title: {
        fontWeight: '500',
        fontSize: 30,
        marginTop: 32,
        lineHeight: 35,
      },
      inputLogin: {
        backgroundColor: '#F6F6F6',
        width: 343,
        height: 50,
        borderRadius: 8,
        marginTop: 33,
        padding: 16,
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: 16,
        lineHeight: 19,
      },
      inputMailPassw: {
        backgroundColor: '#F6F6F6',
        width: 343,
        height: 50,
        borderRadius: 8,
        padding: 16,
        marginTop: 16,
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: 16,
        position: 'relative',
      },
      passwShowText: {
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: 16,
        lineHeight: 19,
      },
      passwShow: {
        top: -34,
        left: 130,
      },
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
      
  backImg: {
    flex: 1,
    resizeMode: 'cover',   
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  }
});

export default ProfileScreen;