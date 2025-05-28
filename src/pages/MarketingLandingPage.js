import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NavigationHeader from '../components/landing/NavigationHeader';
import AnimatedBackground from '../components/AnimatedBackground';
import TrustIndicators from '../components/landing/TrustIndicators';
import ServicesShowcase from '../components/landing/ServicesShowcase';
import SocialProofSection from '../components/landing/SocialProofSection';
import LeadMagnetSection from '../components/landing/LeadMagnetSection';
import PreBuiltBundles from '../components/landing/PreBuiltBundles';
import FAQSection from '../components/landing/FAQSection';
import Footer from '../components/landing/Footer';
import ScrollProgress from '../components/ui/ScrollProgress';
import CursorTrail from '../components/effects/CursorTrail';

const MarketingLandingPage = () => {
  const [theme, setTheme] = useState('dark');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load theme from localStorage or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const initialTheme = savedTheme || systemPreference;
    setTheme(initialTheme);
    document.documentElement.classList.add(`theme-${initialTheme}`);

    // Simulate loading
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.classList.remove(`theme-${theme}`);
    document.documentElement.classList.add(`theme-${newTheme}`);
    localStorage.setItem('theme', newTheme);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-x-hidden">
      <ScrollProgress />
      <CursorTrail />
      <AnimatedBackground />
      
      <NavigationHeader theme={theme} toggleTheme={toggleTheme} />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20">
        <div className="max-w-7xl mx-auto text-center z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
          >
            <span className="block">Transform Your Business With</span>
            <span className="block bg-gradient-to-r from-amber-400 to-orange-600 bg-clip-text text-transparent">
              Data-Driven Digital Marketing
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto"
          >
            Join 500+ businesses that have scaled their revenue with our proven strategies
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="https://calendly.com/josh-buzzwordstrategies/discovery-call"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-amber-500 text-black font-bold rounded-full hover:bg-amber-400 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-amber-500/50"
              onClick={() => {
                if (window.gtag) {
                  window.gtag('event', 'click', {
                    event_category: 'CTA',
                    event_label: 'Book Discovery Call - Hero'
                  });
                }
              }}
            >
              Book Your Free 15-Min Discovery Call
            </a>
            <button
              className="px-8 py-4 border-2 border-amber-500 text-amber-500 font-bold rounded-full hover:bg-amber-500 hover:text-black transform hover:scale-105 transition-all duration-200"
              onClick={() => {
                // Will implement lead magnet modal
                console.log('Open lead magnet modal');
              }}
            >
              Get Free AI SEO Audit
            </button>
          </motion.div>
          
          {/* Social Proof Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12 flex flex-wrap justify-center gap-6"
          >
            <img src="/assets/badges/google-partner.png" alt="Google Partner" className="h-12 opacity-70 hover:opacity-100 transition-opacity" />
            <img src="/assets/badges/meta-partner.png" alt="Meta Business Partner" className="h-12 opacity-70 hover:opacity-100 transition-opacity" />
            <div className="flex items-center gap-2 text-gray-400">
              <span className="text-sm">As Seen In</span>
              <div className="flex gap-4">
                {/* Add actual logos here */}
                <div className="w-20 h-8 bg-gray-700 rounded animate-pulse" />
                <div className="w-20 h-8 bg-gray-700 rounded animate-pulse" />
                <div className="w-20 h-8 bg-gray-700 rounded animate-pulse" />
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="animate-bounce">
            <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </motion.div>
      </section>
      
      <TrustIndicators />
      <ServicesShowcase theme={theme} />
      <SocialProofSection />
      <LeadMagnetSection />
      <PreBuiltBundles />
      <FAQSection />
      <Footer />
    </div>
  );
};

export default MarketingLandingPage;
