import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ScrollImg from "../components/Shop/ScrollImg.jsx";
import Goods from "../components/Shop/Goods.jsx";
import Search from "../components/Shop/Search.jsx";
import { resetInput } from "../components/Store/SearchSlice.jsx";

const backendUrl = process.env.REACT_APP_BACKEND_URL;
const iniURL = `${backendUrl}/api/products`;

const CATEGORY_OPTIONS = [
  { name: "全部類別", value: "" },
  { name: "男士衣裝", value: "men%27s clothing" },
  { name: "女士衣裝", value: "women%27s clothing" },
  { name: "配飾", value: "jewelery" },
  { name: "電子產品", value: "electronics" },
  { name: "其他", value: "others" },
];

const Shop = () => {
  const dispatch = useDispatch();
  const [goodsData, setGoodsData] = useState([]);
  const input = useSelector((state) => state.search.input);

  useEffect(() => {
    dispatch(resetInput());
    fetchData(iniURL);
  }, [dispatch]);

  const fetchData = async (url) => {
    try {
      let result = await fetch(url);
      let data = await result.json();
      setGoodsData(data);
    } catch (e) {
      console.error(e);
    }
  };

  const changeURL = (category) => {
    const url =
      category === ""
        ? iniURL
        : `${backendUrl}/api/products/category/${category}`;
    fetchData(url);
  };

  const filteredGoods =
    input.trim() === ""
      ? goodsData
      : goodsData.filter((item) =>
          item.title.toLowerCase().includes(input.toLowerCase())
        );

  return (
    <div className="shop">
      <Search />
      <ScrollImg />
      <p className="p-8">
        熱門分類 :
        {CATEGORY_OPTIONS.map((category) => (
          <button
            key={category.value}
            className="p-4 text-base hover:text-green-400"
            onClick={() => changeURL(category.value)}
          >
            {category.name}
          </button>
        ))}
      </p>
      <ul>
        <div className="container mx-auto py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredGoods.map((item) => (
              <Goods key={item._id} {...item} />
            ))}
          </div>
        </div>
      </ul>
    </div>
  );
};

export default Shop;
