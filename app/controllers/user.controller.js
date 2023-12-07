const firebase = require("../../config/firebase.config.js");
const jwt = require('../../config/jwt.config');


const firestore = firebase.db;

exports.createUser = async (id,email,jwtToken,req) => {
  console.log(req)
  const data = {
    fullName: req.fullName || "",
    email: email,
    adress: req.adress || "",
    phone: req.phone || "",
    dob: req.dob || "",
    //authToken: jwtToken,
  };

  
  var document = await firestore.collection("Users").doc(id).get(); 
if (document && document.exists) {
  return;
}
else {
  await firestore
  .collection("Users")
  .doc(id)
  .set(data)
  .catch((err) => {
    return err;
  });
}

};

exports.getOne = async (req, res) => {
    const id= await jwt.extractId(req,res);
    console.log("from user: "+id);
    
  const data = await firestore.collection("Users").doc(id);
  await data
    .get()
    .then((data) => {
      if (!data.exists) {
        res.status(404).send({
          message: "No record found with given id!",
        });
      } else {
        res.status(200).send(data.data());
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Server Error: " + err });
    });
};

exports.update = async (req, res) => {
  var data = req.body;
  const id= await jwt.extractId(req,res);
  await firestore
    .collection("Users")
    .doc(id)
    .update(data)
    .then(() => {
      res.status(200).send({
        message: "Record updated Successfully!",
      });
    })
    .catch((err) => {
      res.status(500).send(err.code);
    });
};

exports.updateWhenChangeEmail = async (id,email) => {
    
  var data = {email: email};

  await firestore
    .collection("Users")
    .doc(id)
    .update(data)
};

exports.delete = async (req, res) => {
  const data = await firestore.collection("Users").doc(req.params.id);
  await data
    .delete()
    .then(() => {
      res.status(200).send({ message: "Deleted Succefully" });
    })
    .catch((err) => {
      res.status(500).send({ message: "Server Error: " + err });
    });
};

exports.getAll = async (req, res) => {
  const data = await firestore.collection("Users");
  await data
    .get()
    .then((data) => {
      if (data.empty) {
        res.status(204).send({
          message: "No record found!",
        });
      } else {
        var array = [];
        data.forEach((doc) => {
          array.push(doc.data());
        });
        res.status(200).send(array);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Server Error: " + err });
    });
};
