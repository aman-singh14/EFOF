'use client';

import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/FadeIn";
import { ScrollReveal } from "@/components/ScrollReveal";
import Footer from "@/components/Footer";

export default function Board() {
  // Board members data - placeholders
  const boardMembers = [
    { 
      id: 1, 
      name: "Dr. Eleanor Wright", 
      title: "Education Researcher", 
      specialty: "Cognitive Development",
      university: "Stanford University"
    },
    { 
      id: 2, 
      name: "Prof. James Chen", 
      title: "Education Technology Expert", 
      specialty: "Digital Learning Environments",
      university: "MIT"
    },
    { 
      id: 3, 
      name: "Dr. Maria Rodriguez", 
      title: "Curriculum Specialist", 
      specialty: "Inclusive Education",
      university: "Columbia University"
    },
    { 
      id: 4, 
      name: "Prof. David Johnson", 
      title: "Educational Psychology", 
      specialty: "Student Motivation",
      university: "University of Michigan"
    },
    { 
      id: 5, 
      name: "Dr. Sarah Thompson", 
      title: "Education Policy Expert", 
      specialty: "Education Equity",
      university: "Harvard University"
    },
    { 
      id: 6, 
      name: "Prof. Robert Kim", 
      title: "Learning Sciences", 
      specialty: "STEM Education",
      university: "UC Berkeley"
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
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-32 pb-20 bg-black">
        {/* Background video */}
        <video
          className="absolute inset-0 w-full h-full object-cover z-0"
          src="/videos/board video.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        {/* Subtle dark overlay for contrast - keep or remove as needed */}
        <div className="absolute inset-0 bg-black/25 z-10 pointer-events-none" />
        <div className="container mx-auto px-6 relative z-20">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal animation="fade-down" duration={1000}>
              <div className="relative inline-block mb-8">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white relative z-10 leading-tight tracking-tight">
                  A BOARD OF THE GREATEST EDUCATION RESEARCHERS, TEACHERS, AND PROFESSORS ACROSS THE NATION
                </h1>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-2 bg-white rounded-full"></div>
              </div>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={300} duration={1000}>
              <p className="text-lg md:text-xl text-white leading-relaxed max-w-3xl mx-auto">
                Education for Our Futures brings together the nation's most dedicated minds, think visionary researchers, bold entrepreneurs, and leading educators, to reimagine what learning can look like 10 years down the line. The board guides our mission with real insight, helping turn big questions into big solutions for students.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Board Members Section */}
      <section className="py-20 bg-white text-black">
        <div className="container mx-auto px-6">
          <ScrollReveal animation="fade-up" duration={800}>
            <div className="relative inline-block mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-center text-black relative z-10">
                Meet Our Distinguished Board
              </h2>
              <div className="absolute -bottom-1 left-0 w-full h-2 bg-black rounded-full"></div>
            </div>
          </ScrollReveal>
          
          {/* Hexagon Grid Layout */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-12 max-w-6xl mx-auto">
            {boardMembers.map((member, index) => (
              <ScrollReveal 
                key={member.id} 
                animation={index % 2 === 0 ? "fade-right" : "fade-left"} 
                delay={150 + (index * 100)}
                duration={800}
              >
                <div className="group">
                  {/* Hexagon Shape with Hover Effects */}
                  <div className="relative w-64 h-72 mb-4 transition-transform duration-300 group-hover:scale-105 hexagon-spin-once">
                    {/* Hexagon Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-secondary to-primary clip-path-hexagon transition-colors duration-200">
                    </div>
                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                      {/* Placeholder Avatar */}
                      <div className="w-20 h-20 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center mb-4 border-2 border-primary transition-colors duration-200">
                        <span className="text-3xl font-bold text-primary">{member.name.charAt(0)}</span>
                      </div>
                      <h3 className="text-lg font-bold text-black mb-1 transition-colors duration-300">
                        {member.name}
                      </h3>
                      <p className="text-sm font-medium text-black/80 mb-2 transition-colors duration-300">
                        {member.title}
                      </p>
                      <div className="w-12 h-0.5 bg-accent mb-2 transition-all duration-300"></div>
                      <p className="text-xs text-black/80 italic transition-colors duration-300">
                        {member.specialty}
                      </p>
                      <p className="text-xs text-black/80 transition-colors duration-300 mt-1">
                        {member.university}
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal animation="zoom-in" duration={1000}>
              <svg className="w-12 h-12 mx-auto mb-6 text-white" fill="currentColor" viewBox="0 0 32 32">
                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
              </svg>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={200} duration={1000}>
              <p className="text-xl md:text-2xl italic text-white leading-relaxed mb-6">
                "The future of education isn't just about technology—it's about reimagining how we nurture curiosity, creativity, and critical thinking in every student, regardless of background."
              </p>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={400} duration={800}>
              <div className="flex items-center justify-center">
                <div className="w-12 h-0.5 bg-white"></div>
                <p className="mx-4 text-white font-medium">Board Collective Vision</p>
                <div className="w-12 h-0.5 bg-white"></div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-white text-black">
        <div className="container mx-auto px-6 text-center">
          <ScrollReveal animation="fade-up" duration={800}>
            <div className="relative inline-block mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-black relative z-10">
                Join Us in Shaping the Future of Education
              </h2>
              <div className="absolute -bottom-1 left-0 w-full h-1.5 bg-black rounded-full"></div>
            </div>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={200} duration={800}>
            <p className="text-black max-w-2xl mx-auto mb-8 leading-relaxed">
              Our board is constantly looking for innovative educators and researchers who are passionate about transforming education.
            </p>
          </ScrollReveal>
          <ScrollReveal animation="zoom-in" delay={400} duration={1000}>
            <button className="px-8 py-3 bg-black text-white rounded-full font-bold shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 relative overflow-hidden group">
              <span className="relative z-10">Contact Us</span>
              <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
            </button>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
    </>
  );
}