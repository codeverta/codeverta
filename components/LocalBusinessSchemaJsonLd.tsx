// components/LocalBusinessSchema.js
import Head from "next/head";
import React from "react";

const LocalBusinessSchema = ({
  businessName,
  image,
  telephone,
  address,
  geo,
  url,
  priceRange,
  openingHours,
  description,
}: any) => {
  const ldJson = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: businessName,
    image: image,
    telephone: telephone,
    address: {
      "@type": "PostalAddress",
      streetAddress: address.street,
      addressLocality: address.locality,
      addressRegion: address.region,
      postalCode: address.postalCode,
      addressCountry: address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: geo.latitude,
      longitude: geo.longitude,
    },
    url: url,
    priceRange: priceRange,
    openingHoursSpecification: openingHours,
    description: description,
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJson) }}
      />
    </Head>
  );
};

export default LocalBusinessSchema;
