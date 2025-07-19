'use client';

import { useEffect, useRef } from 'react';

export default function ConnectingText({ text, className = '' }: { text: string; className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const words = text.split(' ');

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const wordSpans = container.querySelectorAll('.word-container');
    
    // Animate each word
    wordSpans.forEach((wordSpan) => {
      const chars = wordSpan.querySelectorAll('span');
      
      chars.forEach((char, index) => {
        // Random delay between 0 and 1 second
        const delay = Math.random() * 1000;
        // Random starting position (off-screen in any direction)
        const startX = (Math.random() - 0.5) * 100;
        const startY = (Math.random() - 0.5) * 100;
        
        // Set initial position
        char.style.transform = `translate(${startX}px, ${startY}px)`;
        char.style.opacity = '0';
        
        // Animate to final position
        setTimeout(() => {
          char.style.transition = 'all 1s ease-out';
          char.style.transform = 'translate(0, 0)';
          char.style.opacity = '1';
        }, delay);
      });
    });
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`flex flex-wrap justify-center gap-x-1 ${className}`}
      style={{ lineHeight: '1.5' }}
    >
      {words.map((word, wordIndex) => (
        <span 
          key={wordIndex} 
          className="word-container inline-flex flex-nowrap mr-1"
          style={{ whiteSpace: 'nowrap' }}
        >
          {word.split('').map((char, charIndex) => (
            <span 
              key={charIndex} 
              className="inline-block transition-all duration-1000 ease-out opacity-0"
            >
              {char}
            </span>
          ))}
          {wordIndex < words.length - 1 && ' '}
        </span>
      ))}
    </div>
  );
}
