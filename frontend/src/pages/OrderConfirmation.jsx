import React from "react";
import withAuth from "../components/Shop/withAuth";

const OrderConfirmation = () => {
  return (
    <div className="max-w-4xl mx-auto mt-8 p-8 bg-white shadow-md rounded-lg text-center">
      <h1 className="text-3xl font-bold mb-8 text-green-600">購買成功!</h1>
      <p>感謝您的購買！</p>
    </div>
  );
};

export default withAuth(OrderConfirmation);
