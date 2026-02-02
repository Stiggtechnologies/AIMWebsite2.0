import { Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface Review {
  id?: string;
  reviewer_name: string;
  rating: number;
  excerpt: string;
  source?: string;
  source_url?: string;
}

interface ReviewBlockProps {
  reviews: Review[];
  showAggregate?: boolean;
  aggregateRating?: number;
  reviewCount?: number;
  variant?: 'hero' | 'contextual' | 'grid';
  ctaLabel?: string;
  ctaHref?: string;
  className?: string;
}

export function ReviewBlock({
  reviews,
  showAggregate = false,
  aggregateRating = 4.9,
  reviewCount = 67,
  variant = 'contextual',
  ctaLabel = 'Read More Reviews',
  ctaHref = 'https://www.google.com/search?gs_ssp=eJzj4tVP1zc0TMsqKy-rjDcxYLRSNagwNU40MLQ0MDFMNbZINDI3tDKosLAwtEwzNE4ysExMTLVMNvWSTcxJSi0qSVTIzMsqLapUyE3MS0xPzU3NKwGKJAMAHNwaXA&q=alberta+injury+management+inc&rlz=1C5MACD_enCA1153CA1171&oq=albertta+injury+managemnt+&gs_lcrp=EgZjaHJvbWUqDwgBEC4YDRivARjHARiABDIGCAAQRRg5Mg8IARAuGA0YrwEYxwEYgAQyCQgCEAAYDRiABDIICAMQABgWGB4yCAgEEAAYFhgeMggIBRAAGBYYHjIICAYQABgWGB4yCggHEAAYCBgNGB4yDQgIEAAYhgMYgAQYigXSAQoxMjAzM2owajE1qAIJsAIB8QVGZb6yhh5M5Q&sourceid=chrome&ie=UTF-8',
  className = ''
}: ReviewBlockProps) {
  const renderStars = (rating: number, size: 'sm' | 'md' = 'sm') => {
    const sizeClass = size === 'md' ? 'h-5 w-5' : 'h-4 w-4';

    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((position) => {
          const fillPercentage = Math.min(Math.max(rating - (position - 1), 0), 1);

          return (
            <div key={position} className="relative">
              <Star className={`${sizeClass} text-gray-300`} />
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${fillPercentage * 100}%` }}
              >
                <Star className={`${sizeClass} fill-yellow-400 text-yellow-400`} />
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  if (variant === 'hero') {
    return (
      <div className={`bg-gray-50 border border-gray-200 rounded-lg p-6 ${className}`}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            {renderStars(aggregateRating, 'md')}
            <div>
              <p className="font-semibold text-lg">{aggregateRating}/5</p>
              <p className="text-sm text-gray-600">based on {reviewCount}+ Google Reviews</p>
            </div>
          </div>
          {reviews[0] && (
            <div className="flex-1 md:max-w-2xl">
              <blockquote className="text-gray-700 italic">
                "{reviews[0].excerpt}"
              </blockquote>
              <p className="text-sm text-gray-600 mt-2">
                — {reviews[0].reviewer_name}, Google Review
              </p>
            </div>
          )}
          <div className="flex gap-3">
            <Button asChild variant="outline" size="sm">
              <a href={ctaHref} target="_blank" rel="noopener noreferrer">
                {ctaLabel}
              </a>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'grid') {
    return (
      <div className={`space-y-6 ${className}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <Card key={review.id || index} className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex justify-between items-start mb-3">
                  {renderStars(review.rating)}
                  {review.source && (
                    <span className="text-xs text-gray-500">{review.source}</span>
                  )}
                </div>
                <blockquote className="text-gray-700 mb-4 line-clamp-4">
                  "{review.excerpt}"
                </blockquote>
                <p className="text-sm font-medium text-gray-900">
                  — {review.reviewer_name}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        {ctaLabel && ctaHref && (
          <div className="flex justify-center">
            <Button asChild variant="outline" size="sm">
              <a href={ctaHref} target="_blank" rel="noopener noreferrer">
                {ctaLabel}
              </a>
            </Button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {reviews.map((review, index) => (
        <div
          key={review.id || index}
          className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg"
        >
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-1">
              {renderStars(review.rating)}
            </div>
            <div className="flex-1">
              <blockquote className="text-gray-800 mb-2">
                "{review.excerpt}"
              </blockquote>
              <p className="text-sm text-gray-600">
                — {review.reviewer_name}
                {review.source && `, ${review.source} Review`}
              </p>
            </div>
          </div>
        </div>
      ))}
      {ctaLabel && ctaHref && (
        <div className="flex justify-center pt-2">
          <Button asChild variant="outline" size="sm">
            <a href={ctaHref} target="_blank" rel="noopener noreferrer">
              {ctaLabel}
            </a>
          </Button>
        </div>
      )}
    </div>
  );
}
