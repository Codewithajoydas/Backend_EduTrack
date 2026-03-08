const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    firstName: String,

    lastName: String,

    email: String,

    phone: String,

    rollNumber: {
      type: Number,
      required: true,
    },

    section: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Section",
    },

    class: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
    },

    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Parent",
    },

    admissionDate: Date,
  },
  { timestamps: true },
);

module.exports = mongoose.model("Student", studentSchema);
