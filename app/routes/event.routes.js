const event = require("../controllers/event.controller");
const jwt = require("../../config/jwt.config");
const express = require("express");
const router = express.Router();
const verifyToken = jwt.verifyToken;

router.post("/addEvent", event.create);

router.get("/events", verifyToken, event.getAll);

router.get("/event/:id", event.getOne);

router.put("/event/:id", event.update);

router.delete("/event/:id", event.delete);
const fileUpload = require("../upload/upload");
router.post("/upload", verifyToken, fileUpload.uploadFile);
module.exports = router;
