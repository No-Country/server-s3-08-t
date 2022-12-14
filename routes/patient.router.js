const { Router } = require("express");
const { check } = require("express-validator");
const {
  postPatient,
  putPatient,
  detelePatient,
  getPatient,
  getPatientUser,
} = require("../controllers/patient.controller");
const validarCampos = require("../middlewares/validator");

const router = Router();

router.get("/", getPatient);

router.get("/get-user", getPatientUser);

// Metodo POST con Middleware
router.post(
  "/",
  [
    check("dni", "DNI is required").not().isEmpty(),
    check("name", "Name is required").not().isEmpty(),
    check("email", "Email - Invalid format").isEmail(),
    validarCampos,
  ],
  postPatient
);

router.post("/:id", putPatient);

router.delete("/:id", detelePatient);

module.exports = router;
