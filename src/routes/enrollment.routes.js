const express = require("express");
const router = express.Router();

const protect = require("../middleware/auth.middleware");

const {
  enrollCourse,
  getEnrollmentStatus,
  unlockCourse
} = require("../controllers/enrollment.controller");

// Enroll
router.post("/", protect, enrollCourse);

// Status
router.get("/status/:courseId", protect, getEnrollmentStatus);

// Unlock (temporary)
router.post("/unlock", protect, unlockCourse);

module.exports = router;