const { Schema, model, default: mongoose } = require("mongoose");

const DoctorPruebaSchema = Schema(
  {
    dni: {
      type: String,
      required: [true, "dni - Is required"],
      unique: true,
    },
    doctorName: {
      type: String,
      required: [true, "doctorName - Is required"],
    },

    doctorEmail: {
      type: String,
      required: [true, "doctorEmail - Is required"],
      unique: true,
    },

    doctorAddress: {
      type: String,
      required: [true, "doctorAddress - Is required"],
    },

    doctorCity: {
      type: String,
      required: [true, "doctorCity - Is required"],
    },

    doctorCountry: {
      type: String,
      required: [true, "doctorCountry - Is required"],
    },

    doctorPhone: {
      type: String,
      required: [true, "doctoPhone - Is required"],
    },

    user: {
      type: mongoose.Types.ObjectId,
    },

    inquiry: [{
      type: Schema.Types.ObjectId,
      ref: "Inquiry"
    }],

    type: {
      type: Array,
      default: [],
    },
  },
  {
    timesTamps: true,
    versionKey: false,
  }
);

// ! Redfinir Metodo toString para no retornar la version y la contraseña
DoctorPruebaSchema.methods.toJSON = function () {
  const { __v, _id, password, ...doctor } = this.toObject();
  doctor.uid = _id;
  return doctor;
};

module.exports = model("DoctorPrueba", DoctorPruebaSchema);