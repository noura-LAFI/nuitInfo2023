const firebase = require("firebase/compat/app");
const firestore = require("firebase/compat/firestore");
const authenticate = require("firebase/compat/auth");
var admin = require("firebase-admin");
var serviceAccount = require("./firebase-adminsdk.json");

const firebaseConfig = {
  apiKey: "AIzaSyDKSqu9jtlC3pFazkE5nHyxZtZtiZsGhf0",
  authDomain: "myappnuitinfo2023-1209c.firebaseapp.com",
  projectId: "myappnuitinfo2023-1209c",
  storageBucket: "myappnuitinfo2023-1209c.appspot.com",
  messagingSenderId: "504432829722",
  appId: "1:504432829722:web:eb37164183e0a1844138a3",
  measurementId: "G-Q53CVZHQ62",
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = { db, auth };
