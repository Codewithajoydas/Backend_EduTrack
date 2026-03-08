const mongoose = require("mongoose");

const schoolSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    address: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
    },

    email: {
      type: String,
    },

    website: {
      type: String,
    },

    logo: {
      type: String,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("School", schoolSchema);
