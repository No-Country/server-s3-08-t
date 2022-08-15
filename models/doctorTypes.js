const { Schema, model } = require("mongoose");

const doctorTypeSchema = Schema(
  {
    nameType: {
      type: String,
      required: [true, "Type - Is required"],
      unique: true,
    },
  },
  {
    timesTamps: true,
    versionKey: false,
  }
);

// ! Redfinir Metodo toString para no retornar la version y la contraseña
doctorTypeSchema.methods.toJSON = function () {
  const { __v, _id, password, ...doctor } = this.toObject();
  doctor.uid = _id;
  return doctor;
};

module.exports = model("Type", doctorTypeSchema);
