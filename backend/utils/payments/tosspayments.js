// utils/payments/tosspayments.js

// We expect dotenv to be configured in your main server.js/app.js.
// Accessing process.env directly here assumes it's already loaded.
const axios = require("axios");

// Important: Toss Payments Secret Key and API Base URL should be loaded from environment variables
const TOSS_SECRET_KEY = process.env.TOSS_SECRET_KEY;
const TOSS_API_BASE_URL = process.env.TOSS_API_BASE_URL;

// Validate that the secret key is set
if (!TOSS_SECRET_KEY) {
  console.error("TOSS_SECRET_KEY environment variable is not set.");
  // In a real application, you might want to throw an error or exit the process
  // if this critical variable is missing at startup.
}

// Helper for Toss Payments API Authorization header
const getAuthHeader = () => {
  // Authorization uses Basic Auth with Secret Key, base64 encoded
  const authString = `${TOSS_SECRET_KEY}:`;
  return Buffer.from(authString).toString("base64");
};

/**
 * Initiates a payment request with Toss Payments.
 * This sends the payment details to Toss and receives a checkout URL for the user.
 * @param {object} options - Payment details.
 * @param {number} options.amount - The payment amount.
 * @param {string} options.orderId - A unique ID for the order from your system.
 * @param {string} options.orderName - Name of the order (e.g., "Tip for Creator").
 * @param {string} options.successUrl - URL Toss redirects to on successful payment.
 * @param {string} options.failUrl - URL Toss redirects to on failed payment.
 * @returns {Promise<object>} - Response data from Toss, including checkoutUrl and paymentKey.
 * @throws {Error} - If the API call fails.
 */
async function createTossPaymentRequest({
  amount,
  orderId,
  orderName,
  successUrl,
  failUrl,
}) {
  try {
    const requestBody = {
      amount,
      orderId,
      orderName,
      successUrl,
      failUrl,
      // Add other necessary fields if required by your specific Toss Payments integration
      // e.g., customerEmail, customerName, flowMode: 'DIRECT', easyPay: { ... }
    };

    const response = await axios.post(
      `${TOSS_API_BASE_URL}/payments`, // Correct endpoint for initial payment request
      requestBody,
      {
        headers: {
          Authorization: `Basic ${getAuthHeader()}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data; // Return the full data, controller will extract checkoutUrl etc.
  } catch (error) {
    console.error(
      "Error in createTossPaymentRequest:",
      error.response
        ? JSON.stringify(error.response.data, null, 2)
        : error.message
    );
    throw new Error(
      "Failed to initiate Toss Payment: " +
        (error.response && error.response.data
          ? JSON.stringify(error.response.data)
          : error.message)
    );
  }
}

/**
 * Confirms a payment with Toss Payments after user completion.
 * This is the final step to verify the payment and charge the customer.
 * @param {object} options - Confirmation details.
 * @param {string} options.paymentKey - The payment key obtained after user completes payment on Toss.
 * @param {string} options.orderId - The order ID from your system.
 * @param {number} options.amount - The payment amount confirmed by Toss.
 * @returns {Promise<object>} - Payment details from Toss Payments confirmation.
 * @throws {Error} - If the API call fails or details are missing.
 */
async function confirmTossPayment({ paymentKey, orderId, amount }) {
  if (!paymentKey || !orderId || !amount) {
    throw new Error("Missing paymentKey, orderId, or amount for confirmation.");
  }

  try {
    const tossResponse = await axios.post(
      `${TOSS_API_BASE_URL}/payments/confirm`, // Endpoint for payment confirmation
      {
        paymentKey,
        orderId,
        amount,
      },
      {
        headers: {
          Authorization: `Basic ${getAuthHeader()}`,
          "Content-Type": "application/json",
        },
      }
    );

    return tossResponse.data;
  } catch (error) {
    console.error(
      "Error in confirmTossPayment:",
      error.response
        ? JSON.stringify(error.response.data, null, 2)
        : error.message
    );
    throw new Error(
      "Failed to confirm Toss Payment: " +
        (error.response && error.response.data
          ? JSON.stringify(error.response.data)
          : error.message)
    );
  }
}

module.exports = {
  createTossPaymentRequest,
  confirmTossPayment,
};
