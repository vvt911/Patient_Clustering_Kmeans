const express = require("express");
const { getPatients } = require("../controller/patientController");

const patientRouter = express.Router();

patientRouter.get("/patients", getPatients);

module.exports = patientRouter;
