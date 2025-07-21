'use client';

import { useState, useEffect, useRef, memo } from 'react';
import { useInView } from 'react-intersection-observer';
import { usePrefersReducedMotion } from './PerformanceUtils';

interface OptimizedVideoProps {
  src: string;
  poster?: string;
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
  preload?: 'auto' | 'metadata' | 'none';
  width?: number;
  height?: number;
  priority?: boolean;
  playbackRate?: number;
  onLoad?: () => void;
}

/**
 * A component for optimized video playback that:
 * - Lazy loads videos when they enter the viewport
 * - Automatically pauses videos when they're not visible
 * - Respects user preferences for reduced motion
 * - Optimizes playback based on device capabilities
 * - Provides fallback for browsers that don't support video
 * - Enhanced with accessibility features
 */
export const OptimizedVideo = memo(function OptimizedVideo({
  src,
  poster,
  className = '',
  autoPlay = true,
  loop = true,
  muted = true,
  controls = false,
  preload = 'metadata',
  width,
  height,
  priority = false,
  playbackRate = 1,
  onLoad,
}: OptimizedVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  
  // Use intersection observer to detect when video is in viewport
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });
  
  // Combine refs
  const setRefs = (element: HTMLVideoElement | null) => {
    // Use a mutable ref object
    if (videoRef) {
      (videoRef as React.MutableRefObject<HTMLVideoElement | null>).current = element;
    }
    ref(element);
  };
  
  // Handle video loading
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    const handleCanPlayThrough = () => {
      setIsLoaded(true);
      if (onLoad) onLoad();
    };
    
    video.addEventListener('canplaythrough', handleCanPlayThrough);
    
    // Set playback rate
    video.playbackRate = playbackRate;
    
    return () => {
      video.removeEventListener('canplaythrough', handleCanPlayThrough);
    };
  }, [onLoad, playbackRate]);
  
  // Handle play/pause based on visibility and reduced motion preference
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    if (inView && !prefersReducedMotion && autoPlay) {
      // Play video when in view and user doesn't prefer reduced motion
      video.play().catch(error => {
        console.error('Error playing video:', error);
      });
    } else {
      // Pause video when not in view or user prefers reduced motion
      video.pause();
    }
  }, [inView, prefersReducedMotion, autoPlay]);
  
  // Handle cleanup
  useEffect(() => {
    const video = videoRef.current;
    
    return () => {
      if (video) {
        video.pause();
        video.src = '';
        video.load();
      }
    };
  }, []);
  
  // Extract video name for accessibility labels
  const videoName = src.split('/').pop()?.split('.')[0] || 'video';
  const videoTitle = videoName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  
  return (
    <div 
      className={`relative ${className}`} 
      style={{ aspectRatio: width && height ? `${width}/${height}` : 'auto' }}
      role="region"
      aria-label={`${videoTitle} video`}
    >
      {(!isLoaded || !inView) && poster && (
        <div className="absolute inset-0">
          <img 
            src={poster} 
            alt={`Poster image for ${videoTitle} video`}
            className="w-full h-full object-cover"
            loading={priority ? 'eager' : 'lazy'}
          />
        </div>
      )}
      
      {/* Only load video source when in viewport or if priority is true */}
      <video
        ref={setRefs}
        className={`w-full h-full object-cover ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
        autoPlay={autoPlay && !prefersReducedMotion}
        loop={loop}
        muted={muted}
        controls={controls}
        playsInline
        preload={priority ? 'auto' : preload}
        width={width}
        height={height}
        aria-label={`${videoTitle} video`}
        tabIndex={controls ? 0 : -1}
        aria-hidden={!controls}
      >
        {(inView || priority) && <source src={src} type={`video/${src.split('.').pop()}`} />}
        <p>Your browser does not support the video tag. You can <a href={src} download>download the video</a> instead.</p>
      </video>
      
      {/* Alternative content for users with reduced motion preference */}
      {prefersReducedMotion && (
        <div 
          className="absolute inset-0 bg-white/90 backdrop-blur-sm flex items-center justify-center p-4 text-center"
          role="alert"
        >
          <div>
            <p className="text-[#2C4D6E] mb-2">Video paused due to reduced motion preference</p>
            {controls && (
              <button
                className="px-4 py-2 bg-[#1A6B8A] text-white rounded-md hover:bg-[#0D5A78] focus:outline-none focus:ring-2 focus:ring-[#1A6B8A] focus:ring-offset-2"
                onClick={() => {
                  const video = videoRef.current;
                  if (video) {
                    video.play().catch(error => {
                      console.error('Error playing video:', error);
                    });
                  }
                }}
                aria-label="Play video anyway"
              >
                Play video anyway
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
});

/**
 * A component for background videos with optimized loading and playback
 * Enhanced with accessibility features
 */
export const BackgroundVideo = memo(function BackgroundVideo({
  src,
  poster,
  className = '',
  overlayGradient = true,
  priority = false,
}: {
  src: string;
  poster?: string;
  className?: string;
  overlayGradient?: boolean;
  priority?: boolean;
}) {
  // Extract video name for accessibility labels
  const videoName = src.split('/').pop()?.split('.')[0] || 'background video';
  const videoTitle = videoName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  
  return (
    <div 
      className={`absolute inset-0 overflow-hidden ${className}`}
      role="region"
      aria-label={`${videoTitle} background`}
    >
      <OptimizedVideo
        src={src}
        poster={poster}
        autoPlay
        loop
        muted
        className="w-full h-full object-cover"
        priority={priority}
      />
      {overlayGradient && (
        <div 
          className="absolute inset-0 bg-gradient-to-b from-[#E6F2FF]/80 to-[#B3D9E5]/80" 
          aria-hidden="true"
        />
      )}
    </div>
  );
});