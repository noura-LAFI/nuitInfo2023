const firebase = require("../../config/firebase.config.js");
const firestore = firebase.db;

exports.create = async (req, res) => {
  try {
    const data = {
      titre: req.body.titre,
      description: req.body.description,
      lien: req.body.lien,
      idcreateur: req.body.idcreateur,
      nbParticipants: req.body.nbParticipants,
      dateDeb: req.body.dateDeb,
      dateFin: req.body.dateFin,
    };
    await firestore.collection("Events").doc().set(data);

    res.status(200).send({ message: "Success!" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Server Error: " + err });
  }
};

exports.getAll = async (req, res) => {
  const data = await firestore.collection("Events");
  await data
    .get()
    .then((data) => {
      if (data.empty) {
        return res.status(204).send({
          message: "No record found!",
        });
      } else {
        var array = [];
        data.forEach((doc) => {
          var obj = Object.assign({ id: doc.id }, doc.data());
          array.push(obj);
        });
        return res.status(200).send(array);
      }
    })
    .catch((err) => {
      return res.status(500).send({ message: "Server Error: " + err });
    });
};

exports.getOne = async (req, res) => {
  const data = await firestore.collection("Events").doc(req.params.id);
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
    .collection("Events")
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
  const data = await firestore.collection("Events").doc(req.params.id);
  await data
    .delete()
    .then(() => {
      res.status(200).send({ message: "Deleted Succefully" });
    })
    .catch((err) => {
      res.status(500).send({ message: "Server Error: " + err });
    });
};
