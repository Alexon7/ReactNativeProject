import { View, Text, StyleSheet, ImageBackground, SafeAreaView,FlatList, Dimensions } from "react-native";
import React from "react";
import { useCallback, useEffect } from 'react';
import User from '../Components/ProfileUser';
import Item from '../Components/ProfileItem';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserPosts } from '../Redux/selectors';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { auth, db } from '../../config';
import { setPosts } from '../Redux/userSlice';
const backImage = require('../Source/Photo_BG.png');



function ProfileScreen({ navigation }) {
  
  const userPosts = useSelector(selectUserPosts);
  const dispatch = useDispatch();
  
  useEffect(() => {
		const userId = auth.currentUser.uid;
		const q = query(
			collection(db, 'posts', userId, 'userPosts'),
			orderBy('time', 'desc')
		);

		const unsubscribe = onSnapshot(q, querySnapshot => {
			const posts = [];
			querySnapshot.forEach(doc => {
				const data = doc.data();
				const id = doc.id;
				const post = { id, ...data };
				posts.push(post);
			});
			dispatch(setPosts(posts));
		});

		return () => unsubscribe();
  }, []);

  const renderItem = useCallback(
		({ item }) => <Item item={item} navigation={navigation} />,
		[]
	);

    return (     
   <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <ImageBackground source={backImage} style={styles.backImg}> 
        <FlatList 
          data={userPosts} 
          keyExtractor={(item) => item.id?.toString() || item.key} 
          renderItem={renderItem}
          showsVerticalScrollIndicator={false} 
            contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }} 
            ListHeaderComponent={<User />}
					ListEmptyComponent={
						<View style={styles.listEmptyComponent}>
							<Text style={styles.emptyText}>У вас ще немає публікацій</Text>
						</View>
					}
        />
      </ImageBackground>
    </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    
  backImg: {
    flex: 1,
    resizeMode: 'cover',   
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  listEmptyComponent: {
		backgroundColor: '#FFFFFF',
		width: '100%',
		height: Dimensions.get('window').height - 327,
		alignItems: 'center',
		justifyContent: 'center',
	},
	emptyText: {
		fontFamily: 'Roboto-Medium',
		fontSize: 20,
	},
 });

export default ProfileScreen;