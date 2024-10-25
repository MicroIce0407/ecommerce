import { Link, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Store/authSlice";
import cartIcons from "../../picture/Icons/cart.png";
import Cart from "./Cart";
import Notification from "./Notification";

const ShopNav = () => {
  const [showCart, setShowCart] = useState(false);
  const [notification, setNotification] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);

  const showCartHandle = () => {
    if (!auth.token) {
      setNotification({ message: "請先登入", type: "error" });
      closeNotification();
      navigate("/Authform");
    } else {
      setShowCart(true);
    }
  };

  const closeCartHandle = () => {
    setShowCart(false);
  };

  const logoutHandle = () => {
    dispatch(logout());
    navigate("/");
    setNotification({ message: "登出成功", type: "success" });
    closeNotification();
  };

  const closeNotification = () => {
    setTimeout(() => {
      setNotification(null);
    }, 1500);
  };

  return (
    <>
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={closeNotification}
        />
      )}
      {showCart && <Cart closeCart={closeCartHandle} />}
      <div className="bg-orange-400 shadow-md p-4">
        <section className="flex items-center justify-between max-w-7xl mx-auto px-4">
          <div className="basis-1/4">
            <Link to="/" className="font-bold text-xl hover:underline">
              回首頁
            </Link>
          </div>
          {!auth.token ? (
            <div className="flex items-center gap-4">
              <Link
                to="/Authform"
                className="hover:text-orange-200 transition duration-300"
              >
                註冊/登入
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <p className="text-white font-semibold ">嗨，{auth.username}</p>
              <button
                onClick={logoutHandle}
                className="text-white font-semibold hover:text-orange-200 transition duration-300"
              >
                登出
              </button>
              <Link
                to="/ProductManager"
                className="text-white font-semibold hover:text-orange-200 transition duration-300"
              >
                商品管理
              </Link>
              <Link
                to="/CheckOrder"
                className="text-white font-semibold hover:text-orange-200 transition duration-300"
              >
                檢視訂單
              </Link>
            </div>
          )}
          <button
            className="relative p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition duration-300"
            onClick={showCartHandle}
          >
            <img src={cartIcons} alt="cartIcons" className="w-6 h-6" />
          </button>
        </section>
        <nav className="flex justify-center mt-4">
          <h1 className="text-3xl font-bold">叢林購物</h1>
        </nav>
      </div>
      <Outlet context={{ setNotification, closeNotification }} />
    </>
  );
};

export default ShopNav;