import { View, Text, StyleSheet, SafeAreaView, FlatList } from "react-native";
import React from "react";
import { useCallback, useEffect, useState } from 'react';
import {
	collectionGroup,
	query,
	orderBy,
	onSnapshot,
} from 'firebase/firestore';
import { db } from '../../config';
import Item from '../Components/PostItem';
import User from '../Components/PostUser';


const PostsScreen = ({ navigation }) => {
  const [userPosts, setUserPosts] = useState([]);
  
  useEffect(() => {
		const q = query(collectionGroup(db, 'userPosts'), orderBy('time', 'desc'));
	
		const unsubscribe = onSnapshot(q, querySnapshot => {
			const posts = [];
			querySnapshot.forEach(doc => {
				const data = doc.data();
				const id = doc.id;
				const post = { id, ...data };
				posts.push(post);
			});
			setUserPosts(posts);
		});
	
		return () => unsubscribe();
	}, []);

  
  const renderItem = useCallback(
		({ item }) => <Item item={item} navigation={navigation} />,
		[]
	);
  
  return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <FlatList
        data={userPosts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<User />}
      />
    </SafeAreaView>
  );
}
    
  export default PostsScreen;