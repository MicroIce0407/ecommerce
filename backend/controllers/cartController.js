const Decimal = require("decimal.js");
const Cart = require("../models/Cart");

const addToCart = async (req, res) => {
  const { userId, productId, quantity, price } = req.body;

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        items: [{ productId, quantity, totalPrice: price }],
      });
    } else {
      const existingItemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId
      );

      const existingItem = cart.items[existingItemIndex];

      if (existingItemIndex >= 0) {
        existingItem.quantity += quantity;
        existingItem.totalPrice = new Decimal(existingItem.totalPrice).plus(
          price
        );
      } else {
        cart.items.push({ productId, quantity, totalPrice: price });
      }
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error adding item to cart", error });
  }
};

const removeFromCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ userId }).populate("items.productId");

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const existingItemIndex = cart.items.findIndex(
      (item) => item.productId._id.toString() === productId
    );

    const existingItem = cart.items[existingItemIndex];
    const productPrice = existingItem.productId.price; // 從填充的商品中獲取價格

    if (existingItem.quantity > 1) {
      existingItem.quantity -= quantity;
      existingItem.totalPrice = new Decimal(existingItem.totalPrice).minus(
        productPrice
      );
    } else {
      cart.items = cart.items.filter(
        (item) => item.productId._id.toString() !== productId
      );
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error removing item from cart", error });
  }
};

const getCart = async (req, res) => {
  const { userId } = req.params;

  try {
    let cart = await Cart.findOne({ userId }).populate("items.productId");

    if (!cart) {
      cart = new Cart({ userId, items: [], totalPrice: 0 });
    }

    cart.items = cart.items.filter((item) => item.productId !== null);

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart", error });
  }
};

const deleteCart = async (req, res) => {
  userId = req.body.userId;

  try {
    const cart = await Cart.findOneAndDelete({ userId });

    if (cart) {
      res.status(200).json({ message: "Cart deleted successfully" });
    } else {
      res.status(404).json({ message: "Cart not found" });
    }
  } catch (e) {
    res.status(500).json({ message: "Error deleting cart", error });
  }
};

module.exports = {
  addToCart,
  removeFromCart,
  getCart,
  deleteCart,
};
