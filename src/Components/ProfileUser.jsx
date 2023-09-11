import {
	StyleSheet,
	Text,
	View,
	Image,
    Pressable,
    ActivityIndicator
	} from 'react-native';
import { AntDesign, Feather } from '@expo/vector-icons';
import { useRef, useState } from 'react';
import { Camera } from 'expo-camera';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../Redux/selectors';
import { addUserAvatar, logOut } from '../Redux/userSlice';
// import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import {
  getStorage,
  ref as storageRef,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { storage, auth } from '../../config';
import { updateProfile } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../config';
import * as MediaLibrary from 'expo-media-library';

const User = () => {
	const [hasPermission, setHasPermission] = useState(null);
	const cameraRef = useRef(null);
	const [cameraOn, setCameraOn] = useState(false);
	const [type, setType] = useState(Camera.Constants.Type.back);
    const [isLoading, setIsLoading] = useState(false);
    const [takingPicture, setTakingPicture] = useState(false);
	const user = useSelector(selectUser);
	const dispatch = useDispatch();

	const handleLogOut = () => {
		auth.signOut();
		dispatch(logOut());
	};
	
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
		// const response = await fetch(uri);
			 // const blob = await response.blob();
			 const asset = await MediaLibrary.createAssetAsync(imageUri);
            const imaUri = asset?.uri;
            const blob = await uriToBlob(imaUri);
		const id = blob._data.name;
		const imageRef = storageRef(storage, `images/${auth.currentUser.uid}/avatar`);
		const uploadTask = uploadBytesResumable(imageRef, blob);
    // return await getDownloadURL(uploadTask.ref)

		uploadTask.on(
			'state_changed',
			snapshot => {
				const progress =
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
			},
			error => {
				switch (error.code) {
					case 'storage/unauthorized':
						console.log("User doesn't have permission to access the object");
						break;
					case 'storage/canceled':
						console.log('User canceled the upload');
						break;
					case 'storage/unknown':
						console.log('Unknown error occurred, inspect error.serverResponse');
						break;
				}
			},
            async () => {
                 try {
				const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                     saveUserAvatar(downloadURL);
                     } catch (error) {
          console.log('Error getting download URL:', error);
        }
			}
             );

             } catch (e) {
             console.log("Error uploading image: ", e);
             setIsLoading(false);
      throw e;
    }
             
	};

	const saveUserAvatar = async downloadURL => {
		await updateProfile(auth.currentUser, {
			photoURL: downloadURL,
		});
		if (auth.currentUser.photoURL) {
			dispatch(addUserAvatar(downloadURL));

			await updateDoc(doc(db, 'users', auth.currentUser.uid), {
				userAvatar: auth.currentUser.photoURL,
			});
		}
	};
	const takePicture = async () => {
		if (cameraRef && !takingPicture) {
			setTakingPicture(true);
			try {
				const data = await cameraRef.current.takePictureAsync();
				uploadImage(data.uri);
			} catch (error) {
				console.log(error);
			}
			setTakingPicture(false);
		}
	};
	const cameraTurnOn = async () => {
		if (!hasPermission) {
			const cameraStatus = await Camera.requestCameraPermissionsAsync();
			setHasPermission(cameraStatus.status === 'granted');
		}
		setCameraOn(true);
	};

	handleDeleteImg = () => {
		dispatch(addUserAvatar(null));
		setCameraOn(false);
	};

	return (
		<>
			<View>
				<View style={styles.imgBox}>
					{cameraOn && !user?.userAvatar && (
						<Camera type={type} ref={cameraRef} style={styles.camera} />
					)}
					{user?.userAvatar && (
						<Image
							source={{ uri: user?.userAvatar }}
							style={styles.userPhoto}
						/>
					)}
					{!user?.userAvatar ? (
						<Pressable
							onPress={!cameraOn ? cameraTurnOn : takePicture}
							style={styles.addBtnWrapper}
                            disabled={takingPicture}	>
                            {takingPicture ? (
                                <ActivityIndicator size="small" color="#FF6C00" />
                            ) : (
                                <AntDesign name="plus" size={18} color="#FF6C00" />
                            )}
						</Pressable>
					) : (
						<Pressable
							onPress={handleDeleteImg}
							style={[
								styles.addBtnWrapper,
								user?.userAvatar && styles.addBtnWrapperGray,
							]}
						>
							<AntDesign name="close" size={18} color="#E8E8E8" />
						</Pressable>
					)}
				</View>
				<View style={styles.listHeaderTop}></View>
				<View style={styles.listHeaderBottom}>
					<Pressable onPress={handleLogOut} style={styles.btnLogOut}>
						<Feather name="log-out" size={24} color="#BDBDBD" />
					</Pressable>
					<Text style={styles.userName}>{user?.name}</Text>
				</View>
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	listHeaderTop: {
		height: 187,
		with: '100%',
		backgroundColor: 'transparent',
	},
	listHeaderBottom: {
		paddingTop: 60,
		with: '100%',
		borderTopLeftRadius: 25,
		borderTopRightRadius: 25,
		backgroundColor: '#FFFFFF',
	},
	imgBox: {
		position: 'absolute',
		zIndex: 1,
		top: 127,
		width: 120,
		height: 120,
		borderRadius: 16,
		alignSelf: 'center',
		backgroundColor: '#F6F6F6',
		justifyContent: 'center',
	},
	userPhoto: {
		flex: 1,
		borderRadius: 16,
	},
	addBtnWrapper: {
		position: 'absolute',
		right: -12,
		top: 84,
		width: 25,
		height: 25,
		borderWidth: 1,
		borderColor: '#FF6C00',
		borderRadius: 50,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#FFFFFF',
	},
	addBtnWrapperGray: {
		borderColor: '#BDBDBD',
	},
	btnLogOut: {
		position: 'absolute',
		top: 22,
		right: 16,
	},
	userName: {
		marginBottom: 33,
		color: '#212121',
		textAlign: 'center',
		fontFamily: 'Roboto-Medium',
		fontSize: 30,
		letterSpacing: 0.3,
	},
	camera: {
		flex: 1,
		borderRadius: 16,
	},
	loader: {
		position: 'absolute',
		zIndex: 1,
		alignSelf: 'center',
	},
});

export default User;
