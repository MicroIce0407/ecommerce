import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchCart,
  addItemToCart,
  removeItemFromCart,
  clearCart,
} from "../Store/CartSlice";
import CartItem from "./CartItem";

const Cart = ({ closeCart, showNotification }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const loading = useSelector((state) => state.cart.loading);
  const error = useSelector((state) => state.cart.error);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const addItemHandle = useCallback(
    (item) => {
      dispatch(addItemToCart(item.productId));
    },
    [dispatch]
  );

  const removeItemHandle = useCallback(
    (id) => {
      dispatch(removeItemFromCart(id));
    },
    [dispatch]
  );

  const clearCartHandle = useCallback(() => {
    dispatch(clearCart());
  }, [dispatch]);

  const checkoutHandle = () => {
    if (cartItems.length === 0) {
      showNotification("購物車沒有東西啊!", "error");
      return;
    }
    navigate("/checkout");
    closeCart();
  };

  if (loading || error) {
    return (
      <div className="fixed inset-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-5 rounded-xl shadow-lg max-w-lg w-full">
          <p>{loading ? "Loading..." : `Error: ${error}`}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-10"
      onClick={closeCart}
    >
      <div
        className="bg-white p-5 rounded-xl shadow-lg max-w-lg w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4">Shopping Cart</h2>
        {cartItems.length === 0 ? (
          <h1>購物車目前沒有東西唷!</h1>
        ) : (
          <ul className="space-y-3">
            {cartItems.map((item) => (
              <CartItem
                key={item.productId._id}
                item={item}
                addItemHandle={addItemHandle}
                removeItemHandle={removeItemHandle}
              />
            ))}
          </ul>
        )}
        <h3 className="mt-6 text-lg font-semibold">Total: $ {totalPrice}</h3>
        <button
          className="w-full bg-yellow-500 text-white py-3 rounded-lg hover:bg-yellow-600 transition duration-300 mt-4 "
          onClick={clearCartHandle}
        >
          清空購物車
        </button>
        <button
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300 mt-4"
          onClick={checkoutHandle}
        >
          前往結帳
        </button>
      </div>
    </div>
  );
};

export default Cart;
