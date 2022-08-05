const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.PATHDB_MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Online Data Base");
  } catch (error) {
    throw new Error("Error - Database Connection");
  }
};

module.exports = dbConnection;
