import type { Metadata } from "next";
import "./globals.css";
import ClientBody from "./ClientBody";
import Script from "next/script";
import { Analytics } from '@vercel/analytics/react';

export const metadata: Metadata = {
  title: "Education for Our Futures",
  description: "Education for Our Futures - Empowering the next generation through education",
  icons: {
    icon: "/EFOF Logo.png",
    apple: "/EFOF Logo.png",
  },
  openGraph: {
    title: "Education for Our Futures",
    description: "Empowering the next generation through education",
    images: [
      {
        url: "/White EFOF Logo.png",
        width: 1200,
        height: 630,
        alt: "Education for Our Futures Logo",
      },
    ],
    type: "website",
    siteName: "Education for Our Futures",
  },
  twitter: {
    card: "summary_large_image",
    title: "Education for Our Futures",
    description: "Empowering the next generation through education",
    images: ["/White EFOF Logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Get the current URL for canonical URL
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://educationforourfutures.org';
  const canonicalUrl = `${siteUrl}${typeof window !== 'undefined' ? window.location.pathname : ''}`;

  return (
    <html lang="en" className="dark">
      <head>
        {/* Viewport meta tag for responsive design */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
        
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//unpkg.com" />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://unpkg.com" crossOrigin="" />
        
        {/* Preload critical fonts - only existing ones */}
        <link 
          rel="preload" 
          href="/fonts/Helvetica-Bold.ttf" 
          as="font" 
          type="font/ttf" 
          crossOrigin="" 
        />
        
        {/* Canonical URL to prevent duplicate content */}
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Language and region targeting */}
        <meta httpEquiv="content-language" content="en" />
        <meta name="geo.region" content="US" />
        
        {/* Theme color */}
        <meta name="theme-color" content="#000000" />
        
        {/* Critical CSS inline - base styles only */}
        <style dangerouslySetInnerHTML={{
          __html: `
            html,body{margin:0;padding:0;font-family:Georgia,"Times New Roman",Times,serif;line-height:1.6;font-weight:400;background:#fff;color:#000}
            *{box-sizing:border-box}
            .antialiased{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}
          `
        }} />
        
        {/* External Scripts - defer to reduce critical path */}
        <Script
          crossOrigin="anonymous"
          src="//unpkg.com/same-runtime/dist/index.global.js"
          strategy="afterInteractive"
        />
      </head>
      <body suppressHydrationWarning className="antialiased font-serif">
        <ClientBody>
          {children}
          <Analytics />
        </ClientBody>
      </body>
    </html>
  );
}