import Image from "next/image";
import Link from "next/link";

export default function Footer({ className = "" }: { className?: string }) {
  return (
    <footer
      className={`py-12 bg-black text-white ${className}`}
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-6 md:mb-0">
            <Link
              href="/"
              className="flex items-center"
              aria-label="Education for Our Future homepage"
            >
              <Image
                src="/EFOF Logo.png"
                alt="Education for Our Future Logo"
                width={250}
                height={70}
                className="h-16 w-auto"
              />
              <span className="ml-4 text-white text-xl font-medium">Education for Our Future</span>
            </Link>
          </div>
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
            <nav aria-label="Footer navigation">
              <ul className="flex flex-wrap gap-6">
                <li>
                  <Link
                    href="/"
                    className="text-white hover:text-black transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black rounded-md px-2 py-1"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/why"
                    className="text-white hover:text-black transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black rounded-md px-2 py-1"
                    aria-current="page"
                  >
                    Why
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-white hover:text-black transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black rounded-md px-2 py-1"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a
                href="#"
                className="text-white hover:text-black transition-colors duration-200 focus:text-black focus:outline-none"
                aria-label="Twitter"
              >
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a
                href="#"
                className="text-white hover:text-black transition-colors duration-200 focus:text-black focus:outline-none"
                aria-label="LinkedIn"
              >
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-white/20 text-center">
          <p className="text-white text-sm">
            &copy; {new Date().getFullYear()} Education for Our Future. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 