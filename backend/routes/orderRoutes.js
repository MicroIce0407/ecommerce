const express = require("express");
const router = express.Router();
const {
  getOrder,
  createOrder,
  payForSuccess,
  payForCancel,
} = require("../controllers/orderController");

router.post("/", createOrder);

router.get("/success", payForSuccess);

router.get("/cancel", payForCancel);

router.get("/:userId", getOrder);

module.exports = router;
