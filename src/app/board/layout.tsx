import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Board of Advisors - Education for Our Future",
  description: "Learn about the board of advisors for Education for Our Future, a student-led initiative building the future of education.",
  openGraph: {
    title: "Board of Advisors - Education for Our Future",
    description: "Learn about the board of advisors for Education for Our Future, a student-led initiative building the future of education.",
    images: [
      {
        url: "/White EFOF Logo.png",
        width: 1200,
        height: 630,
        alt: "Education for Our Future Board",
      },
    ],
    type: "website",
    siteName: "Education for Our Future",
  },
  twitter: {
    card: "summary_large_image",
    title: "Board of Advisors - Education for Our Future",
    description: "Learn about the board of advisors for Education for Our Future, a student-led initiative building the future of education.",
    images: ["/White EFOF Logo.png"],
  },
};

export default function BoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}