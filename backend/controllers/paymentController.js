require("dotenv").config();
const paypal = require("@paypal/checkout-server-sdk");
const paypalClient = require("../config/paypal");

const createPayPalPayment = async (order) => {
  const request = new paypal.orders.OrdersCreateRequest();

  request.prefer("return=representation");
  request.requestBody({
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: order.totalPrice.toString(),
        },
      },
    ],
    application_context: {
      return_url: `${process.env.BACKEND_URL}/api/orders/success?orderId=${order._id}&userId=${order.userId}`,
      cancel_url: `${process.env.BACKEND_URL}/api/orders/cancel`,
    },
  });

  try {
    const response = await paypalClient.execute(request);
    return response.result.links.find((link) => link.rel === "approve").href; // 返回用戶支付的連結
  } catch (error) {
    console.error("Error creating PayPal payment:", error);
    throw error;
  }
};

module.exports = { createPayPalPayment };
