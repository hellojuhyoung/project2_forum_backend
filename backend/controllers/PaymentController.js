// controllers/paymentController.js
const {
  createTossPaymentRequest,
  confirmTossPayment,
} = require("../utils/payments/tosspayments");

/**
 * Handles the initiation of a Toss Payment request.
 * This function will be linked to a POST /api/toss-payment-request route.
 */
async function initiateTossPayment(req, res) {
  const { amount, orderId, orderName } = req.body;

  // Retrieve success and fail URLs from environment variables
  // Provide fallbacks for local development if env vars aren't set
  const BASE_SUCCESS_URL = process.env.BACKEND_SUCCESS_URL;
  const BASE_FAIL_URL = process.env.BACKEND_FAIL_URL;

  const successUrl = `${BASE_SUCCESS_URL}?orderId=${orderId}&amount=${amount}`;
  const failUrl = `${BASE_FAIL_URL}?orderId=${orderId}`;

  // TODO: Add database logic here to create a pending TipOrder entry
  // This step is crucial for verifying the payment later in confirmTossPaymentCallback.
  // Example: await TipOrder.create({ orderId, amount, status: 'pending', ... });

  try {
    const paymentData = await createTossPaymentRequest({
      amount,
      orderId,
      orderName,
      successUrl,
      failUrl,
    });

    res.status(200).json(paymentData);
  } catch (error) {
    console.error("Error in initiateTossPayment controller:", error.message);
    // TODO: If the payment initiation fails, you might want to remove or mark the
    // TipOrder created above as 'failed' in your database.

    // Suggestion: For more robust error handling, avoid relying solely on error message strings.
    // If your `createTossPaymentRequest` utility provides specific error codes or types, use those.
    const statusCode =
      error.message.includes("Invalid tip amount") ||
      error.message.includes("Missing required fields")
        ? 400 // Bad request
        : 500; // Internal server error
    res.status(statusCode).json({ error: error.message });
  }
}

/**
 * Handles the confirmation of a Toss Payment after user completes it.
 * This function will be linked to a POST /api/toss-payment-confirm route.
 */
async function confirmTossPaymentCallback(req, res) {
  // Keeping these exact 3 variables as requested
  const { paymentKey, orderId, amount } = req.body;

  try {
    const paymentDetails = await confirmTossPayment({
      paymentKey,
      orderId,
      amount,
    });

    // --- IMPORTANT: Update your database here ---
    // This is the critical step for your application's logic to prevent fraud
    // and ensure payment integrity.
    // 1. Find the `TipOrder` in your database using `orderId`.
    //    (e.g., `const tipOrder = await TipOrder.findOne({ orderId });`)
    // 2. Verify `tipOrder` exists, its `amount` matches the confirmed `amount`,
    //    and its `status` is 'pending' (to prevent double processing).
    /*
    if (!tipOrder || tipOrder.amount !== Number(amount) || tipOrder.status !== 'pending') {
      // Log suspicious activity or handle mismatch
      throw new Error('Order mismatch or already processed for orderId: ' + orderId);
    }
    */
    // 3. Mark the `TipOrder` as 'completed' in your database.
    //    (e.g., `tipOrder.status = 'completed'; tipOrder.paymentKey = paymentKey; await tipOrder.save();`)
    // 4. (Optional, for full functionality) Update the recipient user's earned tips balance.
    //    (e.g., `await User.findByIdAndUpdate(tipOrder.recipientUserId, { $inc: { balance: amount } });`)

    res.status(200).json({
      message: "Payment confirmed successfully!",
      paymentDetails: paymentDetails,
    });
  } catch (error) {
    console.error(
      "Error in confirmTossPaymentCallback controller:",
      error.message
    );
    // TODO: If confirmation fails, you might want to mark the TipOrder as 'failed' in your database.
    res.status(400).json({
      error: "Failed to confirm Toss Payment",
      details: error.message,
    });
  }
}

module.exports = {
  initiateTossPayment,
  confirmTossPaymentCallback,
};
