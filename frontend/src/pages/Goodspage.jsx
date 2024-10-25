import { useDispatch } from "react-redux";
import { useLoaderData } from "react-router-dom";
import { addItemToCart } from "../components/Store/CartSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Notification from "../components/Shop/Notification";

const Goodspage = () => {
  const GoodData = useLoaderData(); // 使用 useLoaderData 獲取 loader 加載的數據
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const [notification, setNotification] = useState(null);

  const AddToCart = (item) => {
    if (!auth.token) {
      setNotification({ message: "請先登入", type: "error" });
      setTimeout(() => {
        closeNotification();
        navigate("/Authform");
      }, 1000);
    } else {
      dispatch(addItemToCart(item));
    }
  };

  const closeNotification = () => {
    setNotification(null);
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
      <section className="m-12 p-8 flex flex-wrap items-center justify-center gap-12 bg-gray-50 rounded-lg shadow-md">
        <section className="flex items-center justify-center h-full w-full md:w-1/3 p-4">
          <img
            className="max-h-96 max-w-full object-contain rounded-lg shadow-lg"
            src={GoodData.image}
            alt={GoodData.title}
          />
        </section>
        <section className="w-full md:w-1/2 flex flex-col items-start justify-center bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {GoodData.title}
          </h1>
          <h2 className="text-lg text-gray-600 mb-6">{GoodData.description}</h2>
          <section className="flex items-center gap-4">
            <p className="text-2xl font-semibold text-green-600">
              價格: {GoodData.price} $
            </p>
            <button
              className="ml-6 px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out"
              onClick={() => AddToCart(GoodData)}
            >
              加入購物車
            </button>
          </section>
        </section>
      </section>
    </>
  );
};

export default Goodspage;

export async function loader({ params }) {
  const id = params.GoodsID;
  const response = await fetch(`http://localhost:5000/api/products/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetching");
  }

  const GoodData = await response.json();
  return GoodData;
}
