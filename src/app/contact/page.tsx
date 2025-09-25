'use client';

import { FadeIn } from "@/components/FadeIn";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Logo from "@/components/Logo";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Top-left logo */}
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

      <div className="min-h-screen bg-white">
        {/* Hero Section - Minimalistic */}
        <section className="pt-32 pb-16">
          <div className="container mx-auto px-6">
            <FadeIn>
              <div className="text-center mb-16">
                <h1 className="text-4xl md:text-6xl font-light text-black mb-4">
                  Contact
                </h1>
                <div className="w-24 h-0.5 bg-black mx-auto mb-8"></div>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                  Have questions or want to learn more about our work? We'd love to hear from you.
                </p>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Contact Form Section - Minimalistic */}
        <section className="pb-16">
          <div className="container mx-auto px-6">
            <div className="max-w-2xl mx-auto">
              <FadeIn delay={100}>
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-black mb-3">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-0 py-3 bg-transparent border-0 border-b border-gray-300 focus:border-black focus:outline-none transition-colors duration-200 text-black placeholder-gray-400"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-black mb-3">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-0 py-3 bg-transparent border-0 border-b border-gray-300 focus:border-black focus:outline-none transition-colors duration-200 text-black placeholder-gray-400"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-black mb-3">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-0 py-3 bg-transparent border-0 border-b border-gray-300 focus:border-black focus:outline-none transition-colors duration-200 text-black placeholder-gray-400"
                      placeholder="How can we help?"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-black mb-3">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full px-0 py-3 bg-transparent border-0 border-b border-gray-300 focus:border-black focus:outline-none transition-colors duration-200 text-black placeholder-gray-400 resize-none"
                      placeholder="Your message here..."
                    />
                  </div>

                  {/* Submit Status Messages */}
                  {submitStatus === 'success' && (
                    <div className="text-center text-green-600 text-sm">
                      Thank you! Your message has been sent successfully.
                    </div>
                  )}
                  {submitStatus === 'error' && (
                    <div className="text-center text-red-600 text-sm">
                      Sorry, there was an error sending your message. Please try again.
                    </div>
                  )}
                  
                  <div className="text-center pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-12 py-3 bg-black text-white font-medium hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                  </div>
                </form>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Contact Information - Minimalistic */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <FadeIn delay={200}>
              <div className="max-w-2xl mx-auto text-center">
                <h2 className="text-2xl font-light text-black mb-12">
                  Other Ways to Reach Us
                </h2>
                
                <div className="grid md:grid-cols-2 gap-12">
                  <div className="text-center">
                    <h3 className="text-lg font-medium text-black mb-3">Email</h3>
                    <a 
                      href="mailto:contact@educationforourfutures.com"
                      className="text-gray-600 hover:text-black transition-colors duration-200"
                    >
                      contact@educationforourfutures.com
                    </a>
                  </div>
                  
                  <div className="text-center">
                    <h3 className="text-lg font-medium text-black mb-3">Phone</h3>
                    <a 
                      href="tel:+14159906887"
                      className="text-gray-600 hover:text-black transition-colors duration-200"
                    >
                      +1 (415) 990-6887
                    </a>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}