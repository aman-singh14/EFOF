'use client';

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import PageWrapper from "@/components/page-wrapper";
import ScrollAnimation from "@/components/ScrollAnimation";
import { useRef } from "react";
import Footer from "@/components/Footer";



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
    <div className="h-screen flex flex-col justify-between p-8 md:p-16 relative">
      {/* Top left - Title */}
      <div className="flex items-start justify-start pt-16">
        <ScrollAnimation direction="up" delay={0.2} once={false}>
          <h3 className="text-4xl md:text-6xl lg:text-7xl font-bold text-black leading-[0.9] tracking-tight">
            The EFOF<br />
            <span className="text-black/70">Triangle</span>
          </h3>
        </ScrollAnimation>
      </div>

      {/* Center - Triangle with labels */}
      <div className="flex-1 flex items-center justify-center relative" ref={triangleRef}>
        <div className="relative">
          <svg
            className={`w-80 h-80 md:w-96 md:h-96 transition-transform duration-700 ${spin ? "animate-spin-once" : ""}`}
            viewBox="0 0 300 260"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polygon points="150,20 20,240 280,240" fill="transparent" stroke="black" strokeWidth="3" />
          </svg>

          {/* Minimalistic labels positioned around triangle */}
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 -translate-y-full">
            <ScrollAnimation direction="up" delay={0.6} once={false}>
              <div className="text-center">
                <span className="text-lg md:text-xl font-medium text-black block mb-3">Students of Today</span>
                <div className="w-2 h-2 bg-black rounded-full mx-auto"></div>
              </div>
            </ScrollAnimation>
          </div>

          <div className="absolute left-0 bottom-0 transform -translate-x-1/2 translate-y-1/2">
            <ScrollAnimation direction="left" delay={0.8} once={false}>
              <div className="text-center">
                <div className="w-2 h-2 bg-black rounded-full mx-auto mb-2"></div>
                <span className="text-lg md:text-xl font-medium text-black">Future of EdTech</span>
              </div>
            </ScrollAnimation>
          </div>

          <div className="absolute right-0 bottom-0 transform translate-x-1/2 translate-y-1/2">
            <ScrollAnimation direction="right" delay={1.0} once={false}>
              <div className="text-center">
                <div className="w-2 h-2 bg-black rounded-full mx-auto mb-2"></div>
                <span className="text-lg md:text-xl font-medium text-black">Education Advisors</span>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </div>

      {/* Bottom right - Description */}
      <div className="flex justify-end items-end">
        <ScrollAnimation direction="left" delay={1.2} once={false}>
          <div className="max-w-md text-right">
            <div className="w-24 h-0.5 bg-black ml-auto mb-4"></div>
            <p className="text-lg md:text-xl text-black/80 leading-relaxed">
              Connecting the key forces shaping the future of education
            </p>
          </div>
        </ScrollAnimation>
      </div>
    </div>
  );
}

// BlackCircleRevealOverlay - Visual expanding circle reveal animation
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

export default function Home() {
  // Page-level fade-in and circle animation states
  const [animateCircle, setAnimateCircle] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [animateStates, setAnimateStates] = useState([false, false]);
  const [hasTriggeredBlueprint, setHasTriggeredBlueprint] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState('black');
  const blueprintRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Ensure component is mounted and add initial fade-in
  useEffect(() => {
    setIsMounted(true);
    // Add a subtle delay for initial page load animation
    const timer = setTimeout(() => {
      setPageLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Handle scroll events for animations, section tracking, and background color transitions
  useEffect(() => {
    if (!isMounted || !scrollContainerRef.current) return;

    const container = scrollContainerRef.current;

    // Section colors mapping
    const sectionColors = ['black', 'white', 'black', 'white', 'black']; // Hero, Blueprint, Why, Triangle, Team

    const handleScroll = () => {
      if (!container) return;

      const scrollTop = container.scrollTop;
      const viewportHeight = window.innerHeight;
      const totalSections = 5;

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
        if (dominantSection === 4) {
          setAnimateStates([false, false]);
          setTimeout(() => setAnimateStates([true, false]), 200);
          setTimeout(() => setAnimateStates([true, true]), 600);
        }
      }

      // Determine background color based on scroll position
      // Start transitioning when we're 30% into the current section
      if (transitionProgress > 0.3 && currentSectionIndex < totalSections - 1) {
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
    handleScroll(); // Initial call

    return () => {
      container.removeEventListener('scroll', handleScroll);
      blueprintObserver.disconnect();
    };
  }, [currentSection, hasTriggeredBlueprint, isMounted]);

  return (
    <PageWrapper>
      <div className="relative">
        {/* Dynamic Background that transitions with scroll */}
        <div 
          className="fixed inset-0 z-0 dynamic-background"
          style={{ backgroundColor: backgroundColor }}
        />
        
        {/* Fixed Navigation - Dynamic logo based on current section */}
        <div className="fixed top-6 left-6 z-50 hidden md:block">
          <Link href="/" aria-label="Home">
            <Image 
              src={currentSection === 1 || currentSection === 3 ? "/EFOF Logo.png" : "/EFOF Logo 2.png"} 
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
              src={currentSection === 1 || currentSection === 3 ? "/EFOF Logo.png" : "/EFOF Logo 2.png"} 
              alt="Education for Our Future Logo" 
              width={140} 
              height={48} 
              className="h-14 w-auto hover:opacity-90 transition-opacity duration-200" 
            />
          </Link>
        </div>

        <div
          ref={scrollContainerRef}
          className={`relative z-10 h-screen overflow-y-auto natural-scroll-container scroll-optimized transition-opacity duration-1000 ${pageLoaded ? 'opacity-100' : 'opacity-0'}`}
        >
          {/* Hero Section - Minimalistic full-screen impact */}
          <section data-section-index="0" className="relative h-screen overflow-hidden">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="/videos/hero-video.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/40 z-5" />
            <div className="relative z-10 h-screen flex flex-col justify-between p-8 md:p-16">
              {/* Top left - Main headline */}
              <div className="flex-1 flex items-start justify-start pt-20 md:pt-32">
                <ScrollAnimation direction="up" delay={0.2} once={false}>
                  <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold text-white leading-[0.9] tracking-tight max-w-4xl">
                    EDUCATION<br />
                    FOR OUR<br />
                    <span className="text-white/80">FUTURES</span>
                  </h1>
                </ScrollAnimation>
              </div>

              {/* Bottom right - Subtitle */}
              <div className="flex justify-end items-end">
                <ScrollAnimation direction="left" delay={0.6} once={false}>
                  <div className="text-right">
                    <p className="text-lg md:text-xl text-white/90 max-w-md leading-relaxed mb-4">
                      The first student-led initiative transforming K-12 education through technology and reform
                    </p>
                    <div className="flex items-center justify-end gap-2 text-white/60 text-sm">
                      <span>Scroll to explore</span>
                      <div className="animate-pulse">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m0 0l7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </ScrollAnimation>
              </div>
            </div>
          </section>

          {/* Blueprint Section - Full screen minimalistic layout */}
          <section data-section-index="1" ref={blueprintRef} className="relative h-screen text-black overflow-hidden">
            {/* Black Circle Reveal Overlay only covers blueprint section */}
            <BlackCircleRevealOverlay shouldAnimate={animateCircle} />

            <div className="h-screen flex flex-col justify-between p-8 md:p-16 relative z-10">
              {/* Top section - First statement */}
              <div className="flex-1 flex items-center justify-start pt-16">
                <ScrollAnimation direction="up" delay={0.8} once={false}>
                  <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold text-black leading-[0.95] tracking-tight max-w-5xl">
                    The first student-led<br />
                    blueprint for<br />
                    transforming the<br />
                    U.S. K-12 space
                  </h2>
                </ScrollAnimation>
              </div>

              {/* Bottom right - Second statement (equal importance) */}
              <div className="flex justify-end items-end">
                <ScrollAnimation direction="left" delay={1.4} once={false}>
                  <div className="max-w-4xl text-right">
                    <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold text-black leading-[0.95] tracking-tight mb-4">
                      Connecting structural<br />
                      school reform with<br />
                      developments in<br />
                      education technology
                    </h2>
                    <div className="w-24 h-0.5 bg-black ml-auto"></div>
                  </div>
                </ScrollAnimation>
              </div>
            </div>
          </section>
          {/* Why Section - Full screen minimalistic layout */}
          <section data-section-index="2" className="relative h-screen text-white overflow-hidden">
            <div className="h-screen flex flex-col justify-between p-8 md:p-16 relative z-10">
              {/* Top left - Question */}
              <div className="flex items-start justify-start pt-16">
                <ScrollAnimation direction="up" delay={0.2} once={false}>
                  <h2 className="text-6xl md:text-8xl lg:text-9xl font-bold text-white leading-[0.8] tracking-tight">
                    Why?
                  </h2>
                </ScrollAnimation>
              </div>

              {/* Center right - Main content */}
              <div className="flex-1 flex items-center justify-end">
                <ScrollAnimation direction="left" delay={0.6} once={false}>
                  <div className="max-w-2xl text-right">
                    <p className="text-xl md:text-2xl lg:text-3xl text-white/90 leading-relaxed mb-8 font-light">
                      The education system was built from the perspective of outsiders looking in, but it's time that changes.
                    </p>
                    <p className="text-lg md:text-xl text-white/70 leading-relaxed mb-8">
                      Public education as we know it is falling apart. Students aren't engaged, don't learn future-ready skills, and the system fails to inspire them to realize their calling.
                    </p>
                  </div>
                </ScrollAnimation>
              </div>

              {/* Bottom - Solution statement */}
              <div className="flex justify-start items-end">
                <ScrollAnimation direction="up" delay={1.0} once={false}>
                  <div className="max-w-3xl">
                    <div className="w-32 h-0.5 bg-white mb-6"></div>
                    <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight">
                      Students must play a role in designing the future of education
                    </p>
                    <Link
                      href="/why"
                      className="inline-flex items-center gap-2 mt-8 text-white/80 hover:text-white transition-colors duration-200 group"
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
          <section data-section-index="3" className="relative h-screen text-black">
            <MinimalisticTriangleSection scrollContainer={scrollContainerRef.current} />
          </section>


          {/* Team Section with Integrated Footer - No snap scroll between them */}
          <section data-section-index="4" className="relative text-white">
            {/* Team Content */}
            <div className="h-screen flex flex-col justify-between p-8 md:p-16 relative">
              {/* Top left - Title */}
              <div className="flex items-start justify-start pt-16">
                <ScrollAnimation direction="up" delay={0.2} once={false}>
                  <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[0.9] tracking-tight">
                    Our<br />
                    <span className="text-white/70">Team</span>
                  </h2>
                </ScrollAnimation>
              </div>

              {/* Center - Team members with sequential bounce animation */}
              <div className="flex-1 flex items-center justify-center">
                <ScrollAnimation direction="up" delay={0.6} once={false}>
                  <div className="flex justify-center gap-20 md:gap-32 max-w-4xl">
                    {[
                      { name: "Rishal Melvani", role: "Founder", image: "/rishal melvani.png" },
                      { name: "Ishaan Singh", role: "Founder", image: "/ishaan singh.png" }
                    ].map((member, index) => (
                      <div key={index} className="text-center group">
                        <div 
                          className={`w-36 h-36 md:w-48 md:h-48 lg:w-56 lg:h-56 mx-auto mb-8 overflow-hidden rounded-full bg-white/10 backdrop-blur-sm border border-white/20 group-hover:bg-white/20 transition-all duration-700 shadow-lg transform ${
                            animateStates[index] ? 'animate-float-in' : 'opacity-0 translate-y-8 scale-95'
                          }`}
                        >
                          <div className="w-full h-full relative">
                            <Image 
                              src={member.image} 
                              alt={member.name} 
                              fill
                              sizes="(max-width: 768px) 144px, (max-width: 1024px) 192px, 224px"
                              className="object-cover"
                              style={{ 
                                objectPosition: index === 0 ? "center 10%" : "center center"
                              }}
                              priority
                            />
                          </div>
                        </div>
                        <h3 className="text-lg md:text-xl lg:text-2xl font-medium text-white mb-2 leading-tight">{member.name}</h3>
                        <p className="text-base md:text-lg text-white/70">{member.role}</p>
                      </div>
                    ))}
                  </div>
                </ScrollAnimation>
              </div>

              {/* Bottom - Description and Meet The Team Button */}
              <div className="flex flex-col md:flex-row justify-between items-end gap-8">
                {/* Description */}
                <ScrollAnimation direction="right" delay={1.0} once={false}>
                  <div className="max-w-md">
                    <div className="w-24 h-0.5 bg-white mb-4"></div>
                    <p className="text-lg md:text-xl text-white/80 leading-relaxed">
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
                    <span className="text-lg">Meet The Team</span>
                    <span className="inline-block transform group-hover:translate-x-1 transition-transform duration-200">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
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