const mongoose = require("mongoose");

const billboardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    season: {
      type: String,
      required: false,
      enum: ["SUMMER", "WINTER"],
    },
    gender: {
      type: String,
      required: false,
      enum: ["MALE", "FEMALE", "UNISEX"],
    },
  },
  { timestamps: true }
);

const Billboard = mongoose.model("Billboard", billboardSchema);

module.exports = Billboard;
