import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "firebase/database";

// var firebaseConfig = {};
const firebaseConfig = {
  apiKey: "AIzaSyAxHTpMLzLWQM9P9lTnmMmcy01D73QocRs",
  authDomain: "whatsapp-clone-ce4f0.firebaseapp.com",
  projectId: "whatsapp-clone-ce4f0",
  storageBucket: "whatsapp-clone-ce4f0.appspot.com",
  messagingSenderId: "105412577344",
  appId: "1:105412577344:web:3b04576a8e5b2357e8b7a5"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage().ref("images");
const audioStorage = firebase.storage().ref("audios");
const createTimestamp = firebase.firestore.FieldValue.serverTimestamp;
const serverTimestamp = firebase.database.ServerValue.TIMESTAMP;

export {
  db,
  auth,
  provider,
  storage,
  audioStorage,
  createTimestamp,
  serverTimestamp,
};
