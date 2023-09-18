// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from 'firebase/app';
// Функція для підключення авторизації в проект
import { getAuth } from "firebase/auth";
// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDIwLZ_xWhT3uIQRTJVDbohyzJYNPx1I-M",
  authDomain: "study-8acc4.firebaseapp.com",
  projectId: "study-8acc4",
  storageBucket: "study-8acc4.appspot.com",
  messagingSenderId: "167566869400",
  appId: "1:167566869400:web:8d895a72d76099573a61ed",
  measurementId: "G-VCQ54H9M0G"
  };

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);


