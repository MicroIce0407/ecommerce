import React from "react";

const Notification = ({ message, type, onClose }) => {
  if (!message) return null;

  return (
    <div
      className={`z-50 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-6 py-4 rounded shadow-lg text-white transition-all duration-300 ${
        type === "success" ? "bg-green-500" : "bg-red-500"
      }`}
    >
      <div className="flex items-center">
        <p>{message}</p>
        <button
          onClick={onClose}
          className="ml-4 font-bold text-xl leading-none"
        >
          X
        </button>
      </div>
    </div>
  );
};

export default Notification;
