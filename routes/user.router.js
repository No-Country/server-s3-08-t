const { Router } = require("express");
const { check } = require("express-validator");
const {
  getUser,
  postUser,
  putUser,
  deteleUser,
} = require("../controllers/user.controller");
const { dniExiste } = require("../helpers/db.validator");
const validarCampos = require("../middlewares/validator");

const router = Router();

router.get("/", getUser);

// Metodo POST con Middleware
router.post(
  "/",
  [
    check("userName", "Name is required").not().isEmpty(),
    check("password", "Password is required").not().isEmpty(),
    check(
      "password",
      "La contraseña es obligatoria y mayor a 6 caracteres"
    ).isLength({ min: 6 }),
    check("dni").custom(dniExiste),
    validarCampos,
  ],
  postUser
);

router.post("/:id", putUser);

router.delete("/:id", deteleUser);

module.exports = router;
