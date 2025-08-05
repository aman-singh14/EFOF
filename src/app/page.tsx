'use client';

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import PageWrapper from "@/components/page-wrapper";
import ScrollAnimation from "@/components/ScrollAnimation";
import LazyScrollAnimation from "@/components/LazyScrollAnimation";
import { useRef } from "react";
import Footer from "@/components/Footer";
import Logo from "@/components/Logo";

// Progressive Enhancement Video - loads after text animations and LCP
function ProgressiveHeroVideo() {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    // Wait for text animations to complete before starting video load
    const timer = setTimeout(() => {
      setVideoLoaded(true);
    }, 1500); // After text animations finish (1.0s + buffer)

    return () => clearTimeout(timer);
  }, []);

  const handleVideoCanPlay = () => {
    // Video is ready to play smoothly
    setVideoReady(true);
  };

  if (!videoLoaded) return null;

  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-out ${videoReady ? 'opacity-100' : 'opacity-0'
        }`}
      style={{ zIndex: 1 }} // Behind text content
      onCanPlay={handleVideoCanPlay}
      onLoadedData={handleVideoCanPlay}
    >
      <source src="/videos/12266398_1920_1080_30fps.mp4" type="video/mp4" />
    </video>
  );
}



// Minimalistic Triangle Section Component
const MinimalisticTriangleSection = ({ scrollContainer }: { scrollContainer: HTMLDivElement | null }) => {
  const [spin, setSpin] = useState(false);
  const triangleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollContainer) return;

    const handleScroll = () => {
      if (!triangleRef.current) return;
      const rect = triangleRef.current.getBoundingClientRect();
      const containerRect = scrollContainer.getBoundingClientRect();
      const inView = rect.top <= containerRect.height * 0.5 && rect.bottom >= containerRect.height * 0.5;
      setSpin(inView);
    };

    scrollContainer.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => scrollContainer.removeEventListener("scroll", handleScroll);
  }, [scrollContainer]);

  return (
    <div className="h-screen flex flex-col justify-between mobile-container mobile-padding-responsive relative">
      {/* Top left - Title */}
      <div className="flex items-start justify-start pt-12 sm:pt-16">
        <LazyScrollAnimation direction="up" delay={0.2} once={false}>
          <h3 className="mobile-text-large font-bold text-black tracking-tight">
            The EFOF<br />
            <span className="text-black/70">Triangle</span>
          </h3>
        </LazyScrollAnimation>
      </div>

      {/* Center - Triangle with labels */}
      <div className="flex-1 flex items-center justify-center relative px-4" ref={triangleRef}>
        <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg">
          <svg
            className={`w-full h-auto max-w-80 max-h-80 sm:max-w-96 sm:max-h-96 mx-auto transition-transform duration-700 ${spin ? "animate-spin-once" : ""}`}
            viewBox="0 0 300 260"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid meet"
          >
            <polygon points="150,20 20,240 280,240" fill="transparent" stroke="black" strokeWidth="3" />
          </svg>

          {/* Minimalistic labels positioned around triangle */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full">
            <ScrollAnimation direction="up" delay={0.6} once={false}>
              <div className="text-center px-2">
                <span className="text-sm sm:text-lg md:text-xl font-medium text-black block mb-2 sm:mb-3 whitespace-nowrap">Today's Students</span>
                <div className="w-2 h-2 bg-black rounded-full mx-auto"></div>
              </div>
            </ScrollAnimation>
          </div>

          <div className="absolute left-0 bottom-0 transform -translate-x-1/2 translate-y-1/2">
            <ScrollAnimation direction="left" delay={0.8} once={false}>
              <div className="text-center px-2">
                <div className="w-2 h-2 bg-black rounded-full mx-auto mb-2"></div>
                <span className="text-sm sm:text-lg md:text-xl font-medium text-black whitespace-nowrap">Ed-Tech Companies</span>
              </div>
            </ScrollAnimation>
          </div>

          <div className="absolute right-0 bottom-0 transform translate-x-1/2 translate-y-1/2">
            <ScrollAnimation direction="right" delay={1.0} once={false}>
              <div className="text-center px-2">
                <div className="w-2 h-2 bg-black rounded-full mx-auto mb-2"></div>
                <span className="text-sm sm:text-lg md:text-xl font-medium text-black whitespace-nowrap">Education Researchers</span>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </div>

      {/* Bottom right - Description */}
      <div className="flex justify-center sm:justify-end items-end">
        <ScrollAnimation direction="left" delay={1.2} once={false}>
          <div className="max-w-full sm:max-w-md text-center sm:text-right">
            <div className="w-16 sm:w-24 h-0.5 bg-black mx-auto sm:ml-auto mb-4"></div>
            <p className="text-base sm:text-lg md:text-xl text-black/80 leading-relaxed">
              Connecting the key forces shaping the future of education
            </p>
          </div>
        </ScrollAnimation>
      </div>
    </div>
  );
}

// BlackCircleRevealOverlay - Original RAF-based animation restored
function BlackCircleRevealOverlay({ shouldAnimate }: { shouldAnimate: boolean }) {
  const [isVisible, setIsVisible] = useState(true);
  const [circleRadius, setCircleRadius] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Ensure component is mounted before accessing window
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (shouldAnimate && !hasAnimated && isMounted) {
      setHasAnimated(true);
      console.log('Starting circle reveal animation');

      // Animate circle expansion
      let progress = 0;
      const duration = 2000; // 2 seconds
      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        progress = Math.min(elapsed / duration, 1);

        // Smooth easing function
        const easeOut = 1 - Math.pow(1 - progress, 3);
        // Calculate radius as percentage - start from 0% to 150% to ensure full coverage
        setCircleRadius(easeOut * 150);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          console.log('Animation complete, hiding overlay');
          // Animation complete, hide overlay after a brief delay
          setTimeout(() => {
            setIsVisible(false);
          }, 300);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [shouldAnimate, hasAnimated, isMounted]);

  if (!isVisible || !isMounted) return null;

  return (
    <div
      className="absolute inset-0 z-30"
      style={{
        background: 'black',
        WebkitMask: `radial-gradient(circle at center, transparent ${circleRadius}%, black ${circleRadius + 0.1}%)`,
        mask: `radial-gradient(circle at center, transparent ${circleRadius}%, black ${circleRadius + 0.1}%)`,
      }}
    />
  );
}

// Enhanced Hero Section with subtle animations and progressive video
function OptimizedHeroSection() {
  return (
    <section className="relative h-screen overflow-hidden bg-black">
      {/* Simple black background */}
      <div className="absolute inset-0 bg-black" />

      {/* Progressive video enhancement - loads after text animations */}
      <ProgressiveHeroVideo />

      <div className="absolute inset-0 bg-black/30" style={{ zIndex: 5 }} />

      <div className="relative h-screen flex flex-col justify-between mobile-container mobile-padding-responsive" style={{ zIndex: 10 }}>
        <div className="flex-1 flex items-center justify-center pt-16 sm:pt-20 md:pt-32">
          <h1 className="mobile-text-xl font-bold text-white tracking-tight max-w-full text-center">
            {/* First line renders immediately for LCP */}
            <span className="inline-block">
              EDUCATION
            </span>
            <br />
            {/* Second line with subtle animation */}
            <span className="inline-block hero-text-line" style={{ animationDelay: '0.2s' }}>
              FOR OUR
            </span>
            <br />
            {/* Third line with staggered animation */}
            <span className="inline-block hero-text-line text-white/80" style={{ animationDelay: '0.4s' }}>
              FUTURES
            </span>
          </h1>
        </div>

        <div className="flex justify-center sm:justify-end items-end">
          <div className="text-center sm:text-right max-w-full">
            {/* Subtitle with delayed animation */}
            <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-sm sm:max-w-md leading-relaxed mb-4 hero-subtitle mx-auto sm:mx-0" style={{ animationDelay: '0.7s' }}>
              The first student-led blueprint for K-12 education, targeted for 2035.
            </p>
            {/* Scroll indicator with final animation */}
            <div className="flex items-center justify-center sm:justify-end gap-2 text-white/60 text-sm hero-scroll-indicator" style={{ animationDelay: '1.0s' }}>
              <span>Scroll to explore</span>
              <div className="animate-pulse">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m0 0l7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  // Page-level states - restored to original functionality
  const [animateCircle, setAnimateCircle] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [animateStates, setAnimateStates] = useState([false, false]);
  const [hasTriggeredBlueprint, setHasTriggeredBlueprint] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState('black');
  const blueprintRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Handle scroll events for animations, section tracking, and background color transitions
  useEffect(() => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;

    // Section colors mapping
    const sectionColors = ['black', 'white', 'white', 'black', 'white', 'black']; // Hero, Mission, Blueprint, Why, Triangle, Team

    const handleScroll = () => {
      if (!container) return;

      const scrollTop = container.scrollTop;
      const viewportHeight = window.innerHeight;
      const totalSections = 6;

      // Calculate which section we're transitioning to based on scroll position
      const currentSectionFloat = scrollTop / viewportHeight;
      const currentSectionIndex = Math.floor(currentSectionFloat);
      const nextSectionIndex = Math.min(currentSectionIndex + 1, totalSections - 1);
      const transitionProgress = currentSectionFloat - currentSectionIndex;

      // Update current section for other UI elements
      const dominantSection = Math.round(currentSectionFloat);
      if (dominantSection !== currentSection) {
        setCurrentSection(dominantSection);

        // Handle team section natural animation
        if (dominantSection === 5) {
          setAnimateStates([false, false]);
          setTimeout(() => setAnimateStates([true, false]), 200);
          setTimeout(() => setAnimateStates([true, true]), 600);
        }
      }

      // Determine background color based on scroll position
      // Use different transition thresholds for mobile vs desktop
      const isMobile = window.innerWidth < 768;
      const transitionThreshold = isMobile ? 0.7 : 0.3; // Mobile: 70%, Desktop: 30%
      
      if (transitionProgress > transitionThreshold && currentSectionIndex < totalSections - 1) {
        const nextColor = sectionColors[nextSectionIndex];
        setBackgroundColor(nextColor);
      } else {
        const currentColor = sectionColors[currentSectionIndex];
        setBackgroundColor(currentColor);
      }
    };

    // Intersection Observer for blueprint animation
    const blueprintObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasTriggeredBlueprint) {
          console.log('Blueprint section in view, starting animation');
          setAnimateCircle(true);
          setHasTriggeredBlueprint(true);
        } else if (!entry.isIntersecting && hasTriggeredBlueprint) {
          // Reset animation when section is out of view
          setAnimateCircle(false);
          setHasTriggeredBlueprint(false);
        }
      });
    }, {
      root: container,
      rootMargin: '-20% 0px -20% 0px',
      threshold: 0.2
    });

    // Observe blueprint section specifically
    if (blueprintRef.current) {
      blueprintObserver.observe(blueprintRef.current);
    }

    // Add scroll listener
    container.addEventListener('scroll', handleScroll, { passive: true });
    
    // Add debounced resize listener to handle orientation changes
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        handleScroll(); // Recalculate on resize
      }, 100);
    };
    window.addEventListener('resize', handleResize, { passive: true });
    
    handleScroll(); // Initial call

    return () => {
      container.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
      blueprintObserver.disconnect();
    };
  }, [currentSection, hasTriggeredBlueprint]);

  return (
    <PageWrapper>
      <div className="relative overflow-x-hidden max-w-full">
        {/* Dynamic Background that transitions with scroll */}
        <div
          className="fixed inset-0 z-0 dynamic-background"
          style={{ backgroundColor: backgroundColor }}
        />

        {/* Fixed Navigation - Dynamic logo based on current section */}
        <div className="fixed top-4 left-4 md:top-6 md:left-6 z-50 hidden md:block">
          <Link href="/" aria-label="Home">
            <Logo
              variant={currentSection === 1 || currentSection === 2 || currentSection === 4 ? "black" : "white"}
              size="md"
              priority={true}
            />
          </Link>
        </div>
        <div className="sticky top-0 left-0 z-50 block md:hidden bg-transparent pt-2 pl-2">
          <Link href="/" aria-label="Home">
            <Logo
              variant={currentSection === 1 || currentSection === 2 || currentSection === 4 ? "black" : "white"}
              size="sm"
              priority={true}
            />
          </Link>
        </div>

        <div
          ref={scrollContainerRef}
          className="relative z-10 h-screen overflow-y-auto overflow-x-hidden natural-scroll-container scroll-optimized max-w-full"
        >
          {/* Hero Section - NO VIDEO, optimized for LCP */}
          <OptimizedHeroSection />

          {/* Our Mission Section */}
          <section data-section-index="1" className="relative h-screen text-black overflow-hidden">
            <div className="h-screen flex flex-col justify-between mobile-container mobile-padding-responsive relative z-10">
              {/* Top left - Title */}
              <div className="flex items-start justify-start pt-12 sm:pt-16">
                <ScrollAnimation direction="up" delay={0.2} once={false}>
                  <h2 className="mobile-text-large font-bold text-black tracking-tight">
                    Our<br />
                    <span className="text-black/70">Mission</span>
                  </h2>
                </ScrollAnimation>
              </div>

              {/* Center - Mission statement */}
              <div className="flex-1 flex items-center justify-center">
                <ScrollAnimation direction="up" delay={0.6} once={false}>
                  <div className="max-w-4xl text-center">
                    <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-black font-medium leading-tight">
                      Education for Our Futures is a student collective that seeks to rethink K-12 through a comprehensive blueprint and evaluations of education technology.
                    </p>
                  </div>
                </ScrollAnimation>
              </div>

              {/* Bottom - Decorative line */}
              <div className="flex justify-center items-end">
                <ScrollAnimation direction="up" delay={1.0} once={false}>
                  <div className="w-24 sm:w-32 h-0.5 bg-black"></div>
                </ScrollAnimation>
              </div>
            </div>
          </section>

          {/* Blueprint Section - Full screen minimalistic layout */}
          <section data-section-index="2" ref={blueprintRef} className="relative h-screen text-black overflow-hidden">
            {/* Black Circle Reveal Overlay only covers blueprint section */}
            <BlackCircleRevealOverlay shouldAnimate={animateCircle} />

            <div className="h-screen flex flex-col justify-between mobile-container mobile-padding-responsive relative z-10">
              {/* Top section - First statement */}
              <div className="flex-1 flex items-center justify-start pt-12 sm:pt-16">
                <ScrollAnimation direction="up" delay={0.8} once={false}>
                  <h2 className="mobile-text-responsive font-bold text-black tracking-tight max-w-full">
                    We're developing briefs<br />
                    on specific changes<br />
                    we hope to see in<br />
                    the education space
                  </h2>
                </ScrollAnimation>
              </div>

              {/* Bottom right - Second statement (equal importance) */}
              <div className="flex justify-center sm:justify-end items-end">
                <ScrollAnimation direction="left" delay={1.4} once={false}>
                  <div className="max-w-full text-center sm:text-right">
                    <h2 className="mobile-text-responsive font-bold text-black tracking-tight mb-4">
                      AND conducting<br />
                      the first student <br />
                      evaluations of<br />
                      education technology
                    </h2>
                    <div className="w-16 sm:w-24 h-0.5 bg-black mx-auto sm:ml-auto"></div>
                  </div>
                </ScrollAnimation>
              </div>
            </div>
          </section>
          {/* Why Section - Full screen minimalistic layout */}
          <section data-section-index="3" className="relative h-screen text-white overflow-hidden">
            <div className="h-screen flex flex-col justify-between mobile-container mobile-padding-responsive relative z-10">
              {/* Top left - Question */}
              <div className="flex items-start justify-start pt-12 sm:pt-16">
                <ScrollAnimation direction="up" delay={0.2} once={false}>
                  <h2 className="mobile-text-xl font-bold text-white tracking-tight">
                    Why?
                  </h2>
                </ScrollAnimation>
              </div>

              {/* Center right - Main content */}
              <div className="flex-1 flex items-center justify-center sm:justify-end">
                <ScrollAnimation direction="left" delay={0.6} once={false}>
                  <div className="max-w-full sm:max-w-2xl text-center sm:text-right">
                    <br />
                    <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/90 leading-relaxed mb-6 sm:mb-8 font-light">
                      The education system was built from the perspective of outsiders looking in, but it's time that changes.
                    </p>
                    <br />
                    <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/90 leading-relaxed mb-6 sm:mb-8 font-light">
                      K-12 education is poised for its most significant transformation in a century. We're putting students at the center of this revolution.
                    </p>
                  </div>
                </ScrollAnimation>
              </div>

              {/* Bottom - Solution statement */}
              <div className="flex justify-center sm:justify-start items-end">
                <ScrollAnimation direction="up" delay={1.0} once={false}>
                  <div className="max-w-full text-center sm:text-left">
                    <div className="w-24 sm:w-32 h-0.5 bg-white mb-6 mx-auto sm:mx-0"></div>
                    <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight mb-6 sm:mb-0">
                      Students must play a role in designing the future of education
                    </p>
                    <Link
                      href="/why"
                      className="inline-flex items-center gap-2 mt-6 sm:mt-8 text-white/80 hover:text-white transition-colors duration-200 group"
                    >
                      <span className="text-lg">Learn More</span>
                      <span className="inline-block transform group-hover:translate-x-1 transition-transform duration-200">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                      </span>
                    </Link>
                  </div>
                </ScrollAnimation>
              </div>
            </div>
          </section>

          {/* Triangle Section */}
          <section data-section-index="4" className="relative h-screen text-black">
            <MinimalisticTriangleSection scrollContainer={scrollContainerRef.current} />
          </section>


          {/* Team Section with Integrated Footer - No snap scroll between them */}
          <section data-section-index="5" className="relative text-white">
            {/* Team Content */}
            <div className="h-screen flex flex-col justify-between mobile-container mobile-padding-responsive relative">
              {/* Top left - Title */}
              <div className="flex items-start justify-start pt-12 sm:pt-16">
                <ScrollAnimation direction="up" delay={0.2} once={false}>
                  <h2 className="mobile-text-large font-bold text-white tracking-tight">
                    Our<br />
                    <span className="text-white/70">Team</span>
                  </h2>
                </ScrollAnimation>
              </div>

              {/* Center - Team members with sequential bounce animation */}
              <div className="flex-1 flex items-center justify-center px-4">
                <ScrollAnimation direction="up" delay={0.6} once={false}>
                  <div className="flex flex-col sm:flex-row justify-center items-center mobile-gap-responsive max-w-full">
                    {[
                      { name: "Rishal Melvani", role: "Founder", image: "/rishal melvani.png" },
                      { name: "Ishaan Singh", role: "Founder", image: "/ishaan singh.png" }
                    ].map((member, index) => (
                      <div key={index} className="text-center group mb-8 sm:mb-0">
                        <div
                          className={`w-32 h-32 sm:w-36 sm:h-36 md:w-48 md:h-48 lg:w-56 lg:h-56 mx-auto mb-6 sm:mb-8 overflow-hidden rounded-full bg-white/10 backdrop-blur-sm border border-white/20 group-hover:bg-white/20 transition-all duration-700 shadow-lg transform ${animateStates[index] ? 'animate-float-in' : 'opacity-0 translate-y-8 scale-95'
                            }`}
                        >
                          <div className="w-full h-full relative">
                            <Image
                              src={member.image}
                              alt={member.name}
                              fill
                              sizes="(max-width: 640px) 128px, (max-width: 768px) 144px, (max-width: 1024px) 192px, 224px"
                              className="object-cover"
                              quality={95}
                              priority
                              style={{
                                objectPosition: member.name === "Rishal Melvani" ? "center 10%" : "center center"
                              }}
                            />
                          </div>
                        </div>
                        <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium text-white mb-2 leading-tight">{member.name}</h3>
                        <p className="text-sm sm:text-base md:text-lg text-white/70">{member.role}</p>
                      </div>
                    ))}
                  </div>
                </ScrollAnimation>
              </div>

              {/* Bottom - Description and Meet The Team Button */}
              <div className="flex flex-col items-center sm:flex-row sm:justify-between sm:items-end gap-6 sm:gap-8">
                {/* Description */}
                <ScrollAnimation direction="right" delay={1.0} once={false}>
                  <div className="max-w-full text-center sm:text-left">
                    <div className="w-16 sm:w-24 h-0.5 bg-white mb-4 mx-auto sm:mx-0"></div>
                    <p className="text-base sm:text-lg md:text-xl text-white/80 leading-relaxed">
                      A student-led initiative building the future of education
                    </p>
                  </div>
                </ScrollAnimation>

                {/* Meet The Team Button */}
                <ScrollAnimation direction="left" delay={1.2} once={false}>
                  <Link
                    href="/team"
                    className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-200 group"
                  >
                    <span className="text-base sm:text-lg">Meet The Team</span>
                    <span className="inline-block transform group-hover:translate-x-1 transition-transform duration-200">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                  </Link>
                </ScrollAnimation>
              </div>
            </div>

            {/* Footer - Integrated directly below team content */}
            <Footer />
          </section>
        </div>
      </div>
    </PageWrapper>
  );
}