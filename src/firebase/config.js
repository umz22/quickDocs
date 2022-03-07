// Firebase
import { initializeApp} from 'firebase/app';
// Firestore services
import {getFirestore, collection} from 'firebase/firestore';
// user auth
import { getAuth } from 'firebase/auth'
// timestamp
import { serverTimestamp } from "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDNWqKtw7UgVTatY2XzmN8e01qgeZrxjzw",
    authDomain: "quote-app-bb223.firebaseapp.com",
    projectId: "quote-app-bb223",
    storageBucket: "quote-app-bb223.appspot.com",
    messagingSenderId: "214972901404",
    appId: "1:214972901404:web:9e1418da58daf5b737d7d9"
  };

// initialize firebase
initializeApp(firebaseConfig)

// initialize services
const db = getFirestore();

// initialize firebase auth
const auth = getAuth();

// initialize timestamp
const timestamp = serverTimestamp();

export { db, auth, timestamp }