const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const {
  getOrder,
  createOrder,
  payForSuccess,
  payForCancel,
} = require("../controllers/orderController");

router.post("/", createOrder);

router.get("/success", payForSuccess);

router.get("/cancel", payForCancel);

router.get("/:userId", protect, getOrder);

module.exports = router;
