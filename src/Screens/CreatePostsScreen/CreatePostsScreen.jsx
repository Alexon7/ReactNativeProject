
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ImageBackground } from "react-native";
import React from "react";
import { EvilIcons, Ionicons, FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const trashImg = require('./trash.png');

const BottomTabs = createBottomTabNavigator();

const  CreatePost =({navigation})=> { return (
<View style={ styles.postContainer }>
   <View style={ styles.postImg }>
      <TouchableOpacity style={ styles.postImgAdd } activeOpacity={0.5}>
         <FontAwesome name="camera" size={24} color="#BDBDBD" />
      </TouchableOpacity>
   </View>
   <Text style={ styles.postImgText }>Завантажте фото</Text>
   <View style={ styles.postForm }>
      <TextInput style={styles.postName} placeholder="Назва..."  />
      <View>
        <Ionicons
                name="ios-location-outline"
                size={24}
                color="#BDBDBD"
                style={
                 styles.locationIcon
                                 }
              />
      <TextInput style={ styles.postName } placeholder="Місцевість..." />
      </View>
      <TouchableOpacity style={styles.postButton} activeOpacity={0.5}>
                  <Text style={ styles.postButtonText }>Опубліковати</Text>
      </TouchableOpacity>
   </View>
</View>
)};


const CreatePostsScreen = ({navigation}) => {
    return (
        <BottomTabs.Navigator screenOptions={{
            tabBarShowLabel: false,
            tabBarStyle: { height: 80, borderBottomColor: '#E8E8E8', borderBottomWidth: 2, }}}>
            <BottomTabs.Screen 
                   options={{
                   tabBarIcon: () =>{
                   return <TouchableOpacity style={ styles.trashButton } activeOpacity={0.5} >
                      <EvilIcons name="trash" size={24} color="#BDBDBD" />
                    </TouchableOpacity>
                   },
                   headerLeft: () => (
                    <TouchableOpacity style={ styles.logoutButton } activeOpacity={0.5}
                     onPress={()=>navigation.navigate('Home', { screen: 'PostsScreen' })} >
                       <Ionicons name="arrow-back-sharp" size={24} color="#212121CC" />
                    </TouchableOpacity>),
                    headerLeftContainerStyle: { paddingLeft: 10 },
                   headerTitleAlign:"center",
                   headerTitleStyle: { paddingBottom: 5 }
                }} name='Створити публікацію' component={CreatePost}/>
        </BottomTabs.Navigator>
    );
  };

const styles = StyleSheet.create({
    trashButton:{
        backgroundColor: '#F6F6F6',
        height: 40,
        width: 70, 
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
    },
    postContainer: { flex: 1, 
        // justifyContent: "center",
        // alignItems: "center", 
        // backgroundColor: "#fff",
         flex: 1,
    paddingHorizontal: 16,
    paddingTop: 28,
    backgroundColor: "#fff",
    },
    postImg: {
        // flex: 2,
        // width: '80%',
        // height: '40%',
        // color: '#F6F6F6',
        // justifyContent: "center",
        // alignItems: "center",
      width: "100%",
    height: 200,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    },
    postImgAdd:{
        // width: 40,
        // height: 40,
        // borderRadius: 100,
        // color: '#FFFFFF',
       width: 60,
    height: 60,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
    
    postImgText: {
      marginTop: 8,
    fontSize: 16,
    fontFamily: "Roboto",
    color: "#BDBDBD",
    lineHeight: 19,
  },
    
    postForm:{
        flex: 3,
  },
    
    locationIcon: {
    position: "absolute",
    bottom: 7,
  },
    
    postButton:{
       width: "100%",
    height: 50,
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 32,
  },
    
    postButtonText:{
    fontFamily: "Roboto-Regular",
    color: "#BDBDBD",
    fontSize: 16,
    },
    postName:{  
      //  width: 343,
      //  height: 50,
      //  borderRadius: 8,
      //  marginTop: 33,
      //  padding: 16,
      fontSize: 16,
    fontFamily: "Roboto",
    color: "#BDBDBD",
    lineHeight: 19,     
            borderBottomColor: '#E8E8E8',
       borderBottomWidth: 2,
       width: "100%",
    height: 35,
    borderBottomWidth: 1,
      borderBottomColor: "#E8E8E8",
     marginTop: 30,
      paddingLeft: 25,
  },
    
    trashButton: {
    width: 70,
    height: 40,
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
      textAlign: "center",
    
       },
   
});  

export default CreatePostsScreen;