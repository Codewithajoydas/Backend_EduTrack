const mongoose = require("mongoose");

const librarySchema = new mongoose.Schema(
  {
    bookTitle: String,

    author: String,

    isbn: String,

    quantity: Number,

    available: Number,
  },
  { timestamps: true },
);

module.exports = mongoose.model("Library", librarySchema);
