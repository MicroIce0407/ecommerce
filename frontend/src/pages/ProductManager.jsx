import React, { useEffect, useState, useMemo } from "react";
import ProductList from "../components/Shop/ProductList";
import ProductForm from "../components/Shop/ProductForm";
import axios from "axios";
import withAuth from "../components/Shop/withAuth";

const ProductManager = () => {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [addProduct, setAddProduct] = useState(false);

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const config = useMemo(() => {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }, [token]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/products/user/${userId}`,
          config
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };
    fetchProducts();
  }, [config, userId]);

  const addProductHandle = async (productData) => {
    const form = new FormData();
    form.append("title", productData.title);
    form.append("description", productData.description);
    form.append("price", productData.price);
    form.append("category", productData.category);
    form.append("image", productData.image); // 文件上傳
    form.append("userId", localStorage.getItem("userId"));

    try {
      const response = await axios.post(
        "http://localhost:5000/api/products",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setProducts((prev) => [...prev, response.data]);
      setAddProduct(false);
    } catch (error) {
      console.error("Error adding product", error);
    }
  };

  const editProductHandle = async (productData) => {
    const form = new FormData();
    form.append("title", productData.title);
    form.append("description", productData.description);
    form.append("price", productData.price);
    form.append("category", productData.category);
    form.append("image", productData.image); // 文件上傳
    form.append("userId", localStorage.getItem("userId"));

    try {
      const response = await axios.put(
        `http://localhost:5000/api/products/${productData._id}`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setProducts((prev) =>
        prev.map((product) =>
          product._id === productData._id ? response.data : product
        )
      );
      setEditProduct(null);
    } catch (error) {}
  };

  const addNewProduct = () => {
    setAddProduct(true);
  };

  const cancelHandle = () => {
    setEditProduct(null);
    setAddProduct(false);
  };

  const deleteProductHandle = async (prodrctId) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${prodrctId}`);
      setProducts((prev) =>
        prev.filter((product) => product._id !== prodrctId)
      );
    } catch (error) {
      console.error("Error deleting product", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-4 p-8 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        商品管理
      </h1>
      {!addProduct && (
        <>
          <ProductList
            products={products}
            onEdit={(product) => setEditProduct(product)}
            onDelete={(product) => {
              if (window.confirm("確定要刪除商品嗎?")) {
                deleteProductHandle(product);
              }
            }}
            editProduct={editProduct}
            editProductHandle={editProductHandle}
            addProductHandle={addProductHandle}
            cancelHandle={cancelHandle}
          />
          {!editProduct && (
            <button
              onClick={addNewProduct}
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              新增商品
            </button>
          )}
        </>
      )}

      {addProduct && (
        <ProductForm
          onSubmit={addProductHandle}
          initialData={editProduct}
          Cancel={cancelHandle}
          className="mt-8"
        />
      )}
    </div>
  );
};

export default withAuth(ProductManager);