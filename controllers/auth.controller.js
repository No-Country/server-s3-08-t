const { request, response } = require("express");
const generarToken = require("../helpers/generar.jwt");
const Doctors = require("../models/doctors");
const Patients = require("../models/patients");
const Users = require("../models/users");

const authController = async (req = request, res = response) => {
  const { userName, password, dni } = req.body;
  let userFind = userName;
  try {
    const user = await Users.findOne({
      userName,
    });
    console.log(user);

    if (!user) {
      return res.status(400).json({
        msg: "Usuario no encontrado",
      });
    }
    // const passw = await Users.findOne({
    //   password,
    // });
    if (password != user.password) {
      return res.status(400).json({
        msg: "Contraseña incorrecta",
      });
    }

    // const userDataLogin = await Users.aggregate([
    //   {
    //     $lookup: {
    //       from: "patients", // Revise
    //       localField: "dni", // Campo local en Users
    //       foreignField: "dni", // Condición
    //       as: "patient", // Alias
    //     },
    //   },
    // ]);

    let pat;
    let doc;
    if (user.role == "USER_ROLE") {
      pat = await Patients.findOne(dni);
      if (!pat) {
        return res.status(400).json({
          msg: "Usuario no tiene Perfil",
        });
      }
    } else if (user.role == "DOCTOR_ROLE") {
      doc = await Doctors.findOne(dni);
      if (!doc) {
        return res.status(400).json({
          msg: "Doctor no tiene Perfil",
        });
      }
    }

    const token = await generarToken(user.id);
    //const userAuth = req.userAuth;
    res.status(200).json({
      msg: "Succes",
      pat,
      doc,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error del servidor",
    });
  }
};

module.exports = authController;
