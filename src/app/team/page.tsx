'use client';

import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/FadeIn";
import Footer from "@/components/Footer";

export default function Team() {
  // Founders data
  const founders = [
    { id: 1, name: "Rishal Melvani", title: "Founder" },
    { id: 2, name: "Ishaan Singh", title: "Founder" },
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
        {/* Hero Section (black background) */}
        <FadeIn>
          <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden pt-32 pb-20 bg-black">
            {/* Background video */}
            <video
              className="absolute inset-0 w-full h-full object-cover z-0"
              src="/videos/team video.mp4"
              autoPlay
              loop
              muted
              playsInline
            />
            <div className="container mx-auto px-6 relative z-20">
              <div className="max-w-3xl">
                <div className="relative inline-block mb-8">
                  <h1 className="text-4xl md:text-5xl font-bold text-white relative z-10 leading-tight">A team of students building and bringing you the future of education</h1>
                  <div className="absolute -bottom-2 left-0 w-32 h-2 bg-white rounded-full"></div>
                </div>
                <p className="text-xl text-white leading-relaxed">
                  Education for Our Futures is entirely student-led, principally driven by those who truly live in the education system. With fresh perspectives and bold ideas, we're reimagining what learning can look like by bringing the right voices to the table and turning vision into action.
                </p>
              </div>
            </div>
          </section>
        </FadeIn>

        {/* Team Grid Section (white background) */}
        <section className="min-h-screen bg-white text-black">
          <div className="container mx-auto px-6">
            <FadeIn delay={100}>
              <div className="relative inline-block mx-auto mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground relative z-10">Our Founders</h2>
                <div className="absolute -bottom-1 left-0 w-full h-2 bg-primary rounded-full"></div>
              </div>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 max-w-6xl mx-auto">
              {founders.map((founder, index) => (
                <FadeIn
                  key={founder.id}
                  delay={200 + (index * 150)}
                >
                  <div
                    className="flex flex-col items-center text-center p-6 md:p-8 lg:p-10 rounded-2xl 
                    bg-card border border-border
                    transition-colors duration-200 
                    hover:border-primary/30 group"
                    tabIndex={0}
                    aria-label={`${founder.name}, ${founder.title}`}
                  >
                    <div className="relative w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-full overflow-hidden mb-6 
                    bg-gradient-to-br from-secondary via-secondary to-primary p-1">
                      <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                        <div className="w-full h-full bg-gradient-to-br from-secondary to-secondary flex items-center justify-center">
                          <span className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground transition-colors duration-200 group-hover:text-primary group-focus:text-primary">{founder.name.charAt(0)}</span>
                        </div>
                      </div>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2 transition-colors duration-200 group-hover:text-primary group-focus:text-primary">
                      {founder.name}
                    </h3>
                    <p className="text-muted-foreground text-base md:text-lg font-medium mb-4 transition-colors duration-200 group-hover:text-primary group-focus:text-primary">
                      {founder.title}
                    </p>
                    <div className="w-16 h-1 bg-primary rounded-full transition-colors duration-200"></div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
}