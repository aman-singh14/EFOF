'use client';

import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/FadeIn";
import Footer from "@/components/Footer";
import Logo from "@/components/Logo";
import { ScrollReveal } from "@/components/ScrollReveal";

interface Company {
  name: string;
  logo: string;
  description: string;
  website: string;
  hoverColor: string;
}

export default function Portfolio() {
  // Portfolio companies
  const companies: Company[] = [
    {
      name: "Audemy",
      logo: "/optimized/audemy.webp",
      description: "Audemy Games transforms education for blind and visually impaired students through accessible, audio-based learning games that make core subjects engaging and inclusive.",
      website: "https://audemy.org/",
      hoverColor: "bg-yellow-500"
    },
    {
      name: "The Learning Counsel", 
      logo: "/optimized/learningcounsel.webp",
      description: "A research and news media hub for K12 education, providing insights and analysis on digital transformation in schools and helping define this century's real change to teaching and learning.",
      website: "https://thelearningcounsel.com/",
      hoverColor: "bg-green-600"
    },
    {
      name: "KnowStory",
      logo: "/optimized/knowstory.webp", 
      description: "KnowStory empowers educators and students with innovative storytelling tools and platforms that enhance learning through narrative-driven educational experiences.",
      website: "https://knowstory.com/",
      hoverColor: "bg-orange-600"
    },
    {
      name: "Bloomz",
      logo: "/optimized/bloomz.webp",
      description: "Bloomz delivers a next-generation, unified communication platform that strengthens the home-school connection through AI-powered messaging, immersive translation into 250 languages, and comprehensive parent-teacher communication tools.",
      website: "https://www.bloomz.com/", 
      hoverColor: "bg-sky-500"
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Top-left logo */}
      <div className="fixed top-4 left-4 md:top-6 md:left-6 z-50 hidden md:block">
        <Link href="/" aria-label="Home">
          <Logo variant="white" size="md" priority />
        </Link>
      </div>
      <div className="sticky top-0 left-0 z-50 block md:hidden bg-transparent pt-2 pl-2">
        <Link href="/" aria-label="Home">
          <Logo variant="white" size="sm" priority />
        </Link>
      </div>

      <main className="bg-white overflow-x-hidden">
        <FadeIn>
          <header className="px-4 sm:px-6 max-w-6xl mx-auto pt-20 sm:pt-24 md:pt-28">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-light text-black mb-4">
              Portfolio
            </h1>
            <div className="w-16 sm:w-24 h-0.5 bg-black mb-6 sm:mb-8"></div>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl leading-relaxed">
              Discover the innovative companies and organizations we're proud to work with in transforming education.
            </p>
          </header>
        </FadeIn>

        {/* Company Grid */}
        <ScrollReveal delay={200}>
          <section className="px-4 sm:px-6 py-12 sm:py-16 md:py-20">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6">
                {companies.map((company, index) => (
                  <ScrollReveal key={company.name} delay={index * 100}>
                    <Link 
                      href={company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block"
                    >
                      <div className="relative h-56 sm:h-64 md:h-72 bg-white border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg">
                        {/* Default state - company logo centered */}
                        <div className="absolute inset-0 flex items-center justify-center p-3 group-hover:opacity-0 transition-opacity duration-300">
                          <Image
                            src={company.logo}
                            alt={`${company.name} logo`}
                            width={200}
                            height={200}
                            className="max-w-[95%] max-h-[95%] object-contain"
                          />
                        </div>

                        {/* Hover state - colored background with logo, arrow, and description */}
                        <div className={`absolute inset-0 ${company.hoverColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col`}>
                          {/* Top row with logo and arrow */}
                          <div className="flex justify-between items-start mb-4">
                            <div className="w-16 h-16 flex-shrink-0">
                              <Image
                                src={company.logo}
                                alt={`${company.name} logo`}
                                width={64}
                                height={64}
                                className="w-full h-full object-contain filter brightness-0 invert"
                              />
                            </div>
                            <div className="w-6 h-6 flex-shrink-0">
                              <svg 
                                className="w-full h-full text-white" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </div>
                          </div>

                          {/* Company description */}
                          <div className="flex-1 flex items-end">
                            <p className="text-white text-sm sm:text-base leading-relaxed">
                              {company.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </section>
        </ScrollReveal>
      </main>

      <Footer />
    </div>
  );
}