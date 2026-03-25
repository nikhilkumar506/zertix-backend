require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = require("./src/app");

const PORT = process.env.PORT || 10000;

/* ------------ Middlewares ------------ */

app.use(cors({
  origin: "*",
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization"]
}));

app.options("*", cors()); // Netlify frontend ko allow karega
app.use(express.json());

/* ------------ Test Route ------------ */

app.get("/", (req, res) => {
  res.json({ status: "SkilllCertify API running" });
});

/* ------------ MongoDB Connect ------------ */

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB Error:", err);
  });