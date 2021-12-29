import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "firebase/database";

// var firebaseConfig = {};
console.log(process.env.REACT_APP_APIKEY)
console.log(process.env.REACT_APP_AUTHDOMAIN)
console.log(process.env.REACT_APP_PROJECTID)
console.log(process.env.REACT_APP_STORAGEBUCKET)
console.log(process.env.REACT_APP_MESSAGINGSENDERID)
console.log(process.env.REACT_APP_APPID)

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID
};


/
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
