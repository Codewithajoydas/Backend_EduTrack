const mongoose = require("mongoose");

const parentSchema = new mongoose.Schema(
  {
    fatherName: String,
    motherName: String,

    phone: String,

    email: String,

    address: String,

    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Parent", parentSchema);
