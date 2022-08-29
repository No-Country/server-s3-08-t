const { response, request } = require("express");
const Patient = require("../models/patients");

//? GET method
const getPatient = async (res = response) => {
  const patientData = await Patient.find({ state: true });
  res.json({ patientData });
};

//? GET method - Relaciones
//* $lookup lo utilizo para la relacion uno a uno. Patient busca en (from: "Users") el campo (localField: "dni") que sea
//* ingual al campo (foreignField: dni), ese regitro lo guarda en un nuevo objeto como alias (as: "user")

const getPatientUser = async (req = request, res = response) => {
  const patientData = await Patient.aggregate([
    {
      $lookup: {
        from: "users", // Revise
        localField: "dni", // Campo local en Patient
        foreignField: "dni", // Condición
        as: "user", // Alias
      },
    },
  ]);
  if (!patientData) {
    res.status(400).json({
      msg: "No existe el usuario de este paciente",
    });
  }
  console.log(patientData);
  res.json({ patientData });
};

//? POST Method
const postPatient = async (req = request, res = response) => {
  const body = req.body;
  const patient = new Patient(body);

  // Password Encrypt

  // Send to Rep
  await patient.save();

  try {
    res.status(201).json({
      msg: "Create Patient - Success",
      patient,
    });
  } catch (error) {
    console.log("Error - No fue posible crear el paciente.");
  }

};

const putPatient = async (req = request, res = response) => {
  const { id } = req.params;

  const { password, _id, dni, email, ...resto } = req.body;

  const patientUpdate = await Patient.findByIdAndUpdate(id, resto);

  try {
    res.status(200).json({
      msg: "Success Update",
      patientUpdate,
    });
  } catch (error) {
    console.log("Error - No fue posible subir los cambios.");
  }

};

const detelePatient = async (req = request, res = response) => {
  const { id } = req.params;
  const patientDelete = await Patient.findByIdAndUpdate(id, { state: false });

  try {
    res.status(200).json({
      msg: "Success Delete",
      patientDelete,
    });
  } catch (error) {
    console.log("Error - No fue posible eliminar el paciente.");
  }

};

module.exports = {
  getPatient,
  postPatient,
  putPatient,
  detelePatient,
  getPatientUser,
};
