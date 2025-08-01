'use client';

import Image from 'next/image';
import { useState } from 'react';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  style?: React.CSSProperties;
}

// Mapping for optimized images
const optimizedImageMap: Record<string, string> = {
  '/rishal melvani.png': '/optimized/rishal-melvani',
  '/ishaan singh.png': '/optimized/ishaan-singh',
  '/EFOF Logo 2.png': '/optimized/efof-logo',
};

export default function ResponsiveImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  sizes = '(max-width: 768px) 150px, (max-width: 1200px) 300px, 400px',
  style,
}: ResponsiveImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Check if we have an optimized version
  const optimizedBase = optimizedImageMap[src];
  
  // For team member images, use higher quality and fallback to original for better quality
  const isTeamMember = src.includes('rishal melvani.png') || src.includes('ishaan singh.png');
  
  // If we have optimized versions and it's not a team member (where we want higher quality)
  if (optimizedBase && !hasError && !isTeamMember) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image
          src={`${optimizedBase}-lg.webp`}
          alt={alt}
          width={width}
          height={height}
          className={`transition-opacity duration-300 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setHasError(true);
            setIsLoading(false);
          }}
          priority={priority}
          sizes={sizes}
          quality={90}
          style={{
            objectFit: 'cover',
            width: '100%',
            height: 'auto',
            ...style,
          }}
        />
        {isLoading && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg" />
        )}
      </div>
    );
  }

  // Fallback to original image
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        onLoad={() => setIsLoading(false)}
        priority={priority}
        sizes={sizes}
        style={{
          objectFit: 'cover',
          width: '100%',
          height: 'auto',
          ...style,
        }}
      />
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg" />
      )}
    </div>
  );
}