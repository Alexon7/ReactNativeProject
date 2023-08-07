
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ImageBackground, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard} from "react-native";
import React from "react";
import { EvilIcons, Ionicons, FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const trashImg = require('../Source/trash.png');

const BottomTabs = createBottomTabNavigator();

const CreatePost = ({ navigation }) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
         <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
         keyboardVerticalOffset={-100}
      >        
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
    <View style={ styles.trashButton } activeOpacity={0.5} >
       <EvilIcons name="trash" size={24} color="#BDBDBD" />
                    </View>
        </View>
        </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      
)};



const styles = StyleSheet.create({
    trashButton:{
        backgroundColor: '#F6F6F6',
        height: 40,
        width: 70, 
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
  },
  
  container: {
    flex: 1,
  },

    postContainer: { flex: 1, 
                    paddingHorizontal: 16,
    paddingTop: 28,
    backgroundColor: "#fff",
    },
    postImg: {
             width: "100%",
    height: 240,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    },
    postImgAdd:{
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
          marginBottom: 22,
      marginLeft: 'auto',
       marginRight: 'auto',
    
       },
   
});  

export default CreatePost;