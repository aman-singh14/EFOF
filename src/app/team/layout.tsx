import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Team - Education for Our Future",
  description: "Meet the founders and team behind Education for Our Future, a student-led initiative building the future of education.",
  openGraph: {
    title: "Our Team - Education for Our Future",
    description: "Meet the founders and team behind Education for Our Future, a student-led initiative building the future of education.",
    images: [
      {
        url: "/White EFOF Logo.png",
        width: 1200,
        height: 630,
        alt: "Education for Our Future Team",
      },
    ],
    type: "website",
    siteName: "Education for Our Future",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Team - Education for Our Future",
    description: "Meet the founders and team behind Education for Our Future, a student-led initiative building the future of education.",
    images: ["/White EFOF Logo.png"],
  },
};

export default function TeamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}