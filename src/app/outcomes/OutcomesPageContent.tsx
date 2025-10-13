'use client';

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { motion } from 'framer-motion';
import ScrollAnimation from "@/components/ScrollAnimation";
import PageWrapper from "@/components/page-wrapper";
import Logo from "@/components/Logo";
import OutcomesMapComponent from "@/components/OutcomesMapComponent";

// User impact data - each gets its own section
const userImpactData = [
  {
    value: "10 million+",
    description: "users' experiences transformed through comprehensive product evaluations",
    emphasis: "product evaluations"
  },
  {
    value: "310,000+",
    description: "readers reached through theLearningCounsel publications",
    emphasis: "theLearningCounsel"
  },
  {
    value: "200,000",
    description: "blind students empowered through accessible Audemy Games",
    emphasis: "audemy games"
  }
];

// Projects data with emphasis on achievements
const projectsData = [
  {
    title: "Phone bans",
    achievement: "mobilized over 6,000 signatures",
    description: "Successfully rallied community support for comprehensive phone ban initiatives across multiple districts"
  }
];

// Pilot programs - only the 5 specified districts
const pilotPrograms = [
  {
    name: 'Mount Tabor/Forsyth County',
    state: 'North Carolina'
  },
  {
    name: 'South Washington County Schools',
    state: 'Minnesota'
  },
  {
    name: 'Katy Independent School District',
    state: 'Texas'
  },
  {
    name: 'San Ramon Valley Unified School District',
    state: 'California'
  },
  {
    name: 'Millburn Township Public Schools',
    state: 'New Jersey'
  }
];

// Comprehensive school district data with coordinates and details
const schoolDistricts: Array<{
  name: string;
  state: string;
  coordinates: number[];
  studentPopulation: string;
  type: string;
  isPilotProgram: boolean;
}> = [
    // Pilot Programs
    {
      name: 'Mount Tabor/Forsyth County',
      state: 'North Carolina',
      coordinates: [-80.2442, 36.0999],
      studentPopulation: '55,000',
      type: 'Suburban',
      isPilotProgram: true
    },
    {
      name: 'South Washington County Schools',
      state: 'Minnesota',
      coordinates: [-92.8904, 44.9537],
      studentPopulation: '19,000',
      type: 'Suburban',
      isPilotProgram: true
    },
    {
      name: 'Katy Independent School District',
      state: 'Texas',
      coordinates: [-95.8244, 29.7858],
      studentPopulation: '96,000',
      type: 'Suburban',
      isPilotProgram: true
    },
    {
      name: 'San Ramon Valley Unified School District',
      state: 'California',
      coordinates: [-121.9780, 37.7799],
      studentPopulation: '30,000',
      type: 'Suburban',
      isPilotProgram: true
    },
    {
      name: 'Millburn Township Public Schools',
      state: 'New Jersey',
      coordinates: [-74.3015, 40.7245],
      studentPopulation: '4,700',
      type: 'Suburban',
      isPilotProgram: true
    },
    // Other School Districts
    {
      name: 'Los Angeles Unified School District',
      state: 'California',
      coordinates: [-118.2437, 34.0522],
      studentPopulation: '560,000',
      type: 'Urban',
      isPilotProgram: false
    },
    {
      name: 'Miami-Dade County Public Schools',
      state: 'Florida',
      coordinates: [-80.1918, 25.7617],
      studentPopulation: '335,000',
      type: 'Urban',
      isPilotProgram: false
    },
    {
      name: 'Chicago Public Schools',
      state: 'Illinois',
      coordinates: [-87.6298, 41.8781],
      studentPopulation: '315,000',
      type: 'Urban',
      isPilotProgram: false
    },
    {
      name: 'Clark County School District',
      state: 'Nevada',
      coordinates: [-115.1398, 36.1699],
      studentPopulation: '300,000',
      type: 'Urban',
      isPilotProgram: false
    },
    {
      name: 'Montgomery County Public Schools',
      state: 'Maryland',
      coordinates: [-77.1945, 39.1434],
      studentPopulation: '159,000',
      type: 'Suburban',
      isPilotProgram: false
    },
    {
      name: 'Charlotte-Mecklenburg Schools',
      state: 'North Carolina',
      coordinates: [-80.8431, 35.2271],
      studentPopulation: '140,800',
      type: 'Urban/Suburban',
      isPilotProgram: false
    },
    {
      name: 'Jefferson County Public Schools',
      state: 'Kentucky',
      coordinates: [-85.7585, 38.2527],
      studentPopulation: '96,000',
      type: 'Urban',
      isPilotProgram: false
    },
    {
      name: 'Fulton County Schools',
      state: 'Georgia',
      coordinates: [-84.3880, 33.7490],
      studentPopulation: '86,000',
      type: 'Suburban',
      isPilotProgram: false
    },
    {
      name: 'Albuquerque Public Schools',
      state: 'New Mexico',
      coordinates: [-106.6504, 35.0844],
      studentPopulation: '70,000',
      type: 'Urban',
      isPilotProgram: false
    },
    {
      name: 'Plano Independent School District',
      state: 'Texas',
      coordinates: [-96.6989, 33.0198],
      studentPopulation: '48,000',
      type: 'Suburban',
      isPilotProgram: false
    },
    {
      name: 'Detroit Public Schools Community District',
      state: 'Michigan',
      coordinates: [-83.0458, 42.3314],
      studentPopulation: '48,000',
      type: 'Urban',
      isPilotProgram: false
    },
    {
      name: 'Wichita Public Schools (USD 259)',
      state: 'Kansas',
      coordinates: [-97.3375, 37.6872],
      studentPopulation: '47,000',
      type: 'Urban',
      isPilotProgram: false
    },
    {
      name: 'Anchorage School District',
      state: 'Alaska',
      coordinates: [-149.9003, 61.2181],
      studentPopulation: '43,000',
      type: 'Urban',
      isPilotProgram: false
    },
    {
      name: 'Leander Independent School District',
      state: 'Texas',
      coordinates: [-97.8531, 30.5788],
      studentPopulation: '42,000',
      type: 'Suburban',
      isPilotProgram: false
    },
    {
      name: 'East Baton Rouge Parish School System',
      state: 'Louisiana',
      coordinates: [-91.1871, 30.4515],
      studentPopulation: '41,000',
      type: 'Urban',
      isPilotProgram: false
    },
    {
      name: 'Beaverton School District',
      state: 'Oregon',
      coordinates: [-122.8037, 45.4871],
      studentPopulation: '39,000',
      type: 'Suburban',
      isPilotProgram: false
    },
    {
      name: 'Newark Public Schools',
      state: 'New Jersey',
      coordinates: [-74.1724, 40.7357],
      studentPopulation: '36,000',
      type: 'Urban',
      isPilotProgram: false
    },
    {
      name: 'Des Moines Public Schools',
      state: 'Iowa',
      coordinates: [-93.6250, 41.5868],
      studentPopulation: '31,000',
      type: 'Urban',
      isPilotProgram: false
    },
    {
      name: 'Indianapolis Public Schools',
      state: 'Indiana',
      coordinates: [-86.1581, 39.7684],
      studentPopulation: '31,000',
      type: 'Urban',
      isPilotProgram: false
    },
    {
      name: 'Boise School District',
      state: 'Idaho',
      coordinates: [-116.2146, 43.6150],
      studentPopulation: '26,000',
      type: 'Urban',
      isPilotProgram: false
    },
    {
      name: 'Jackson Public School District',
      state: 'Mississippi',
      coordinates: [-90.1848, 32.2988],
      studentPopulation: '19,000',
      type: 'Urban',
      isPilotProgram: false
    },
    {
      name: 'St. Louis Public Schools',
      state: 'Missouri',
      coordinates: [-90.1994, 38.6270],
      studentPopulation: '18,000',
      type: 'Urban',
      isPilotProgram: false
    },
    {
      name: 'Bismarck Public Schools',
      state: 'North Dakota',
      coordinates: [-100.7837, 46.8083],
      studentPopulation: '13,000',
      type: 'Suburban',
      isPilotProgram: false
    },
    {
      name: 'Camden County School District',
      state: 'Georgia',
      coordinates: [-81.5990, 30.7335],
      studentPopulation: '9,000',
      type: 'Rural',
      isPilotProgram: false
    },
    {
      name: 'Helena Public Schools',
      state: 'Montana',
      coordinates: [-112.0362, 46.5958],
      studentPopulation: '5,200',
      type: 'Rural/Small City',
      isPilotProgram: false
    },
    {
      name: 'Lincoln County School District',
      state: 'Oregon',
      coordinates: [-123.9351, 44.6267],
      studentPopulation: '5,000',
      type: 'Rural',
      isPilotProgram: false
    },
    {
      name: 'Dillon School District Four',
      state: 'South Carolina',
      coordinates: [-79.3611, 34.4154],
      studentPopulation: '3,800',
      type: 'Rural',
      isPilotProgram: false
    },
    {
      name: 'Fremont County School District #25',
      state: 'Wyoming',
      coordinates: [-108.7307, 42.8666],
      studentPopulation: '2,300',
      type: 'Rural',
      isPilotProgram: false
    },
    {
      name: 'Vermillion School District',
      state: 'South Dakota',
      coordinates: [-96.9295, 42.7794],
      studentPopulation: '1,300',
      type: 'Rural',
      isPilotProgram: false
    }
  ];

const OutcomesPageContent = () => {
  const [pageLoaded, setPageLoaded] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [backgroundColor, setBackgroundColor] = useState('white');
  const [selectedDistrict, setSelectedDistrict] = useState<typeof schoolDistricts[0] | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Calculate total sections: Hero + User Impact + Projects + Pilot Programs + Map
  const totalSections = 1 + userImpactData.length + projectsData.length + 1 + 1;

  useEffect(() => {
    setPageLoaded(true);
    // Simulate map loading
    const timer = setTimeout(() => setMapLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  // Handle scroll events for background color transitions and section tracking
  useEffect(() => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;

    // Define section colors based on the alternating pattern
    const getSectionColor = (sectionIndex: number) => {
      // Hero (0) = white
      if (sectionIndex === 0) return 'white';
      // User Impact (1,2,3) = alternating starting with black
      if (sectionIndex >= 1 && sectionIndex <= 3) {
        return sectionIndex % 2 === 1 ? 'black' : 'white';
      }
      // Projects (4) = white
      if (sectionIndex === 4) return 'white';
      // Pilot Programs (5) = black
      if (sectionIndex === 5) return 'black';
      // Map (6) = white
      if (sectionIndex === 6) return 'white';

      return 'white'; // fallback
    };

    const handleScroll = () => {
      if (!container) return;

      const scrollTop = container.scrollTop;
      const viewportHeight = window.innerHeight;

      // Calculate which section we're transitioning to based on scroll position
      const currentSectionFloat = scrollTop / viewportHeight;
      const currentSectionIndex = Math.floor(currentSectionFloat);
      const nextSectionIndex = Math.min(currentSectionIndex + 1, totalSections - 1);
      const transitionProgress = currentSectionFloat - currentSectionIndex;

      // Update current section for other UI elements
      const dominantSection = Math.round(currentSectionFloat);
      if (dominantSection !== currentSection) {
        setCurrentSection(dominantSection);
      }

      // Determine background color based on scroll position
      const isMobile = window.innerWidth < 768;
      const transitionThreshold = isMobile ? 0.7 : 0.3;

      if (transitionProgress > transitionThreshold && currentSectionIndex < totalSections - 1) {
        const nextColor = getSectionColor(nextSectionIndex);
        setBackgroundColor(nextColor);
      } else {
        const currentColor = getSectionColor(currentSectionIndex);
        setBackgroundColor(currentColor);
      }
    };

    // Add scroll listener
    container.addEventListener('scroll', handleScroll, { passive: true });

    // Add debounced resize listener to handle orientation changes
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        handleScroll(); // Recalculate on resize
      }, 100);
    };
    window.addEventListener('resize', handleResize, { passive: true });

    handleScroll(); // Initial call

    return () => {
      container.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, [currentSection, totalSections]);

  return (
    <PageWrapper>
      <div className="relative overflow-x-hidden max-w-full">
        {/* Dynamic Background that transitions with scroll */}
        <div
          className="fixed inset-0 z-0 dynamic-background"
          style={{ backgroundColor: backgroundColor }}
        />

        {/* Fixed Navigation - Dynamic logo based on current section */}
        <div className="fixed top-4 left-4 md:top-6 md:left-6 z-50 hidden md:block">
          <Link href="/" aria-label="Home">
            <Logo
              variant={
                currentSection === 0 ||
                  currentSection === 2 ||
                  currentSection === 4 ||
                  currentSection === 6
                  ? "white"
                  : "black"
              }
              size="md"
              priority
            />
          </Link>
        </div>
        <div className="sticky top-0 left-0 z-50 block md:hidden bg-transparent pt-2 pl-2">
          <Link href="/" aria-label="Home">
            <Logo
              variant={
                currentSection === 0 ||
                  currentSection === 2 ||
                  currentSection === 4 ||
                  currentSection === 6
                  ? "white"
                  : "black"
              }
              size="sm"
              priority
            />
          </Link>
        </div>

        <div
          ref={scrollContainerRef}
          className={`relative z-10 h-screen overflow-y-auto overflow-x-hidden natural-scroll-container scroll-optimized max-w-full transition-opacity duration-1000 ${pageLoaded ? 'opacity-100' : 'opacity-0'}`}
        >
          {/* Hero Section - Title */}
          <section className="relative h-screen overflow-hidden">
            <div className="h-screen flex flex-col justify-center items-center mobile-container mobile-padding-responsive relative z-10">
              <ScrollAnimation direction="up" delay={0.2} once={false}>
                <h1 className="mobile-text-xl font-bold text-black tracking-tight text-center mb-6 sm:mb-8">
                  Outcomes
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl text-black/70 text-center max-w-full sm:max-w-2xl">
                  The impact we've made together
                </p>
              </ScrollAnimation>
            </div>
          </section>

          {/* User Impact Sections - Each statistic gets its own full screen with alternating backgrounds */}
          {userImpactData.map((impact, index) => {
            const isBlackBg = index % 2 === 0;

            return (
              <section key={index} className="relative h-screen">
                <div className="h-screen flex flex-col justify-between mobile-container mobile-padding-responsive relative z-10">
                  {/* Massive number - center focus */}
                  <div className="flex-1 flex items-center justify-center">
                    <ScrollAnimation direction="up" delay={0.2} once={false}>
                      <div className="text-center max-w-full overflow-hidden">
                        <div className={`text-[4rem] sm:text-[8rem] md:text-[12rem] lg:text-[16rem] font-bold ${isBlackBg ? 'text-white' : 'text-black'} leading-[1.1] tracking-tight mb-6 sm:mb-8`}>
                          {impact.value}
                        </div>
                      </div>
                    </ScrollAnimation>
                  </div>

                  {/* Description - positioned strategically */}
                  <div className={`flex ${index % 2 === 0 ? 'justify-center sm:justify-start' : 'justify-center sm:justify-end'} items-end`}>
                    <ScrollAnimation direction={index % 2 === 0 ? "right" : "left"} delay={0.6} once={false}>
                      <div className={`max-w-full sm:max-w-2xl ${index % 2 === 0 ? 'text-center sm:text-left' : 'text-center sm:text-right'}`}>
                        <p className={`text-lg sm:text-xl md:text-2xl lg:text-3xl ${isBlackBg ? 'text-white' : 'text-black'} font-medium leading-tight mb-4`}>
                          {impact.description}
                        </p>
                        <div className={`w-16 sm:w-24 h-0.5 ${isBlackBg ? 'bg-white' : 'bg-black'} mb-4 ${index % 2 === 0 ? 'mx-auto sm:mx-0' : 'mx-auto sm:ml-auto'}`}></div>
                      </div>
                    </ScrollAnimation>
                  </div>
                </div>
              </section>
            );
          })}

          {/* Projects Section */}
          <section className="relative h-screen text-black">
            <div className="h-screen flex flex-col justify-between mobile-container mobile-padding-responsive relative z-10">
              {/* Top - Projects title */}
              <div className="flex items-start justify-center sm:justify-start pt-12 sm:pt-16">
                <ScrollAnimation direction="up" delay={0.2} once={false}>
                  <h2 className="mobile-text-large font-bold text-black tracking-tight text-center sm:text-left">
                    Projects
                  </h2>
                </ScrollAnimation>
              </div>

              {/* Center - Project achievement */}
              <div className="flex-1 flex items-center justify-center">
                <ScrollAnimation direction="up" delay={0.6} once={false}>
                  <div className="max-w-full sm:max-w-4xl text-center">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-6 sm:mb-8">
                      {projectsData[0].title}
                    </h3>
                    <p className="text-lg sm:text-2xl md:text-3xl text-black/90 leading-relaxed font-light mb-6 sm:mb-8">
                      {projectsData[0].achievement}
                    </p>
                    <p className="text-base sm:text-lg md:text-xl text-black/70 leading-relaxed">
                      {projectsData[0].description}
                    </p>
                  </div>
                </ScrollAnimation>
              </div>

              {/* Bottom - Transition */}
              <div className="flex justify-center items-end">
                <ScrollAnimation direction="up" delay={1.0} once={false}>
                  <div className="text-center">
                    <div className="w-16 sm:w-24 h-0.5 bg-black mx-auto mb-4"></div>
                    <p className="text-base sm:text-lg text-black/80">Pilot Programs Reshaped</p>
                  </div>
                </ScrollAnimation>
              </div>
            </div>
          </section>

          {/* Pilot Programs Section */}
          <section className="relative h-screen text-white">
            <div className="h-screen flex flex-col justify-between mobile-container mobile-padding-responsive relative z-10">
              {/* Top - Title */}
              <div className="flex items-start justify-center sm:justify-start pt-12 sm:pt-16">
                <ScrollAnimation direction="up" delay={0.2} once={false}>
                  <h2 className="mobile-text-large font-bold text-white tracking-tight text-center sm:text-left">
                    Pilot Programs<br />
                    <span className="text-white/70">Reshaped</span>
                  </h2>
                </ScrollAnimation>
              </div>

              {/* Center - Program list */}
              <div className="flex-1 flex items-center justify-center">
                <ScrollAnimation direction="up" delay={0.6} once={false}>
                  <div className="max-w-full sm:max-w-4xl text-center">
                    <div className="grid gap-4 sm:gap-6">
                      {pilotPrograms.map((program, index) => (
                        <div key={index} className="text-lg sm:text-xl md:text-2xl text-white leading-relaxed">
                          <span className="font-medium">{program.name}</span>
                          <span className="text-white/70 ml-2">• {program.state}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </ScrollAnimation>
              </div>

              {/* Bottom - Map transition */}
              <div className="flex justify-center items-end">
                <ScrollAnimation direction="up" delay={1.0} once={false}>
                  <div className="text-center">
                    <div className="w-16 sm:w-24 h-0.5 bg-white mx-auto mb-6"></div>
                    <p className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-6">
                      Explore our impact across the nation
                    </p>
                  </div>
                </ScrollAnimation>
              </div>
            </div>
          </section>

          {/* Map Section - Full width with legend */}
          <section className="relative min-h-screen bg-white">
            <div className="container mx-auto px-6 py-12 relative z-10">
              {/* Header */}
              <ScrollAnimation direction="up" delay={0.2} once={false}>
                <div className="text-center mb-12">
                  <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
                    Our Impact Across America
                  </h1>
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Explore our pilot programs and the school districts we've impacted nationwide
                  </p>
                </div>
              </ScrollAnimation>

              {/* Full Width Map Container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-full"
              >
                <div className="bg-white border border-gray-200 rounded-2xl p-6 h-[700px] relative overflow-hidden shadow-sm">
                  {!mapLoaded ? (
                    <div className="flex items-center justify-center h-full">
                      <div className="flex flex-col items-center space-y-4">
                        <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-300 border-t-black"></div>
                        <p className="text-sm text-gray-500">Loading map...</p>
                      </div>
                    </div>
                  ) : (
                    <div className="relative w-full h-full">
                      <OutcomesMapComponent
                        selectedDistrict={selectedDistrict}
                        onDistrictSelect={setSelectedDistrict}
                        schoolDistricts={schoolDistricts}
                      />
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Selected District Details */}
              {selectedDistrict && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mt-12"
                >
                  <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
                    <div className="max-w-4xl mx-auto">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded-full ${selectedDistrict.isPilotProgram ? 'bg-red-600' : 'bg-gray-700'}`}></div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                {selectedDistrict.isPilotProgram ? 'Pilot Program' : 'School District'}
                              </span>
                            </div>
                            <h3 className="text-2xl font-bold text-black">
                              {selectedDistrict.name}
                            </h3>
                          </div>
                        </div>
                        <button
                          onClick={() => setSelectedDistrict(null)}
                          className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                          aria-label="Close details"
                        >
                          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>

                      <div className="grid md:grid-cols-4 gap-6 pt-6 border-t border-gray-200">
                        <div className="text-center">
                          <div className="text-sm text-gray-500 mb-1">State</div>
                          <div className="font-medium text-black">{selectedDistrict.state}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-gray-500 mb-1">Student Population</div>
                          <div className="font-medium text-black">{selectedDistrict.studentPopulation}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-gray-500 mb-1">Type</div>
                          <div className="font-medium text-black">{selectedDistrict.type}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-gray-500 mb-1">Coordinates</div>
                          <div className="font-medium text-black text-xs">
                            {selectedDistrict.coordinates[1].toFixed(2)}, {selectedDistrict.coordinates[0].toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </section>
        </div>
      </div>
    </PageWrapper>
  );
};

export default OutcomesPageContent;