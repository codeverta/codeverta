import React from "react";
import { generateWhatsAppLink } from "lib/functions";

/**
 * Component for quantity selection and order button
 */
const ProductQuantitySelector = ({
  qty,
  incrementQuantity,
  decrementQuantity,
  prepareOrderMessage,
}) => {
  return (
    <div className="mt-4 flex items-center">
      <div className="relative flex items-center max-w-[8rem]">
        <button
          type="button"
          disabled={qty <= 1}
          id="decrement-button"
          onClick={decrementQuantity}
          data-input-counter-decrement="quantity-input"
          className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-l-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none flex items-center"
        >
          -
        </button>
        <input
          type="text"
          id="quantity-input"
          value={qty}
          data-input-counter
          aria-describedby="helper-text-explanation"
          className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="1"
          min={1}
          required
          readOnly
        />
        <button
          type="button"
          onClick={incrementQuantity}
          id="increment-button"
          data-input-counter-increment="quantity-input"
          className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-r-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none flex items-center"
        >
          +
        </button>
      </div>

      <a
        target="_blank"
        href={generateWhatsAppLink("+6281578956156", prepareOrderMessage())}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded ml-2 transition duration-300"
        rel="noopener noreferrer"
      >
        Pesan
      </a>
    </div>
  );
};

export default ProductQuantitySelector;
