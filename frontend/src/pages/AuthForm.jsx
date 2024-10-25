import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../components/Store/authSlice";
import axios from "axios";

const AuthForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setNotification, closeNotification } = useOutletContext();
  const [mode, setMode] = useState("login");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint =
      mode === "register" ? "/api/users/register" : "/api/users/login";
    try {
      const response = await axios.post(
        "http://localhost:5000" + endpoint,
        formData
      );

      if (mode === "login") {
        dispatch(login(response.data));
        setNotification({ message: "登入成功", type: "success" });
        navigate(-1);

        closeNotification();
      } else {
        setNotification({ message: "註冊成功", type: "success" });

        closeNotification();
      }
    } catch (error) {
      setNotification({
        message: error.response?.data?.message || "An error occurred",
        type: "error",
      });

      closeNotification();
    }
  };

  return (
    <div className="max-w-lg mx-auto my-8 p-8 bg-white shadow-md rounded-lg">
      <div
        className="flex justify-center mb-6 gap-4"
        role="group"
        aria-label="Basic radio toggle button group"
      >
        <input
          type="radio"
          name="btnradio"
          id="btnradio1"
          checked={mode === "register"}
          onChange={() => setMode("register")}
          className="hidden"
        />
        <label
          htmlFor="btnradio1"
          className={`px-4 py-2 border-2 rounded-md cursor-pointer transition-colors duration-300 ${
            mode === "register"
              ? "bg-blue-500 text-white border-blue-500"
              : "bg-white text-blue-500 border-blue-500 hover:bg-blue-100"
          }`}
        >
          註冊
        </label>
        <input
          type="radio"
          name="btnradio"
          id="btnradio2"
          checked={mode === "login"}
          onChange={() => setMode("login")}
          className="hidden"
        />
        <label
          htmlFor="btnradio2"
          className={`px-4 py-2 border-2 rounded-md cursor-pointer transition-colors duration-300 ${
            mode === "login"
              ? "bg-blue-500 text-white border-blue-500"
              : "bg-white text-blue-500 border-blue-500 hover:bg-blue-100"
          }`}
        >
          登入
        </label>
      </div>
      <form onSubmit={handleSubmit}>
        {mode === "register" && (
          <div className="mb-5">
            <label
              htmlFor="username"
              className="block text-gray-700 font-semibold mb-2"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              autoComplete="username"
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
        )}
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block text-gray-700 font-semibold mb-2"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            autoComplete="email"
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
          />
          <small id="emailHelp" className="text-gray-500 mt-1 block">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block text-gray-700 font-semibold mb-2"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          {mode === "login" ? "登入" : "註冊"}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
