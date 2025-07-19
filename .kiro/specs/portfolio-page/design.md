# Design Document

## Overview

The Portfolio page will showcase the companies that are part of the Education for Our Future (EFOF) portfolio with a visually appealing and cohesive design that aligns with the existing website aesthetic. The page will feature a prominent hero section with the light blue gradient background, followed by an enhanced grid display of portfolio companies that improves upon the current implementation on the home page by ensuring all company logos are clearly visible.

## Architecture

The page will maintain the existing Next.js structure with TypeScript and Tailwind CSS, following the established patterns from other pages in the application. The component will be a client-side rendered page using the existing FadeIn and ScrollAnimation components for smooth transitions.

### Page Structure
1. Hero Section - Portfolio messaging with light blue gradient background
2. Portfolio Companies Grid - Enhanced grid layout with improved logo visibility
3. Portfolio Benefits Section - Highlighting the value of being part of the EFOF portfolio
4. Footer - Existing footer component (unchanged)

## Components and Interfaces

### Main Component Structure
```typescript
interface PortfolioCompany {
  id: number;
  name: string;
  description: string;
  logoSrc: string;
  website?: string;
}

interface PortfolioPageProps {
  // No props needed for this static page
}
```

### Color Palette Integration
The design will use the established light blue color scheme:
- Primary Background: `bg-gradient-to-b from-[#E6F2FF] to-[#B3D9E5]`
- Text Colors: `text-[#2C4D6E]` for headings, `text-[#2C4D6E]/80` for body text
- Accent Color: `bg-[#1A6B8A]` for decorative elements
- Card Backgrounds: `bg-white/80` with backdrop blur for modern glass effect

### Hero Section Design
- Full-width gradient background matching home page
- Large, bold typography for main heading: "We bring real insight to those who are most capable of real action"
- Smaller, readable typography for descriptive text
- Centered layout with proper spacing and padding
- Responsive text sizing for mobile devices

### Portfolio Companies Grid Design
- Responsive grid layout with 3 columns on mobile, 4 on tablet, and 6 on desktop
- Enhanced company cards with:
  - Consistent card size for visual harmony
  - Proper padding and spacing to showcase logos clearly
  - White background with subtle shadow for logo visibility
  - Hover effects with scale and shadow enhancement
  - Company name revealed on hover
  - Glass morphism styling with backdrop blur

## Data Models

### Portfolio Companies Data
```typescript
const portfolioCompanies: PortfolioCompany[] = [
  { 
    id: 1, 
    name: "Amira Learning", 
    description: "AI-powered reading tutor for students",
    logoSrc: "/images/portfolio/amira.svg",
    website: "https://www.amiralearning.com"
  },
  { 
    id: 2, 
    name: "Class Technologies", 
    description: "Teaching and learning tools for virtual classrooms",
    logoSrc: "/images/portfolio/class.svg",
    website: "https://www.class.com"
  },
  // Additional companies will be added here
];
```

## Error Handling

- Graceful fallback if company logo images fail to load
- Default placeholder for missing logos
- Responsive design ensures proper display across all device sizes
- Accessibility considerations with proper ARIA labels and semantic HTML

## Testing Strategy

### Visual Testing
- Cross-browser compatibility testing
- Responsive design testing across multiple screen sizes
- Color contrast validation for accessibility compliance
- Logo visibility verification across different backgrounds and screen sizes

### Functional Testing
- Animation performance testing
- Hover state functionality verification
- Mobile touch interaction testing
- Image loading optimization testing

### Integration Testing
- Verify consistency with existing navigation and footer components
- Ensure proper integration with the existing design system
- Test page load performance with animations and images

## Implementation Details

### Styling Approach
- Utilize Tailwind CSS classes for consistent styling
- Implement custom gradients matching the home page
- Use CSS Grid for responsive portfolio company layout
- Apply backdrop-filter for modern glass effects
- Ensure proper contrast for text readability

### Logo Display Enhancement
- Set consistent dimensions for logo containers
- Use proper image optimization techniques
- Implement background contrast to ensure logo visibility
- Use Next.js Image component for optimized loading
- Apply subtle border or shadow to distinguish logo boundaries when needed

### Animation Strategy
- Leverage existing FadeIn component for page entrance animations
- Add subtle hover animations for company cards
- Implement staggered animations for company grid appearance
- Ensure animations are performant and accessible

### Responsive Design
- Mobile-first approach with progressive enhancement
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Flexible grid layout that adapts to screen size
- Optimized spacing and layout for all screen sizes

## Interaction Design

### Company Card Interactions
- Hover state reveals company name and brief description
- Subtle scale effect on hover for interactive feedback
- Optional click action to visit company website or view more details
- Keyboard navigation support for accessibility

### Accessibility Considerations
- Proper contrast ratios for all text elements
- Keyboard navigable interactive elements
- Screen reader friendly structure with appropriate ARIA attributes
- Focus indicators for keyboard users
- Alt text for all images

## Visual Design Elements

### Typography Hierarchy
- Heading 1: 4xl-5xl (36-48px), bold, text-[#2C4D6E]
- Heading 2: 3xl (30px), bold, text-[#2C4D6E]
- Body text: lg-xl (18-20px), regular/medium, text-[#2C4D6E]/80
- Caption text: sm (14px), medium, text-[#2C4D6E]/70

### Spacing System
- Container padding: px-6
- Section spacing: py-20
- Grid gap: gap-6 to gap-8
- Card padding: p-6 to p-8

### Visual Enhancements
- Subtle shadows for depth: shadow-md to shadow-lg
- Rounded corners for cards: rounded-xl
- Gradient accents for visual interest
- Transition effects for interactive elements