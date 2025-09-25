'use client';

import { FadeIn } from "@/components/FadeIn";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from 'react';
import Footer from "@/components/Footer";
import Logo from "@/components/Logo";

declare global {
  interface Window {
    Tally?: {
      loadEmbeds: (options?: {
        injectReactHelmet?: boolean;
        layout?: 'modal' | 'modal-zoomed' | 'drawer' | 'drawer-left' | 'drawer-right';
        width?: number | string;
        height?: number | string;
        autoClose?: number;
        hideTitle?: boolean;
        overlay?: boolean;
        emoji?: {
          text: string;
          animation: 'none' | 'wave' | 'tada' | 'heart-beat' | 'spin' | 'pulse' | 'rubber-band' | 'bounce' | 'jello' | 'wobble' | 'shake';
        };
        onOpen?: () => void;
        onClose?: () => void;
        onPageView?: (data: { event: string; formId: string;[key: string]: unknown }) => void;
        onSubmit?: (data: { responseId: string; fields: Record<string, unknown>;[key: string]: unknown }) => void;
      }) => void;
    };
  }
}

export default function JoinUsPage() {
  useEffect(() => {
    // Load Tally script
    const script = document.createElement('script');
    script.src = 'https://tally.so/widgets/embed.js';
    script.async = true;

    // Create the load function
    const loadEmbeds = () => {
      if (typeof window.Tally !== 'undefined') {
        window.Tally.loadEmbeds();
      } else {
        // If Tally is not available yet, try again shortly
        setTimeout(loadEmbeds, 100);
      }
    };

    script.onload = loadEmbeds;

    // Add error handling
    script.onerror = () => {
      console.error('Failed to load Tally script');
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <>
      {/* Top-left logo */}
      <div className="fixed top-6 left-6 z-50 hidden md:block">
        <Link href="/" aria-label="Home">
          <Logo variant="white" size="md" priority />
        </Link>
      </div>
      <div className="sticky top-0 left-0 z-50 block md:hidden bg-transparent pt-4 pl-4">
        <Link href="/" aria-label="Home">
          <Logo variant="white" size="sm" priority />
        </Link>
      </div>

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="pt-32 pb-16">
          <div className="container mx-auto px-6">
            <FadeIn>
              <div className="text-center mb-16">
                <h1 className="text-4xl md:text-6xl font-light text-black mb-4">
                  Join Us
                </h1>
                <div className="w-24 h-0.5 bg-black mx-auto mb-8"></div>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                  Interested in joining our team or getting involved? Fill out the form below to get started.
                </p>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Tally Form Section */}
        <section className="pb-16">
          <div className="container mx-auto px-6">
            <FadeIn delay={100}>
              <div className="max-w-4xl mx-auto">
                <div className="w-full" dangerouslySetInnerHTML={{
                  __html: `
                    <iframe 
                      data-tally-src="https://tally.so/embed/w2GW7L?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1" 
                      loading="lazy" 
                      width="100%" 
                      height="1215" 
                      frameborder="0" 
                      marginheight="0" 
                      marginwidth="0" 
                      title="Education for Our Futures Interest Form"
                      class="tally-embed"
                      style="width: 100%; min-height: 1215px;"
                    ></iframe>
                  `
                }} />
              </div>
            </FadeIn>
          </div>
        </section>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}
