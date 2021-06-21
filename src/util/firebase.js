const firebase = require("firebase-admin");

const {
  project_id,
  private_key_id,
  private_key,
  client_email,
  client_id,
  client_x509_cert_url
} = process.env;

const credentials = {
  type: 'service_account',
  project_id,
  private_key_id,
  private_key: private_key.replace(/\\n/g, '\n'),
  client_email,
  client_id,
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url
};

firebase.initializeApp({
  credential: firebase.credential.cert(credentials),
  databaseURL: "https://login-app.firebaseio.com",
});

module.exports = firebase;