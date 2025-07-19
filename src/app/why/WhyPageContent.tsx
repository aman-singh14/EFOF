'use client';

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import ScrollAnimation from "@/components/ScrollAnimation";
import PageWrapper from "@/components/page-wrapper";

// Questions data - each gets its own section
const studentQuestions = [
  {
    question: "How many more times will we have to sit through a class we know will never benefit us?",
    emphasis: "sit through a class"
  },
  {
    question: "How many more time-filling assignments will I have to work on?",
    emphasis: "time-filling assignments"
  },
  {
    question: "For how much longer will our system continue the failures that have lasted for generations?",
    emphasis: "failures that have lasted for generations"
  }
];

// Statistics data with emphasis on numbers
const educationStatistics = [
  {
    value: "16 Million",
    description: "Public Education is Set to Lose 16 Million Enrollments by 2030",
    source: "Learning Counsel",
    date: "Jul 29, 2024"
  },
  {
    value: "83%",
    description: "of students say there are not enough opportunities at school for them to be curious",
    source: "Education Week",
    date: "Oct 24, 2024"
  },
  {
    value: "57%",
    description: "of students agree that the system is setting them up with life skills",
    source: "Education Week",
    date: "Oct 24, 2024"
  },
  {
    value: "$91.4B",
    description: "US EdTech market recorded revenues in 2024",
    source: "Market Research",
    date: "2024"
  }
];

const WhyPageContent = () => {
  const [pageLoaded, setPageLoaded] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Calculate total sections: Hero + Questions + Context + Statistics + Vision + Action
  const totalSections = 1 + studentQuestions.length + 1 + educationStatistics.length + 1 + 1;

  useEffect(() => {
    setPageLoaded(true);
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

    setTimeout(() => {
      setIsScrolling(false);
      setCurrentSection(sectionIndex);
    }, 800);
  };

  // Handle wheel events for section navigation
  useEffect(() => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    let wheelTimeout: NodeJS.Timeout;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      if (isScrolling) return;

      clearTimeout(wheelTimeout);
      
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
  }, [currentSection, isScrolling, totalSections]);

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
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {/* Hero Section - Title */}
          <section className="relative h-screen snap-start overflow-hidden bg-white">
            <div className="h-screen flex flex-col justify-center items-center p-8 md:p-16 relative z-10">
              <ScrollAnimation direction="up" delay={0.2} once={false}>
                <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-black leading-[0.8] tracking-tight text-center mb-8">
                  Why?
                </h1>
                <p className="text-xl md:text-2xl text-black/70 text-center max-w-2xl">
                  These are questions we're tired of asking
                </p>
              </ScrollAnimation>
            </div>
          </section>

          {/* Individual Question Sections - Staircase effect layout */}
          {studentQuestions.map((questionData, index) => {
            const isBlackBg = index % 2 === 0;
            
            // Create proper staircase positioning - each question in different vertical third
            const getStaircasePosition = () => {
              switch(index) {
                case 0: return 'items-start justify-start pt-16 pl-8 md:pl-16'; // Top-left (top third)
                case 1: return 'items-center justify-center'; // Center (middle third)
                case 2: return 'items-end justify-end pb-16 pr-8 md:pr-16'; // Bottom-right (bottom third)
                default: return 'items-center justify-center';
              }
            };

            const getTextAlignment = () => {
              switch(index) {
                case 0: return 'text-left';
                case 1: return 'text-center';
                case 2: return 'text-right';
                default: return 'text-center';
              }
            };

            return (
              <section key={index} className={`relative h-screen snap-start overflow-hidden ${isBlackBg ? 'bg-black text-white' : 'bg-white text-black'}`}>
                {/* Subtle background elements for visual interest */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  {/* Floating geometric shapes positioned to complement staircase */}
                  <div className={`absolute ${index === 0 ? 'bottom-20 right-20' : index === 1 ? 'top-20 left-20' : 'top-20 left-20'} w-32 h-32 rounded-full ${isBlackBg ? 'bg-white/5' : 'bg-black/5'} animate-pulse`} 
                       style={{ animationDuration: '4s', animationDelay: `${index * 0.5}s` }} />
                  <div className={`absolute ${index === 0 ? 'top-1/3 right-8' : index === 1 ? 'bottom-32 right-16' : 'top-1/2 left-8'} w-24 h-24 ${isBlackBg ? 'bg-white/3' : 'bg-black/3'} transform rotate-45 animate-pulse`}
                       style={{ animationDuration: '6s', animationDelay: `${index * 0.7}s` }} />
                  <div className={`absolute ${index === 0 ? 'bottom-1/3 right-32' : index === 1 ? 'top-1/4 left-8' : 'bottom-1/3 left-32'} w-2 h-40 ${isBlackBg ? 'bg-white/10' : 'bg-black/10'} transform -rotate-12 animate-pulse`}
                       style={{ animationDuration: '8s', animationDelay: `${index * 0.3}s` }} />
                </div>

                {/* Staircase layout - each question positioned differently */}
                <div className={`h-screen flex ${getStaircasePosition()} relative z-10`}>
                  <ScrollAnimation direction="up" delay={0.3} once={false}>
                    <div className={`max-w-4xl ${getTextAlignment()}`}>
                      {/* Main question text with staircase typography */}
                      <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-light leading-relaxed mb-8">
                        <span className="inline-block transform transition-all duration-700 hover:scale-105">
                          {questionData.question}
                        </span>
                      </h2>

                      {/* Subtle underline animation */}
                      <div className={`w-0 h-0.5 ${isBlackBg ? 'bg-white' : 'bg-black'} transition-all duration-1000 delay-500 ${index === 0 ? '' : index === 1 ? 'mx-auto' : 'ml-auto'}`}
                           style={{ width: currentSection === (index + 1) ? '120px' : '0px' }} />


                    </div>
                  </ScrollAnimation>
                </div>

                {/* Subtle animated border with staircase effect */}
                <div className={`absolute inset-0 border ${isBlackBg ? 'border-white/10' : 'border-black/10'} pointer-events-none`}>
                  <div className={`absolute ${index === 0 ? 'top-0 left-0' : index === 1 ? 'bottom-0 left-0' : 'top-0 right-0'} w-0 h-0.5 ${isBlackBg ? 'bg-white' : 'bg-black'} transition-all duration-2000 delay-1000`}
                       style={{ width: currentSection === (index + 1) ? '100%' : '0%' }} />
                </div>
              </section>
            );
          })}

          {/* Context Section - Full screen layout */}
          <section className="relative h-screen snap-start bg-white text-black">
            <div className="h-screen flex flex-col justify-between p-8 md:p-16 relative z-10">
              {/* Top right - Problem statement */}
              <div className="flex items-start justify-end pt-16">
                <ScrollAnimation direction="left" delay={0.2} once={false}>
                  <div className="max-w-2xl text-right">
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-black leading-[0.95] tracking-tight">
                      The System<br />
                      <span className="text-black/70">Hasn't</span><br />
                      Changed
                    </h2>
                  </div>
                </ScrollAnimation>
              </div>
              
              {/* Center left - Main statement */}
              <div className="flex-1 flex items-center justify-start">
                <ScrollAnimation direction="right" delay={0.6} once={false}>
                  <div className="max-w-3xl">
                    <p className="text-2xl md:text-3xl lg:text-4xl text-black/90 leading-relaxed font-light mb-8">
                      As the face of most industries has changed substantially in the past 100 years, public education at its core remains the same.
                    </p>
                    <p className="text-lg md:text-xl text-black/70 leading-relaxed">
                      By no means has the progress of K-12 public education in the U.S. kept up with the rest of the professional world.
                    </p>
                  </div>
                </ScrollAnimation>
              </div>
              
              {/* Bottom right - Transition */}
              <div className="flex justify-end items-end">
                <ScrollAnimation direction="left" delay={1.0} once={false}>
                  <div className="text-right">
                    <div className="w-24 h-0.5 bg-black ml-auto mb-4"></div>
                    <p className="text-lg text-black/80">The numbers tell the story</p>
                  </div>
                </ScrollAnimation>
              </div>
            </div>
          </section>

          {/* Statistics Sections - Each statistic gets its own full screen with alternating backgrounds */}
          {educationStatistics.map((stat, index) => {
            // Calculate the overall section index to continue alternating pattern
            // Hero(white=0) + Questions(black=1,white=2,black=3) + Context(white=4) = 5 sections before stats
            // So stats start at section 5, 6, 7, 8...
            const overallIndex = 1 + studentQuestions.length + 1 + index; // This gives us 5, 6, 7, 8
            const isBlackBg = overallIndex % 2 === 1; // Changed logic: odd sections are black
            
            return (
              <section key={index} className={`relative h-screen snap-start ${isBlackBg ? 'bg-black' : 'bg-white'}`}>
                <div className="h-screen flex flex-col justify-between p-8 md:p-16 relative z-10">
                  {/* Massive number - center focus */}
                  <div className="flex-1 flex items-center justify-center">
                    <ScrollAnimation direction="up" delay={0.2} once={false}>
                      <div className="text-center">
                        <div className={`text-[8rem] md:text-[12rem] lg:text-[16rem] font-bold ${isBlackBg ? 'text-white' : 'text-black'} leading-[0.8] tracking-tight mb-8`}>
                          {stat.value}
                        </div>
                      </div>
                    </ScrollAnimation>
                  </div>
                  
                  {/* Description - positioned strategically */}
                  <div className={`flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'} items-end`}>
                    <ScrollAnimation direction={index % 2 === 0 ? "right" : "left"} delay={0.6} once={false}>
                      <div className={`max-w-2xl ${index % 2 === 0 ? 'text-left' : 'text-right'}`}>
                        <p className={`text-xl md:text-2xl lg:text-3xl ${isBlackBg ? 'text-white' : 'text-black'} font-medium leading-tight mb-4`}>
                          {stat.description}
                        </p>
                        <div className={`w-24 h-0.5 ${isBlackBg ? 'bg-white' : 'bg-black'} mb-4 ${index % 2 === 0 ? '' : 'ml-auto'}`}></div>
                        <p className={`text-sm ${isBlackBg ? 'text-white/60' : 'text-black/60'}`}>
                          {stat.source}, {stat.date}
                        </p>
                      </div>
                    </ScrollAnimation>
                  </div>
                </div>
              </section>
            );
          })}

          {/* Vision Section - Full screen layout */}
          <section className="relative h-screen snap-start bg-black text-white">
            <div className="h-screen flex flex-col justify-between p-8 md:p-16 relative z-10">
              {/* Top left - Title */}
              <div className="flex items-start justify-start pt-16">
                <ScrollAnimation direction="up" delay={0.2} once={false}>
                  <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[0.9] tracking-tight">
                    Our<br />
                    <span className="text-white/70">Vision</span>
                  </h2>
                </ScrollAnimation>
              </div>
              
              {/* Center - Main vision statement */}
              <div className="flex-1 flex items-center justify-center">
                <ScrollAnimation direction="up" delay={0.6} once={false}>
                  <div className="max-w-4xl text-center">
                    <p className="text-2xl md:text-3xl lg:text-4xl text-white leading-relaxed font-light">
                      <span className="font-bold">Education for Our Future</span> is the first student coalition designing a comprehensive vision for the future of the K-12 sphere, because the education of tomorrow can only be designed by students today.
                    </p>
                  </div>
                </ScrollAnimation>
              </div>
              
              {/* Bottom right - Call to action */}
              <div className="flex justify-end items-end">
                <ScrollAnimation direction="left" delay={1.0} once={false}>
                  <div className="text-right">
                    <div className="w-24 h-0.5 bg-white ml-auto mb-6"></div>
                    <p className="text-xl md:text-2xl font-bold text-white mb-6">
                      This is a crisis. The time to act is now.
                    </p>
                  </div>
                </ScrollAnimation>
              </div>
            </div>
          </section>

          {/* Action Section - Final call to action */}
          <section className="relative h-screen snap-start bg-white">
            <div className="h-screen flex flex-col justify-center items-center p-8 md:p-16 relative z-10">
              <ScrollAnimation direction="up" delay={0.2} once={false}>
                <div className="text-center max-w-4xl">
                  <h2 className="text-6xl md:text-8xl lg:text-9xl font-bold text-black leading-[0.8] tracking-tight mb-12">
                    Join Us
                  </h2>
                  <p className="text-xl md:text-2xl text-black/80 leading-relaxed mb-12 max-w-2xl mx-auto">
                    Be part of the movement to transform education from the inside out
                  </p>
                  <div className="flex flex-col sm:flex-row gap-6 justify-center">
                    <Link
                      href="/contact"
                      className="px-12 py-4 bg-black text-white rounded-full font-semibold text-lg hover:bg-black/80 transition-all duration-200 flex items-center justify-center gap-2 group"
                    >
                      <span>Get Involved</span>
                      <span className="inline-block transform group-hover:translate-x-1 transition-transform duration-200">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </span>
                    </Link>
                    <Link
                      href="/"
                      className="px-12 py-4 bg-white border-2 border-black text-black rounded-full font-semibold text-lg hover:bg-black/5 transition-all duration-200"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </ScrollAnimation>
            </div>
          </section>
        </div>
      </div>
    </PageWrapper>
  );
};

export default WhyPageContent;