const Course = require("../models/Course");
const Enrollment = require("../models/Enrollment");

exports.getAllCourses = async (req, res) => {
  try {
    const userId = req.user?._id; // 🔥 current user

    const courses = await Course.find();

    // 🔥 user ke enrollments nikaalo
    const enrollments = userId
      ? await Enrollment.find({ user: userId })
      : [];

    const result = courses.map(course => {
      const enrollment = enrollments.find(
        e => e.courseId === course._id.toString()
      );

      return {
        _id: course._id,
        title: course.title,
        description: course.description,

        // 🔥 REAL DATA
        isEnrolled: !!enrollment,
        isPaid: enrollment ? enrollment.paid : false
      };
    });

    res.json(result);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to load courses" });
  }
};