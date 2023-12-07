const express = require("express");

const router = express.Router();
const jwt = require("../../config/jwt.config");
const verifytoken = jwt.verifyToken;
const fileUpload = require("../upload/upload");
router.post("/upload", verifytoken, fileUpload.uploadFile);

module.exports = router;
