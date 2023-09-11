import { View, Text, StyleSheet,ActivityIndicator,Pressable, TextInput,  KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Image} from "react-native";
import { useEffect, useState, useRef } from 'react';
import { Camera } from 'expo-camera';
import * as Location from "expo-location";
import { useIsFocused } from '@react-navigation/native';
import { Button } from '../Components/Button';
import { MaterialIcons,Feather } from '@expo/vector-icons';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
      ref as storageRef,
  uploadBytes,
   getDownloadURL,
} from "firebase/storage";
import { collection, addDoc } from 'firebase/firestore';
import { storage, auth, db } from '../../config';
import * as MediaLibrary from 'expo-media-library';




const trashImg = require('../Source/trash.png');

const BottomTabs = createBottomTabNavigator();

const CreatePost = ({ navigation }) => {
  const [location, setLocation] = useState('');
  const [uri, setUri] = useState(null);
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [hasLocationPermission, setHasLocationPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [takingPicture, setTakingPicture] = useState(false);
  const cameraRef = useRef(null);
  const isFocused = useIsFocused();
 
  const requestMediaLibraryPermission = async () => {
  const { status } = await MediaLibrary.getPermissionsAsync();
  if (status === 'granted') {
    return true;
  } else {
    const { status: newStatus } = await MediaLibrary.requestPermissionsAsync();
    return newStatus === 'granted';
  }
};

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();
      setHasPermission(cameraStatus.status === 'granted');
      let locationStatus = await Location.requestForegroundPermissionsAsync();
      setHasLocationPermission(locationStatus.status === 'granted');
    })();
  }, []);

  useEffect(() => {
    if (!isFocused) {
      reset();
    }
  });

  const takePicture = async () => {
    if (cameraRef && !takingPicture) {
      setTakingPicture(true);
      try {
        const data = await cameraRef.current.takePictureAsync();
        console.log('Image data:', data);

        const hasMediaLibraryPermission = await requestMediaLibraryPermission();

        if (!hasMediaLibraryPermission) {
          console.log('Не надано доступ до бібліотеки');
          return;
        }
        
        const asset = await MediaLibrary.createAssetAsync(data.uri);
          
      setUri(asset.uri);
      } catch (error) {
        console.log('Error taking picture:', error);
      }
      setTakingPicture(false);
    }
  };

  const editPicture = () => setUri(null);

  function uriToBlob(uri) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        // If successful -> return with blob
        xhr.onload = function () {
            resolve(xhr.response);
        };
        // reject on error
        xhr.onerror = function () {
            reject(new Error("uriToBlob failed"));
        };
        // Set the response type to ‘blob’ - this means the server’s response
        // will be accessed as a binary object
        xhr.responseType = "blob";
        // Initialize the request. The third argument set to ‘true’ denotes
        // that the request is asynchronous
        xhr.open("GET", uri, true);
        // Send the request. The ‘null’ argument means that no body content is given for the request
        xhr.send(null);
    });
}
    
  const uploadImage = async (imageUri) => {
        if (!imageUri) {
            return;
        }
        try {
            const asset = await MediaLibrary.createAssetAsync(imageUri);
            const imaUri = asset?.uri;
            const blob = await uriToBlob(imaUri);
            const imageRef = storageRef(
                storage,
                new Date().toISOString() + asset.filename
            ); // getting image ref
             // ‘file’ comes from the Blob or File API
            const response = await uploadBytes(imageRef, blob); //uploadBytes() crashed app
            console.log({ response });
          // return await getDownloadURL(response.ref); // getting link
          const downloadURL = await getDownloadURL(response.ref);
          savePost(downloadURL);
        } catch (error) {
            console.log('Ошибка при загрузке изображения:',error);
                   }
    };
  
  
  const savePost = async downloadURL => {
    try {
      const coords = await getLocationCoords();
      const userPost = {
        createdBy: auth.currentUser.uid,
        name,
        location: { title: location, coords: coords },
        comments: [],
        likes: 0,
        imageUri: downloadURL,
        time: Date.now(),
      };

      try {
        await addDoc(
          collection(db, 'posts', auth.currentUser.uid, 'userPosts'),
          userPost
        );
        setIsLoading(false);
        navigation.navigate('PostsScreen');
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        throw error;
      }
    } catch (error) {
      console.log('Error saving post:', error);
    setIsLoading(false);
    throw error;
    }
  };
  
  const getLocationCoords = async () => {
    try {
      if (hasLocationPermission) {
        let loc = await Location.getCurrentPositionAsync({});
        const coords = {
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
        };
        return coords;
      } else {
        return 'No information';
      }
    } catch (error) {
      console.log('Error getting location coordinates:', error);
    return 'No information';
    }
	};
  

  const handlePublish = async () => {
   console.log('Publishing image...');
    await uploadImage(uri);
     console.log('Image published successfully');
  navigation.navigate('PostsScreen');
	};
  
  const reset = () => {
		setUri(null);
		setName('');
		setLocation('');
  };
  
  if (hasPermission === false) {
		return (
			<View style={styles.errorContainer}>
				<Text style={styles.errorMessage}>No access to camera</Text>
			</View>
		);
	}
    
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false} >
      <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={-100}
          style={{
            flex: 1,
            // justifyContent: "center"
          }}
      >
        <View style={styles.postContainer}>
          <Pressable
              style={[styles.cameraBtn, uri && styles.opacity]}
              onPress={!uri ? takePicture : editPicture}
               disabled={takingPicture}
            >
              {takingPicture ? (
    <ActivityIndicator size="small" color="#FF6C00" />
  ) : (
    <MaterialIcons
      name="camera-alt"
      size={24}
      color={!uri ? "#BDBDBD" : "#FFFFFF"}
    />
  )}
            </Pressable>
            {uri ? (
            <Image source={{ uri: uri }} style={styles.camera} />
          ) : (
            <Camera type={type} ref={cameraRef} style={styles.camera} />
            )}
            </View>
  
          <Text style={styles.postImgText}>{!uri ? 'Завантажте фото' : 'Редагувати фото'}</Text>
        <View style={{flexGrow: 1}}> 
          <TextInput style={[styles.postName, !name && styles.textPlaceholder]}
            placeholder="Назва..."
            onChangeText={setName}
            placeholderTextColor="#BDBDBD"
            value={name} />
            <View style={styles.inputField}>
              <Feather name="map-pin" size={24} style={styles.locationIcon} />
              <TextInput style={[styles.postName, !location && styles.textPlaceholder,
              styles.inputTextWithIconLeft,]}
              placeholder="Місцевість..."
              placeholderTextColor="#BDBDBD"
              value={location}
              onChangeText={setLocation} />
            </View>
          
            <Button
              text="Опубліковати"
              onPressFunction={handlePublish}
              disabled={!uri || (isLoading && true)}
          />
             </View>  
              <Pressable
                style={[
                  styles.trashButton,
                  !uri && !name && !location && styles.trashButtonDisable,
                ]}
                onPress={reset}
                disabled={!uri && !name && !location && true}
              >
                <Feather
                  name="trash-2"
                  size={24}
                  style={[
                    styles.iconTrashActive,
                    !uri && !name && !location && styles.iconTrashDisable,
                  ]}
                />
              </Pressable>
       </KeyboardAvoidingView>
        </View>
    </TouchableWithoutFeedback>
      
  );

};



const styles = StyleSheet.create({
   
  container: {
    flex: 1,
        paddingHorizontal: 16,
		paddingTop: 32,
		paddingBottom: 22,
    backgroundColor: '#FFFFFF',
      },

  
  postContainer:  {
   marginBottom: 8,
		height: 240,
		borderRadius: 8,
		overflow: 'hidden',
		backgroundColor: '#E8E8E8',
    justifyContent: 'center',

  },

  camera: {
		flex: 1,
	},
	cameraBtn: {
		position: 'absolute',
		zIndex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		width: 60,
		height: 60,
		backgroundColor: '#FFFFFF',
		borderRadius: 50,
		alignSelf: 'center',
  },
  opacity: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  
         postImgText: {
     marginBottom: 32,
		color: '#BDBDBD',
		fontFamily: 'Roboto-Regular',
		fontSize: 16,
  },
    
      
    inputField: {
		justifyContent: 'center',
		marginBottom: 32,
	},
    
    locationIcon: {
   color: '#BDBDBD',
		position: 'absolute',
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
    
  postButtonActive: {
       width: "100%",
    height: 50,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 32,
  },
  errorContainer: {
		flex: 1,
		backgroundColor: '#FFFFFF',
		justifyContent: 'center',
		alignItems: 'center',
	},
	errorMessage: {
		color: '#212121',
		textAlign: 'center',
		fontFamily: 'Roboto-Medium',
		fontSize: 17,
		letterSpacing: 0.3,
	},
    
    postButtonText:{
    fontFamily: "Roboto-Regular",
    color: "#BDBDBD",
    fontSize: 16,
    },
    postName:{  
     color: '#212121',
		fontFamily: 'Roboto-Medium',
		fontSize: 16,
		paddingTop: 16,
		paddingBottom: 15,
		borderBottomColor: '#E8E8E8',
		borderBottomWidth: 1,
  },
    
 
     
  trashButton: {
      
   	alignSelf: 'center',
		justifyContent: 'center',
    alignItems: 'center',
    width: 70,
		height: 40,
    borderRadius: 50,   
    backgroundColor: '#FF6C00', 
               
  },
    inputTextWithIconLeft: {
		paddingLeft: 28,
	},
	textPlaceholder: {
		fontFamily: 'Roboto-Regular',
	},
   trashButtonDisable: {
		backgroundColor: '#F6F6F6',
  },
   iconTrashActive: {
		color: '#FFFFFF',
	},
	iconTrashDisable: {
		color: '#BDBDBD',
	},
    loader: {
    position: 'absolute',
		zIndex: 1,
		alignSelf: 'center',
  },
   
});  

export default CreatePost;