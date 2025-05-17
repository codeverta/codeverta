import React from "react";
import { useCart } from "../context/CartContext"; // Adjust import path as needed
import Link from "next/link"; // Assuming you're using Next.js
import Image from "next/image"; // For optimized image loading
import { useRouter } from "next/router";
import Layout from "../components/layout/Landing"; // Adjust import path as needed
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const CartPage = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    cartTotal,
    formatPrice,
    beginCheckout,
  } = useCart();
  const router = useRouter();

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-8">Your Cart</h1>
        <div className="bg-white p-8 rounded-lg shadow-md">
          <p className="text-lg mb-6">Your cart is currently empty.</p>
          <Link
            href="/products"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  const handleCheckout = () => {
    beginCheckout();
    router.push("/checkout");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Your Cart</h1>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {/* Cart Items */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-4">Product</th>
                  <th className="text-center py-4">Quantity</th>
                  <th className="text-right py-4">Price</th>
                  <th className="text-right py-4">Total</th>
                  <th className="py-4"></th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="py-4">
                      <div className="flex items-center">
                        {item.relationships?.documents?.data?.[0]?.id && (
                          <div className="w-16 h-16 mr-4 relative flex-shrink-0">
                            <Image
                              src={
                                item.included?.find(
                                  (doc) =>
                                    doc.id ===
                                    item.relationships.documents.data[0].id
                                )?.attributes?.filename || "/placeholder.png"
                              }
                              alt={item.attributes.name}
                              width={64}
                              height={64}
                              className="object-cover rounded"
                            />
                          </div>
                        )}
                        <div>
                          <h3 className="font-medium">
                            {item.attributes.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {item.attributes.code}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center justify-center">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              Math.max(1, item.quantity - 1)
                            )
                          }
                          className="bg-gray-200 px-3 py-1 rounded-l hover:bg-gray-300"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) =>
                            updateQuantity(
                              item.id,
                              parseInt(e.target.value) || 1
                            )
                          }
                          className="w-20 text-center border border-gray-300 rounded-md py-1 mx-2"
                        />
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="bg-gray-200 px-3 py-1 rounded-r hover:bg-gray-300"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="py-4 text-right">
                      {item.attributes.price.toFixed(2)}
                    </td>
                    <td className="py-4 text-right">
                      {(item.attributes.price * item.quantity).toFixed(2)}
                    </td>
                    <td className="py-4 text-right">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Order Summary */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-bold mb-4">Order Summary</h2>

            <div className="flex justify-between py-2 border-b">
              <span>Subtotal</span>
              <span>{cartTotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between py-2 border-b">
              <span>Shipping</span>
              <span>Calculated at checkout</span>
            </div>

            <div className="flex justify-between py-4 font-bold">
              <span>Total</span>
              <span>{cartTotal.toFixed(2)}</span>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 mt-4"
            >
              Proceed to Checkout
            </button>

            <div className="mt-6">
              <Link
                href="/products"
                className="text-blue-600 hover:text-blue-800 flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 17l-5-5m0 0l5-5m-5 5h12"
                  />
                </svg>
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
CartPage.getLayout = function (page) {
  return <Layout>{page}</Layout>;
};

export default CartPage;

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "order"])),
    },
  };
}
