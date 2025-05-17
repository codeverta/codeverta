import React from "react";
import ProductVariants from "components/mui/ProductVariant";
import ProductQuantitySelector from "./ProductQuantitySelector";
import SellerInformation from "./SellerInformation";
import { ProductDetailSkeleton } from "components/molecules/landing/ProductDetailSkeleton";
import {
  Star,
  Eye,
  ShoppingCart,
  Package,
  Info,
  BadgePercent,
} from "lucide-react";

/**
 * Component for displaying product information
 */
const ProductInformation = ({
  isLoading,
  product,
  currentPrice,
  currentStock,
  handleVariantChange,
  qty,
  incrementQuantity,
  decrementQuantity,
  prepareOrderMessage,
}: any) => {
  if (isLoading) {
    return <ProductDetailSkeleton />;
  }

  const productAttributes = product.data[0].attributes;
  const productReviews = productAttributes.product_reviews || [];
  const averageRating =
    productReviews.length > 0
      ? (
          productReviews.reduce((sum, review) => sum + review.rating, 0) /
          productReviews.length
        ).toFixed(1)
      : "No ratings";

  // Determine stock status for visual indication
  const stockStatus =
    currentStock <= 0
      ? "out-of-stock"
      : currentStock < 10
      ? "low-stock"
      : "in-stock";

  return (
    <div className="">
      <h1 className="text-gray-900 dark:text-gray-50 text-3xl title-font font-medium mb-2">
        {productAttributes.name}
      </h1>
      <div className="flex items-center mb-2 text-gray-500">
        <span className="text-sm">Product Code: {productAttributes.code}</span>
      </div>

      {/* Product Stats */}
      <div className="flex items-center space-x-6 mb-6 text-sm text-gray-600 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700 pb-4">
        <div className="flex items-center">
          <Eye size={18} className="mr-2 text-blue-500" />
          <span>{productAttributes.views_count || 0} views</span>
        </div>
        <div className="flex items-center">
          <ShoppingCart size={18} className="mr-2 text-purple-500" />
          <span>{productAttributes.amount_sold || 0} sold</span>
        </div>
        <div className="flex items-center">
          <div className="flex items-center text-yellow-500 mr-2">
            <Star size={18} fill="currentColor" stroke="none" />
          </div>
          <span className="font-medium">{averageRating}</span>
          <span className="ml-1 text-gray-500">
            ({productReviews.length} reviews)
          </span>
        </div>
      </div>

      <div className="flex items-center mb-6">
        <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-500">
          {currentPrice}
        </p>
        {productAttributes.discount && (
          <div className="ml-4 flex items-center text-sm">
            <BadgePercent size={16} className="mr-1 text-orange-500" />
            <span className="text-orange-500 font-medium">
              {productAttributes.discount}% off
            </span>
          </div>
        )}
      </div>

      <div className="">
        <ProductVariants
          product={product.data[0]}
          onVariantChange={handleVariantChange}
        />
      </div>

      <div className="mb-6 flex items-center">
        <Package size={18} className="mr-2 text-gray-500" />
        <span className="font-medium mr-2">Stock:</span>
        <span
          className={`font-medium ${
            stockStatus === "out-of-stock"
              ? "text-red-500"
              : stockStatus === "low-stock"
              ? "text-amber-500"
              : "text-green-500"
          }`}
        >
          {currentStock <= 0
            ? "Out of stock"
            : currentStock < 10
            ? `Low stock (${currentStock} left)`
            : `In stock (${currentStock} available)`}
        </span>
      </div>

      <div className="mb-6">
        <div className="flex items-center mb-2">
          <Info size={18} className="mr-2 text-gray-500" />
          <span className="font-medium text-gray-700 dark:text-gray-300">
            Product Description
          </span>
        </div>
        <div
          className="text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700"
          style={{ whiteSpace: "pre-line" }}
        >
          {productAttributes.description}
        </div>
      </div>

      <div className="mb-6">
        {/* <ProductQuantitySelector
          qty={qty}
          incrementQuantity={incrementQuantity}
          decrementQuantity={decrementQuantity}
          prepareOrderMessage={prepareOrderMessage}
        /> */}
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
        <SellerInformation />
      </div>
    </div>
  );
};

export default ProductInformation;
