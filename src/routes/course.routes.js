const express = require("express");
const router = express.Router();

const courseController = require("../controllers/course.controller");
const protect = require("../middleware/auth.middleware"); // 🔥 ADD THIS

// 🔥 PROTECTED – browse courses with user context
router.get("/", protect, courseController.getAllCourses);

module.exports = router;