import { useDispatch, useSelector } from "react-redux";
import { useLoaderData, useNavigate, useOutletContext } from "react-router-dom";
import { addItemToCart } from "../components/Store/CartSlice";
import { useCallback } from "react";

const Goodspage = () => {
  const GoodData = useLoaderData(); // 使用 useLoaderData 獲取 loader 加載的數據
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const { showNotification } = useOutletContext();

  const AddToCart = useCallback(
    (item) => {
      if (!auth.token) {
        showNotification("請先登入", "error");
        navigate("/Authform");
      } else {
        dispatch(addItemToCart(item));
        showNotification("加入購物車成功!!", "success");
      }
    },
    [auth.token, dispatch, showNotification, navigate]
  );

  return (
    <>
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
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const id = params.GoodsID;
  const response = await fetch(`${backendUrl}/api/products/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetching");
  }

  const GoodData = await response.json();
  return GoodData;
}
