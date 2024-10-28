import React, { useState, useCallback } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useDispatch } from "react-redux";
import Input from "../components/Shop/Input";
import { login } from "../components/Store/authSlice";
import axios from "axios";

const backendUrl = process.env.REACT_APP_BACKEND_URL;
const NOTIFICATION_TIMEOUT = 1500;

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

  const changeHandle = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandle = async (e) => {
    e.preventDefault();

    const endpoint =
      mode === "register" ? "/api/users/register" : "/api/users/login";
    try {
      const response = await axios.post(backendUrl + endpoint, formData);

      if (mode === "login") {
        dispatch(login(response.data));
        showNotification("登入成功", "success");
        navigate(-1);
      } else {
        setNotification("註冊成功", "success");
      }
    } catch (error) {
      setNotification("註冊/登入失敗", "error");
    }
  };

  const showNotification = useCallback(
    (message, type) => {
      setNotification({ message, type });
      setTimeout(() => {
        closeNotification();
      }, NOTIFICATION_TIMEOUT);
    },
    [closeNotification, setNotification]
  );

  return (
    <div className="max-w-lg mx-auto my-8 p-8 bg-white shadow-md rounded-lg">
      <div
        className="flex justify-center mb-6 gap-4"
        role="group"
        aria-label="Basic radio toggle button group"
      >
        {["register", "login"].map((modeType) => (
          <React.Fragment key={modeType}>
            <input
              type="radio"
              name="btnradio"
              id={`btnradio-${modeType}`}
              checked={mode === modeType}
              onChange={() => setMode(modeType)}
              className="hidden"
            />
            <label
              htmlFor={`btnradio-${modeType}`}
              className={`px-4 py-2 border-2 rounded-md cursor-pointer transition-colors duration-300 ${
                mode === modeType
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-white text-blue-500 border-blue-500 hover:bg-blue-100"
              }`}
            >
              {modeType === "register" ? "註冊" : "登入"}
            </label>
          </React.Fragment>
        ))}
      </div>
      <form onSubmit={submitHandle}>
        {mode === "register" && (
          <Input
            label="Username"
            name="username"
            type="text"
            value={formData.username}
            onChange={changeHandle}
          />
        )}
        <Input
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={changeHandle}
        />
        <Input
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={changeHandle}
        />
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
