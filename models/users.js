const { Schema, model } = require("mongoose");

const UserSchema = Schema(
  {
    dni: {
      type: String,
      required: [true, "DNI - This is a required field"],
    },
    userName: {
      type: String,
      required: [true, "Name - This is a required field"],
    },
    password: {
      type: String,
      required: [true, "Password - This is a required field"],
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
      default: "http://assets.stickpng.com/thumbs/585e4bcdcb11b227491c3396.png",
    },
    rating: {
      type: Number,
      default: 0,
    },
  },
  {
    timesTamps: true,
    versionKey: false,
  }
);

// ! Redfinir Metodo toString para no retornar la version y la contraseña
UserSchema.methods.toJSON = function () {
  const { __v, password, _id, ...user } = this.toObject();
  user.uid = _id;
  return user;
};

module.exports = model("Users", UserSchema);