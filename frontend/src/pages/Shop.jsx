import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ScrollImg from "../components/Shop/ScrollImg.jsx";
import Goods from "../components/Shop/Goods.jsx";
import Search from "../components/Shop/Search.jsx";

const iniURL = "http://localhost:5000/api/products";

const Shop = () => {
  const [allGoodsData, setAllGoodsData] = useState([]); // 使用 useState 管理 goodsData 的狀態
  const [filteredGoods, setFilteredGoods] = useState([]);
  const input = useSelector((state) => state.search.input);

  useEffect(() => {
    async function getGoodsData() {
      try {
        let result = await fetch(iniURL);
        let data = await result.json();
        setAllGoodsData(data); // 更新狀態
        setFilteredGoods(data);
      } catch (e) {
        console.error(e);
      }
    }
    getGoodsData();
  }, []);

  const changeURL = async (newURL) => {
    let url = iniURL;
    if (newURL !== "") {
      url = `http://localhost:5000/api/products/category/${newURL}`;
    }
    try {
      let result = await fetch(url);
      let data = await result.json();
      setFilteredGoods(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (input.trim() !== "") {
      const filtered = allGoodsData.filter((item) =>
        item.title.toLowerCase().includes(input.toLowerCase())
      );
      setFilteredGoods(filtered);
    } else {
      setFilteredGoods(allGoodsData);
    }
  }, [input, allGoodsData]);

  return (
    <div className="shop">
      <Search />
      <ScrollImg />
      <p className="p-8">
        熱門分類 :
        <button
          className="p-4 text-base hover:text-green-400"
          onClick={() => changeURL("")}
        >
          全部類別
        </button>
        <button
          className="p-4 text-base hover:text-green-400"
          onClick={() => changeURL("men%27s clothing")}
        >
          男士衣裝
        </button>
        <button
          className="p-4 text-base hover:text-green-400"
          onClick={() => changeURL("women%27s clothing")}
        >
          女士衣裝
        </button>
        <button
          className="p-4 text-base hover:text-green-400"
          onClick={() => changeURL("jewelery")}
        >
          配飾
        </button>
        <button
          className="p-4 text-base hover:text-green-400"
          onClick={() => changeURL("electronics")}
        >
          電子產品
        </button>
        <button
          className="p-4 text-base hover:text-green-400"
          onClick={() => changeURL("others")}
        >
          其他
        </button>
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
