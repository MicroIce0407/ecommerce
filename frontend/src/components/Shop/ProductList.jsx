import React from "react";
import ProductForm from "./ProductForm";
import ProductItem from "./ProductItem";

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
            <ProductItem
              product={product}
              onEdit={onEdit}
              onDelete={onDelete}
              isEditing={editProduct === product}
            />
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
