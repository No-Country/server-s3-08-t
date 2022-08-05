const { Router } = require("express");
const { check } = require("express-validator");
const {
  getUser,
  postUser,
  putUser,
  deteleUser,
} = require("../controllers/user.controller");
const validarCampos = require("../middlewares/validator");

const router = Router();

router.get("/", getUser);

// Metodo POST con Middleware
router.post(
  "/",
  [
    check("dni", "DNI is required").not().isEmpty(),
    check("name", "Name is required").not().isEmpty(),
    check(
      "password",
      "La contraseña es obligatoria y mayor a 6 caracteres"
    ).isLength({ min: 6 }),
    check("email", "Email - Invalid format").isEmail(),
    validarCampos,
  ],
  postUser
);

router.post("/:id", putUser);

router.delete("/:id", deteleUser);

module.exports = router;
