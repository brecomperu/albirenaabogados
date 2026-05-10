import React from 'react';

export default function LocalBusinessSchema() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "name": "Albirena Abogados",
    "image": "https://albirenaabogados.com/logo.png", // Assuming logo path
    "@id": "https://albirenaabogados.com",
    "url": "https://albirenaabogados.com",
    "telephone": "+51948492021",
    "priceRange": "$$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Av. Javier Prado Este 4040",
      "addressLocality": "Surco",
      "addressRegion": "Lima",
      "postalCode": "15023",
      "addressCountry": "PE"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -12.086438,
      "longitude": -76.973402
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "08:00",
      "closes": "18:00"
    },
    "sameAs": [
      "https://www.linkedin.com/company/albirenaabogados"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
