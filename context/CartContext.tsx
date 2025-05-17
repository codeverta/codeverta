import React, { createContext, useState, useEffect, useContext } from "react";

// Create Context
export const CartContext = createContext();

// Create a custom hook to use the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Calculate cart totals
  const cartTotal = cart.reduce(
    (total, item) => total + item.attributes.priceInCurrency * item.quantity,
    0
  );

  const cartItemsCount = cart.reduce((count, item) => count + item.quantity, 0);

  // Load cart from localStorage on initial render
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        try {
          setCart(JSON.parse(savedCart));
        } catch (e) {
          console.error("Failed to parse cart from localStorage:", e);
        }
      }
    }
  }, []);

  // Add item to cart
  const addToCart = (product, quantity) => {
    // Find if product already exists in cart
    const existingItemIndex = cart.findIndex((item) => item.id === product.id);

    let updatedCart;

    if (existingItemIndex >= 0) {
      // Update quantity if product already in cart
      updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += quantity;
    } else {
      // Add new product to cart
      updatedCart = [...cart, { ...product, quantity }];
    }

    // Update state and localStorage
    setCart(updatedCart);

    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }

    // Track add_to_cart event for Google Merchant
    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({
        event: "add_to_cart",
        ecommerce: {
          currency: "IDR",
          value: product.attributes.priceInCurrency * quantity,
          items: [
            {
              item_id: product.id,
              item_name: product.attributes.name,
              price: product.attributes.priceInCurrency,
              quantity: quantity,
              currency: "IDR",
              item_category: product.attributes.category || "Candles",
            },
          ],
        },
      });
    }

    // Show cart feedback
    setIsCartOpen(true);

    // Auto-close cart after delay
    setTimeout(() => {
      setIsCartOpen(false);
    }, 3000);
  };

  // Remove item from cart
  const removeFromCart = (productId) => {
    const itemToRemove = cart.find((item) => item.id === productId);

    if (!itemToRemove) return;

    const updatedCart = cart.filter((item) => item.id !== productId);

    // Update state and localStorage
    setCart(updatedCart);

    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(updatedCart));

      // Track remove_from_cart event for Google Merchant
      if (window.dataLayer) {
        window.dataLayer.push({
          event: "remove_from_cart",
          ecommerce: {
            currency: "IDR",
            value:
              itemToRemove.attributes.priceInCurrency * itemToRemove.quantity,
            items: [
              {
                item_id: itemToRemove.id,
                item_name: itemToRemove.attributes.name,
                price: itemToRemove.attributes.priceInCurrency,
                quantity: itemToRemove.quantity,
                currency: "IDR",
              },
            ],
          },
        });
      }
    }
  };

  // Update item quantity
  const updateQuantity = (productId, newQuantity) => {
    // Ensure quantity is valid
    if (newQuantity < 1) return;

    const itemIndex = cart.findIndex((item) => item.id === productId);

    if (itemIndex === -1) return;

    const updatedCart = [...cart];
    updatedCart[itemIndex].quantity = newQuantity;

    // Update state and localStorage
    setCart(updatedCart);

    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  // Clear cart
  const clearCart = () => {
    setCart([]);

    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify([]));
    }
  };

  // Begin checkout process
  const beginCheckout = () => {
    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({
        event: "begin_checkout",
        ecommerce: {
          currency: "IDR",
          value: cartTotal,
          items: cart.map((item) => ({
            item_id: item.id,
            item_name: item.attributes.name,
            price: item.attributes.priceInCurrency,
            quantity: item.quantity,
            currency: "IDR",
          })),
        },
      });
    }

    // You would typically navigate to checkout page here
    // router.push('/checkout');
  };

  // Complete purchase
  const completePurchase = (transactionId) => {
    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({
        event: "purchase",
        ecommerce: {
          transaction_id: transactionId,
          currency: "IDR",
          value: cartTotal,
          tax: 0, // Add actual tax if applicable
          shipping: 0, // Add actual shipping if applicable
          items: cart.map((item) => ({
            item_id: item.id,
            item_name: item.attributes.name,
            price: item.attributes.priceInCurrency,
            quantity: item.quantity,
            currency: "IDR",
          })),
        },
      });
    }

    // Clear cart after purchase
    clearCart();
  };

  // Format price in IDR
  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        beginCheckout,
        completePurchase,
        isCartOpen,
        setIsCartOpen,
        cartTotal,
        cartItemsCount,
        formatPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
