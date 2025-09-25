'use client';

import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/FadeIn";
import Footer from "@/components/Footer";
import PageWrapper from "@/components/page-wrapper";
import Logo from "@/components/Logo";
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
    let touchStartY = 0;
    let touchEndY = 0;

    const handleWheel = (e: WheelEvent) => {
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

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isTransitioning) return;

      touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY - touchEndY;
      const threshold = 50;

      if (Math.abs(deltaY) > threshold) {
        setIsTransitioning(true);

        if (deltaY > 0 && currentSection < totalSections - 1) {
          // Swipe up - go to next section
          setPreviousSection(currentSection);
          setCurrentSection(prev => prev + 1);
        } else if (deltaY < 0 && currentSection > 0) {
          // Swipe down - go to previous section
          setPreviousSection(currentSection);
          setCurrentSection(prev => prev - 1);
        }

        // Reset transition lock after animation completes
        setTimeout(() => setIsTransitioning(false), 1200);
      }
    };

    // Add event listeners for both desktop and mobile
    document.addEventListener('wheel', handleWheel, { passive: false });
    document.addEventListener('touchstart', handleTouchStart, { passive: false });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd, { passive: false });
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('wheel', handleWheel);
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
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

  // Get section colors based on index - ensuring all sections start with black
  const getSectionColors = (index: number) => {
    // All sections should have black background to match the design
    return {
      bg: 'bg-black',
      text: 'text-white',
      subtext: 'text-gray-300',
      accent: 'bg-white',
      avatar: 'bg-gray-800',
      avatarHover: 'hover:bg-gray-700'
    };
  };

  return (
    <PageWrapper>
      <div className="relative overflow-x-hidden max-w-full">
        {/* Fixed Background */}
        <div className="fixed inset-0 z-0 bg-black" />

        {/* Fixed Navigation */}
        <div className="fixed top-4 left-4 md:top-6 md:left-6 z-50 hidden md:block">
          <Link href="/" aria-label="Home">
            <Logo
              variant="black"
              size="md"
              priority
            />
          </Link>
        </div>
        <div className="sticky top-0 left-0 z-50 block md:hidden bg-transparent pt-2 pl-2">
          <Link href="/" aria-label="Home">
            <Logo
              variant="black"
              size="sm"
              priority
            />
          </Link>
        </div>

        {/* Container for layered sections */}
        <div className="relative z-10 h-screen overflow-hidden max-w-full">
          {/* Introduction Section */}
          <div
            className={`absolute inset-0 w-full h-full flex items-center justify-center ${getSectionColors(0).bg}`}
            style={getSectionStyle(0)}
            data-section="0"
          >
            <div className="container mx-auto px-4 sm:px-6 max-w-full pb-24 sm:pb-16 lg:pb-0">
              <FadeIn>
                <div className="text-center">
                  <h1 className={`text-3xl sm:text-4xl md:text-6xl font-light ${getSectionColors(0).text} mb-4`}>
                    Our Team
                  </h1>
                  <div className={`w-16 sm:w-24 h-0.5 ${getSectionColors(0).accent} mx-auto mb-6 sm:mb-8`}></div>
                  <p className={`text-base sm:text-lg ${getSectionColors(0).subtext} max-w-full sm:max-w-2xl mx-auto leading-relaxed mb-8 sm:mb-12 px-4`}>
                    A student-led initiative building the future of education
                  </p>
                  <div className={`${getSectionColors(0).subtext} text-sm`}>
                    {/* Mobile: Swipe instruction, Desktop: Scroll instruction */}
                    <span className="block sm:hidden">Swipe up to meet our founders</span>
                    <span className="hidden sm:block">Scroll to meet our founders</span>
                  </div>
                  <div className="mt-4">
                    {/* Mobile: Down arrow, Desktop: Right arrow */}
                    <svg className={`w-5 h-5 sm:w-6 sm:h-6 mx-auto ${getSectionColors(0).subtext} animate-bounce sm:hidden`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                    <svg className={`w-5 h-5 sm:w-6 sm:h-6 mx-auto ${getSectionColors(0).subtext} animate-pulse hidden sm:block`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l7-7m0 0l-7-7m7 7H3" />
                    </svg>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>

          {/* Rishal Melvani Section */}
          <div
            className="absolute inset-0 w-full h-full bg-black overflow-x-hidden"
            style={getSectionStyle(1)}
            data-section="1"
          >
            <div className="container mx-auto px-4 sm:px-6 h-full max-w-full">
              <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4 sm:gap-8 lg:gap-12 h-full items-center justify-center pb-24 sm:pb-16 lg:pb-0">

                {/* Photo */}
                <div className="flex items-center justify-center lg:order-1 flex-shrink-0">
                  <div className="relative group">
                    <div className="relative">
                      <Image
                        src="/optimized/rishal-melvani-lg.webp"
                        alt="Rishal Melvani - Founder"
                        width={400}
                        height={500}
                        className="w-64 h-80 sm:w-80 sm:h-96 md:w-96 md:h-[28rem] object-cover object-top transition-all duration-700 hover:scale-[1.02]"
                        sizes="(max-width: 640px) 256px, (max-width: 768px) 320px, (max-width: 1024px) 384px, 400px"
                        quality={95}
                        priority
                        style={{
                          maskImage: 'linear-gradient(to bottom, black 0%, black 85%, transparent 100%)',
                          WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 85%, transparent 100%)',
                          filter: 'sepia(0.3) saturate(0.7) brightness(0.9) contrast(1.1)'
                        }}
                      />
                      <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                  </div>
                </div>

                {/* Text */}
                <div className="flex flex-col justify-center lg:order-2 text-center lg:text-left lg:pl-8 max-w-full">
                  <div className="space-y-2 sm:space-y-3">
                    <h2 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-light text-white leading-tight tracking-tight overflow-hidden">
                      <div className="block">Rishal</div>
                      <div className="block">Melvani</div>
                    </h2>
                    <div className="w-24 sm:w-32 h-1 bg-white mx-auto lg:mx-0"></div>
                    <div className="space-y-1 sm:space-y-2">
                      <p className="text-xl sm:text-2xl md:text-3xl text-gray-300 font-light tracking-wide">
                        Founder
                      </p>
                      <p className="text-lg sm:text-xl md:text-2xl text-gray-400 font-light tracking-wide">
                        Director of Blueprints
                      </p>
                    </div>
                  </div>

                  {/* Navigation hint */}
                  <div className="mt-8 sm:mt-16 text-gray-300 text-sm opacity-60 text-center lg:text-left">
                    <span className="block sm:hidden">Continue swiping</span>
                    <span className="hidden sm:block">Continue scrolling</span>
                    <div className="mt-2 flex justify-center lg:justify-start">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 animate-bounce sm:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l7-7m0 0l-7-7m7 7H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Ishaan Singh Section */}
          <div
            className="absolute inset-0 w-full h-full bg-black overflow-x-hidden"
            style={getSectionStyle(2)}
            data-section="2"
          >
            <div className="container mx-auto px-4 sm:px-6 h-full max-w-full">
              <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4 sm:gap-8 lg:gap-12 h-full items-center justify-center pb-24 sm:pb-16 lg:pb-0">

                {/* Text */}
                <div className="flex flex-col justify-center lg:order-1 text-center lg:text-right lg:pr-8 max-w-full">
                  <div className="space-y-2 sm:space-y-3">
                    <h2 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-light text-white leading-tight tracking-tight">
                      <div className="block">Ishaan</div>
                      <div className="block">Singh</div>
                    </h2>
                    <div className="w-24 sm:w-32 h-1 bg-white mx-auto lg:mx-0 lg:ml-auto"></div>
                    <div className="space-y-1 sm:space-y-2">
                      <p className="text-xl sm:text-2xl md:text-3xl text-gray-300 font-light tracking-wide">
                        Founder
                      </p>
                      <p className="text-lg sm:text-xl md:text-2xl text-gray-400 font-light tracking-wide">
                        Director of Evaluations
                      </p>
                    </div>
                  </div>
                </div>

                {/* Photo */}
                <div className="flex items-center justify-center lg:order-2 flex-shrink-0">
                  <div className="relative group">
                    <div className="relative">
                      <Image
                        src="/optimized/ishaan-singh-lg.webp"
                        alt="Ishaan Singh - Founder"
                        width={400}
                        height={500}
                        className="w-64 h-80 sm:w-80 sm:h-96 md:w-96 md:h-[28rem] object-cover object-top transition-all duration-700 hover:scale-[1.02]"
                        sizes="(max-width: 640px) 256px, (max-width: 768px) 320px, (max-width: 1024px) 384px, 400px"
                        quality={95}
                        priority
                        style={{
                          maskImage: 'linear-gradient(to bottom, black 0%, black 85%, transparent 100%)',
                          WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 85%, transparent 100%)',
                          filter: 'sepia(0.3) saturate(0.7) brightness(0.9) contrast(1.1)'
                        }}
                      />
                      <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>


        </div>

        {/* Section indicators */}
        <div className="fixed bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-50 flex space-x-2">
          {Array.from({ length: totalSections }).map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${currentSection === index ? 'bg-white scale-125' : 'bg-gray-500'
                }`}
            />
          ))}
        </div>

        <Footer />
      </div>
    </PageWrapper>
  );
}