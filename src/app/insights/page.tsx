import { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, Clock, ArrowRight } from 'lucide-react';
import Logo from '@/components/Logo';
import ScrollAnimation from '@/components/ScrollAnimation';

export const metadata: Metadata = {
  title: 'Insights | EFOF',
  description: 'EFOF Insights - Thought leadership and industry perspectives',
};

export default function InsightsPage() {
  const articles = [
    {
      id: 1,
      title: "Prestigious College Universities are Revolutionizing Education",
      excerpt: "How top universities are making education more affordable and accessible through competitive financial aid policies, creating a new standard where talent—not wealth—determines access to elite education.",
      readTime: "8 min read",
      date: "January 2025",
      category: "Education Policy",
      href: "/insights/college-affordability"
    },
    {
      id: 2,
      title: "South Carolina's Attack on AP African American Studies", 
      excerpt: "How the state's removal of AP African American Studies from curriculum denies students educational opportunities and perpetuates systemic inequality in education.",
      readTime: "6 min read",
      date: "January 2025",
      category: "Civil Rights",
      href: "/insights/ap-african-american-studies"
    }
  ];

  return (
    <div className="min-h-screen bg-white pt-20 pb-32">
      {/* Logo in top left */}
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

      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <ScrollAnimation direction="fade" delay={0.2}>
              <h1 className="text-3xl md:text-4xl font-bold text-black mb-8 leading-normal">
                Insights
              </h1>
            </ScrollAnimation>
            <ScrollAnimation direction="fade" delay={0.4}>
              <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                Thought leadership and industry perspectives from our team
              </p>
            </ScrollAnimation>
          </div>

          {/* Articles Grid */}
          <div className="grid gap-8 md:gap-12">
            {articles.map((article, index) => (
              <ScrollAnimation key={article.id} direction="up" delay={0.6 + (index * 0.2)}>
                <Link 
                  href={article.href}
                  className="group cursor-pointer block"
                >
                <div className="bg-white border border-gray-200 rounded-lg p-8 hover:shadow-lg transition-all duration-300 hover:border-gray-300">
                  {/* Article Meta */}
                  <div className="flex items-center gap-4 mb-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {article.category}
                    </span>
                    <div className="flex items-center text-sm text-gray-500 gap-4">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {article.readTime}
                      </span>
                      <span>{article.date}</span>
                    </div>
                  </div>

                  {/* Article Content */}
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-black mb-3 group-hover:text-gray-700 transition-colors leading-normal">
                      {article.title}
                    </h2>
                    <p className="text-gray-600 leading-relaxed">
                      {article.excerpt}
                    </p>
                  </div>

                  {/* Read More */}
                  <div className="flex items-center text-black font-medium group-hover:text-gray-700 transition-colors">
                    <BookOpen className="w-4 h-4 mr-2" />
                    <span>Read Article</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
                </Link>
              </ScrollAnimation>
            ))}
          </div>

          {/* Coming Soon Notice */}
          <ScrollAnimation direction="fade" delay={1.2}>
            <div className="text-center mt-12 mb-8 p-6 md:p-8 bg-gray-50 rounded-lg">
              <h3 className="text-lg md:text-xl font-semibold text-black mb-2">
                More Insights Coming Soon
              </h3>
              <p className="text-gray-600 text-sm md:text-base">
                We're preparing additional thought-provoking content. Check back soon for more insights and analysis.
              </p>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </div>
  );
}