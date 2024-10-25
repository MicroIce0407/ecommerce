import React, { useState, useEffect } from "react";

const ProductForm = ({ onSubmit, initialData, Cancel }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    image: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const changeHandle = (e) => {
    const { name, value, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const submitHandle = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={submitHandle} className="mt-8 space-y-6">
      <div>
        <label
          htmlFor="title"
          className="block text-gray-700 font-semibold mb-2"
        >
          名稱
        </label>
        <input
          type="text"
          name="title"
          id="title"
          value={formData.title}
          onChange={changeHandle}
          placeholder="Product Title"
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
      </div>
      <div>
        <label
          htmlFor="description"
          className="block text-gray-700 font-semibold mb-2"
        >
          詳細資訊
        </label>
        <textarea
          name="description"
          id="description"
          value={formData.description}
          onChange={changeHandle}
          placeholder="Product Description"
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label
          htmlFor="price"
          className="block text-gray-700 font-semibold mb-2"
        >
          價格
        </label>
        <input
          type="number"
          name="price"
          id="price"
          value={formData.price}
          onChange={changeHandle}
          placeholder="Price"
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label
          htmlFor="category"
          className="block text-gray-700 font-semibold mb-2"
        >
          類別
        </label>
        <select
          name="category"
          id="category"
          value={formData.category}
          onChange={changeHandle}
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="" disabled>
            Select Category
          </option>
          <option value="men's clothing">男士衣裝</option>
          <option value="women's clothing">女士衣裝</option>
          <option value="jewelery">配飾</option>
          <option value="electronics">電子產品</option>
          <option value="others">其他</option>
        </select>
      </div>
      <div>
        <label
          htmlFor="image"
          className="block text-gray-700 font-semibold mb-2"
        >
          上傳
        </label>
        <input
          type="file"
          name="image"
          id="image"
          onChange={changeHandle}
          accept="image/*"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex">
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          {initialData ? "確認修改" : "新增"}
        </button>
        <button
          type="button"
          onClick={Cancel}
          className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition duration-300"
        >
          取消
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
