const express = require("express");
const router = express.Router();
const auth = require("../controllers/auth.controller");
router.get("/signIn", auth.authenticate);

router.get("/signUp", auth.register);

module.exports = router;
