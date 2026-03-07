const mongoose = require("mongoose");

module.exports = function connectToMongo() {
  try {
    mongoose.connect("mongodb://localhost:27017").then(() => {
      console.log("Connected to database");
    });
  } catch (error) {
      console.log("Error connecting to database");
  }
};
