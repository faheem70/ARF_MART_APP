import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


export const firebaseConfig = {
    apiKey: "AIzaSyDUM0Mk8fJO1PG34dKZM3xrJSohrxEFMqg",
    authDomain: "player-24639.firebaseapp.com",
    projectId: "player-24639",
    storageBucket: "player-24639.appspot.com",
    messagingSenderId: "818423344274",
    appId: "1:818423344274:web:a191990d93b9afab2a4a4b"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}