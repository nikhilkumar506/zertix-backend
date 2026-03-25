const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

app.use("/api/courses", require("./routes/course.routes"));
app.use("/api/enroll", require("./routes/enrollment.routes"));
app.use("/api/payment", require("./routes/payment.routes"));

app.get("/", (req, res) => {
  res.json({ status: "SkilllCertify API running" });
});

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

module.exports = app;