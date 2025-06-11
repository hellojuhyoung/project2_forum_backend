// routes/paymentRoutes.js
const express = require("express");
const router = express.Router();

// Import the controller functions
const {
  initiateTossPayment,
  confirmTossPaymentCallback,
} = require("../controllers/PaymentController"); // Adjust path based on your exact structure

// Define the API routes for Toss Payments
// POST /toss-payment-request to initiate a payment (backend calls Toss)
router.post("/request", initiateTossPayment);

// POST /toss-payment-confirm to securely confirm a payment (backend confirms with Toss)
router.post("/confirm", confirmTossPaymentCallback);

module.exports = router;
