const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");
const crypto = require("crypto");
const Enrollment = require("../models/Enrollment");
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});
router.post("/create-order", async (req, res) => {
  try {
    const { amount, courseId, userId } = req.body;
    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100),
      currency: "INR",
      receipt: `receipt_${courseId}_${Date.now()}`,
    });
    res.json({ success: true, orderId: order.id, amount: order.amount, currency: order.currency, keyId: process.env.RAZORPAY_KEY_ID });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.post("/verify", async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, courseId, userId, name, email, phone } = req.body;
    const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
    hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const generated = hmac.digest("hex");
    if (generated !== razorpay_signature) {
      return res.status(400).json({ success: false, error: "Payment verification failed" });
    }
    const enrollment = await Enrollment.findOneAndUpdate(
      { userId, courseId },
      { userId, courseId, name, email, phone, paymentId: razorpay_payment_id, orderId: razorpay_order_id, status: "active" },
      { upsert: true, new: true }
    );
    res.json({ success: true, enrollment });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;
