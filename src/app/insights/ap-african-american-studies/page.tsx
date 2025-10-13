import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';
import Logo from '@/components/Logo';
import ScrollAnimation from '@/components/ScrollAnimation';

export const metadata: Metadata = {
  title: 'South Carolina\'s Attack on AP African American Studies | EFOF Insights',
  description: 'How South Carolina\'s removal of AP African American Studies from state curriculum denies students educational opportunities and perpetuates systemic inequality.',
};

export default function APAfricanAmericanStudiesArticle() {
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
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  Civil Rights
                </span>
                <div className="flex items-center text-sm text-gray-500 gap-4">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    6 min read
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
                South Carolina's Attack on AP African American Studies
              </h1>
            </ScrollAnimation>
            
            <ScrollAnimation direction="fade" delay={0.6}>
              <p className="text-lg text-gray-600 leading-relaxed">
                How the state's removal of AP African American Studies from curriculum denies students educational opportunities and perpetuates systemic inequality.
              </p>
            </ScrollAnimation>
          </header>

          {/* Article Content */}
          <ScrollAnimation direction="up" delay={0.8}>
            <article className="prose prose-lg max-w-none">
              <div className="text-gray-800 leading-relaxed space-y-6">
                <p>
                  In South Carolina, there is a dark chapter being written as AP African American History is stripped from the curriculum, denying students the chance to receive college credit for learning the disturbing truth of our nation's past.
                </p>

                <p>
                  In June 2024, the South Carolina Department of Education confirmed that AP African American wouldn't be included in the state's roster of AP courses for the 2024-2025 school year and <strong>beyond</strong>. The memo states that the course <strong>"attributes to significant controversy"</strong> and <a href="https://pen.org/press-release/south-carolina-cancels-funding-college-credit-for-ap-african-american-studies-in-hgh-schools/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">cited ongoing legal and political controversy as reasons for the removal</a>. Although school districts aren't restricted to teach "locally-approved honors courses", without the official AP status, students no longer receive state-funded exam fees, weighted GPA benefits, or guaranteed college credit by passing the exam.
                </p>

                <p>
                  AP African American studies officially became a course piloted by Collegeboard in the 2022-2023 school year. Just like any AP class, it's used to challenge students with college level coursework. Every student deserves the opportunity to take AP courses without the state education departments making decisions that undermine the learning experience—especially for minority students who deeply understand the value of AP AA studies. Sadly, this is the reality for Black students in South Carolina.
                </p>

                <p>
                  In response to the South Carolina Department of Education's decision, the NAACP State Conference of South Carolina, together with students, educators, and civil rights advocates, filed a federal lawsuit—<a href="https://www.naacpldf.org/press-release/ldf-and-other-civil-rights-organizations-denounce-south-carolina-department-of-educations-removal-of-course-credit-for-ap-african-american-studies/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">NAACP-SC v.Weaver</a>—challenging the state law that caused the removal of AP African American Studies. The lawsuit argues that this violates students' constitutional rights by censoring educational content and disproportionately impacting Black students.
                </p>

                <p>
                  As of mid 2025, the federal lawsuit still remains unresolved. A preliminary injunction hearing was held in July, where both sides presented arguments, but no ruling has been issued yet. The court's decision, expected soon, could determine whether the course is reinstated with South Carolina's recognition and full benefits.
                </p>

                <p>
                  As the new school year approaches, one question remains clear: What were South Carolina's true intentions behind removing AP African American Studies from the curriculum? South Carolina's decision to remove the course was officially to comply with rules against "political controversy." But in reality, it appears to be an effort to limit teaching about racism and Black history—continuing the state's dark history of silencing Black voices.
                </p>

                <p>
                  Without AP status, students—especially Black and low-income students—lose the chance to earn college credit and study the truth of America's history. Could the real reason be to keep control over which parts of America's past are told, and which are left out?
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