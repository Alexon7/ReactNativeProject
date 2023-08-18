import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
   Alert
} from "react-native";
import { StatusBar  } from 'expo-status-bar';
import React, { useState, useSelector } from "react";
import { useDispatch } from "react-redux";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config';
import { logIn } from '../../Redux/userSlice';

const backImage = require("../Source/Photo_BG.png");

const LoginScreen = ({ navigation }) => {

   
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [isFocused, setIsFocused] = useState("");
   const dispatch = useDispatch();

    const handleMail = text => { setEmail(text) };
    const handlePassword = text => { setPassword(text) };
  
  const resetForm = () => {
    setEmail('');
    setPassword('');
  };


  const login = async ({ email, password }) => {
      const user = await loginDB({ email, password });
    if (user) {
       navigation.navigate('PostsScreen')
			resetForm();
		}
	};
            
      console.log(password);
console.log(email);

  
  
  const loginDB = async ({ email, password }) => {
		try {
			const credentials = await signInWithEmailAndPassword(
				auth,
				email,
				password
      );

      if (credentials.user) {
				setCurrentUserToStore(
					credentials.user.displayName,
					credentials.user.email,
					credentials.user.photoURL
				);
			}

			return credentials.user;
		} catch (error) {
			console.log(error);
			if (error.code === 'auth/user-not-found') {
				return Alert.alert('Такого користувача не знайдено');
			} else if (error.code === 'auth/wrong-password') {
				return Alert.alert('Неправильний прароль');
			}
		}
  };
  
  const setCurrentUserToStore = async (name, email, userAvatar) => {
		dispatch(
			logIn({
				name,
				email,
				userAvatar,
			})
		);
	};


  return (
     <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
     <View style={styles.maincontainer}>
        <ImageBackground source={backImage} style={styles.backImg}>
      
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={styles.containerKeyBoard}
        keyboardVerticalOffset={-70}
      >
        <View style={styles.container}>
          <Text style={styles.title}>Увійти</Text>
          <TextInput
            style={[
    styles.inputText,
    isFocused === "Email" && styles.inputTextFocused]}

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
    isFocused === "Password" && styles.inputTextFocused ]}
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
            style={styles.loginButton}
            activeOpacity={0.5}
            onPress={()=>login({ email, password })}
          >
                <Text style={styles.loginButtonText} onPress={() => { login() }}>Увійти</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.loginLink}
            activeOpacity={0.5}
            onPress={() => navigation.navigate("Registratione")}
          >
            <Text style={styles.loginLinkText}>
              Немає акаунту? Зареєструватися
            </Text>
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
    paddingTop: 32,
    paddingBottom: 132,
    paddingHorizontal: 16,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  photoContainer: {
    marginTop: -60,
    height: 120,
    width: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  title: {
    fontWeight: "500",
    fontSize: 30,
    lineHeight: 35,
    marginBottom: 16,
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
  inputTextFocused: {
     backgroundColor: "#fff",
    borderColor: "#FF6C00",
     borderWidth: 1,
  },
  
  showPasswordText: {
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,       
  },
  showPassword: {
    top: -34,
    left: 130,
  },
  loginButton: {
    backgroundColor: "#FF6C00",
    height: 50,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    marginTop: 44,
    paddingHorizontal: 32,
    paddingVertical: 16,
  },
  loginButtonText: {
    color: "#fff",
    fontWeight: "400",
  },
  loginLink: {
    marginTop: 16,
    // marginBottom: 66,
  },
  loginLinkText: {
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
  },
});

export default LoginScreen;