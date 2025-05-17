import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import api from "utils/api";
import { getRelationships } from "utils";
import { currency } from "lib/currency";

/**
 * Custom hook to fetch and manage product data
 */
export default function useProduct() {
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [qty, setQty] = useState(1);
  const router = useRouter();

  // Fetch product data when slug is available
  useEffect(() => {
    if (router.query?.slug) {
      const fetchProduct = async () => {
        setIsLoading(true);
        try {
          const slug = router.query.slug;
          const product = await api.get("products", {
            "filter[slug]": slug,
            locale: router.locale,
            currency: currency[router.locale] || "id",
            include: "documents",
          });

          setProduct(product.data);
        } catch (error) {
          console.error("Error fetching product:", error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchProduct();
    }
  }, [router.query]);

  // Handle image loading status
  useEffect(() => {
    if (!isLoading && product) {
      const documents =
        product.data[0]?.relationships?.documents.data.length > 0
          ? getRelationships(product, product.data[0], "documents")
          : [];

      if (documents.length === 0) {
        // No images to load, set as loaded
        setImagesLoaded(true);
        return;
      }

      // Set imagesLoaded to true after a reasonable timeout
      const timer = setTimeout(() => {
        setImagesLoaded(true);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isLoading, product]);

  // Prepare data objects
  const documents =
    !isLoading && product?.data[0]?.relationships?.documents.data.length > 0
      ? getRelationships(product, product.data[0], "documents")
      : [];

  const isDocumentExist =
    !isLoading && documents.length > 0 && !!documents[0]?.attributes.filename;

  // Get current price - either from selected variant or base product price
  const currentPrice =
    !isLoading &&
    (selectedVariant
      ? selectedVariant.price
      : product?.data[0]?.attributes.formattedPrice);

  // Get current stock - either from selected variant or base product stock
  const currentStock =
    !isLoading &&
    (selectedVariant
      ? selectedVariant.stock
      : product?.data[0]?.attributes.stock);

  const handleVariantChange = (variant) => {
    setSelectedVariant(variant);
  };

  const incrementQuantity = () => setQty(qty + 1);
  const decrementQuantity = () => (qty > 1 ? setQty(qty - 1) : null);

  // Prepare message for WhatsApp order
  const prepareOrderMessage = () => {
    if (isLoading || !product) return "";

    let message = `Halo saya ingin memesan \n${product.data[0].attributes.name} (${product.data[0].attributes.code}) ${qty}`;

    if (selectedVariant) {
      message += `\nVariant: ${selectedVariant.sku}`;
    }

    return message;
  };

  return {
    product,
    isLoading,
    imagesLoaded,
    documents,
    isDocumentExist,
    currentPrice,
    currentStock,
    selectedVariant,
    qty,
    handleVariantChange,
    incrementQuantity,
    decrementQuantity,
    prepareOrderMessage,
  };
}
