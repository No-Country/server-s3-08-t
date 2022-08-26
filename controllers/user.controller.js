const { response, request } = require("express");
const User = require("../models/users");

//? GET method
const getUser = async (req = request, res = response) => {
  const userData = await User.find({ state: true });
  res.json({ userData });
};

//? POST Method
const postUser = async (req = request, res = response) => {
  const body = req.body;
  const user = new User(body);

  if (user) {
    res.status(400).json({
      msg: "El usuario ya se encuentra registrado",
    });
  }

  // Password Encrypt

  // Send to Rep
  await user.save();

  res.status(201).json({
    msg: "Create User - Success",
    user,
  });
};

const putUser = async (req = request, res = response) => {
  const { id } = req.params;

  const { password, _id, dni, ...resto } = req.body;

  const userUpdate = await User.findByIdAndUpdate(id, resto);

  res.status(200).json({
    msg: "Success Update",
    userUpdate,
  });
};

const deteleUser = async (req = request, res = response) => {
  const { id } = req.params;
  const userDelete = await User.findByIdAndUpdate(id, { state: false });

  res.status(200).json({
    msg: "Success Delete",
    userDelete,
  });
};

module.exports = {
  getUser,
  postUser,
  putUser,
  deteleUser,
};
