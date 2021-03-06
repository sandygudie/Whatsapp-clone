import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "firebase/database";
const config = require('./config');

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
