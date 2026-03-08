const mongoose = require("mongoose");

const transportSchema = new mongoose.Schema(
  {
    vehicleNumber: String,

    driverName: String,

    driverPhone: String,

    route: String,

    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Transport", transportSchema);
