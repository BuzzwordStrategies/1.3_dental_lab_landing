import React, { useState, useEffect } from 'react';
import Hero from '../components/sections/Hero';
import PainPoints from '../components/sections/PainPoints';
import ServicesShowcase from '../components/sections/ServicesShowcase';
import BundlePreview from '../components/sections/BundlePreview';
import SocialProof from '../components/sections/SocialProof';
import LeadCapture from '../components/sections/LeadCapture';
import Footer from '../components/sections/Footer';
import { trackEvent } from '../utils/tracking';

const DentalLabLanding = () => {
  // Scroll-triggered animations state
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Hero scrollY={scrollY} />
      <PainPoints />
      <ServicesShowcase />
      <BundlePreview />
      <SocialProof />
      <LeadCapture />
      <Footer />
    </div>
  );
};

export default DentalLabLanding;
