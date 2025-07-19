'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useAccessibility } from './AccessibilityProvider';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  role?: string;
  longDesc?: string;
}

/**
 * A wrapper component for Next.js Image with built-in loading state and optimization
 * This component ensures all images use Next.js Image optimization features
 * Enhanced with accessibility features
 */
export function OptimizedImage({ 
  src, 
  alt, 
  width, 
  height, 
  className = '', 
  priority = false,
  placeholder = 'empty',
  blurDataURL,
  role,
  longDesc
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [imgSrc, setImgSrc] = useState(src);
  const { highContrastMode } = useAccessibility();
  
  // Generate automatic blur data URL for small colored placeholder
  const autoBlurData = `data:image/svg+xml;base64,${Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" fill="none">
      <rect width="${width}" height="${height}" fill="#E6F2FF"/>
    </svg>`
  ).toString('base64')}`;

  // Handle image loading errors
  const handleError = () => {
    console.error(`Failed to load image: ${src}`);
    // Set a fallback image or placeholder
    setImgSrc('/images/placeholder.jpg');
  };

  return (
    <div 
      className={`relative ${className}`} 
      style={{ aspectRatio: `${width}/${height}` }}
      role={role || "img"}
      aria-busy={isLoading}
    >
      {isLoading && (
        <div 
          className="absolute inset-0 bg-gray-200 animate-pulse rounded-md" 
          role="presentation"
          aria-hidden="true"
        />
      )}
      <Image
        src={imgSrc}
        alt={alt} // Ensure alt text is descriptive and meaningful
        width={width}
        height={height}
        className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'} ${highContrastMode ? 'contrast-125 brightness-110' : ''}`}
        onLoad={() => setIsLoading(false)}
        onError={handleError}
        priority={priority}
        loading={priority ? 'eager' : 'lazy'}
        sizes="(max-width: 640px) 100vw, (max-width: 768px) 75vw, (max-width: 1024px) 50vw, 33vw"
        quality={85}
        placeholder={placeholder}
        blurDataURL={blurDataURL || autoBlurData}
        aria-describedby={longDesc ? `desc-${src.replace(/[^a-zA-Z0-9]/g, '-')}` : undefined}
      />
      
      {/* Hidden description for complex images */}
      {longDesc && (
        <div 
          id={`desc-${src.replace(/[^a-zA-Z0-9]/g, '-')}`} 
          className="sr-only"
        >
          {longDesc}
        </div>
      )}
    </div>
  );
}

/**
 * A component for background images that ensures proper optimization
 * Enhanced with accessibility features
 */
export function OptimizedBackgroundImage({
  src,
  alt,
  className = '',
  priority = false,
  placeholder = 'empty',
  blurDataURL,
  overlayGradient = true
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  overlayGradient?: boolean;
}) {
  const [imgSrc, setImgSrc] = useState(src);
  const { highContrastMode } = useAccessibility();
  
  // Generate automatic blur data URL for small colored placeholder
  const autoBlurData = `data:image/svg+xml;base64,${Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1" fill="none">
      <rect width="1" height="1" fill="#E6F2FF"/>
    </svg>`
  ).toString('base64')}`;

  // Handle image loading errors
  const handleError = () => {
    console.error(`Failed to load background image: ${src}`);
    // Set a fallback image or placeholder
    setImgSrc('/images/placeholder-bg.jpg');
  };

  return (
    <div 
      className={`absolute inset-0 overflow-hidden ${className}`}
      role="img"
      aria-label={alt} // Ensure background images have accessible descriptions
    >
      <Image
        src={imgSrc}
        alt={alt}
        fill
        className={`object-cover ${highContrastMode ? 'contrast-125 brightness-110' : ''}`}
        priority={priority}
        loading={priority ? 'eager' : 'lazy'}
        sizes="100vw"
        quality={85}
        onError={handleError}
        placeholder={placeholder}
        blurDataURL={blurDataURL || autoBlurData}
      />
      {overlayGradient && (
        <div 
          className="absolute inset-0 bg-gradient-to-b from-[#E6F2FF]/80 to-[#B3D9E5]/80" 
          aria-hidden="true"
        />
      )}
    </div>
  );
}

/**
 * A component for responsive images that automatically selects the appropriate image size
 * Enhanced with accessibility features
 */
export function ResponsiveImage({
  src,
  alt,
  className = '',
  priority = false,
  sizes = '100vw',
  aspectRatio = '16/9'
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  aspectRatio?: string;
}) {
  const { highContrastMode } = useAccessibility();
  const [isLoading, setIsLoading] = useState(true);
  
  return (
    <div 
      className={`relative ${className}`} 
      style={{ aspectRatio }}
      role="img"
      aria-label={alt}
      aria-busy={isLoading}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className={`object-cover ${isLoading ? 'opacity-80' : 'opacity-100'} ${highContrastMode ? 'contrast-125 brightness-110' : ''}`}
        priority={priority}
        loading={priority ? 'eager' : 'lazy'}
        sizes={sizes}
        quality={85}
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
}