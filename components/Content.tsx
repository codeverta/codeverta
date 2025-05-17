import { Modal, Pagination, Rating } from "@mui/material";
import { useState, useRef, useEffect } from "react";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getRelationships, toCurrency, useLoaded } from "utils";
import Skeleton from "components/flowbite/Skeleton";
import api from "utils/api";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { currency } from "lib/currency";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";

import React from "react";
import { Star, Eye, ShoppingBag } from "lucide-react";

// Custom star rating component
const StarRating = ({ rating }) => {
  const MAX_STARS = 5;

  // Convert rating to number between 0-5
  const normalizedRating = Math.min(Math.max(Number(rating) || 0, 0), 5);

  return (
    <div className="flex">
      {[...Array(MAX_STARS)].map((_, index) => {
        // For each star position, determine if it should be filled, half-filled or empty
        const starValue = index + 1;
        const filled = normalizedRating >= starValue;
        const halfFilled =
          normalizedRating > index && normalizedRating < starValue;

        return (
          <span
            key={index}
            className={`text-sm ${
              filled || halfFilled ? "text-yellow-500" : "text-gray-300"
            }`}
          >
            ★
          </span>
        );
      })}
    </div>
  );
};

// AnimatedProductCard component with enhanced animations
const AnimatedProductCard = ({
  product,
  isDocumentExist,
  documents,
  index,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Calculate average rating from product reviews
  const calculateAverageRating = () => {
    if (
      !product.attributes.product_reviews ||
      product.attributes.product_reviews.length === 0
    ) {
      return 0;
    }

    const totalRating = product.attributes.product_reviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );

    return (totalRating / product.attributes.product_reviews.length).toFixed(1);
  };

  const formatNumber = (num: number) => {
    if (num >= 1_000_000_000) {
      return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "B";
    } else if (num >= 1_000_000) {
      return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
    } else if (num >= 1_000) {
      return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "k";
    } else {
      return num.toString();
    }
  };

  const rating = calculateAverageRating();
  const amountSold = product.attributes.amount_sold || 0;
  const viewsCount = product.attributes.views_count || 0;

  // Card animation variants
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.98,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        delay: index * 0.1, // staggered animation based on index
      },
    },
  };

  // Image hover animation variants
  const imageVariants = {
    rest: { scale: 1, transition: { duration: 0.3, ease: "easeInOut" } },
    hover: { scale: 1.05, transition: { duration: 0.3, ease: "easeInOut" } },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={cardVariants}
      className="w-full h-full"
    >
      <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 h-full flex flex-col">
        <Link href={`/products/${product.attributes.slug}`}>
          <div className="relative overflow-hidden group">
            <img
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              src={
                isDocumentExist
                  ? documents[0]?.attributes.filename
                  : "/assets/image-1@2x.jpg"
              }
              alt={product.attributes.name}
              onError={(e) => (e.target.src = "/assets/image-1@2x.jpg")}
            />
            <div className="absolute top-2 right-2 bg-white dark:bg-gray-700 rounded-full px-2 py-1 flex items-center text-xs font-medium shadow-sm">
              <Eye
                size={14}
                className="text-gray-500 dark:text-gray-300 mr-1"
              />
              <span>{formatNumber(viewsCount)}</span>
            </div>
          </div>
        </Link>

        <div className="p-4 flex flex-col flex-grow">
          <Link href={`/products/${product.attributes.slug}`}>
            <h3 className="text-md font-semibold hover:text-blue-600 dark:hover:text-blue-400 hover:underline line-clamp-2 mb-1">
              {product.attributes.name}{" "}
              <span className="text-gray-500 dark:text-gray-400">
                ({product.attributes.code})
              </span>
            </h3>
          </Link>

          <div className="text-green-700 dark:text-green-500 font-bold text-lg mb-2">
            {product.attributes.formattedPrice ||
              `Rp ${product.attributes.price.toLocaleString("id-ID")}`}
          </div>

          <div className="flex flex-wrap items-center text-sm gap-2 mt-auto">
            <div className="flex items-center gap-2">
              <div className="flex items-center text-yellow-500">
                <Star size={16} className="fill-yellow-500 text-yellow-500" />
                <span className="ml-1 font-medium">{rating}</span>
              </div>
              <StarRating rating={rating} />
            </div>

            <div className="flex items-center text-green-600 dark:text-green-500">
              <ShoppingBag size={14} className="mr-1" />
              <span className="font-medium">
                {amountSold > 0
                  ? `${formatNumber(amountSold)}+ sold`
                  : "New arrival"}
              </span>
            </div>
          </div>

          {product.attributes.stock > 0 && (
            <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
              {product.attributes.stock < 10 ? (
                <span className="text-red-500">
                  Only {product.attributes.stock} left in stock
                </span>
              ) : (
                <span>In stock: {product.attributes.stock}</span>
              )}
            </div>
          )}

          {/* <motion.button 
            className="w-full mt-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors duration-200 flex items-center justify-center"
            whileHover={{ backgroundColor: "#1d4ed8", scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Add to Cart
          </motion.button> */}
        </div>
      </div>
    </motion.div>
  );
};

export default function Content({
  title = "our_products",
  queryParams = {},
}: any) {
  const { t } = useTranslation("common");
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const gridRef = useRef(null);

  const productParams = {
    "page[size]": 12,
    include: "documents",
    "page[number]": currentPage,
    locale: router.locale,
    currency: currency[router.locale],
    ...queryParams,
  };

  const query: UseQueryResult<any> = useQuery({
    // Include currentPage in the queryKey so React Query refetches when it changes
    queryKey: [title, router.locale, currentPage],
    queryFn: async () => {
      return api.get("products", { ...productParams });
    },
    staleTime: 1000 * 60 * 10,
  });

  const onChangePage = (_e: any, page: number) => {
    const section = document.getElementById("products");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    setCurrentPage(page);
  };

  // Animation for the title and pagination
  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const disclaimerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        delay: 0.2,
      },
    },
  };

  const paginationVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        delay: 0.4,
      },
    },
  };

  return (
    <>
      <main className="bg-white dark:bg-gray-900 pt-24">
        <motion.h2
          id="products"
          initial="hidden"
          animate="visible"
          variants={titleVariants}
          className="text-center mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white"
        >
          {t(title, "Our Products")}
        </motion.h2>

        <motion.span
          initial="hidden"
          animate="visible"
          variants={disclaimerVariants}
          className="text-red-600 text-sm block max-w-md px-2 mx-auto text-center"
        >
          {t("disclaimer_price", "Below is wholesale price")}
        </motion.span>

        <motion.ul
          ref={gridRef}
          id="parent"
          className="mx-auto w-full p-4 grid grid-cols-12 gap-4"
        >
          {query.isLoading || query.isError ? (
            <>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((it: number) => {
                return (
                  <motion.div
                    key={it}
                    className="col-span-12 sm:col-span-4 lg:col-span-3 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: it * 0.05 }}
                  >
                    <Skeleton />
                  </motion.div>
                );
              })}
            </>
          ) : (
            <>
              {query.data.data.data.map((product: any, index: number) => {
                const documents =
                  product.relationships?.documents.data.length > 0
                    ? getRelationships(query.data.data, product, "documents")
                    : [];
                const isDocumentExist = !!documents[0]?.attributes.filename;
                return (
                  <li
                    className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3"
                    key={product.attributes.slug}
                  >
                    <AnimatedProductCard
                      isDocumentExist={isDocumentExist}
                      product={product}
                      documents={documents}
                      index={index}
                    />
                  </li>
                );
              })}

              <motion.div
                className="flex col-span-12 justify-center"
                initial="hidden"
                animate="visible"
                variants={paginationVariants}
              >
                <Pagination
                  page={currentPage}
                  onChange={onChangePage}
                  variant="outlined"
                  color="primary"
                  count={query.data.data.meta.page.lastPage}
                />
              </motion.div>
            </>
          )}
        </motion.ul>
      </main>
    </>
  );
}
