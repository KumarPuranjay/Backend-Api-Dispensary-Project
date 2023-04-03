// The use of router is to redirect all endpoint related to '/medicine' to this file

const express = require('express');
const { getAllMedicines, addMedicine, getMedicine, changeMedicineQuantity } = require('../controllers/medicineControllers');
const medicineRouter = express.Router();

medicineRouter.get("/get/all", getAllMedicines);

medicineRouter.post("/search", getMedicine);

medicineRouter.post("/add", addMedicine);

medicineRouter.put("/change/quantity",changeMedicineQuantity);

module.exports = medicineRouter;