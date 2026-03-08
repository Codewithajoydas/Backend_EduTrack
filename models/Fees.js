const mongoose = require("mongoose");

const feesSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },

    amount: Number,

    dueDate: Date,

    status: {
      type: String,
      enum: ["paid", "unpaid", "partial"],
      default: "unpaid",
    },

    paymentDate: Date,
  },
  { timestamps: true },
);

module.exports = mongoose.model("Fees", feesSchema);
