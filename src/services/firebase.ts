// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBHJxxcuzCuF_pY9fCd5cI6R-Lqa3OwBRk",
  authDomain: "fox-entregas-web.firebaseapp.com",
  projectId: "fox-entregas-web",
  storageBucket: "fox-entregas-web.appspot.com",
  messagingSenderId: "642589642175",
  appId: "1:642589642175:web:248eda35aad861a155a50a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)

export const db = getFirestore(app)