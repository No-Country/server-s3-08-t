const { request } = require("express");
const { validationResult } = require("express-validator");

const validarCampos = (req = request, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('Error de validacion')
    return res.status(400).json(errors);
  }
  next();
};

module.exports = validarCampos;