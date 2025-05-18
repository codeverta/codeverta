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
            item: "https://codeverta.com/",
          },
          {
            position: 2,
            name: "Products",
            item: "https://codeverta.com/products",
          },
          {
            position: 3,
            name: product.data[0].attributes.name,
            item: `https://codeverta.com/products/${product.data[0].attributes.slug}`,
          },
        ]}
      />
    </>
  );
};

export default SEOComponents;
