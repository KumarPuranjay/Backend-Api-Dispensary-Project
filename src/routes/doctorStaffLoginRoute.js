const express = require('express');
const { getAllDoctorStaffDetails, doctorStaffSignIn ,doctorStaffSignUp} = require('../controllers/doctorStaffLoginController');
const doctorStaffLoginRouter = express.Router();

doctorStaffLoginRouter.get("/get/all",getAllDoctorStaffDetails);

doctorStaffLoginRouter.post("/signin",doctorStaffSignIn);

doctorStaffLoginRouter.post("/signup",doctorStaffSignUp);

module.exports = doctorStaffLoginRouter;