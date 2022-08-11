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

module.exports = model("Type", doctorTypeSchema);
