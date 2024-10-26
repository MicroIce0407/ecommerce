import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import withAuth from "../components/Shop/withAuth";
const backendUrl = process.env.REACT_APP_BACKEND_URL;

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("paypal");
  const userId = localStorage.getItem("userId");

  const submitHandle = async (e) => {
    e.preventDefault();

    const orderData = {
      items: cartItems,
      totalPrice,
      userId,
      address,
      paymentMethod,
    };

    try {
      const response = await axios.post(`${backendUrl}/api/orders`, orderData);

      if (response.data.paymentUrl) {
        window.location.href = response.data.paymentUrl;
      } else if (response.data.redirectUrl) {
        window.location.href = response.data.redirectUrl;
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-8 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">結帳</h1>
      <form onSubmit={submitHandle}>
        <div className="mb-4">
          <label
            htmlFor="address"
            className="block text-gray-700 font-semibold mb-2"
          >
            地址
          </label>
          <input
            type="text"
            value={address}
            id="address"
            name="address"
            autoComplete="address"
            onChange={(e) => setAddress(e.target.value)}
            required
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="paymentMethod"
            className="block text-gray-700 font-semibold mb-2"
          >
            付款方式
          </label>
          <select
            name="paymentMethod"
            id="paymentMethod"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
          >
            <option value="paypal">Paypal</option>
            <option value="homeDelivery">宅配-貨到付款</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition duration-300"
        >
          確認結帳
        </button>
      </form>
    </div>
  );
};

export default withAuth(Checkout);
