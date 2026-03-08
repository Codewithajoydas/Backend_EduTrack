const express = require("express");
const app = express();
require("dotenv").config();
const connectToMongo = require("./config/mongoose.config.js");
connectToMongo();
const cors = require("cors");
const authMiddleware = require("./middleware/authentication.middle.js");
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  }),
);
// app.options("*", cors());

app.get("/",  (req, res) => {
  res.send("This is backend of Edutrack.");
});

app.use("/api/authorization", require("./routes/authorization.js"));
app.use("/api/authentication", require("./routes/authentication.js"));
app.use("/api/forgotPassword", require("./routes/fotgotPassword.js"));
app.use('/api/resetPassword', require('./routes/resetPassword.js'));
app.use('/api/getUserDetails', require('./routes/getUserDetails.js'));
app.listen(8080, () => {
  console.log("Server is running on http://localhost:8080");
});
