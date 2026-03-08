const mongoose = require("mongoose");

const noticeSchema = new mongoose.Schema(
  {
    title: String,

    message: String,

    audience: {
      type: String,
      enum: ["students", "teachers", "parents", "all"],
      default: "all",
    },

    publishedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Notice", noticeSchema);
