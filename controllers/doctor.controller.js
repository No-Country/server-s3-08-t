const { response, request } = require("express");
const Doctors = require("../models/doctors");
const Type = require("../models/doctorTypes");

const getDoctor = async (res = response) => {
  const doctorData = await Doctors.find({ state: true});
  res.json({ doctorData });
};

const getDoctorUser = async (req = request, res = response) => {
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
      msg: "No existe el usuario de este paciente",
    });
  }
  res.json({ userDoctor });
};

const postDoctor = async (req = request, res = response) => {
  const body = req.body;
  const doctor = new Doctors(body);

  // Password Encrypt

  // Send to Rep
  await doctor.save();

  try {
    res.status(201).json({
      msg: "Create Doctor - Success",
      doctor,
    });
  } catch (error) {
    console.log("Error - No fue posible crear al doctor.");
  }
};

const putDoctor = async (req = request, res = response) => {
  const { id } = req.params;

  const { password, _id, dni, email, ...resto } = req.body;

  const doctorUpdate = await Doctors.findByIdAndUpdate(id, resto);

  try {
    res.status(200).json({
      msg: "Success Update",
      doctorUpdate,
    });
  } catch (error) {
    console.log("Error - No fue posible subir los cambios.");
  }
};

const deleteDoctor = async (req = request, res = response) => {
  const { id } = req.params;
  const doctorDelete = await Doctors.findByIdAndUpdate(id, { state: false });

  try {
    res.status(200).json({
      msg: "Success Delete",
      doctorDelete,
    });
  } catch (error) {
    console.log("Error - No fue posible eliminar el paciente.");
  };

};


module.exports = {
  getDoctor,
  getDoctorUser,
  postDoctor,
  putDoctor,
  deleteDoctor
};
