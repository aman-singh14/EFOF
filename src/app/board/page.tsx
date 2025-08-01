'use client';

import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/FadeIn";
import Footer from "@/components/Footer";

import Logo from "@/components/Logo";


export default function Board() {
  return (
    <div className="bg-black min-h-screen">
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
      
      <div className="min-h-screen bg-black flex items-center justify-center overflow-x-hidden">
        <FadeIn>
          <div className="text-center px-4 sm:px-6 max-w-full">
            <div className="mb-6 sm:mb-8">
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-light text-white mb-4">
                Board
              </h1>
              <div className="w-16 sm:w-24 h-0.5 bg-white mx-auto mb-6 sm:mb-8"></div>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-300 font-light">
                Coming Soon
              </p>
            </div>
            <p className="text-sm sm:text-base text-gray-400 max-w-full sm:max-w-md mx-auto leading-relaxed">
              We're assembling an exceptional board of advisors. Details will be shared soon.
            </p>
          </div>
        </FadeIn>
      </div>
      
      <Footer />
    </div>
  );
}