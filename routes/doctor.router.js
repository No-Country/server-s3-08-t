const { Router } = require("express");
const { getDoctor } = require("../controllers/doctor.controller");
const { getDoctorTypes } = require("../controllers/doctorTypes.controller");

const router = Router();

router.get("/", getDoctor);

router.get("/types", getDoctorTypes);

module.exports = router;