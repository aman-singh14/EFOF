'use client';

import Image from 'next/image';
import { useState } from 'react';

interface LogoProps {
  variant?: 'black' | 'white'; // black logo for white backgrounds, white logo for black backgrounds
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  priority?: boolean;
}

const logoSizes = {
  sm: { width: 140, height: 48, className: 'h-12 w-auto' },
  md: { width: 180, height: 60, className: 'h-16 w-auto' },
  lg: { width: 250, height: 70, className: 'h-20 w-auto' },
};

export default function Logo({
  variant = 'black',
  size = 'md',
  className = '',
  priority = false,
}: LogoProps) {
  // Always call hooks at the top level
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  
  const logoConfig = logoSizes[size];
  const logoSrc = variant === 'black' ? '/optimized/efof-logo-lg.webp' : '/optimized/efof-logo-lg.webp';

  // For critical logos (priority=true), render immediately without loading states
  if (priority) {
    return (
      <div className={`relative ${className}`}>
        <Image
          src={logoSrc}
          alt="Education for Our Future Logo"
          width={logoConfig.width}
          height={logoConfig.height}
          className={`${logoConfig.className} hover:opacity-90 transition-opacity duration-200`}
          priority={true}
          fetchPriority="high"
          quality={90}
          style={{
            objectFit: 'contain',
            width: 'auto',
            height: logoConfig.className.includes('h-12') ? '3rem' : 
                   logoConfig.className.includes('h-16') ? '4rem' : '5rem',
          }}
        />
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <Image
        src={logoSrc}
        alt="Education for Our Future Logo"
        width={logoConfig.width}
        height={logoConfig.height}
        className={`${logoConfig.className} hover:opacity-90 transition-opacity duration-200 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        onLoad={() => setIsLoading(false)}
        onError={() => setHasError(false)}
        priority={false}
        quality={90}
        style={{
          objectFit: 'contain',
          width: 'auto',
          height: logoConfig.className.includes('h-12') ? '3rem' : 
                 logoConfig.className.includes('h-16') ? '4rem' : '5rem',
        }}
      />
      {isLoading && (
        <div 
          className={`absolute inset-0 bg-gray-200 animate-pulse ${logoConfig.className}`}
          style={{
            width: logoConfig.width,
            height: logoConfig.height,
          }}
        />
      )}
    </div>
  );
}