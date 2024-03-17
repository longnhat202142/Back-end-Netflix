import firebase from "firebase";
import "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCQfSI7XAxwysrvouPUum94LNkifMAROFM",
  authDomain: "netflix-dd155.firebaseapp.com",
  projectId: "netflix-dd155",
  storageBucket: "netflix-dd155.appspot.com",
  messagingSenderId: "759849230513",
  appId: "1:759849230513:web:7dcd7155c50b77dfbf4290",
  measurementId: "G-XMG6FW3T4F",
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export default storage;
