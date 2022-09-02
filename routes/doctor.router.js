const { Router } = require("express");
const { check } = require("express-validator");
const {
  getDoctor,
  getDoctorUser,
  postDoctor,
  putDoctor,
  deleteDoctor,
} = require("../controllers/doctor.controller");
const validarCampos = require("../middlewares/validator");
const { getDoctorTypes } = require("../controllers/doctorTypes.controller");
const { dniExisteDoctor } = require("../helpers/db.validator");

const router = Router();

router.get("/", getDoctor);

router.get("/get-user", getDoctorUser);

router.get("/types", getDoctorTypes);

router.post(
  "/",
  [
    check("dni", "DNI is required").not().isEmpty(),
    check("dni").custom(dniExisteDoctor),
    check("doctorName", "Name is required").not().isEmpty(),
    check("doctorEmail", "Email - Invalid format").isEmail(),
    validarCampos,
  ],
  postDoctor
);

router.post("/:id", putDoctor);

router.delete("/:id", deleteDoctor);

module.exports = router;
