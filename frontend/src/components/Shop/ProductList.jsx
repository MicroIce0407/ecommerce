import React from "react";
import ProductForm from "./ProductForm";

const ProductList = ({
  products,
  onEdit,
  onDelete,
  editProduct,
  editProductHandle,
  cancelHandle,
}) => {
  return (
    <div className="mt-12 mb-8">
      <h2 className="text-2xl font-semibold mb-6 text-gray-600">您的商品</h2>
      <ul className="space-y-6">
        {products.map((product) => (
          <div key={product._id}>
            <li className="flex items-center justify-center p-4 bg-gray-100 rounded-lg shadow-sm">
              <div className="flex items-center justify-between space-x-4 w-full">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-1/3 h-24 object-cover rounded-md"
                />
                <div className="w-1/3">
                  <h3 className="text-xl font-bold text-gray-800">
                    {product.title}
                  </h3>
                  <p className="text-gray-600 mb-2">{product.description}</p>
                  <p className="text-lg font-semibold text-green-600">
                    ${product.price}
                  </p>
                </div>
                <div className="flex justify-end space-x-4 w-">
                  <button
                    onClick={
                      editProduct ? () => onEdit(null) : () => onEdit(product)
                    }
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-300"
                  >
                    修改
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
                    onClick={() => onDelete(product._id)}
                  >
                    刪除
                  </button>
                </div>
              </div>
            </li>
            {editProduct === product && (
              <ProductForm
                onSubmit={editProductHandle}
                initialData={product}
                Cancel={cancelHandle}
                className="mt-8"
              />
            )}
          </div>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
