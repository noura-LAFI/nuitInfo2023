const express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// listen for requests
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
const authRoutes = require("./app/routes/auth.routes");
app.use("/api/auth", authRoutes);
const eventRoutes = require("./app/routes/event.routes");
app.use("/api/event", eventRoutes);
const userRoutes = require("./app/routes/user.routes");
app.use("/api/user", userRoutes);
const uploadRoutes = require("./app/routes/upload.Routes");
app.use("/api/uploadFile", uploadRoutes);
const challangeRoute = require("./app/routes/challange.routes");
app.use("/api/challange", challangeRoute);
