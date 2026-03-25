const express = require("express");
const router = express.Router();
router.get("/", async (req, res) => {
  try {
    const Course = require("../models/Course");
    const courses = await Course.find({});
    res.json({ success: true, courses });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;
