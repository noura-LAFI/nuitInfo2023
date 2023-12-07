const firebase = require("../../config/firebase.config.js");

const firestore = firebase.db;

const { db } = require("../../config/firebase.config.js");
const uploadFile = require("../upload/upload.js");
//create chalenge
exports.createChallange = async (req, res) => {
  try {
    const user = {
      userId: req.user.idUser,
      fullName: req.user.fullName,
    };
    console.log("user id :", user);

    const data = {
      titre: req.body.titre,
      description: req.body.description,
    };
    const challangeRef = await db.collection("Challange").add(data);

    res.status(201).send({
      message: "Challange créé avec succès!",
      id: challangeRef.id,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ message: "Erreur serveur lors de la création du Challange" });
  }
};
exports.getAll = async (req, res) => {
  try {
    if (!req.user || !req.user.idUser) {
      return res
        .status(400)
        .send({ message: "ID utilisateur non fourni dans la requête." });
    }
    const challengesSnapshot = await firestore.collection("Challange").get();

    if (challengesSnapshot.empty) {
      return res.status(204).send({
        message: "Aucun enregistrement trouvé !",
      });
    }
    const challenges = challengesSnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    const userId = req.user.idUser;

    const participationsSnapshot = await firestore
      .collection("Participations")
      .where("userId", "==", userId)
      .get();
    const participations = participationsSnapshot.docs.map(
      (doc) => doc.data().challengeId
    );

    const challengesToShow = challenges.filter(
      (challenge) => !participations.includes(challenge.id)
    );

    return res.status(200).send(challengesToShow);
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: "Erreur du serveur : " + err });
  }
};

exports.getOne = async (req, res) => {
  const data = await firestore.collection("Challange").doc(req.params.id);
  await data
    .get()
    .then((data) => {
      if (!data.exists) {
        res.status(404).send({
          message: "No record found with given id!",
        });
      } else {
        var obj = Object.assign({ id: data.id }, data.data());
        res.status(200).send(obj);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Server Error: " + err });
    });
};

exports.update = async (req, res) => {
  var data = {
    titre: req.body.titre,
    description: req.body.description,
  };

  await firestore
    .collection("Challange")
    .doc(req.params.id)
    .update(data)
    .then(() => {
      res.status(200).send({
        message: "Succes!",
      });
    })
    .catch((err) => {
      res.status(500).send({ message: "Server Error: " + err });
    });
};

exports.delete = async (req, res) => {
  const data = await firestore.collection("Challange").doc(req.params.id);
  await data
    .delete()
    .then(() => {
      res.status(200).send({ message: "Deleted Succefully" });
    })
    .catch((err) => {
      res.status(500).send({ message: "Server Error: " + err });
    });
};
