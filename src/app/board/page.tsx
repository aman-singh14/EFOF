'use client';

import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/FadeIn";
import Footer from "@/components/Footer";

export default function Board() {
  return (
    <>
      {/* Top-left logo */}
      <div className="fixed top-6 left-6 z-50 hidden md:block">
        <Link href="/" aria-label="Home">
          <Image src="/EFOF Logo 2.png" alt="Education for Our Future Logo" width={180} height={60} className="h-16 w-auto hover:opacity-90 transition-opacity duration-200" />
        </Link>
      </div>
      <div className="sticky top-0 left-0 z-50 block md:hidden bg-transparent pt-4 pl-4">
        <Link href="/" aria-label="Home">
          <Image src="/EFOF Logo 2.png" alt="Education for Our Future Logo" width={140} height={48} className="h-14 w-auto hover:opacity-90 transition-opacity duration-200" />
        </Link>
      </div>
      
      <div className="min-h-screen bg-black flex items-center justify-center">
        <FadeIn>
          <div className="text-center px-6">
            <div className="mb-8">
              <h1 className="text-4xl md:text-6xl font-light text-white mb-4">
                Board
              </h1>
              <div className="w-24 h-0.5 bg-white mx-auto mb-8"></div>
              <p className="text-xl md:text-2xl text-gray-300 font-light">
                Coming Soon
              </p>
            </div>
            <p className="text-gray-400 max-w-md mx-auto leading-relaxed">
              We're assembling an exceptional board of advisors. Details will be shared soon.
            </p>
          </div>
        </FadeIn>
      </div>
      
      <Footer />
    </>
  );
}