const Enrollment = require("../models/Enrollment");

// ================= ENROLL COURSE =================
exports.enrollCourse = async (req, res) => {
  try {
    const userId = req.user._id;
    const { courseId, courseTitle } = req.body;

    if (!courseId) {
      return res.status(400).json({
        message: "Course ID is required"
      });
    }

    // 🔍 Check already enrolled
    const existing = await Enrollment.findOne({
      user: userId,
      courseId
    });

    if (existing) {
      return res.status(200).json({
        message: "Already enrolled",
        enrolled: true,
        paid: existing.paid
      });
    }

    // ✅ Create new enrollment
    const enrollment = new Enrollment({
      user: userId,
      courseId,
      courseTitle,
      paid: false
    });

    await enrollment.save();

    res.status(201).json({
      message: "Enrollment successful",
      enrolled: true,
      paid: false,
      courseId
    });

  } catch (err) {
    console.error("Enrollment error:", err);
    res.status(500).json({
      message: "Enrollment failed",
      error: err.message
    });
  }
};


// ================= GET STATUS =================
exports.getEnrollmentStatus = async (req, res) => {
  try {
    const userId = req.user._id;
    const { courseId } = req.params;

    const enrollment = await Enrollment.findOne({
      user: userId,
      courseId
    });

    if (!enrollment) {
      return res.json({
        enrolled: false,
        paid: false
      });
    }

    res.json({
      enrolled: true,
      paid: enrollment.paid
    });

  } catch (err) {
    res.status(500).json({
      message: "Error fetching status",
      error: err.message
    });
  }
};


// ================= UNLOCK COURSE (TEMP / FAKE PAYMENT) =================
exports.unlockCourse = async (req, res) => {
  try {
    const userId = req.user._id;
    const { courseId } = req.body;

    const enrollment = await Enrollment.findOneAndUpdate(
      { user: userId, courseId },
      {
        paid: true,
        paymentDate: new Date()
      },
      { new: true }
    );

    if (!enrollment) {
      return res.status(404).json({
        message: "Enrollment not found"
      });
    }

    res.json({
      message: "Course unlocked successfully",
      paid: true
    });

  } catch (err) {
    res.status(500).json({
      message: "Unlock failed",
      error: err.message
    });
  }
};