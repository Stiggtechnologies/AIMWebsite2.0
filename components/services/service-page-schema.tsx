interface FAQ {
  question: string;
  answer: string;
}

interface ServicePageSchemaProps {
  serviceName: string;
  serviceDescription: string;
  procedureName: string;
  procedureDescription: string;
  usedFor: string;
  faqs: FAQ[];
}

export function ServicePageSchema({
  serviceName,
  serviceDescription,
  procedureName,
  procedureDescription,
  usedFor,
  faqs,
}: ServicePageSchemaProps) {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: serviceName,
    description: serviceDescription,
    provider: {
      '@type': 'Organization',
      name: 'Alberta Injury Management',
    },
    areaServed: 'Alberta, Canada',
    serviceType: 'Healthcare',
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
    },
  };

  const procedureSchema = {
    '@context': 'https://schema.org',
    '@type': 'TherapeuticProcedure',
    name: procedureName,
    description: procedureDescription,
    usedToDiagnose: usedFor,
    procedureType: 'Therapeutic',
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(procedureSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
