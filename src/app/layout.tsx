import type { Metadata } from "next";
import "./globals.css";
import ClientBody from "./ClientBody";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Education for Our Futures",
  description: "Education for Our Futures - Empowering the next generation through education",
  icons: {
    icon: "/EFOF Logo.png",
    apple: "/EFOF Logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta name="theme-color" content="#000000" />
        <Script
          crossOrigin="anonymous"
          src="//unpkg.com/same-runtime/dist/index.global.js"
        />
      </head>
      <body suppressHydrationWarning className="antialiased font-serif">
        <ClientBody>{children}</ClientBody>
      </body>
    </html>
  );
}