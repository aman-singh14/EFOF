'use client';

import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/FadeIn";
import Footer from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";

import Logo from "@/components/Logo";


export default function Board() {
  return (
    <div className="bg-black min-h-screen">
      {/* Top-left logo */}
      <div className="fixed top-4 left-4 md:top-6 md:left-6 z-50 hidden md:block">
        <Link href="/" aria-label="Home">
          <Logo variant="black" size="md" priority />
        </Link>
      </div>
      <div className="sticky top-0 left-0 z-50 block md:hidden bg-transparent pt-2 pl-2">
        <Link href="/" aria-label="Home">
          <Logo variant="black" size="sm" priority />
        </Link>
      </div>

      <main className="bg-black overflow-x-hidden">
        <FadeIn>
          <header className="px-4 sm:px-6 max-w-6xl mx-auto pt-20 sm:pt-24 md:pt-28">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-light text-white mb-4">
              Board of Advisors
            </h1>
            <div className="w-16 sm:w-24 h-0.5 bg-white mb-6 sm:mb-8"></div>
            <p className="text-sm sm:text-base text-gray-400 max-w-2xl leading-relaxed">
              Meet the leaders guiding Education for Our Future. Each member brings unique experience and perspective.
            </p>
          </header>
        </FadeIn>

        {/* Board Members */}
        {[
          {
            name: "Leilani Cauthen",
            image: "/optimized/leilani.webp",
            description:
              "Futurist, AI Developer, and CEO and Publisher at the Learning Counsel, a research and news media hub for K12 education. LeiLani has 35 years of experience in news media, research, software development, legislative work, and has been helping define this century's real change to teaching and learning alongside technical innovation. Author of The Human Singularity – Balancing AI with Education, The Consumerization of Learning as well as many Special Reports, articles and podcasts.",
          },
          {
            name: "Crystal Yang",
            image: "/optimized/crystal.webp",
            description:
              "Crystal Yang is the founder of Audemy Games, a nonprofit transforming education for blind and visually impaired students through accessible, audio-based learning games. Passionate about equity and innovation, she designs tools that make core subjects like math and literacy engaging and inclusive. Her work has reached students in over 130 countries, redefining what accessible education can look like.",
          },
          {
            name: "Chaks Appalabattula",
            image: "/optimized/chaks.webp",
            description:
              "Chaks, Founder and CEO of Bloomz, a parent communication app transforming how districts, schools, teachers, and families connect. With more than 20 years of experience in technology, product leadership, and partnerships, Chaks previously served as VP at GlobalScholar, leading the company's vision for a comprehensive learning platform, and at AskMe Corporation, driving knowledge management solutions for Fortune 500 clients. Earlier, Chaks worked at Microsoft overseeing global releases of Word and Publisher. A gold medalist in Computer Science & Engineering from the National Institute of Technology, Warangal, India, Chaks brings expertise as a start-up all-rounder with deep skills in product strategy, market development, and innovation in education technology.",
          },
        ].map((member, index) => {
          const isEven = index % 2 === 0;
          const sectionId = member.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
          return (
            <ScrollReveal key={member.name} delay={index * 200}>
              <section
                id={sectionId}
                className="px-4 sm:px-6 py-12 sm:py-16 md:py-20"
                aria-labelledby={`${sectionId}-title`}
              >
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                  <div className={isEven ? "order-1" : "order-1 md:order-2"}>
                    <div className="relative w-full aspect-[4/3] bg-white/5 rounded-lg overflow-hidden ring-1 ring-white/10">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                        className="object-contain p-6"
                        priority={index === 0}
                      />
                    </div>
                  </div>
                  <div className={isEven ? "order-2" : "order-2 md:order-1"}>
                    <h2
                      id={`${sectionId}-title`}
                      className="text-2xl sm:text-3xl md:text-4xl font-light text-white mb-4"
                    >
                      {member.name}
                    </h2>
                    <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                      {member.description}
                    </p>
                  </div>
                </div>
              </section>
            </ScrollReveal>
          );
        })}
      </main>

      <Footer />
    </div>
  );
}