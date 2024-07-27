const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("DATABASE CONNECTED");
    });

    mongoose.connection.on("error", (err) => {
      console.log("Error in connecting to database.", err);
    });

    await mongoose.connect(
      process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/huba"
    );
  } catch (err) {
    console.error("Failed to connect to database.", err);
    process.exit(1);
  }
};

module.exports = connectDB;
