const { request, response } = require("express");
const jwt = require("jsonwebtoken");
const Users = require("../models/users");

const validatorJWT = async (req = request, res = response, next) => {
  // Token se recibe a traves del header
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({
      msg: "No token in request",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    // Creo una nueva propiedad en la request para tratarla desde el controlador
    req.uid = uid;

    const userAuth = await Users.findById(uid);

    if (!userAuth) {
      return res.status(401).json({
        msg: "Invalid Token - No user exists",
      });
    }

    if (!userAuth.state) {
      return res.status(401).json({
        msg: "Disabled user",
      });
    }

    req.userAuth = userAuth;
    next();
  } catch (error) {
    res.status(401).json({
      msg: "Invalid token",
    });
  }
};

module.exports = validatorJWT;
