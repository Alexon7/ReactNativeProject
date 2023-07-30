import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState } from "react";

const LoginScreen = ({ changeScreen }) => {
    const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [isTextFocused, setIsTextFocused] = useState('');

    const handleMail = text => {
        setMail(text)
    };

    const handlePassword = text => {
        setPassword(text)
    };

    const login = () => {
        if (!mail || !password) {
            alert("Please fill in all fields");
            return
        };
        console.log(`Email: ${mail}, Password: ${password}`);
    };

    return (
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={styles.containerKeyBoard}
      >
        <View style={styles.container}>
          <Text style={styles.title}>Увійти</Text>
          <TextInput
            style={[
    styles.inputText,
    isTextFocused ? styles.inputTextFocused : null,
  ]}

            placeholder="Адреса електронної пошти"
            inputMode="email"
            value={mail}
            onChangeText={handleMail}
            onFocus={() => setIsTextFocused(true)}
           onBlur={() => setIsTextFocused(false)}
          />
          <TextInput
            style={[
    styles.inputText,
    isTextFocused ? styles.inputTextFocused : null,
  ]}
            placeholder="Пароль"
            secureTextEntry={hidePassword}
            value={password}
            onChangeText={handlePassword}
            onFocus={() => setIsTextFocused(true)}
           onBlur={() => setIsTextFocused(false)}
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
            onPress={() => changeScreen(1)}
          >
            <Text style={styles.loginLinkText}>
              Немає акаунту? Зареєструватися
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
  containerKeyBoard: {
    justifyContent: "flex-end",
  },
  container: {
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    width: "100%",
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
    marginTop: 32,
    color: "#212121",
  },
  inputText: {
     backgroundColor: "#F6F6F6",
    width: 343,
    height: 50,
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 16,
    position: "relative",
  },
  inputTextFocused: {
     backgroundColor: "#fff",
    borderColor: "#FF6C00",
  },
  // inputMail: {
  //   backgroundColor: "#F6F6F6",
  //   width: 343,
  //   height: 50,
  //   borderRadius: 8,
  //   padding: 16,
  //   marginTop: 16,
  //   fontStyle: "normal",
  //   fontWeight: "400",
  //   fontSize: 16,
  //   position: "relative",
  // },
  // inputPassword: {
  //   backgroundColor: "#F6F6F6",
  //   width: 343,
  //   height: 50,
  //   borderRadius: 8,
  //   padding: 16,
  //   marginTop: 16,
  //   fontStyle: "normal",
  //   fontWeight: "400",
  //   fontSize: 16,
  //   position: "relative",
  // },
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
    width: 343,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    marginTop: 44,
  },
  loginButtonText: {
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

export default LoginScreen;