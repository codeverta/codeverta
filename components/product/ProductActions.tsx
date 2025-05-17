import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { useCart } from "context/CartContext";

// Helper function for formatting price in Indonesian Rupiah
const formatPrice = (price) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

const ProductActions = ({ product }) => {
  const { addToCart, cart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const router = useRouter();

  const productAttributes = product?.data[0].attributes;
  const productId = product?.data[0].id;

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    if (quantity < productAttributes?.stock) {
      setQuantity(quantity + 1);
    }
  };

  const handleAddToCart = () => {
    // Structure the product data in the format expected by Google Merchant
    const productForCart = {
      id: productId,
      attributes: {
        ...productAttributes,
        item_id: productId,
        item_name: productAttributes.name,
        price: productAttributes.priceInCurrency,
        currency: "IDR",
        item_category: "Candles", // You might want to get this from the API
        item_variant: "Standard", // If you have variant data
        quantity: quantity,
      },
    };

    // Add structured data for Google Merchant
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "add_to_cart",
      ecommerce: {
        currency: "IDR",
        value: productAttributes.priceInCurrency * quantity,
        items: [
          {
            item_id: productId,
            item_name: productAttributes.name,
            price: productAttributes.priceInCurrency,
            quantity: quantity,
            currency: "IDR",
            item_category: "Candles", // Adjust based on your category
          },
        ],
      },
    });
    setAddedToCart(true);
    // Add to cart
    addToCart(productForCart, quantity);
  };

  const handleBuyNow = () => {
    // Add to cart first
    handleAddToCart();

    // Then navigate to checkout
    // Track begin_checkout event for Google Merchant
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "begin_checkout",
      ecommerce: {
        currency: "IDR",
        value: productAttributes.priceInCurrency * quantity,
        items: [
          {
            item_id: productId,
            item_name: productAttributes.name,
            price: productAttributes.priceInCurrency,
            quantity: quantity,
            currency: "IDR",
          },
        ],
      },
    });

    // Navigate to checkout page
    router.push("/checkout");
  };

  const ActionButtons = () => (
    <div className="flex gap-3 w-full">
      <button
        onClick={handleBuyNow}
        className="flex-1 bg-white text-green-500 border border-green-500 font-semibold text-sm py-2.5 px-4 md:py-2.5 md:px-2 rounded-lg hover:bg-gray-50 transition"
      >
        Beli
      </button>
      <button
        onClick={handleAddToCart}
        className="flex-1 bg-green-600 text-white font-semibold text-sm py-2.5 px-4 md:py-2.5 md:px-2 rounded-lg hover:bg-green-700 transition"
      >
        + Keranjang
      </button>
    </div>
  );

  // Calculate subtotal
  const subtotal = productAttributes?.priceInCurrency * quantity;

  return (
    <div className="mx-auto border rounded-lg p-4 relative">
      {addedToCart && (
        <div className="absolute top-0 left-0 right-0 bg-green-100 text-green-700 p-2 rounded-t-lg text-center">
          Produk berhasil ditambahkan ke keranjang!
        </div>
      )}

      <h2 className="text-xl font-semibold mb-6">Atur jumlah dan catatan</h2>

      {/* Quantity selector */}
      <div className="flex items-center mb-4">
        <button
          onClick={decreaseQuantity}
          className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200"
          aria-label="Decrease quantity"
        >
          <span className="text-lg">−</span>
        </button>
        <span className="mx-4 text-lg">{quantity}</span>
        <button
          onClick={increaseQuantity}
          className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200"
          aria-label="Increase quantity"
          disabled={quantity >= productAttributes?.stock}
        >
          <span className="text-lg">+</span>
        </button>
        <span className="ml-4 text-amber-500 text-sm font-medium">
          Sisa {productAttributes?.stock}
        </span>
      </div>

      {/* Pricing information */}
      <div className="mb-4">
        {/* Original price if discounted */}
        {productAttributes?.originalPrice &&
          productAttributes.originalPrice >
            productAttributes.priceInCurrency && (
            <p className="text-right text-sm text-gray-400 line-through">
              {formatPrice(productAttributes.originalPrice)}
            </p>
          )}
        <div className="flex justify-between items-center">
          <span className="text-base">Subtotal</span>
          <span
            className="text-xl font-bold"
            itemProp="price"
            content={isNaN(subtotal) ? "0" : subtotal.toString()}
          >
            {formatPrice(subtotal)}
          </span>
        </div>
      </div>

      {/* Desktop action buttons */}
      <div className={`mb-6 ${isMobile ? "hidden" : "block"}`}>
        <ActionButtons />
      </div>

      {/* Social actions */}
      <div className="flex border-t border-gray-100 pt-4 text-sm text-gray-600">
        <div className="flex items-center mr-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
          Chat
        </div>
        <div className="flex items-center mr-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          Wishlist
        </div>
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
            />
          </svg>
          Share
        </div>
      </div>

      {/* Mobile sticky footer */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 bg-white p-3 shadow-[0_-2px_10px_rgba(0,0,0,0.1)] z-50">
          <ActionButtons />
        </div>
      )}

      {/* Add spacer at the bottom when on mobile to prevent content from being hidden behind the sticky footer */}
      {isMobile && <div className="h-20"></div>}
    </div>
  );
};

export default ProductActions;
