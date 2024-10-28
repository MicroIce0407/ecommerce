import React from "react";

const OrderItem = ({ order }) => {
  return (
    <li key={order._id} className="p-4 border border-gray-300 rounded">
      <h2 className="text-xl font-semibold mb-2">訂單 ID : {order._id}</h2>
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
  );
};

export default OrderItem;
