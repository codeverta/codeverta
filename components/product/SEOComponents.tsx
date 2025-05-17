import React from "react";
import ProductJsonLd from "components/ProductJsonLd";
import { BreadcrumbJsonLd } from "next-seo";

/**
 * Component for handling SEO-related tags
 */
const SEOComponents = ({ product, baseUrl }) => {
  if (!product) return null;

  return (
    <>
      <ProductJsonLd product={product} baseUrl={baseUrl} />
      <BreadcrumbJsonLd
        itemListElements={[
          {
            position: 1,
            name: "Home",
            item: "https://souvenirlilin.id/",
          },
          {
            position: 2,
            name: "Products",
            item: "https://souvenirlilin.id/products",
          },
          {
            position: 3,
            name: product.data[0].attributes.name,
            item: `https://souvenirlilin.id/products/${product.data[0].attributes.slug}`,
          },
        ]}
      />
    </>
  );
};

export default SEOComponents;
