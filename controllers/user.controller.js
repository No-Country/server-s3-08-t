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

  // Password Encrypt

  // Send to Rep
  await user.save();

  res.status(201).json({
    msg: "Create User - Success",
    user,
  });
};

module.exports = {
  getUser,
  postUser,
};
