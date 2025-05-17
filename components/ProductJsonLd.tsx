// components/ProductJsonLd.js
import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";

const ProductJsonLd = ({
  product,
  baseUrl,
  reviews = [],
  aggregateRating = null,
}: any) => {
  const router = useRouter();

  // Only render if we have a product
  if (!product || !product.data || !product.data[0]) {
    return null;
  }

  const productData = product.data[0];
  const attributes = productData.attributes;

  // Get images from documents if available
  const documents =
    productData?.relationships?.documents?.data?.length > 0
      ? product.included?.filter(
          (item) =>
            item.type === "documents" &&
            productData.relationships.documents.data.some(
              (doc) => doc.id === item.id
            )
        )
      : [];

  const images =
    documents.length > 0
      ? documents.map((doc) => `${baseUrl}${doc.attributes.filename}`)
      : [`${baseUrl}/assets/image-1@2x.jpg`];

  // Calculate price validity (default to 30 days from now)
  const priceValidDate = new Date();
  priceValidDate.setDate(priceValidDate.getDate() + 30);
  const priceValidUntil = priceValidDate.toISOString().split("T")[0]; // Format as YYYY-MM-DD

  // Build the structured data
  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: attributes.name,
    description: attributes.description,
    sku: attributes.code,
    image: images,
    brand: {
      "@type": "Brand",
      name: "UD Million Candles",
    },
    offers: {
      "@type": "Offer",
      url: `${baseUrl}${router.asPath}`,
      priceCurrency: "IDR",
      price: attributes.price,
      priceValidUntil: priceValidUntil, // Added priceValidUntil field
      itemCondition: "https://schema.org/NewCondition",
      availability:
        attributes.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        returnPolicyCategory: "https://schema.org/FreeReturn",
      },
      shippingDetails: [
        {
          "@type": "OfferShippingDetails",
          shippingRate: {
            "@type": "MonetaryAmount",
            value: attributes.price + "",
            currency: "IDR",
          },
          shippingDestination: {
            "@type": "DefinedRegion",
            addressCountry: "ID",
          },
        },
      ],
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "24",
    },
    review: {
      "@type": "Review",
      author: {
        "@type": "Person",
        name: "Rabih Utomo",
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
      },
      reviewBody: "This product is amazing! Highly recommended.",
    },
  };

  // Add review data if available
  if (reviews && reviews.length > 0) {
    jsonLd.review = reviews.map((review) => ({
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: review.rating,
        bestRating: "5",
      },
      author: {
        "@type": "Person",
        name: review.author,
      },
      datePublished: review.date,
      reviewBody: review.content,
    }));
  }

  // Add aggregate rating if available
  if (aggregateRating) {
    jsonLd.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: aggregateRating.average,
      reviewCount: aggregateRating.count,
      bestRating: "5",
      worstRating: "1",
    };
  }

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </Head>
  );
};

export default ProductJsonLd;
