const { response, request } = require("express");
const Doctors = require("../models/doctors");
const Type = require("../models/doctorTypes");

const getDoctor = async (req = request, res = response) => {
  const userDoctor = await Doctors.aggregate([
    {
      $lookup: {
        from: "users", // Revise
        localField: "dni", // Campo local en Patient
        foreignField: "dni", // Condición
        as: "user", // Alias
      },
    },
  ]);

  if (!userDoctor) {
    res.status(400).json({
      msg: "No existe el usuario de este pasiente",
    });
  }
  res.json({ userDoctor });
};

module.exports = {
  getDoctor,
};
