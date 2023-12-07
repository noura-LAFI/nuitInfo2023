const express = require('express');
const router = express.Router();
const challange = require("../controllers/challange.controller");
const jwt = require('../../config/jwt.config');
const verifyToken = jwt.verifyToken;

router.post("/challangeCreate",verifyToken, challange.createChallange);
router.get("/challanges", verifyToken, challange.getAll);
router.get("/challange/:id",verifyToken, challange.getOne);
router.put("/challange/:id",verifyToken, challange.update);
router.delete("/challange/:id",verifyToken, challange.delete);

module.exports = router;
