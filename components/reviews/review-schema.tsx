interface Review {
  reviewer_name: string;
  rating: number;
  excerpt: string;
  published_at?: string;
}

interface ReviewSchemaProps {
  reviews?: Review[];
  aggregateRating?: number;
  reviewCount?: number;
}

export function ReviewSchema({
  reviews = [],
  aggregateRating = 4.9,
  reviewCount = 67
}: ReviewSchemaProps) {
  const aggregateSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Alberta Injury Management",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": aggregateRating.toString(),
      "reviewCount": reviewCount.toString(),
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  const reviewSchemas = reviews.map(review => ({
    "@type": "Review",
    "author": {
      "@type": "Person",
      "name": review.reviewer_name
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": review.rating.toString(),
      "bestRating": "5",
      "worstRating": "1"
    },
    "reviewBody": review.excerpt,
    "datePublished": review.published_at || new Date().toISOString()
  }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(aggregateSchema)
        }}
      />
      {reviewSchemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema)
          }}
        />
      ))}
    </>
  );
}
