const { Schema, model } = require("mongoose");

const UserSchema = Schema({
  dni: {
    type: String,
    required: [true, "DNI - This is a required field"],
  },

  name: {
    type: String,
    required: [true, "Name - This is a required field"],
  },
  email: {
    type: String,
    required: [true, "Email - This is a required field"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password - This is a required field"],
  },
  address: {
    type: String,
    required: [true, "Address - This is a required field"],
  },
  city: {
    type: String,
    required: [true, "City - This is a required field"],
  },
  phoneNumber: {
    type: String,
    required: [true, "Phone - This is a required field"],
  },
  role: {
    type: String,
    required: [true, "Rol - This is a required field"],
    enum: ["ADMIN_ROLE", "USER_ROLE", "DOCTOR_ROLE"],
  },
  state: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
  img: {
    type: String,
  },
  rating: {
    type: Number,
    default: 0,
  },
});

// ! Redfinir Metodo toString para no retornar la version y la contraseña
UserSchema.methods.toJSON = function () {
  const { __v, password, _id, ...user } = this.toObject();
  user.uid = _id;
  return user;
};

module.exports = model("Users", UserSchema);
