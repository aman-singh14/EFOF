import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi, it, describe } from 'vitest';
import ScrollSection from '@/components/ScrollSection';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    section: React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement> & { animate?: unknown }>(function MotionSection({ children, ...props }, ref) {
      return (
        <section ref={ref} {...props}>
          {children}
        </section>
      );
    }),
  },
}));

// Mock react-intersection-observer
vi.mock('react-intersection-observer', () => ({
  useInView: () => ({
    ref: vi.fn(),
    inView: true,
  }),
}));

describe('ScrollSection', () => {
  it('should render children correctly', () => {
    render(
      <ScrollSection id="test-section">
        <div>Test Content</div>
      </ScrollSection>
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('should apply correct id', () => {
    render(
      <ScrollSection id="test-section">
        <div>Test Content</div>
      </ScrollSection>
    );

    expect(screen.getByTestId('scroll-section')).toHaveAttribute('id', 'test-section');
  });

  it('should apply custom className', () => {
    render(
      <ScrollSection id="test-section" className="custom-class">
        <div>Test Content</div>
      </ScrollSection>
    );

    expect(screen.getByTestId('scroll-section')).toHaveClass('custom-class');
  });

  it('should render video background when backgroundType is video', () => {
    render(
      <ScrollSection 
        id="test-section" 
        backgroundType="video" 
        backgroundSrc="/test-video.mp4"
      >
        <div>Test Content</div>
      </ScrollSection>
    );

    const video = screen.getByTestId('scroll-section').querySelector('video');
    expect(video).toBeInTheDocument();
    expect(video).toHaveAttribute('autoplay');
    expect(video).toHaveAttribute('loop');
    expect(video).toHaveProperty('muted', true);
    expect(video).toHaveAttribute('playsinline');
  });

  it('should not render video background when backgroundType is not video', () => {
    render(
      <ScrollSection 
        id="test-section" 
        backgroundType="solid"
      >
        <div>Test Content</div>
      </ScrollSection>
    );

    const video = screen.getByTestId('scroll-section').querySelector('video');
    expect(video).not.toBeInTheDocument();
  });

  it('should apply correct minHeight style', () => {
    render(
      <ScrollSection 
        id="test-section" 
        minHeight="50vh"
      >
        <div>Test Content</div>
      </ScrollSection>
    );

    const section = screen.getByTestId('scroll-section');
    expect(section).toHaveStyle({ minHeight: '50vh' });
  });

  it('should apply gradient background styles', () => {
    const gradientValue = 'linear-gradient(45deg, red, blue)';
    render(
      <ScrollSection 
        id="test-section" 
        backgroundType="gradient"
        backgroundSrc={gradientValue}
      >
        <div>Test Content</div>
      </ScrollSection>
    );

    const section = screen.getByTestId('scroll-section');
    expect(section).toHaveStyle({ background: gradientValue });
  });

  it('should apply image background styles', () => {
    const imageUrl = '/test-image.jpg';
    render(
      <ScrollSection 
        id="test-section" 
        backgroundType="image"
        backgroundSrc={imageUrl}
      >
        <div>Test Content</div>
      </ScrollSection>
    );

    const section = screen.getByTestId('scroll-section');
    expect(section).toHaveStyle({ 
      backgroundImage: `url(${imageUrl})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    });
  });

  it('should have correct default classes', () => {
    render(
      <ScrollSection id="test-section">
        <div>Test Content</div>
      </ScrollSection>
    );

    const section = screen.getByTestId('scroll-section');
    expect(section).toHaveClass('relative', 'flex', 'flex-col', 'justify-center', 'items-center', 'overflow-hidden');
  });

  it('should render content in correct wrapper structure', () => {
    render(
      <ScrollSection id="test-section">
        <div data-testid="content">Test Content</div>
      </ScrollSection>
    );

    const content = screen.getByTestId('content');
    const wrapper = content.closest('.relative.z-10.w-full.h-full.flex.flex-col.justify-center');
    expect(wrapper).toBeInTheDocument();
  });
});