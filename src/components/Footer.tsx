import Image from "next/image";
import Link from "next/link";
import Logo from "./Logo";

export default function Footer({ className = "" }: { className?: string }) {
  return (
    <footer
      className={`py-8 sm:py-12 bg-black text-white overflow-x-hidden ${className}`}
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="container mx-auto px-4 sm:px-6 max-w-full">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col sm:flex-row items-center mb-6 md:mb-0 max-w-full">
            <Link
              href="/"
              className="flex flex-col sm:flex-row items-center max-w-full"
              aria-label="Education for Our Future homepage"
            >
              <Logo
                variant="white"
                size="md"
              />
              <span className="mt-2 sm:mt-0 sm:ml-4 text-white text-lg sm:text-xl font-medium text-center sm:text-left">Education for Our Future</span>
            </Link>
          </div>
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8 max-w-full">
            <nav aria-label="Footer navigation">
              <ul className="flex flex-wrap justify-center gap-4 sm:gap-6">
                <li>
                  <Link
                    href="/"
                    className="text-white hover:text-gray-300 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black rounded-md px-2 py-1 text-sm sm:text-base"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/why"
                    className="text-white hover:text-gray-300 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black rounded-md px-2 py-1 text-sm sm:text-base"
                    aria-current="page"
                  >
                    Why
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-white hover:text-gray-300 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black rounded-md px-2 py-1 text-sm sm:text-base"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>
            <div className="flex space-x-4 sm:space-x-6 mt-4 md:mt-0">
              <a
                href="https://www.instagram.com/education_for_our_futures/"
                className="text-white hover:text-gray-300 transition-colors duration-200 focus:text-gray-300 focus:outline-none"
                aria-label="Instagram"
              >
                <span className="sr-only">Instagram</span>
                <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/education-for-our-futures/"
                className="text-white hover:text-gray-300 transition-colors duration-200 focus:text-gray-300 focus:outline-none"
                aria-label="LinkedIn"
              >
                <span className="sr-only">LinkedIn</span>
                <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-white/20 text-center">
          <p className="text-white text-xs sm:text-sm">
            &copy; {new Date().getFullYear()} Education for Our Future. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 