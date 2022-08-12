const { Schema, model, default: mongoose } = require("mongoose");

const PatientSchema = Schema(
  {
    dni: {
      type: String,
      required: [true, "DNI - This is a required field"],
    },

    name: {
      type: String,
      required: [true, "Name - This is a required field"],
    },
    userEmail: {
      type: String,
      required: [true, "Email - This is a required field"],
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone - This is a required field"],
    },
    address: {
      type: String,
      required: [true, "Address - This is a required field"],
    },
    city: {
      type: String,
      required: [true, "City - This is a required field"],
    },
    country: {
      type: String,
      required: [true, "Country - This is a required field"],
    },
    user: {
      type: mongoose.Types.ObjectId,
    },
  },
  {
    timesTamps: true,
    versionKey: false,
  }
);

// ! Redfinir Metodo toString para no retornar la version y la contraseña
PatientSchema.methods.toJSON = function () {
  const { __v, _id, ...patient } = this.toObject();
  patient.uid = _id;
  return patient;
};

module.exports = model("Patients", PatientSchema);
