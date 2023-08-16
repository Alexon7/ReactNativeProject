// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from 'firebase/app';
// Функція для підключення авторизації в проект
import { getAuth } from "firebase/auth";
// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC13WqPynQjN_JV29onYaXUMxkqw0JLjLI",
  authDomain: "react-native-46cb5.firebaseapp.com",
  projectId: "react-native-46cb5",
  storageBucket: "react-native-46cb5.appspot.com",
  messagingSenderId: "412549169001",
  appId: "1:412549169001:web:4d6f91be4dd8b8c69907f8",
  measurementId: "G-8BTMX6W6P5"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);



// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDIwLZ_xWhT3uIQRTJVDbohyzJYNPx1I-M",
//   authDomain: "study-8acc4.firebaseapp.com",
//   projectId: "study-8acc4",
//   storageBucket: "study-8acc4.appspot.com",
//   messagingSenderId: "167566869400",
//   appId: "1:167566869400:web:32e3bc3b22dd13df3a61ed",
//   measurementId: "G-TSHZQMHN8X"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);