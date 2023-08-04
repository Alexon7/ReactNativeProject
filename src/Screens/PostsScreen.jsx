import { View, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import React from "react";
import Post from "../Components/Post";
import ProfileElement from "../Components/Post";
const postImg = require("../Source/View.png");
const avatar = require("../Source/Ava.png");
import data from '../Source/posts'

function PostsScreen({navigation}) {
  
    return (
      <SafeAreaView style={{ justifyContent: "flex-start", alignItems: "center", overflow: "visible" }}>
        <ScrollView>
          <ProfileElement avatar= { avatar } name="Natali Romanova" email="email@example.com" />
          { data.map (el => 
            <Post key={ el.id } img = { postImg } text={ el.name } msgs = { 0 } location={ el.location }/>      
          )}
        </ScrollView>
      </SafeAreaView>
    );
  };

  export default PostsScreen;