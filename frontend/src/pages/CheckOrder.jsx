import React, { useState, useEffect } from "react";
import axios from "axios";
import OrderItem from "../components/Shop/OrderItem";
import withAuth from "../components/Shop/withAuth";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const CheckOrder = () => {
  const [orders, setOrders] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/orders/${userId}`);
        setOrders(response.data);
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
          orders.map((order) => <OrderItem key={order._id} order={order} />)
        ) : (
          <p className="text-center text-gray-600">暫無訂單紀錄</p>
        )}
      </ul>
    </div>
  );
};

export default withAuth(CheckOrder);
