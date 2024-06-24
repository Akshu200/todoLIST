import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAqH0iIhs2VGqbNHpF0XrIXc0svKLbE6lM",
  authDomain: "todolist-6523f.firebaseapp.com",
  projectId: "todolist-6523f",
  storageBucket: "todolist-6523f.appspot.com",
  messagingSenderId: "188270127512",
  appId: "1:188270127512:web:558d5d5c4211644fcbe3ed",
  measurementId: "G-JDP3PZ95JH"
};


 const app = initializeApp(firebaseConfig);
 export default app