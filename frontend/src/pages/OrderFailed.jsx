import React from "react";

const OrderFailed = () => {
  return (
    <div className="max-w-4xl mx-auto mt-8 p-8 bg-white shadow-md rounded-lg text-center">
      <h1 className="text-3xl font-bold mb-8 text-red-600">付款失敗!</h1>
      <p>抱歉，您的付款未能完成，請再試一次或是聯繫客服。</p>
    </div>
  );
};

export default OrderFailed;
