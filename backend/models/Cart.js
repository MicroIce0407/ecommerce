const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, // 指定字段類型為 ObjectId，用於引用其他文檔
    ref: "User", // 這個字段引用 "User" 集合中的文檔
    required: true,
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: [1, "Quantity connot be less than 1."],
      },
      totalPrice: {
        type: Number,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("Cart", cartSchema);
