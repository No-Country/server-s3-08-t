const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.PATHDB_MONGO);
  } catch (error) {}
};

module.exports = dbConnection;
