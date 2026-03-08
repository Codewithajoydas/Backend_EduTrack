const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema(
  {
    firstName: String,

    lastName: String,

    email: {
      type: String,
      unique: true,
    },

    phone: String,

    subjects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject",
      },
    ],

    sections: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Section",
      },
    ],

    hireDate: Date,
  },
  { timestamps: true },
);

module.exports = mongoose.model("Teacher", teacherSchema);
