'use client';

import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/FadeIn";
import { useEffect, useState } from "react";

export default function Team() {
  const [currentSection, setCurrentSection] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [previousSection, setPreviousSection] = useState(0);
  // Founders data
  const founders = [
    { id: 1, name: "Rishal Melvani", title: "Founder" },
    { id: 2, name: "Ishaan Singh", title: "Founder" },
  ];

  // Total sections: intro + founders (no footer)
  const totalSections = 1 + founders.length;

  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      e.preventDefault();

      if (isTransitioning) return;

      const delta = e.deltaY;
      const threshold = 50;

      if (Math.abs(delta) > threshold) {
        setIsTransitioning(true);

        if (delta > 0 && currentSection < totalSections - 1) {
          // Scroll down
          setPreviousSection(currentSection);
          setCurrentSection(prev => prev + 1);
        } else if (delta < 0 && currentSection > 0) {
          // Scroll up
          setPreviousSection(currentSection);
          setCurrentSection(prev => prev - 1);
        }

        // Reset transition lock after animation completes
        setTimeout(() => setIsTransitioning(false), 1200);
      }
    };

    // Prevent default scrolling and add custom scroll handler
    document.addEventListener('wheel', handleScroll, { passive: false });
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('wheel', handleScroll);
      document.body.style.overflow = 'auto';
    };
  }, [currentSection, isTransitioning, totalSections]);

  // Handle slide-in animation when transitioning
  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => {
        const element = document.querySelector(`[data-section="${currentSection}"]`) as HTMLElement;
        if (element) {
          element.style.transform = 'translateX(0%)';
        }
      }, 50);

      return () => clearTimeout(timer);
    }
  }, [isTransitioning, currentSection]);

  // Get blur and slide styles for layered transition
  const getSectionStyle = (sectionIndex: number) => {
    // Current active section (not transitioning)
    if (sectionIndex === currentSection && !isTransitioning) {
      return {
        transform: 'translateX(0%)',
        filter: 'blur(0px)',
        opacity: 1,
        zIndex: 10,
        transition: 'filter 300ms ease-in'
      };
    }

    // Previous section during transition (gets blurred)
    if (sectionIndex === previousSection && isTransitioning) {
      return {
        transform: 'translateX(0%)',
        filter: 'blur(6px)',
        opacity: 1,
        zIndex: 5,
        transition: 'filter 300ms ease-out'
      };
    }

    // New section sliding in during transition
    if (sectionIndex === currentSection && isTransitioning) {
      const isMovingForward = currentSection > previousSection;
      const startPosition = isMovingForward ? '100%' : '-100%';

      return {
        transform: `translateX(${startPosition})`,
        filter: 'blur(0px)',
        opacity: 1,
        zIndex: 15,
        transition: 'transform 800ms cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      };
    }

    // Default positioning for non-active sections
    if (sectionIndex > currentSection) {
      // Future sections - positioned to the right
      return {
        transform: 'translateX(100%)',
        filter: 'blur(0px)',
        opacity: 1,
        zIndex: 1,
        transition: 'none'
      };
    } else {
      // Past sections - positioned to the left
      return {
        transform: 'translateX(-100%)',
        filter: 'blur(0px)',
        opacity: 1,
        zIndex: 1,
        transition: 'none'
      };
    }
  };

  // Get section colors based on index
  const getSectionColors = (index: number) => {
    if (index === 0) {
      // Intro section - black
      return {
        bg: 'bg-black',
        text: 'text-white',
        subtext: 'text-gray-300',
        accent: 'bg-white',
        avatar: 'bg-gray-800',
        avatarHover: 'hover:bg-gray-700'
      };
    } else {
      // Alternate colors for founders
      const founderIndex = index - 1;
      if (founderIndex % 2 === 0) {
        // White background for first founder
        return {
          bg: 'bg-white',
          text: 'text-black',
          subtext: 'text-gray-600',
          accent: 'bg-black',
          avatar: 'bg-gray-100',
          avatarHover: 'hover:bg-gray-200'
        };
      } else {
        // Black background for second founder
        return {
          bg: 'bg-black',
          text: 'text-white',
          subtext: 'text-gray-300',
          accent: 'bg-white',
          avatar: 'bg-gray-800',
          avatarHover: 'hover:bg-gray-700'
        };
      }
    }
  };

  return (
    <>
      {/* Top-left logo - Dynamic based on current section */}
      <div className="fixed top-6 left-6 z-50 hidden md:block">
        <Link href="/" aria-label="Home">
          <Image 
            src={currentSection === 1 ? "/EFOF Logo.png" : "/EFOF Logo 2.png"} 
            alt="Education for Our Future Logo" 
            width={180} 
            height={60} 
            className="h-16 w-auto hover:opacity-90 transition-opacity duration-200" 
          />
        </Link>
      </div>
      <div className="sticky top-0 left-0 z-50 block md:hidden bg-transparent pt-4 pl-4">
        <Link href="/" aria-label="Home">
          <Image 
            src={currentSection === 1 ? "/EFOF Logo.png" : "/EFOF Logo 2.png"} 
            alt="Education for Our Future Logo" 
            width={140} 
            height={48} 
            className="h-14 w-auto hover:opacity-90 transition-opacity duration-200" 
          />
        </Link>
      </div>

      {/* Container for layered sections */}
      <div className="h-screen overflow-hidden relative">
        {/* Introduction Section */}
        <div
          className={`absolute inset-0 w-full h-full flex items-center justify-center ${getSectionColors(0).bg}`}
          style={getSectionStyle(0)}
          data-section="0"
        >
          <div className="container mx-auto px-6">
            <FadeIn>
              <div className="text-center">
                <h1 className={`text-4xl md:text-6xl font-light ${getSectionColors(0).text} mb-4`}>
                  Our Team
                </h1>
                <div className={`w-24 h-0.5 ${getSectionColors(0).accent} mx-auto mb-8`}></div>
                <p className={`text-lg ${getSectionColors(0).subtext} max-w-2xl mx-auto leading-relaxed mb-12`}>
                  A student-led initiative building the future of education
                </p>
                <div className={`${getSectionColors(0).subtext} text-sm`}>
                  Scroll to meet our founders
                </div>
                <div className="mt-4">
                  <svg className={`w-6 h-6 mx-auto ${getSectionColors(0).subtext} animate-bounce`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Individual Founder Sections */}
        {founders.map((founder, index) => {
          const sectionIndex = index + 1;
          const colors = getSectionColors(sectionIndex);
          const isLeftLayout = index % 2 === 0; // Alternate layout sides

          return (
            <div
              key={founder.id}
              className={`absolute inset-0 w-full h-full ${colors.bg}`}
              style={getSectionStyle(sectionIndex)}
              data-section={sectionIndex}
            >
              <div className="container mx-auto px-6 h-full">
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 h-full items-center ${isLeftLayout ? '' : 'lg:grid-flow-col-dense'}`}>

                  {/* Minimalistic Photo Integration */}
                  <div className={`flex items-center justify-center ${isLeftLayout ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div className="relative group">
                      {/* Minimalistic Photo Integration for Both Founders */}
                      <div className="relative">
                        <Image
                          src={founder.name === "Ishaan Singh" ? "/ishaan singh.png" : "/rishal melvani.png"}
                          alt={`${founder.name} - ${founder.title}`}
                          width={400}
                          height={500}
                          className="w-80 h-96 md:w-96 md:h-[28rem] object-cover object-top transition-all duration-700 hover:scale-[1.02]"
                          style={{
                            maskImage: 'linear-gradient(to bottom, black 0%, black 85%, transparent 100%)',
                            WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 85%, transparent 100%)',
                            filter: colors.bg === 'bg-black' 
                              ? 'sepia(0.3) saturate(0.7) brightness(0.9) contrast(1.1)' 
                              : 'sepia(0.2) saturate(0.8) brightness(1.1) contrast(1.05)'
                          }}
                        />
                        {/* Subtle overlay for text contrast */}
                        <div className={`absolute inset-0 ${colors.bg === 'bg-black' ? 'bg-black/10' : 'bg-white/10'} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                      </div>
                    </div>
                  </div>

                  {/* Impactful Text */}
                  <div className={`flex flex-col justify-center ${isLeftLayout ? 'lg:order-2 text-left lg:pl-8' : 'lg:order-1 text-right lg:pr-8'}`}>
                    <div className="space-y-6">
                      {/* Name */}
                      <h2 className={`text-5xl md:text-7xl lg:text-8xl font-light ${colors.text} leading-none tracking-tight`}>
                        {founder.name.split(' ').map((word, i) => (
                          <div key={i} className="block">
                            {word}
                          </div>
                        ))}
                      </h2>

                      {/* Divider */}
                      <div className={`w-32 h-1 ${colors.accent} ${isLeftLayout ? '' : 'ml-auto'}`}></div>

                      {/* Title */}
                      <p className={`text-2xl md:text-3xl ${colors.subtext} font-light tracking-wide`}>
                        {founder.title}
                      </p>

                      {/* Description */}
                      <p className={`text-lg ${colors.subtext} opacity-70 max-w-md ${isLeftLayout ? '' : 'ml-auto text-right'} leading-relaxed`}>
                        {index === 0
                          ? "Visionary leader driving educational innovation through technology and collaboration."
                          : "Strategic thinker focused on creating meaningful impact in the education sector."
                        }
                      </p>
                    </div>

                    {/* Navigation hint - only for first founder */}
                    {index === 0 && (
                      <div className={`mt-16 ${colors.subtext} text-sm opacity-60 ${isLeftLayout ? '' : 'text-right'}`}>
                        Continue scrolling
                        <div className={`mt-2 ${isLeftLayout ? '' : 'flex justify-end'}`}>
                          <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}


      </div>

      {/* Section indicators */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 flex space-x-2">
        {Array.from({ length: totalSections }).map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${currentSection === index ? 'bg-white scale-125' : 'bg-gray-500'
              }`}
          />
        ))}
      </div>


    </>
  );
}