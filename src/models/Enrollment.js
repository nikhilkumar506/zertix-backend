const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  courseId: {
    type: String,
    required: true
  },

  courseTitle: {
    type: String,
    default: ""
  },

  enrolledAt: {
    type: Date,
    default: Date.now
  },

  progress: {
    type: Number,
    default: 0
  },

  lastLesson: {
    type: String,
    default: "lesson1"
  },

  completed: {
    type: Boolean,
    default: false
  },

  // 🔥 PAYMENT SYSTEM FIELDS
  paid: {
    type: Boolean,
    default: false
  },

  paymentId: {
    type: String,
    default: null
  },

  paymentDate: {
    type: Date,
    default: null
  }

});

// 🔥 Prevent duplicate enrollment (important)
enrollmentSchema.index({ user: 1, courseId: 1 }, { unique: true });

module.exports = mongoose.models.Enrollment || mongoose.model("Enrollment", enrollmentSchema);