const express = require("express");
const router = express.Router();
const Enrollment = require("../models/Enrollment");
router.post("/", async (req, res) => {
  try {
    const { userId, courseId, name, email, phone } = req.body;
    const enrollment = await Enrollment.findOneAndUpdate(
      { userId, courseId },
      { userId, courseId, name, email, phone, status: "pending" },
      { upsert: true, new: true }
    );
    res.json({ success: true, enrollment });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;
