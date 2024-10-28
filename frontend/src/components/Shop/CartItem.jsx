import React from "react";

const CartItem = React.memo(({ item, addItemHandle, removeItemHandle }) => (
  <li className="flex items-center justify-between">
    <section className="w-3/4">
      {item.productId.title} : {item.quantity} x ${item.productId.price} = $
      {item.totalPrice}
    </section>
    <section className="flex space-x-2">
      <button
        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
        onClick={() => addItemHandle(item)}
      >
        +
      </button>
      <button
        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        onClick={() => removeItemHandle(item.productId._id)}
      >
        -
      </button>
    </section>
  </li>
));

export default CartItem;
