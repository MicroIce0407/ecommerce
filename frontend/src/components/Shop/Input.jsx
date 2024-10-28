import React from "react";

const Input = ({ label, name, type, value, onChange, placeholder }) => {
  return (
    <div className="mb-5">
      <label htmlFor={name} className="block text-gray-700 font-semibold mb-2">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
      />
    </div>
  );
};

export default Input;
