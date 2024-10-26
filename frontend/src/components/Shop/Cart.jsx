import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchCart,
  addItemToCart,
  removeItemFromCart,
  clearCart,
} from "../Store/CartSlice";

const Cart = ({ closeCart }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const loading = useSelector((state) => state.cart.loading);
  const error = useSelector((state) => state.cart.error);

  useEffect(() => {
    // 調用 fetchCart 從後端獲取購物車數據
    dispatch(fetchCart());
  }, [dispatch]);

  const addItemHandle = (item) => {
    dispatch(addItemToCart(item.productId));
  };

  const removeItemHandle = (id) => {
    dispatch(removeItemFromCart(id));
  };

  const clearCartHandle = () => {
    dispatch(clearCart());
  };

  const checkoutHandle = () => {
    navigate("/checkout");
    closeCart();
  };

  if (loading) {
    return (
      <div className="fixed inset-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-5 rounded-xl shadow-lg max-w-lg w-full">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-5 rounded-xl shadow-lg max-w-lg w-full">
          <p>Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={closeCart}
    >
      <div
        className="bg-white p-5 rounded-xl shadow-lg max-w-lg w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4">Shopping Cart</h2>
        {cartItems.length === 0 && <h1>購物車目前沒有東西唷!</h1>}
        {cartItems.length !== 0 && (
          <ul className="space-y-3">
            {cartItems.map((item) => (
              <li
                className="flex items-center justify-between"
                key={item.productId._id}
              >
                <section className="w-3/4">
                  {item.productId.title} : {item.quantity} x $
                  {item.productId.price} = ${item.totalPrice}
                </section>
                <section className="flex space-x-2">
                  <button
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    onClick={() => addItemHandle(item)}
                  >
                    +
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    onClick={() => removeItemHandle(item.productId._id)}
                  >
                    -
                  </button>
                </section>
              </li>
            ))}
          </ul>
        )}
        <h3 className="mt-6 text-lg font-semibold">Total: $ {totalPrice}</h3>
        <button
          className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition duration-300 mt-4 "
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
