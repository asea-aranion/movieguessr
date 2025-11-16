import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBibKPpFp2o2lCLqpwff4XnBrvlo4YBfy0",
    authDomain: "movieguessr-56312.firebaseapp.com",
    projectId: "movieguessr-56312",
    storageBucket: "movieguessr-56312.firebasestorage.app",
    messagingSenderId: "685541561818",
    appId: "1:685541561818:web:ae5108956f6aa1d0b0dce3",
    measurementId: "G-ST3ZFVNNPH",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
