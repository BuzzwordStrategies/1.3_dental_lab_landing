import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Loader, ScrollControls } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';

// Import all components
import Hero3D from '../components/landing/Hero3D';
import DentalLabStats from '../components/landing/DentalLabStats';
import ServicesShowcase from '../components/landing/ServicesShowcase';
import CaseStudiesSection from '../components/landing/CaseStudiesSection';
import LeadMagnets from '../components/landing/LeadMagnets';
import TestimonialsCarousel from '../components/landing/TestimonialsCarousel';
import CTASection from '../components/landing/CTASection';
import Footer from '../components/landing/Footer';
import ScrollProgress from '../components/ui/ScrollProgress';
import ROICalculator from '../components/tools/ROICalculator';
import BundleBuilder3D from '../components/three/BundleBuilder3D';

const DentalLabLanding = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Preload critical assets
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Toaster position="top-right" />
      <ScrollProgress />
      
      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black flex items-center justify-center"
          >
            <div className="text-center">
              <div className="w-32 h-32 mb-8">
                {/* Animated logo loader */}
                <svg viewBox="0 0 100 100" className="animate-spin">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#D28C00" strokeWidth="2" strokeDasharray="280" strokeDashoffset="280">
                    <animate attributeName="stroke-dashoffset" from="280" to="0" dur="2s" fill="freeze" />
                  </circle>
                </svg>
              </div>
              <h2 className="text-2xl text-white font-light">Revolutionizing Dental Lab Marketing</h2>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="relative">
        <Hero3D />
        <DentalLabStats />
        <ServicesShowcase />
        <CaseStudiesSection />
        <LeadMagnets />
        <ROICalculator />
        <TestimonialsCarousel />
        <CTASection />
        <Footer />
      </div>
    </>
  );
};

export default DentalLabLanding;
