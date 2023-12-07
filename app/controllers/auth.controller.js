const firebase = require("../../config/firebase.config.js");
const admin = require("firebase-admin");
const auth = firebase.auth;
const firestore = firebase.db;
const userdb = require("../controllers/user.controller");
const jwt = require("../../config/jwt.config.js");

exports.authenticate = async (req, res) => {
  var email = req.body.email;
  var password = req.body.password;

  await auth
    .signInWithEmailAndPassword(email, password)
    .then(async (userCredential) => {
      var user = userCredential.user;
      console.log(userCredential);
      var response = await jwt.generateToken(user.uid, user.fullName);
      console.log("first", response);
      //await userdb.createUser(user.uid, user.email, response);

      res.status(200).send(response);
    })
    .catch((err) => {
      res.status(401).send(err.code);
    });
};

exports.register = async (req, res) => {
  var email = req.body.email;
  var password = req.body.password;

  //var data=req.body

  await auth
    .createUserWithEmailAndPassword(email, password)
    .then(async (userCredential) => {
      var user = userCredential.user;
      var response = await jwt.generateToken(user.uid);

      //TODO CONFIGURE USER CREATE
      await userdb.createUser(user.uid, user.email, response, req.body);
      res.status(200).send(response);
    })
    .catch((err) => {
      res.status(500).send(err.code);
    });
};

//TODO: confirm old password
exports.updateEmail = async (req, res) => {
  const newEmail = req.body.newEmail;
  const idUser = await jwt.extractId(req, res);

  admin
    .auth()
    .updateUser(idUser, {
      email: newEmail,
    })
    .then(async () => {
      await userdb.updateWhenChangeEmail(idUser, newEmail);
      res.status(200).send("Email updated Succefully");
    })
    .catch((err) => {
      res.status(500).send(err.code);
    });
};

//TODO: confirm old password
exports.updatePassword = async (req, res) => {
  var newPassword = req.body.newPassword;
  const idUser = await jwt.extractId(req, res);

  admin
    .auth()
    .updateUser(idUser, {
      password: newPassword,
    })
    .then(() => {
      res.status(200).send("Password updated Succefully");
    })
    .catch((err) => {
      res.status(500).send(err.code);
    });
};
