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
   ImageBackground
} from "react-native";
import { StatusBar  } from 'expo-status-bar';
import React, { useState } from "react";

const backImage = require("../Source/Photo_BG.png");

const LoginScreen = ({ navigation }) => {
    const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [isFocused, setIsFocused] = useState("");

    const handleMail = text => {
        setMail(text)
    };

    const handlePassword = text => {
        setPassword(text)
  };
  
  const resetForm = () => {
    setMail('');
    setPassword('');
  };

    const login = () => {
        if (!mail || !password) {
            alert("Please fill in all fields");
            return
        };
      console.log(`Email: ${mail}, Password: ${password}`);
       navigation.navigate('Home', { screen: 'PostsScreen' });
       resetForm();
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
            value={mail}
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
            onPress={login}
          >
            <Text style={styles.loginButtonText}>Увійти</Text>
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