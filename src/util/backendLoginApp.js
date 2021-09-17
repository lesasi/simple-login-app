const mongoose = require('mongoose');
const { ServerApp } = require('@lesasi/lesasi-login-package');

const {
    app_name,
    project_id,
    private_key_id,
    private_key,
    client_email,
    client_id,
    client_x509_cert_url
  } = process.env;

const app = new ServerApp({
    authString: process.env.AUTH_STRING,
    mongooseConnection: mongoose.connection,
    authCookieName: process.env.AUTH_COOKIE,
    firebaseArgs: {
        appName: app_name,
        projectId: project_id,
        privateKeyId: private_key_id,
        privateKey: private_key,
        clientEmail: client_email,
        clientId: client_id,
        clientX509CertUrl: client_x509_cert_url
    },
    userAdditionalDetails: [
        {
            name: 'name',
            type: String
        },
        {
            name: 'age',
            type: Number
        }
    ]
});

const auth = app.getAuthMiddleware();
const firebase = app.getFirebaseAuth();
const User = app.getUserModel();
const router = app.getRouter();

module.exports = {
    auth,
    firebase,
    User,
    router
};