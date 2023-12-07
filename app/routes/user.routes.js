const express = require("express");

const router = express.Router();

const user = require("../controllers/user.controller");
const jwt = require("../../config/jwt.config");
const verifyToken = jwt.verifyToken;
router.get("/users", verifyToken, user.getAll);
router.put("/users", verifyToken, user.update);
module.exports = router;
