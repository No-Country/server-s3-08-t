const Doctors = require("../models/doctors");
const Patients = require("../models/patients");
const Users = require("../models/users");

const dniExiste = async (dni = "") => {
  const existe = await Users.findOne({ dni });
  if (existe) {
    throw new Error(`El DNI ${dni} esta registrado en la DB`);
  }
};

const dniExisteDoctor = async (dni = "") => {
  const existe = await Doctors.findOne({ dni });
  if (existe) {
    throw new Error(`El DNI ${dni} esta registrado en la DB`);
  }
};

const dniExistePatient = async (dni = "") => {
  const existe = await Patients.findOne({ dni });
  if (existe) {
    throw new Error(`El DNI ${dni} esta registrado en la DB`);
  }
};

module.exports = {
  dniExiste,
  dniExisteDoctor,
  dniExistePatient,
};
