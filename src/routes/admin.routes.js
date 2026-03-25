import express from "express";
import Course from "../models/course.js";

const router = express.Router();

/* ✅ ADD COURSE */
router.post("/add-course", async (req, res) => {
  try {
    const { id, title, price } = req.body;

    const course = new Course({
      id,
      title,
      price,
      weeks: []
    });

    await course.save();

    res.json({ message: "Course added successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ✅ ADD WEEK CONTENT */
router.post("/add-week", async (req, res) => {
  try {
    const { courseId, week, title, content } = req.body;

    const course = await Course.findOne({ id: courseId });

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    course.weeks.push({
      week,
      title,
      content
    });

    await course.save();

    res.json({ message: "Week added successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ✅ GET COURSE */
router.get("/course/:id", async (req, res) => {
  try {
    const course = await Course.findOne({ id: req.params.id });
    res.json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;