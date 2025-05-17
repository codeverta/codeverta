import React from "react";
import { Content } from "components";

/**
 * Component for displaying related products
 */
const RelatedProducts = ({ isLoading }) => {
  if (isLoading) {
    return (
      <div>
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-6 opacity-60"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="bg-gray-200 dark:bg-gray-700 rounded h-64 opacity-60"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <Content
      queryParams={{
        "page[size]": 4,
      }}
      title="other_products"
    />
  );
};

export default RelatedProducts;
