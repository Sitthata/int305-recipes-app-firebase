// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC0Apry6aWwLe0BTUX74QblZppE_2SBRAU",
    authDomain: "int305-assignments.firebaseapp.com",
    projectId: "int305-assignments",
    storageBucket: "int305-assignments.firebasestorage.app",
    messagingSenderId: "345433552251",
    appId: "1:345433552251:web:61de38311a9ba98938b9de",
    measurementId: "G-KHF3ELJZ5Y"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export default db