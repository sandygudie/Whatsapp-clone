import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "firebase/database";
const config = require('./config');
// var firebaseConfig = {};
// console.log(process.env.REACT_APP_FIREBASE_API_KEY)


// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY ,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID
// };

//  const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID 
// }

// REACT_APP_APIKEY = "AIzaSyAxHTpMLzLWQM9P9lTnmMmcy01D73QocRs",
// REACT_APP_AUTHDOMAIN =  "whatsapp-clone-ce4f0.firebaseapp.com",
//  REACT_APP_PROJECTID =  "whatsapp-clone-ce4f0",
//  REACT_APP_STORAGEBUCKET =  "whatsapp-clone-ce4f0.appspot.com",
//   REACT_APP_MESSAGINGSENDERID = "105412577344",
//   REACT_APP_APPID = "1:105412577344:web:3b04576a8e5b2357e8b7a5"

// const firebaseConfig = {
//   apiKey: "AIzaSyAxHTpMLzLWQM9P9lTnmMmcy01D73QocRs",
//   authDomain: "whatsapp-clone-ce4f0.firebaseapp.com",
//   projectId: "whatsapp-clone-ce4f0",
//   storageBucket: "whatsapp-clone-ce4f0.appspot.com",
//   messagingSenderId: "105412577344",
//   appId: "1:105412577344:web:3b04576a8e5b2357e8b7a5"
// };
// Initialize Firebase
// const firebaseApp = firebase.initializeApp(
//   {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID 
// }
// );

const firebaseApp = firebase.initializeApp(config)

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
