const express = require("express");
const app = express();
const cors = require("cors");
const contactRoutes = require("./routes/contactRoutes");

app.use(cors());

app.use(express.json());

app.use("/api/contact", contactRoutes);

module.exports = app;
