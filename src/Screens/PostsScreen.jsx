import { View, Text, StyleSheet, SafeAreaView, FlatList } from "react-native";
import React from "react";
import Post from "../Components/Post";
import ProfileElement from "../Components/ProfileElement";
const postImg = require("../Source/View.png");
const avatar = require("../Source/Ava.png");
import data from '../Source/posts'

const PostsScreen = ({ navigation }) => {
  
  const renderItem = ({ item }) => (
    <Post
      key={item.id}
      img={postImg}
      text={item.name}
      msgs={0}
      location={item.location}
       navigation={navigation}
    />
  );
  
  return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <ProfileElement
            avatar={avatar}
            name="Natali Romanova"
            email="email@example.com"
          />
        }
      />
    </SafeAreaView>
  );
}
    
  export default PostsScreen;