import React from "react";

const ProductItem = React.memo(({ product, onEdit, onDelete, isEditing }) => {
  return (
    <li className="flex items-center justify-center p-4 bg-gray-100 rounded-lg shadow-sm">
      <div className="flex items-center justify-between space-x-4 w-full">
        <img
          src={product.image}
          alt={product.title}
          className="w-1/3 h-24 object-cover rounded-md"
        />
        <div className="w-1/3">
          <h3 className="text-xl font-bold text-gray-800">{product.title}</h3>
          <p className="text-gray-600 mb-2">{product.description}</p>
          <p className="text-lg font-semibold text-green-600">
            ${product.price}
          </p>
        </div>
        <div className="flex justify-end space-x-4">
          <ActionButton
            label="修改"
            onClick={isEditing ? () => onEdit(null) : () => onEdit(product)}
            color="bg-yellow-500"
            hoverColor="hover:bg-yellow-600"
          />
          <ActionButton
            label="刪除"
            onClick={() => onDelete(product._id)}
            color="bg-red-500"
            hoverColor="hover:bg-red-600"
          />
        </div>
      </div>
    </li>
  );
});

const ActionButton = ({ label, onClick, color, hoverColor }) => {
  return (
    <button
      onClick={onClick}
      className={`${color} text-white px-4 py-2 rounded-lg ${hoverColor} transition duration-300`}
    >
      {label}
    </button>
  );
};

export default ProductItem;
