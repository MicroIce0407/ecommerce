import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../components/Store/authSlice";
import OrderItem from "../components/Shop/OrderItem";
import withAuth from "../components/Shop/withAuth";
import axios from "axios";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const CheckOrder = () => {
  const { showNotification } = useOutletContext();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [orders, setOrders] = useState([]);
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const config = useMemo(() => {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }, [token]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/api/orders/${userId}`,
          config
        );
        setOrders(response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          if (error.response.data.message === "Token expired") {
            showNotification("Token 已過期，請重新登入", "error");
            dispatch(logout());
            navigate("/Authform");
          }
        } else {
          console.error("Error fetching orders", error);
        }
      }
    };
    getOrders();
  }, [userId, config, dispatch, navigate, showNotification]);

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
