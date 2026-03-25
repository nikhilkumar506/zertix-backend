const express = require("express");
const Razorpay = require("razorpay");
const Enrollment = require("../models/Enrollment");

const router = express.Router();

const razorpay = new Razorpay({
  key_id: "YOUR_KEY",
  key_secret: "YOUR_SECRET",
});

// ✅ Create Order
router.post("/create-order", async (req, res) => {
  try {
    const options = {
      amount: 49900, // ₹499
      currency: "INR",
    };

    const order = await razorpay.orders.create(options);
    res.json(order);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Verify Payment
router.post("/verify-payment", async (req, res) => {
  try {
    const { paymentId, userId, courseId } = req.body;

    await Enrollment.findOneAndUpdate(
      { user: userId, courseId },
      {
        paid: true,
        paymentId,
        paymentDate: new Date()
      }
    );

    res.json({ success: true });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// ✅ TEMP TEST ROUTE (GET)
router.get("/create-order", async (req, res) => {
  res.json({ message: "Payment route working ✅" });
});

module.exports = router;