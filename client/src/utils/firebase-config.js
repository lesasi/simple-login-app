import firebase from "firebase/app";
import "firebase/auth";
import {} from 'dotenv/config';

const firebaseConfig = {
    "apiKey": process.env.REACT_APP_apiKey,
    "authDomain": process.env.REACT_APP_authDomain,
    "projectId": process.env.REACT_APP_projectId,
    "storageBucket": process.env.REACT_APP_storageBucket,
    "messagingSenderId": process.env.REACT_APP_messagingSenderId,
    "appId": process.env.REACT_APP_appId,
    "measurementId": process.env.REACT_APP_measurementId
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

// providers 
const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

const emailProvider = firebase.auth.EmailAuthProvider;

const facebookProvider = new firebase.auth.FacebookAuthProvider();

const githubProvider = new firebase.auth.GithubAuthProvider();

const providers = {
    'google': googleProvider,
    'email': emailProvider,
    'facebook': facebookProvider,
    'github': githubProvider,
};


export { auth, firebase, providers };