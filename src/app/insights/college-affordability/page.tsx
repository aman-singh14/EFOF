import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';
import Logo from '@/components/Logo';
import ScrollAnimation from '@/components/ScrollAnimation';

export const metadata: Metadata = {
  title: 'Prestigious College Universities are Revolutionizing Education | EFOF Insights',
  description: 'How top universities are making education more affordable and accessible through competitive financial aid policies.',
};

export default function CollegeAffordabilityArticle() {
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
          {/* Back to Insights */}
          <ScrollAnimation direction="fade" delay={0.1}>
            <Link 
              href="/insights"
              className="inline-flex items-center text-gray-600 hover:text-black transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Insights
            </Link>
          </ScrollAnimation>

          {/* Article Header */}
          <header className="mb-8">
            <ScrollAnimation direction="fade" delay={0.2}>
              <div className="flex items-center gap-4 mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  Education Policy
                </span>
                <div className="flex items-center text-sm text-gray-500 gap-4">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    8 min read
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    January 2025
                  </span>
                </div>
              </div>
            </ScrollAnimation>
            
            <ScrollAnimation direction="up" delay={0.4}>
              <h1 className="!text-3xl !font-bold !text-black !mb-4 !leading-tight">
                Prestigious College Universities are Revolutionizing Education
              </h1>
            </ScrollAnimation>
            
            <ScrollAnimation direction="fade" delay={0.6}>
              <p className="text-lg text-gray-600 leading-relaxed">
                How top universities are making education more affordable and accessible through competitive financial aid policies.
              </p>
            </ScrollAnimation>
          </header>

          {/* Article Content */}
          <ScrollAnimation direction="up" delay={0.8}>
            <article className="prose prose-lg max-w-none">
              <div className="text-gray-800 leading-relaxed space-y-6">
              <p>
                College cost has been the biggest concern for parents for over half a century. Since 1980, college tuition and fees have increased by 1,200%. With the year-tuition for in-state tuition being $108,584, out-of-state being $182,832, and for Private, Nonprofit Universities $234,512. Parents, and Students have asked questions for years that college costs should be decreased. An education shouldn't have to cost an arm and a leg to attend.
              </p>

              <p>
                This especially is the case for prestigious universities like Harvard, MIT, Duke, Caltech, and the University of Chicago. These schools are known for their nice facilities, elite research, and sought after global networks. But the price tag is jaw-dropping. For example, <a href="https://registrar.fas.harvard.edu/tuition-and-fees" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">Harvard's full cost of attendance for 2025-2026 is about $86,926 per year</a>, with tuition, room, board, and fees included. Stanford reports similar totals, and the <a href="https://financialaid.uchicago.edu/undergraduate/how-aid-works/undergraduate-costs/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">University of Chicago lists an annual cost near $93,893</a>. Even highly respected non-Ivy universities like <a href="https://financialaid.duke.edu/how-aid-calculated/cost-attendance/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">Duke</a> and <a href="https://www.finaid.caltech.edu/costs" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">Caltech</a> post numbers exceeding $88,000 annually. These costs make parents wonder if prestige even considers accessibility for their child going off to university.
              </p>

              <p>
                But why have prestigious colleges been so expensive over the years? First, <strong>administrative and facility costs</strong> have inflated. Universities compete not solely on academics, but also on luxury dorms, advanced labs, expansive recreation centers, and student support services. While these factors improve student life on campus, they also raise overhead costs. Second, <strong>public funding has declined dramatically</strong>, especially for flagship state universities. As states continue to cut support, institutions shift costs and place burdens on students through higher tuition rates.
              </p>

              <p>
                Third, the <strong>"sticker price"</strong> plays a role. Top universities set very high published costs but offset them with generous financial aid. <span className="underline">For example, Stanford and MIT</span> both pledge that students from families earning under certain income thresholds—often $150,000 or $200,000 per year—pay little or no tuition. Yet the advertised price remains high, discouraging many families from applying at all.
              </p>

              <p>
                However, universities are starting to revolutionize higher education. Prestigious universities are actively making affordability central to their missions. In 2025, Harvard announced that families earning up to <strong>$200,000 annually</strong> would now qualify for free tuition. MIT and Stanford currently have similar policies that reduce costs for middle-low income families. Duke and Caltech have strengthened their commitments to need-based aid, and the University of Chicago continues to expand grants in place of loans.
              </p>

              <p>
                Universities act of generosity creates competition amongst prestigious universities. When Harvard raises the bar with a new affordability policy, other ivies afford to be left behind. To attract the best applicants, it's imperative to match or even exceed the standard. And when one prestigious university promises affordable education, it leads to a domino effect that drives students to push beyond their limits.
              </p>

              <p>
                This type of competition benefits students directly. Instead of fighting to build the tallest new dormitory or most expensive lab, universities now compete to show that talent—not wealth—should determine who attends. That competition not only lowers the financial barrier but also pushes schools to improve the overall student experience. When universities must prove they are worth the investment, they double down on excellence in teaching, research opportunities, and support services.
              </p>

              <p>
                As the nation's most prestigious schools compete to make education affordable, they set an example for the rest of education. In fact, Emory and <a href="https://news.wfu.edu/2025/09/17/wake-forest-university-will-be-tuition-free-for-admitted-students-from-north-carolina-families-earning-less-than-200000/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">Wake Forest</a> announced free-tuition if your family is 200,000 or less. This reshapes the message of college accessibility across the United States. It's evident affordability is a new measure of prestige.
              </p>

              <p>
                It may come from a promise, that the best education in the world will not be out of reach because of cost. By driving competition through affordability, prestigious universities like Stanford, Duke, MIT, Caltech, the University of Chicago, and Emory are proving that excellence and access can coexist.
              </p>

              <p className="text-lg font-medium text-black">
                Prestigious no longer has to be paired with exclusive because accessibility will create endless opportunity.
              </p>
              </div>
            </article>
          </ScrollAnimation>

          {/* Back to Insights */}
          <ScrollAnimation direction="fade" delay={1.0}>
            <div className="mt-12 pt-8 border-t border-gray-200">
              <Link 
                href="/insights"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to All Insights
              </Link>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </div>
  );
}