const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 8080;

const userRoutes = require("./route/user");
const doctorRoutes = require("./route/doctor");
const appointmentRoutes = require("./route/appointment");
// const appRoutes = require("./route/appointments");
// const imageRoutes = require("./route/image");

const sosRoute = require('./route/sosRoute');

const URI = process.env.DB_URI || "mongodb://localhost:27017/healthcare"

mongoose
  .connect(URI)
  .then(() => {
    console.log("⚡ Database Connected");
  })
  .catch((e) => {
    console.log(e);
  });

app.use(cors());
app.use(bodyParser.json());

// app.use(express.static("images"));
app.use(userRoutes);
app.use(doctorRoutes);
// app.use(prescriptionRoutes);
app.use(appointmentRoutes);
// app.use(imageRoutes);
// Use the SOS route
app.use(sosRoute);


app.listen(port, () => {
  console.log("✅ App is running on port", port);
});
