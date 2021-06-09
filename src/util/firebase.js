const firebase = require("firebase-admin");

// DEV - to change to env variables
const credentials = require("../../config/login-app-d36f3-firebase-adminsdk-t0q86-7858edf92b.json");

firebase.initializeApp({
  credential: firebase.credential.cert(credentials),
  databaseURL: "https://login-app.firebaseio.com",
});

module.exports = firebase;