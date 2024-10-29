const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const {
  addToCart,
  removeFromCart,
  getCart,
  deleteCart,
} = require("../controllers/cartController");

router.post("/add", addToCart);

router.post("/remove", removeFromCart);

router.get("/:userId", protect, getCart);

router.delete("/clear", deleteCart);

module.exports = router;
