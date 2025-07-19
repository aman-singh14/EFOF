'use client';

import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/FadeIn";
import { ScrollReveal } from "@/components/ScrollReveal";
import Footer from "@/components/Footer";

// Define the PortfolioCompany interface
interface PortfolioCompany {
  id: number;
  name: string;
  description: string;
  logoSrc: string;
  website?: string;
}

export default function Portfolio() {
  // Skip to main content for accessibility
  const handleSkipToContent = () => {
    const mainContent = document.getElementById('portfolio-heading');
    if (mainContent) {
      mainContent.focus();
      mainContent.scrollIntoView();
    }
  };

  // Portfolio companies data
  const portfolioCompanies: PortfolioCompany[] = [
    { 
      id: 1, 
      name: "Amira Learning", 
      description: "AI-powered reading tutor for students",
      logoSrc: "https://ext.same-assets.com/95251549/2765420269.svg",
      website: "https://www.amiralearning.com"
    },
    { 
      id: 2, 
      name: "Class Technologies", 
      description: "Teaching and learning tools for virtual classrooms",
      logoSrc: "https://ext.same-assets.com/95251549/2750686221.svg",
      website: "https://www.class.com"
    },
    { 
      id: 3, 
      name: "Degreed", 
      description: "Lifelong learning platform for skill development",
      logoSrc: "https://ext.same-assets.com/95251549/45746451.svg",
      website: "https://www.degreed.com"
    },
    { 
      id: 4, 
      name: "Hazel Health", 
      description: "Telehealth services for K-12 schools",
      logoSrc: "https://ext.same-assets.com/95251549/3531959595.svg",
      website: "https://www.hazel.co"
    },
    { 
      id: 5, 
      name: "Interplay Learning", 
      description: "VR training for skilled trades",
      logoSrc: "https://ext.same-assets.com/95251549/4173540768.svg",
      website: "https://www.interplaylearning.com"
    },
    { 
      id: 6, 
      name: "Kiddom", 
      description: "K-12 curriculum management platform",
      logoSrc: "https://ext.same-assets.com/95251549/1618538892.svg",
      website: "https://www.kiddom.co"
    },
    { 
      id: 7, 
      name: "Kyron Learning", 
      description: "Interactive learning experiences for K-12",
      logoSrc: "https://ext.same-assets.com/95251549/2173498083.svg",
      website: "https://www.kyronlearning.com"
    },
    { 
      id: 8, 
      name: "Labster", 
      description: "Virtual labs for science education",
      logoSrc: "https://ext.same-assets.com/95251549/3125628685.svg",
      website: "https://www.labster.com"
    },
    { 
      id: 9, 
      name: "LeapFinance", 
      description: "Education financing solutions",
      logoSrc: "https://ext.same-assets.com/95251549/3319807111.svg",
      website: "https://www.leapfinance.com"
    },
    { 
      id: 10, 
      name: "MasterClass", 
      description: "Online classes taught by world-class instructors",
      logoSrc: "https://ext.same-assets.com/95251549/2458318806.svg",
      website: "https://www.masterclass.com"
    },
    { 
      id: 11, 
      name: "Newsela", 
      description: "Instructional content platform",
      logoSrc: "https://ext.same-assets.com/95251549/1287973997.svg",
      website: "https://www.newsela.com"
    },
    { 
      id: 12, 
      name: "Quizlet", 
      description: "Study tools and learning resources",
      logoSrc: "https://ext.same-assets.com/95251549/465069120.svg",
      website: "https://www.quizlet.com"
    },
    { 
      id: 13, 
      name: "Brilliant", 
      description: "Interactive courses in math, science, and computer science",
      logoSrc: "https://ext.same-assets.com/95251549/brilliant.svg",
      website: "https://www.brilliant.org"
    },
    { 
      id: 14, 
      name: "Duolingo", 
      description: "Language learning platform",
      logoSrc: "https://ext.same-assets.com/95251549/duolingo.svg",
      website: "https://www.duolingo.com"
    },
    { 
      id: 15, 
      name: "Coursera", 
      description: "Online courses from top universities",
      logoSrc: "https://ext.same-assets.com/95251549/coursera.svg",
      website: "https://www.coursera.org"
    },
    { 
      id: 16, 
      name: "Khan Academy", 
      description: "Free educational resources for all ages",
      logoSrc: "https://ext.same-assets.com/95251549/khan.svg",
      website: "https://www.khanacademy.org"
    },
    { 
      id: 17, 
      name: "Edmodo", 
      description: "Educational technology platform for teachers and students",
      logoSrc: "https://ext.same-assets.com/95251549/edmodo.svg",
      website: "https://www.edmodo.com"
    },
    { 
      id: 18, 
      name: "Udemy", 
      description: "Online learning marketplace",
      logoSrc: "https://ext.same-assets.com/95251549/udemy.svg",
      website: "https://www.udemy.com"
    }
  ];

  return (
    <>
      {/* Top-left logo */}
      <div className="fixed top-6 left-6 z-50 hidden md:block">
        <Link href="/" aria-label="Home">
          <Image src="/EFOF Logo.png" alt="Education for Our Future Logo" width={180} height={60} className="h-16 w-auto hover:opacity-90 transition-opacity duration-200" />
        </Link>
      </div>
      <div className="sticky top-0 left-0 z-50 block md:hidden bg-transparent pt-4 pl-4">
        <Link href="/" aria-label="Home">
          <Image src="/EFOF Logo.png" alt="Education for Our Future Logo" width={140} height={48} className="h-14 w-auto hover:opacity-90 transition-opacity duration-200" />
        </Link>
      </div>
      <div className="min-h-screen bg-background">
        {/* Skip to content link for accessibility */}
        <a 
          href="#portfolio-heading"
          onClick={handleSkipToContent}
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 
            focus:px-4 focus:py-2 focus:bg-[#1A6B8A] focus:text-white focus:rounded-md"
        >
          Skip to main content
        </a>
        
        {/* Hero Section (black background) */}
        <FadeIn>
          <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden pt-32 pb-20 bg-black">
            {/* Background video */}
            <video
              className="absolute inset-0 w-full h-full object-cover z-0"
              src="/videos/portfolio video.mp4"
              autoPlay
              loop
              muted
              playsInline
            />
            <div className="container mx-auto px-6 relative z-20">
              <div className="max-w-4xl mx-auto">
                <div className="relative inline-block mb-8">
                  <h1 className="text-4xl md:text-5xl font-bold text-white relative z-10 leading-tight">
                    We bring real insight to those who are most capable of real action.
                  </h1>
                  <div className="absolute -bottom-2 left-0 w-32 h-2 bg-white rounded-full"></div>
                </div>
                <p className="text-xl text-white leading-relaxed">
                  The Education for Our Future portfolio brings together the most influential companies in edtech to build a future of learning shaped by collaboration, not competition. By uniting industry leaders with students and educators, we design solutions that are as visionary as they are practical.
                </p>
              </div>
            </div>
          </section>
        </FadeIn>
        
        {/* Portfolio Companies Grid Section (white background) */}
        <section className="min-h-screen bg-white text-black" aria-labelledby="portfolio-heading">
          <div className="container mx-auto px-6">
            <FadeIn delay={100}>
              <div className="relative inline-block mx-auto mb-12">
                <h2 id="portfolio-heading" className="text-3xl md:text-4xl font-bold text-center text-foreground relative z-10">
                  Our Portfolio Companies
                </h2>
                <div className="absolute -bottom-1 left-0 w-full h-2 bg-primary rounded-full"></div>
              </div>
            </FadeIn>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-8">
              {portfolioCompanies.map((company, index) => (
                <ScrollReveal
                  key={company.id}
                  animation="fade-up"
                  delay={100 + (index * 50)}
                  duration={800}
                  className="h-full"
                >
                  <a 
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-card rounded-xl border border-border hover:border-primary/30 p-4 flex items-center 
                      justify-center aspect-square relative group overflow-hidden transition-colors duration-200"
                    aria-label={`${company.name} - ${company.description}`}
                    tabIndex={0}
                  >
                    {/* Logo */}
                    <Image
                      src={company.logoSrc}
                      alt={`${company.name} logo`}
                      width={120}
                      height={60}
                      loading="lazy"
                      quality={85}
                      className="h-12 w-auto object-contain transition-all duration-300 
                        group-hover:scale-95 group-hover:opacity-90 z-10"
                      onError={(e) => {
                        // Fallback for image loading errors
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          const fallback = document.createElement('div');
                          fallback.className = 'text-lg font-bold text-[#2C4D6E] text-center';
                          fallback.textContent = company.name.charAt(0);
                          parent.appendChild(fallback);
                        }
                      }}
                    />
                    
                    {/* Hover overlay with company info */}
                    <div className="absolute inset-0 bg-gradient-to-b from-secondary/95 to-primary/20 
                      flex flex-col items-center justify-center p-4 text-center
                      opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                      <h3 className="text-sm font-bold text-foreground mb-1">{company.name}</h3>
                      <p className="text-xs text-muted-foreground line-clamp-3">{company.description}</p>
                      <div className="mt-2 w-8 h-0.5 bg-accent rounded-full"></div>
                    </div>
                    
                    {/* Focus ring for accessibility */}
                    <div className="absolute inset-0 rounded-xl ring-0 ring-accent group-focus:ring-2 transition-all duration-300"></div>
                  </a>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
        
        {/* Portfolio Benefits Section */}
        <section className="py-20 bg-background" aria-labelledby="benefits-heading">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <ScrollReveal animation="fade-up" duration={800}>
                <div className="relative inline-block mx-auto mb-10">
                  <h2 id="benefits-heading" className="text-3xl md:text-4xl font-bold text-center text-foreground relative z-10">
                    Benefits of Our Portfolio
                  </h2>
                  <div className="absolute -bottom-1 left-0 w-full h-2 bg-primary rounded-full"></div>
                </div>
              </ScrollReveal>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                {[
                  {
                    icon: (
                      <svg className="w-10 h-10 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    ),
                    title: "Collaborative Network",
                    description: "Join a powerful network of industry leaders working together to shape the future of education."
                  },
                  {
                    icon: (
                      <svg className="w-10 h-10 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    ),
                    title: "Innovation Support",
                    description: "Access resources, expertise, and guidance to accelerate your educational innovation."
                  },
                  {
                    icon: (
                      <svg className="w-10 h-10 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    ),
                    title: "Industry Impact",
                    description: "Make a meaningful difference in education by collaborating with other visionary companies."
                  }
                ].map((benefit, index) => (
                  <ScrollReveal
                    key={index}
                    animation="fade-up"
                    delay={200 + (index * 150)}
                    duration={800}
                  >
                    <div className="bg-card p-8 rounded-xl border border-border hover:border-primary/30 transition-colors duration-200 h-full flex flex-col items-center text-center group">
                      <div className="bg-secondary p-4 rounded-full mb-6 group-hover:bg-primary/10 transition-colors duration-200">
                        {benefit.icon}
                      </div>
                      <h3 className="text-xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors duration-200">{benefit.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
              
              <ScrollReveal animation="fade-up" delay={600} duration={800}>
                <div className="mt-16 text-center">
                  <Link 
                    href="/contact"
                    className="px-8 py-3 bg-gradient-to-br from-primary to-accent text-white rounded-full font-bold shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-primary/60 focus:ring-offset-2 relative overflow-hidden group inline-flex items-center"
                  >
                    <span className="relative z-10">Join Our Portfolio</span>
                    <svg className="w-4 h-4 ml-2 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                    <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
                  </Link>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>
        
        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}