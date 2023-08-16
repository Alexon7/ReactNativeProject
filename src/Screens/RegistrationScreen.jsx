import {
  StyleSheet,
  Text,
  Image,
  ImageBackground,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
   Keyboard,
} from "react-native";
import { useEffect, useRef, useState } from 'react';
import { AntDesign } from "@expo/vector-icons"; 
import { StatusBar } from 'expo-status-bar';
import { Camera } from 'expo-camera';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db, storage } from '../../config';
import { setDoc, doc } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { logIn } from '../../Redux/userSlice';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const backImage = require("../Source/Photo_BG.png");

const RegistrationScreen = ({ navigation }) => {
    const [login, setLogin] = useState('');
    const [email, seEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [isFocused, setIsFocused] = useState("");
  const cameraRef = useRef(null);
	const [cameraOn, setCameraOn] = useState(false);
	const [type, setType] = useState(Camera.Constants.Type.back);
  const [image, setImage] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const dispatch = useDispatch();
  
  const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  // const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const passwordPattern =/^.{6}$/;

    const handleLogin = text => {
        setLogin(text)
    };

    const handleMail = text => {
        seEmail(text)
    };

    const handlePassword = text => {
        setPassword(text)
  };

  const registerDB = async ({ email, password, login }) => {
    console.log("Login:", login);
  console.log("Email:", email);
  console.log("Password:", password);
				try {
			await createUserWithEmailAndPassword(auth, email, password);
			if (auth.currentUser.uid && image) {
				await uploadImage(image, login);
			} else if (auth.currentUser.uid) {
				await setDoc(doc(db, 'users', auth.currentUser.uid), {
					login,
					email,
				});
				await updateProfile(auth.currentUser, {
					displayName: login,
				});
				dispatch(
					logIn({
						name: auth.currentUser.displayName,
						email: auth.currentUser.email,
					})
				);
			}
					} catch (error) {
						if (error.code === 'auth/email-already-in-use') {
				return Alert.alert('Такий користувач вже зареєстрований');
			} else console.log('error:', error);
			throw error;
		}
  }; 

  const takePicture = async () => {
				if (cameraRef) {
			try {
				const data = await cameraRef.current.takePictureAsync();
				setImage(data.uri);
			} catch (error) {
				console.log(error);
			}
				}
	};

	const uploadImage = async (uri, login) => {
		const response = await fetch(uri);
		const blob = await response.blob();
		const id = blob._data.name;
		const storageRef = ref(storage, `images/${auth.currentUser.uid}/avatar`);
		const uploadTask = uploadBytesResumable(storageRef, blob);

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
				const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
				updateUserProfile(downloadURL, login);
			}
		);
	};
  
  const updateUserProfile = async (downloadURL, login) => {
		await updateProfile(auth.currentUser, {
			photoURL: downloadURL,
			displayName: login,
		});
		if (auth.currentUser.photoURL) {
			dispatch(
				logIn({
					name: auth.currentUser.displayName,
					email: auth.currentUser.email,
					userAvatar: auth.currentUser.photoURL,
				})
			);

			await setDoc(doc(db, 'users', auth.currentUser.uid), {
				login,
				email: auth.currentUser.email,
				userAvatar: auth.currentUser.photoURL,
			});
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
		setImage(null);
		setCameraOn(false);
	};
  
  const resetForm = () => {
    setLogin('');
    seEmail('');
    setPassword('');
  };

    const register = ({login, email, password}) => {
      //   if (!login || !email || !password) {
      //       alert("Please fill in all fields");
      //       return
      // }
      
    //    if (!emailPattern.test(email)) {
    //   alert("Invalid email format");
    //   return;
    // }

    // if (!passwordPattern.test(password)) {
    //   // alert("Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one digit, and one special character");
    //  alert("Password must contain at least 6 characters");
    //   return;
    //   }
      registerDB({login, email, password});
      console.log(`Login: ${login}, Email: ${email}, Password: ${password}`);
      navigation.navigate('Home');
       resetForm();
    }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.maincontainer}>
        <ImageBackground source={backImage} style={styles.backImg}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={styles.containerKeyBoard}
        keyboardVerticalOffset={-120}
      >
        <View style={styles.container}>
              <View style={styles.photoContainer}>
                {cameraOn && !image && (
							<Camera type={type} ref={cameraRef} style={styles.camera} />
						)}
                {image && <Image source={{ uri: image }} style={styles.camera} />}
                {!image ? (
                  <TouchableOpacity style={styles.addButton} onPress={!cameraOn ? cameraTurnOn : takePicture}>
                    <AntDesign name="pluscircleo" size={24} color="#FF6C00" />
                  </TouchableOpacity>) : (<TouchableOpacity style={[styles.addButton, image && styles.addButtonGrey] } onPress={handleDeleteImg}>
                    <AntDesign name="pluscircleo" size={24} color="#FF6C00" />
                  </TouchableOpacity>)}
          </View>
          <Text style={styles.title}>Реєстрація</Text>
          <TextInput
            style={[
          styles. inputText,
          isFocused === "Login" && styles.activeInput,
        ]}
            placeholder="Логін"
            inputMode="text"
            value={login}
            onChangeText={handleLogin}
           onFocus={() => {
                  setIsFocused("Login");
                }}
                onBlur={() => {
                  setIsFocused("");
                }}
          />
          <TextInput
            style={[
          styles.inputText,
          isFocused === "Email" && styles.activeInput,
        ]}
            placeholder="Адреса електронної пошти"
            inputMode="email"
            value={email}
            onChangeText={handleMail}
           onFocus={() => {
                  setIsFocused("Email");
                }}
                onBlur={() => {
                  setIsFocused("");
                }}
          />
          <TextInput
            style={[
          styles.inputText,
          isFocused === "Password" && styles.activeInput,
        ]}
            placeholder="Пароль"
            secureTextEntry={hidePassword}
            value={password}
            onChangeText={handlePassword}
             onFocus={() => {
                    setIsFocused("Password");
                  }}
                  onBlur={() => {
                    setIsFocused("");
                  }}
          />
          <TouchableOpacity
            style={styles.showPassword}
            activeOpacity={0.5}
            onPress={() => {
              setHidePassword(!hidePassword);
            }}
          >
            <Text style={styles.showPasswordText}>
              {hidePassword ? "Показати" : "Приховати"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.registerButton}
            activeOpacity={0.5}
            onPress={register}
          >
            <Text style={styles.registerButtonText}>Зареєстуватися</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.loginLink}
            activeOpacity={0.5}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.loginLinkText}>Вже є акаунт? Увійти</Text>
          </TouchableOpacity>
        </View>
          </KeyboardAvoidingView>
        </ImageBackground>
        <StatusBar style="auto" />  
            </View>
      </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
 maincontainer: {
    flex: 1,
    alignItems: 'center',
  }, 
  backImg: {
    flex: 1,
    justifyContent: 'flex-end',
    width: '100%'
  },

  containerKeyBoard: {
    // justifyContent: "flex-end",
  },
  container: {
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    width: "100%",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,   
    paddingHorizontal: 16,
    // position: "absolute",
    
  },
  photoContainer: {
    marginTop: -60,
    height: 120,
    width: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  addButton: {
    // marginTop: "65%",
    // left: "90%",
    // height: 25,
    // width: 25,
    // pointerEvents: "auto",
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
  addButtonGrey: {
    borderColor: '#BDBDBD',
  },
  title: {
    fontWeight: "500",
    fontSize: 30,
    lineHeight: 35,
    marginTop: 32,
    color: "#212121",
  },
 
  inputText: {
    backgroundColor: "#F6F6F6",
    width: "100%",
    height: 50,
    borderRadius: 8,
    paddingBottom: 15,
    paddingTop: 16,
    paddingHorizontal: 16,
    marginTop: 16,
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 16,
    position: "relative",
     },

  
    activeInput: {
    backgroundColor: "#fff",
      borderColor: "#FF6C00",
     borderWidth: 1,
  },
  
  showPasswordText: {
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
    paddingRight:16,
   
       
  },
  showPassword: {
    top: -34,
    left: 130,
  },
  registerButton: {
    backgroundColor: "#FF6C00",
    height: 50,
    width: "100%",
     paddingHorizontal: 32,
    paddingVertical: 16,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    marginTop: 44,
  },
  registerButtonText: {
    color: "#fff",
    fontWeight: "400",
  },
  loginLink: {
    marginTop: 16,
    marginBottom: 66,
  },
  loginLinkText: {
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
  },
  camera: {
		flex: 1,
		borderRadius: 16,
	},
});

export default RegistrationScreen;