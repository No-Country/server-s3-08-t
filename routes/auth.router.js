const { Router } = require('express');
const { check } = require('express-validator');
const validarCampos = require('../middlewares/validator.js');
const authController = require('../controllers/auth.controller.js');

const router = Router();
router.post('/login', [
    check("userName", 'Formato incorrecto').not().isEmpty(),
    check("password", 'La contraseña debe ser mayor a 6 caracteres').isLength({min: 6}),
    validarCampos
], authController)

module.exports = router;