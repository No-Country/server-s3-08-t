const { Schema } = require("mongoose");

const Roles = Schema({
  role: {
    type: String,
    require: [true, "Role - Is required"],
  },
});

module.exports = Roles;
