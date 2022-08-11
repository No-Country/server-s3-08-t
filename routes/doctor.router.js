const { Router } = require("express");
const { getDoctor } = require("../controllers/doctor.controller");

const router = Router();

router.get("/", getDoctor);

module.exports = router;
