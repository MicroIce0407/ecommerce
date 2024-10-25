require("dotenv").config();
const paypal = require("@paypal/checkout-server-sdk");
const Product = require("../models/Product");
const Order = require("../models/Order");
const Cart = require("../models/Cart");
const { createPayPalPayment } = require("./paymentController");
const paypalClient = require("../config/paypal");

const updateOrderStatusAndRedirect = async (
  orderId,
  status,
  res,
  redirectUrl
) => {
  try {
    await Order.findOneAndUpdate({ _id: orderId }, { status: status });
    console.log(
      `Redirecting to: ${process.env.FRONTEND_URL}/order-confirmation`
    );
    res.redirect(`${process.env.FRONTEND_URL}/order-confirmation`);
  } catch (error) {
    res.redirect(`${process.env.FRONTEND_URL}/order-failed`);
  }
};

const getOrder = async (req, res) => {
  try {
    const userId = req.params.userId;
    const orders = await Order.find({ userId });

    if (orders) {
      res.status(200).json(orders);
    } else {
      res.status(404).json({ message: "Orders not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error getting User's orders" });
  }
};

const createOrder = async (req, res) => {
  const { items, totalPrice, userId, address, paymentMethod } = req.body;

  try {
    const detailedItems = await Promise.all(
      items.map(async (item) => {
        const product = await Product.findById(item.productId);
        if (!product) {
          throw new Error(`Product with ID ${item.productId} not found`);
        }

        return {
          productId: product._id,
          title: product.title,
          price: product.price,
          quantity: item.quantity,
          totalPrice: product.price * item.quantity,
        };
      })
    );

    const newOrder = new Order({
      userId: userId,
      items: detailedItems,
      totalPrice,
      address,
      paymentMethod,
      status: "pending",
    });

    await newOrder.save();

    if (paymentMethod === "paypal") {
      const paypalLink = await createPayPalPayment(newOrder);
      res.status(200).json({ paymentUrl: paypalLink });
    } else if (paymentMethod === "homeDelivery") {
      await updateOrderStatusAndRedirect(
        newOrder._id,
        "completed",
        res,
        `${process.env.FRONTEND_URL}/order-confirmation`
      );
    } else {
      res.status(400).json({ message: "Invalid payment method" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error creating order", error });
  }
};

const payForSuccess = async (req, res) => {
  const { token, orderId, userId } = req.query;

  try {
    const request = new paypal.orders.OrdersCaptureRequest(token);
    request.requestBody({});

    const captureResponse = await paypalClient.execute(request);

    if (captureResponse.result.status === "COMPLETED") {
      await Cart.findOneAndDelete({ userId });
      await updateOrderStatusAndRedirect(
        orderId,
        "completed",
        res,
        `${process.env.FRONTEND_URL}/order-confirmation`
      );
    } else {
      res.redirect(`${process.env.FRONTEND_URL}/order-failed`);
    }
  } catch (error) {
    console.log("Error capturing PayPal order:", error);
    res.redirect(`${process.env.FRONTEND_URL}/order-failed`);
  }
};

const payForCancel = async (req, res) => {
  res.redirect(`${FRONTEND_URL}/cart`);
};

module.exports = { getOrder, createOrder, payForSuccess, payForCancel };
