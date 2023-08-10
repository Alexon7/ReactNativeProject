
import { View, Text, StyleSheet, ActivityIndicator,Pressable, TextInput, ImageBackground, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Image} from "react-native";
import { useEffect, useState, useRef } from 'react';
import { Camera } from 'expo-camera';
import * as Location from "expo-location";
import { useIsFocused } from '@react-navigation/native';
import { Button } from '../Components/Button';
import { MaterialIcons,Feather } from '@expo/vector-icons';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

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
 	const cameraRef = useRef(null);
  const isFocused = useIsFocused();
 
  

useEffect(() => {
		(async () => {
			const cameraStatus = await Camera.requestCameraPermissionsAsync();
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
		if (cameraRef) {
			setIsLoading(true);
			try {
				const data = await cameraRef.current.takePictureAsync();
				setUri(data.uri);
			} catch (error) {
				console.log(error);
			}
			setIsLoading(false);
		}
	};

  const editPicture = () => setUri(null);

  
    const createPost = async () => {
		if (hasLocationPermission) {
			let loc = await Location.getCurrentPositionAsync({});
			const coords = {
				latitude: loc.coords.latitude,
				longitude: loc.coords.longitude,
			};
			return {
				uri,
				name,
				location: { title: location, coords },
				comments: [],
				likes: 0,
			};
		} else {
			return {
				uri,
				name,
				location: { title: location, coords: 'No information' },
				comments: [],
				likes: 0,
			};
		}
	};

const handlePublish = async () => {
  const post = await createPost();
   				navigation.navigate('PostsScreen');
		setUri(null);
		setName('');
		setLocation('');
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
      >
        <View style={styles.postContainer}>
          {isLoading ? (
            <ActivityIndicator style={styles.loader} size="large" />
          ) : (
            <Pressable
              style={[styles.cameraBtn, uri && styles.opacity]}
              onPress={!uri ? takePicture : editPicture}
            >
              <MaterialIcons
                name="camera-alt"
                size={24}
                color={!uri ? '#BDBDBD' : '#FFFFFF'}
              />
            </Pressable>
          )}
          
          {uri ? (
            <Image source={{ uri: uri }} style={styles.camera} />
          ) : (
            <Camera type={type} ref={cameraRef} style={styles.camera} />
            )}
            </View>
  
          <Text style={styles.postImgText}>{!uri ? 'Завантажте фото' : 'Редагувати фото'}</Text>
         
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
            <View style={styles.trashButtonContainer}>
                                 {!isLoading && (
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
            )
            }
          </View>
          
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
    
  //   postForm:{
  //       flex: 3,
  // },
    
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
    
  trashButtonContainer: {
    flexGrow: 1,
    //  justifyContent: 'flex-end'
   
    },
     
  trashButton: {
               		alignSelf: 'center',
		justifyContent: 'center',
    alignItems: 'center',
    width: 70,
		height: 40,
    borderRadius: 50,
    // marginTop: 120,
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