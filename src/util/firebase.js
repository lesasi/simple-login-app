const firebase = require("firebase-admin");

const { type,
  project_id,
  private_key_id,
  private_key,
  client_email,
  client_id,
  auth_uri,
  token_uri,
  auth_provider_x509_cert_url,
  client_x509_cert_url
} = process.env;

const credentials = {
  type,
  project_id,
  private_key_id,
  private_key,
  client_email,
  client_id,
  auth_uri,
  token_uri,
  auth_provider_x509_cert_url,
  client_x509_cert_url
};

firebase.initializeApp({
  credential: firebase.credential.cert(credentials),
  databaseURL: "https://login-app.firebaseio.com",
});

module.exports = firebase;