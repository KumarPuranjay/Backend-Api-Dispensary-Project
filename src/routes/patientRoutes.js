const express = require("express");
const patientRouter = express.Router();
const auth = require("../middlewares/auth")
const { signup, signin } = require("../controllers/userController")
const { dummyController } = require("../controllers/historyController");

patientRouter.post("/signup", signup)
patientRouter.post("/dummy", dummyController);
patientRouter.post("/signin", signin)
module.exports = patientRouter;