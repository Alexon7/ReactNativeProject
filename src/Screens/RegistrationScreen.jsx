import {
  StyleSheet,
  Text,
  ImageBackground,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
   Keyboard,
} from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons"; 
import { StatusBar  } from 'expo-status-bar';

const backImage = require("../Source/Photo_BG.png");

const RegistrationScreen = ({ navigation }) => {
    const [login, setLogin] = useState('');
    const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [isFocused, setIsFocused] = useState("");
  
  const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const handleLogin = text => {
        setLogin(text)
    };

    const handleMail = text => {
        setMail(text)
    };

    const handlePassword = text => {
        setPassword(text)
  };
  
  const resetForm = () => {
    setLogin('');
    setMail('');
    setPassword('');
  };

    const register = () => {
        if (!login || !mail || !password) {
            alert("Please fill in all fields");
            return
      }
      
       if (!emailPattern.test(mail)) {
      alert("Invalid email format");
      return;
    }

    if (!passwordPattern.test(password)) {
      alert("Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one digit, and one special character");
      return;
    }
      console.log(`Login: ${login}, Email: ${mail}, Password: ${password}`);
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
            <TouchableOpacity style={styles.addButton} activeOpacity={0.5}>
              <AntDesign name="pluscircleo" size={24} color="#FF6C00" />
            </TouchableOpacity>
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
    marginTop: "65%",
    left: "90%",
    height: 25,
    width: 25,
    pointerEvents: "auto",
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
});

export default RegistrationScreen;