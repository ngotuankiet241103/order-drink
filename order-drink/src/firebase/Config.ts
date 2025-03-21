// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {getFirestore} from "firebase/firestore"
import {updateProfile,getAuth} from "firebase/auth"
import firebase from "firebase/compat/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: firebase.properties.apiKey,
  authDomain: firebase.properties.authDomain,
  projectId: firebase.properties.projectId,
  storageBucket: firebase.properties.storageBucket,
  messagingSenderId: firebase.properties.messagingSenderId,
  appId: firebase.properties.appId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app)