import React, { useState, useEffect } from "react";
import axios from "axios";
const backendUrl = process.env.REACT_APP_BACKEND_URL;

export default function CheckOrder() {
  const [orders, setOrders] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/orders/${userId}`);
        const ordersData = response.data;
        setOrders(ordersData);
      } catch (error) {
        console.error("Error fetching orders", error);
      }
    };
    getOrders();
  }, [userId]);

  return (
    <div className="max-w-4xl mx-auto mt-4 p-8 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        訂單管理
      </h1>
      <ul className="space-y-4">
        {orders.length > 0 ? (
          orders.map((order) => (
            <li key={order._id} className="p-4 border border-gray-300 rounded">
              <h2 className="text-xl font-semibold mb-2">
                訂單 ID : {order._id}
              </h2>
              <ul className="list-disc pl-5 space-y-2">
                <div className="text-lg mb-2">購買商品:</div>
                {order.items.map((item) => (
                  <li key={item._id} className="text-gray-700">
                    <span className="font-semibold">{item.title}</span> x{" "}
                    {item.quantity}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-gray-800">總價: ${order.totalPrice}</p>
              <p className="text-gray-800">付款方式: {order.paymentMethod}</p>
              <p className="text-gray-800">狀態: {order.status}</p>
            </li>
          ))
        ) : (
          <p className="text-center text-gray-600">暫無訂單紀錄</p>
        )}
      </ul>
    </div>
  );
}
