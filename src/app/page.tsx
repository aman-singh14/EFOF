'use client';

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, ReactNode } from "react";
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
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full">
            <ScrollAnimation direction="up" delay={0.6} once={false}>
              <div className="text-center">
                <div className="w-2 h-2 bg-black rounded-full mx-auto mb-2"></div>
                <span className="text-lg md:text-xl font-medium text-black">Students of Today</span>
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
  const [isScrolling, setIsScrolling] = useState(false);
  const blueprintRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLElement[]>([]);

  // Total number of sections
  const totalSections = 7; // Hero, Blueprint, Why, Triangle, Testimonials, Portfolio, Team, Footer

  // Ensure component is mounted and add initial fade-in
  useEffect(() => {
    setIsMounted(true);
    // Add a subtle delay for initial page load animation
    const timer = setTimeout(() => {
      setPageLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Smooth scroll to section function
  const scrollToSection = (sectionIndex: number) => {
    if (!scrollContainerRef.current || isScrolling) return;

    setIsScrolling(true);
    const container = scrollContainerRef.current;
    const targetY = sectionIndex * window.innerHeight;

    container.scrollTo({
      top: targetY,
      behavior: 'smooth'
    });

    // Reset scrolling state after animation
    setTimeout(() => {
      setIsScrolling(false);
      setCurrentSection(sectionIndex);
    }, 800);
  };

  // Handle wheel events for section navigation
  useEffect(() => {
    if (!isMounted || !scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    let wheelTimeout: NodeJS.Timeout;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      if (isScrolling) return;

      // Clear previous timeout
      clearTimeout(wheelTimeout);

      // Add small delay to prevent too rapid scrolling
      wheelTimeout = setTimeout(() => {
        const direction = e.deltaY > 0 ? 1 : -1;
        const nextSection = Math.max(0, Math.min(totalSections - 1, currentSection + direction));

        if (nextSection !== currentSection) {
          scrollToSection(nextSection);
        }
      }, 50);
    };

    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleWheel);
      clearTimeout(wheelTimeout);
    };
  }, [currentSection, isScrolling, isMounted, totalSections]);

  // Handle scroll events for animations and current section tracking
  useEffect(() => {
    if (!isMounted || !scrollContainerRef.current) return;

    const handleScroll = () => {
      const container = scrollContainerRef.current;
      if (!container) return;

      // Update current section based on scroll position
      const scrollTop = container.scrollTop;
      const newSection = Math.round(scrollTop / window.innerHeight);

      if (newSection !== currentSection && !isScrolling) {
        setCurrentSection(newSection);
      }

      // Handle blueprint circle animation
      if (!animateCircle && blueprintRef.current) {
        const rect = blueprintRef.current.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        const isInView = rect.top <= containerRect.height * 0.5 && rect.bottom >= containerRect.height * 0.5;

        if (isInView) {
          console.log('Blueprint section in view, starting animation');
          setAnimateCircle(true);
        }
      }
    };

    const container = scrollContainerRef.current;
    container.addEventListener('scroll', handleScroll);
    handleScroll(); // Check immediately

    return () => container.removeEventListener('scroll', handleScroll);
  }, [animateCircle, currentSection, isScrolling, isMounted]);

  return (
    <PageWrapper>
      <div className="relative">
        {/* Fixed Navigation */}
        <div className="fixed top-8 left-8 z-50 hidden md:block">
          <Link href="/" aria-label="Home">
            <Image src="/EFOF Logo.png" alt="Education for Our Future Logo" width={120} height={40} className="h-10 w-auto opacity-90 hover:opacity-100 transition-opacity duration-200" />
          </Link>
        </div>
        <div className="fixed top-6 left-6 z-50 block md:hidden">
          <Link href="/" aria-label="Home">
            <Image src="/EFOF Logo.png" alt="Education for Our Future Logo" width={100} height={32} className="h-8 w-auto opacity-90 hover:opacity-100 transition-opacity duration-200" />
          </Link>
        </div>

        <div
          ref={scrollContainerRef}
          className={`h-screen overflow-y-scroll transition-opacity duration-1000 ${pageLoaded ? 'opacity-100' : 'opacity-0'}`}
          style={{
            scrollBehavior: 'smooth',
            overscrollBehavior: 'contain',
            // Add momentum scrolling for iOS
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {/* Hero Section - Minimalistic full-screen impact */}
          <section className="relative h-screen snap-start overflow-hidden">
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
                    <span className="text-white/80">FUTURE</span>
                  </h1>
                </ScrollAnimation>
              </div>

              {/* Bottom right - Subtitle */}
              <div className="flex justify-end items-end">
                <ScrollAnimation direction="left" delay={0.6} once={false}>
                  <p className="text-lg md:text-xl text-white/90 max-w-md text-right leading-relaxed">
                    The first student-led initiative transforming K-12 education through technology and reform
                  </p>
                </ScrollAnimation>
              </div>
            </div>
          </section>

          {/* Blueprint Section - Full screen minimalistic layout */}
          <section ref={blueprintRef} className="relative h-screen snap-start bg-white text-black overflow-hidden">
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
          <section className="relative h-screen snap-start bg-black text-white overflow-hidden">
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
          <section className="relative h-screen snap-start bg-white text-black">
            <MinimalisticTriangleSection scrollContainer={scrollContainerRef.current} />
          </section>

          {/* Testimonials Section - Minimalistic full-screen layout */}
          <section className="relative h-screen snap-start bg-black text-white overflow-hidden">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="/videos/connections video.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/60 z-5" />
            <div className="relative z-10 h-screen flex flex-col justify-between p-8 md:p-16">
              {/* Top left - Section title */}
              <div className="flex items-start justify-start pt-16">
                <ScrollAnimation direction="up" delay={0.2} once={false}>
                  <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[0.9] tracking-tight">
                    What Our<br />
                    <span className="text-white/70">Partners</span><br />
                    Say
                  </h2>
                </ScrollAnimation>
              </div>

              {/* Center - Quote */}
              <div className="flex-1 flex items-center justify-center">
                <ScrollAnimation direction="up" delay={0.6} once={false}>
                  <div className="max-w-4xl text-center">
                    <blockquote className="text-2xl md:text-3xl lg:text-4xl text-white leading-relaxed font-light mb-12">
                      "Owl Ventures' expertise in the edtech market has been a tremendous asset, allowing us to scale our impact and create high-quality STEM learning experiences for more than eight million students."
                    </blockquote>
                  </div>
                </ScrollAnimation>
              </div>

              {/* Bottom right - Attribution */}
              <div className="flex justify-end items-end">
                <ScrollAnimation direction="left" delay={1.0} once={false}>
                  <div className="text-right">
                    <div className="w-24 h-0.5 bg-white ml-auto mb-4"></div>
                    <p className="text-xl md:text-2xl font-bold text-white mb-2">Philip Galati</p>
                    <p className="text-lg text-white/70">President & CEO of Accelerate Learning</p>
                  </div>
                </ScrollAnimation>
              </div>
            </div>
          </section>

          {/* Portfolio Companies Section - Minimalistic full-screen layout */}
          <section className="relative h-screen snap-start bg-white text-black">
            <div className="h-screen flex flex-col justify-between p-8 md:p-16 relative">
              {/* Top left - Title */}
              <div className="flex items-start justify-start pt-16">
                <ScrollAnimation direction="up" delay={0.2} once={false}>
                  <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-black leading-[0.9] tracking-tight">
                    Our<br />
                    <span className="text-black/70">Portfolio</span><br />
                    Companies
                  </h2>
                </ScrollAnimation>
              </div>

              {/* Center - Company logos grid */}
              <div className="flex-1 flex items-center justify-center">
                <ScrollAnimation direction="up" delay={0.6} once={false}>
                  <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 md:gap-12 max-w-6xl">
                    {[
                      { src: "https://ext.same-assets.com/95251549/2765420269.svg", alt: "Amira Learning" },
                      { src: "https://ext.same-assets.com/95251549/2750686221.svg", alt: "Class Technologies" },
                      { src: "https://ext.same-assets.com/95251549/45746451.svg", alt: "Degreed" },
                      { src: "https://ext.same-assets.com/95251549/3531959595.svg", alt: "Hazel Health" },
                      { src: "https://ext.same-assets.com/95251549/4173540768.svg", alt: "Interplay Learning" },
                      { src: "https://ext.same-assets.com/95251549/1618538892.svg", alt: "Kiddom" },
                      { src: "https://ext.same-assets.com/95251549/2173498083.svg", alt: "Kyron Learning" },
                      { src: "https://ext.same-assets.com/95251549/3125628685.svg", alt: "Labster" },
                      { src: "https://ext.same-assets.com/95251549/3319807111.svg", alt: "LeapFinance" },
                      { src: "https://ext.same-assets.com/95251549/2458318806.svg", alt: "MasterClass" },
                      { src: "https://ext.same-assets.com/95251549/1287973997.svg", alt: "Newsela" },
                      { src: "https://ext.same-assets.com/95251549/465069120.svg", alt: "Quizlet" },
                    ].slice(0, 12).map((company, index) => (
                      <div key={index} className="flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity duration-200">
                        <Image
                          src={company.src}
                          alt={company.alt}
                          width={80}
                          height={40}
                          className="h-8 md:h-10 w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-200"
                        />
                      </div>
                    ))}
                  </div>
                </ScrollAnimation>
              </div>

              {/* Bottom right - CTA */}
              <div className="flex justify-end items-end">
                <ScrollAnimation direction="left" delay={1.0} once={false}>
                  <div className="text-right">
                    <div className="w-24 h-0.5 bg-black ml-auto mb-4"></div>
                    <Link
                      href="/portfolio"
                      className="inline-flex items-center gap-2 text-black/80 hover:text-black transition-colors duration-200 group"
                    >
                      <span className="text-lg">See all companies</span>
                      <span className="inline-block transform group-hover:translate-x-1 transition-transform duration-200">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                      </span>
                    </Link>
                  </div>
                </ScrollAnimation>
              </div>
            </div>
          </section>

          {/* Team Section - Minimalistic full-screen layout */}
          <section className="relative h-screen snap-start bg-black text-white">
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

              {/* Center - Team members */}
              <div className="flex-1 flex items-center justify-center">
                <ScrollAnimation direction="up" delay={0.6} once={false}>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-16 max-w-4xl">
                    {[
                      { name: "Dr. Sarah Chen", role: "CEO & Co-Founder", image: "/team/sarah-chen.jpg" },
                      { name: "James Wilson", role: "CTO & Co-Founder", image: "/team/james-wilson.jpg" },
                      { name: "Maria Garcia", role: "Head of Product", image: "/team/maria-garcia.jpg" },
                      { name: "David Kim", role: "Lead Developer", image: "/team/david-kim.jpg" }
                    ].map((member, index) => (
                      <div key={index} className="text-center group">
                        <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 overflow-hidden group-hover:bg-white/20 transition-all duration-200">
                          <div className="w-full h-full bg-white/20 flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                        </div>
                        <h3 className="text-sm md:text-base font-medium text-white mb-1 leading-tight">{member.name}</h3>
                        <p className="text-xs md:text-sm text-white/60">{member.role}</p>
                      </div>
                    ))}
                  </div>
                </ScrollAnimation>
              </div>

              {/* Bottom right - Description */}
              <div className="flex justify-end items-end">
                <ScrollAnimation direction="left" delay={1.0} once={false}>
                  <div className="max-w-md text-right">
                    <div className="w-24 h-0.5 bg-white ml-auto mb-4"></div>
                    <p className="text-lg md:text-xl text-white/80 leading-relaxed">
                      A diverse group of educators, technologists, and visionaries working together to transform education
                    </p>
                  </div>
                </ScrollAnimation>
              </div>
            </div>
          </section>

          {/* Footer Section */}
          <section className="relative h-screen snap-start">
            <Footer />
          </section>
        </div>
      </div>
    </PageWrapper>
  );
}