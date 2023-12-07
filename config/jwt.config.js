const jwt = require("jsonwebtoken");
const firebase = require("./firebase.config");

const firestore = firebase.db;
const SECRETKEY ="A41E6E49844ED742ECBE1A55C2738"

exports.generateToken = async (idUser) => {
  const token = await jwt.sign({ idUser }, SECRETKEY, {
    expiresIn: "7d",
  });
  //console.log("token: "+token);
  return token;
};

exports.extractId = async (req, res) => {
  const check = req.headers["authorization"];
  if (check) {
    try {
      const token = req.headers["authorization"].replace("Bearer", "").trim();

      const decoded = await jwt.verify(token, SECRETKEY);
      //req.id = decoded;
      //console.log("user" ,decoded)
      return decoded.idUser;
    } catch (err) {
      return err;
    }
  } else {
    return;
  }
};

// verify token
exports.verifyToken = async (req, res, next) => {
  const check = req.headers["authorization"];
  if (check) {
    try {
      const token = req.headers["authorization"].replace("Bearer", "").trim();

      const decoded = jwt.verify(token, SECRETKEY);
      req.user = decoded;
      //console.log("user" ,decoded)
    } catch (err) {
      return res.status(403).send(err.message);
    }
  } else {
    return res.status(403).send("Missing Token");
  }

  return next();
};
