import { FadeIn } from "@/components/FadeIn";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";

export default function NewsPage() {
  return (
    <>
      {/* Top-left logo */}
      <div className="fixed top-6 left-6 z-50 hidden md:block">
        <Link href="/" aria-label="Home">
          <Image src="/EFOF Logo.png" alt="Education for Our Future Logo" width={180} height={60} className="h-16 w-auto drop-shadow-sm hover:opacity-90 transition-opacity duration-200" />
        </Link>
      </div>
      <div className="sticky top-0 left-0 z-50 block md:hidden bg-transparent pt-4 pl-4">
        <Link href="/" aria-label="Home">
          <Image src="/EFOF Logo.png" alt="Education for Our Future Logo" width={140} height={48} className="h-14 w-auto drop-shadow-sm hover:opacity-90 transition-opacity duration-200" />
        </Link>
      </div>
      <div className="min-h-screen bg-background">
        <FadeIn delay={100}>
          <section className="pt-32 pb-20 text-center bg-secondary">
            <div className="container mx-auto px-6">
              <div className="relative inline-block mb-8">
                <h1 className="text-4xl md:text-6xl font-bold text-foreground relative z-10">Latest News</h1>
                <div className="absolute -bottom-2 left-0 w-full h-2 bg-primary rounded-full"></div>
              </div>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Stay updated with our latest announcements, insights, and stories from the world of education technology.
              </p>
            </div>
          </section>
        </FadeIn>

        <FadeIn delay={200}>
          <section className="py-20 bg-background">
            <div className="container mx-auto px-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    date: "June 15, 2025",
                    title: "Education for the Future Raises $100M to Transform K-12 Education",
                    excerpt: "The funding will be used to expand their innovative learning platform to more schools nationwide.",
                    category: "Funding"
                  },
                  {
                    date: "May 28, 2025", 
                    title: "How Student-Led Design is Shaping the Future of Education",
                    excerpt: "Education for the Future's unique approach puts students at the center of educational innovation.",
                    category: "Innovation"
                  },
                  {
                    date: "May 10, 2025",
                    title: "Bridging the Gap Between Technology and Classroom Learning", 
                    excerpt: "Education for the Future's platform is making waves in the edtech industry with its student-centered approach.",
                    category: "Technology"
                  }
                ].map((item, index) => (
                  <div key={index} className="bg-card rounded-xl overflow-hidden border border-border hover:border-primary/30 hover:shadow-md transition-all duration-200 group">
                    <div className="h-48 bg-gradient-to-br from-secondary to-primary/20 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                          <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                          </svg>
                        </div>
                        <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                          {item.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="text-sm text-primary font-medium mb-2">{item.date}</div>
                      <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors leading-tight">{item.title}</h3>
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {item.excerpt}
                      </p>
                      <button className="text-primary hover:text-accent flex items-center group font-medium">
                        Read More
                        <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="text-center mt-16">
                <button className="px-8 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-accent transition-colors duration-200 shadow-sm">
                  View All News
                </button>
              </div>
            </div>
          </section>
        </FadeIn>
        <Footer />
      </div>
    </>
  );
}
