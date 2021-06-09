import firebase from "firebase/app";
import "firebase/auth";

// DEV - switch to env variables
const firebaseConfig = require("../config/react-firebase-config.json");

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

const googleProvider = new firebase.auth.GoogleAuthProvider();

export { auth, firebase, googleProvider };