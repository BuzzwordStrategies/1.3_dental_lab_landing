import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FloatingDentalModels from '../components/three/FloatingDentalModels';
import CountUp from '../components/ui/CountUp';
import SEOAuditForm from '../components/forms/SEOAuditForm';
import BlogPostForm from '../components/forms/BlogPostForm';
import BundleCard from '../components/landing/BundleCard';
import DiscoveryCallModal from '../components/landing/DiscoveryCallModal';
import FloatingCTA from '../components/landing/FloatingCTA';
import SectionCTA from '../components/landing/SectionCTA';
import PerformanceGuarantee from '../components/landing/PerformanceGuarantee';
import ServiceIcon from '../components/icons/ServiceIcon';
import ServiceModal from '../components/landing/ServiceModal';
import EnhancedBundleCard from '../components/landing/EnhancedBundleCard';
import SimpleROICalculator from '../components/landing/SimpleROICalculator';
import FreeResources from '../components/landing/FreeResources';
import DiscoveryCallCTA from '../components/landing/DiscoveryCallCTA';
import '../styles/animations.css';
import '../styles/interactive-buttons.css';

gsap.registerPlugin(ScrollTrigger);

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const fadeInLeft = {
  initial: { opacity: 0, x: -60 },
  whileInView: { opacity: 1, x: 0 },
  transition: { duration: 0.6 }
};

const scaleOnHover = {
  whileHover: { scale: 1.05 },
  transition: { duration: 0.2 }
};

const DentalLabMarketingLanding = () => {
  const [showBundleButton, setShowBundleButton] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [showSEOAuditForm, setShowSEOAuditForm] = useState(false);
  const [showBlogPostForm, setShowBlogPostForm] = useState(false);
  const [showDiscoveryModal, setShowDiscoveryModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  // Lead magnet CTAs configuration
  const leadMagnetCTAs = [
    {
      id: 'seo-audit',
      icon: '🔍',
      title: 'Free AI-Powered SEO Audit',
      subtitle: 'Discover where you\'re winning & losing online',
      description: 'Get a comprehensive analysis of your lab\'s digital presence',
      value: '$497 Value',
      buttonText: 'Get My Free Audit',
      glowColor: 'from-amber-500 to-orange-600',
      onClick: () => setShowSEOAuditForm(true)
    },
    {
      id: 'blog-post',
      icon: '✍️',
      title: 'Free 1,500-Word Blog Post',
      subtitle: 'Custom content for your dental lab',
      description: 'AI-written, SEO-optimized article on your chosen topic',
      value: '$297 Value',
      buttonText: 'Claim Free Article',
      glowColor: 'from-purple-500 to-pink-600',
      onClick: () => setShowBlogPostForm(true)
    }
  ];

  useEffect(() => {
    // Show bundle button after 30 seconds
    const timer = setTimeout(() => {
      setShowBundleButton(true);
    }, 30000);

    return () => clearTimeout(timer);
  }, []);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitMessage('');

    const formData = {
      ...data,
      source: 'dental-lab-landing-page',
      timestamp: new Date().toISOString()
    };

    try {
      // Replace with your actual webhook URL
      await axios.post(process.env.REACT_APP_WEBHOOK_URL || '/api/lead-capture', formData);
      
      setSubmitMessage('Thank you! We\'ll contact you within 24 hours.');
      reset();
      
      // Track conversion
      if (window.gtag) {
        window.gtag('event', 'generate_lead', {
          currency: 'USD',
          value: 2497
        });
      }
    } catch (error) {
      setSubmitMessage('Something went wrong. Please try again or email us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-black text-white overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-amber-500/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <a 
            href="https://buzzwordstrategies.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity"
          >
            <img 
              src="https://images.squarespace-cdn.com/content/v1/673fc8d414047c5c20a42e65/ab4663d3-4840-47f0-88cf-a5b1144ed31a/Remove+background+project+%281%29.png?format=1000w" 
              alt="Buzzword Strategies" 
              className="h-10"
              loading="lazy"
            />
          </a>
          <nav className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('problem')} className="text-gray-300 hover:text-amber-500 transition-colors">
              The Problem
            </button>
            <button onClick={() => scrollToSection('solution')} className="text-gray-300 hover:text-amber-500 transition-colors">
              Our Solution
            </button>
            <button onClick={() => scrollToSection('services')} className="text-gray-300 hover:text-amber-500 transition-colors">
              Services
            </button>
            <button onClick={() => scrollToSection('pricing')} className="text-gray-300 hover:text-amber-500 transition-colors">
              Pricing
            </button>
            <a 
              href="https://bundle.buzzwordstrategies.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-transparent border-2 border-amber-500 text-amber-500 px-6 py-2 rounded-full font-bold hover:bg-amber-500 hover:text-black transition-all"
            >
              Bundle Builder
            </a>
          </nav>
          <button 
            onClick={() => scrollToSection('audit-form')}
            className="bg-amber-500 text-black px-6 py-2 rounded-full font-bold hover:bg-amber-400 transition-colors"
          >
            Get Your Free Audit
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Three.js Background */}
        <div className="absolute inset-0">
          <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
            <FloatingDentalModels />
          </Canvas>
        </div>
        
        <motion.div 
          className="relative z-10 text-center max-w-5xl mx-auto px-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Your Dental Lab Deserves
            <span className="bg-gradient-to-r from-amber-400 to-orange-600 bg-clip-text text-transparent">
              {" "}Better Than Word-of-Mouth
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Your dental lab deserves better than word of mouth marketing. 
            According to the National Association of Dental Laboratories, the dental lab industry has seen a 30% decline in the number of labs since 2008¹, while digitally-savvy labs are growing 3x faster than traditional labs². 
            Stop hoping for growth. Start engineering it.
          </p>
          
          <div className="text-xs text-gray-400 mt-4 mb-8">
            ¹NADL Industry Report 2023 | ²Digital Dentistry Market Analysis, Grand View Research 2024
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <motion.button 
              onClick={() => scrollToSection('audit-form')}
              className="bg-amber-500 text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-amber-400 transform hover:scale-105 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Your Free Growth Analysis
            </motion.button>
            <motion.a 
              href="https://bundle.buzzwordstrategies.com" 
              className="bg-transparent border-2 border-amber-500 text-amber-500 px-8 py-4 rounded-full font-bold text-lg hover:bg-amber-500 hover:text-black transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Build Your Marketing Bundle
            </motion.a>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            <motion.div 
              className="flex items-center space-x-2 text-gray-400"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-medium">No Setup Fees</span>
            </motion.div>
            <motion.div 
              className="flex items-center space-x-2 text-gray-400"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-medium">Transparent Pricing</span>
            </motion.div>
            <motion.div 
              className="flex items-center space-x-2 text-gray-400"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-medium">Built for Dental Labs</span>
            </motion.div>
          </div>

          {/* Lead Magnet CTAs */}
          <motion.div 
            className="grid md:grid-cols-2 gap-6 mt-12 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {leadMagnetCTAs.map((cta, index) => (
              <motion.div
                key={cta.id}
                whileHover={{ scale: 1.03, y: -5 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-xl"
                     style={{ background: `linear-gradient(to right, ${cta.glowColor})` }} />
                
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{cta.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-1">{cta.title}</h3>
                      <p className="text-amber-400 text-sm mb-2">{cta.subtitle}</p>
                      <p className="text-gray-300 text-sm mb-4">{cta.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <motion.span
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                          className="text-green-400 font-bold"
                        >
                          {cta.value}
                        </motion.span>
                        
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={cta.onClick}
                          className="px-6 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-black font-bold rounded-full text-sm"
                        >
                          {cta.buttonText} →
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
        
        {/* Animated scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Problem Section */}
      <section id="problem" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2 
            className="text-4xl font-bold text-white text-center mb-16"
            {...fadeInUp}
            viewport={{ once: true }}
          >
            The Dental Lab Crisis Nobody's Talking About
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              className="bg-black/50 backdrop-blur-sm rounded-2xl p-8 border border-red-500/20 relative group"
              {...fadeInUp}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="text-red-500 text-5xl font-bold mb-4">
                <CountUp end={48} suffix="%" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">of dental labs have closed since 2008</h3>
              <p className="text-gray-400">
                The dental lab industry has experienced significant consolidation and closures.
                <span className="text-xs block mt-2 text-amber-500 cursor-help">
                  National Association of Dental Laboratories, 2023 Industry Report
                </span>
              </p>
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-gray-700 whitespace-nowrap">
                <p className="font-medium">NADL Industry Report 2023</p>
                <p className="text-gray-400">https://nadl.org/industry-statistics</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-black/50 backdrop-blur-sm rounded-2xl p-8 border border-red-500/20 relative group"
              {...fadeInUp}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-red-500 text-5xl font-bold mb-4">
                <CountUp end={68} suffix="%" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">of lab owners are over age 55</h3>
              <p className="text-gray-400">
                An aging workforce presents succession challenges for the industry.
                <span className="text-xs block mt-2 text-amber-500 cursor-help">
                  Bureau of Labor Statistics, Dental Laboratory Technicians Report 2023
                </span>
              </p>
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-gray-700 whitespace-nowrap">
                <p className="font-medium">BLS Report 2023</p>
                <p className="text-gray-400">https://www.bls.gov/ooh/production/dental-laboratory-technicians.htm</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-black/50 backdrop-blur-sm rounded-2xl p-8 border border-red-500/20 relative group"
              {...fadeInUp}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-red-500 text-5xl font-bold mb-4">
                <CountUp end={82} suffix="%" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">of labs still rely primarily on word-of-mouth referrals</h3>
              <p className="text-gray-400">
                Most labs haven't adopted modern digital marketing strategies.
                <span className="text-xs block mt-2 text-amber-500 cursor-help">
                  Dental Lab Products Survey, 2024
                </span>
              </p>
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-gray-700 whitespace-nowrap">
                <p className="font-medium">Dental Lab Products Survey 2024</p>
                <p className="text-gray-400">Industry survey of 500+ dental laboratories</p>
              </div>
            </motion.div>
          </div>
          
          <motion.div 
            className="mt-16 bg-gradient-to-r from-red-900/20 to-orange-900/20 rounded-3xl p-12 border border-red-500/20"
            {...fadeInUp}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-3xl font-bold text-white mb-6 text-center">
              The Harsh Reality: Adapt or Disappear
            </h3>
            <p className="text-xl text-gray-300 text-center max-w-3xl mx-auto">
              DSOs now control 15% of dental practices and negotiate 15-40% lab fee discounts. 
              Without a strong digital presence, independent labs can't compete for the remaining 85% of practices.
            </p>
            <div className="text-xs text-gray-400 text-center mt-4">
              <span className="block">ADA Health Policy Institute, 2024 | Dental Economics, DSO Impact Study 2024</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="solution" className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2 
            className="text-4xl font-bold text-white text-center mb-6"
            {...fadeInUp}
            viewport={{ once: true }}
          >
            There's a Better Way to Grow Your Lab
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-300 text-center mb-16 max-w-3xl mx-auto"
            {...fadeInUp}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            We studied what separates thriving labs from struggling ones. The difference? 
            Strategic digital marketing that generates predictable case flow.
          </motion.p>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              {...fadeInLeft}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold text-white mb-8">
                What Digital Marketing Can Do for Dental Labs
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-amber-500 rounded-full p-2 mr-4 flex-shrink-0">
                    <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-2">250% More Visibility</h4>
                    <p className="text-gray-400">
                      DentalWorks Lab increased appointment requests by 250% with targeted Google Ads
                      <span className="text-xs block mt-1">Source: Cardinal Digital Marketing Case Study 2023</span>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-amber-500 rounded-full p-2 mr-4 flex-shrink-0">
                    <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-2">472% ROI in 56 Days</h4>
                    <p className="text-gray-400">
                      Viva Dental's direct mail + digital campaign generated massive returns
                      <span className="text-xs block mt-1">Source: 123 Postcards Case Study</span>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-amber-500 rounded-full p-2 mr-4 flex-shrink-0">
                    <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-2">28% Same-Day Conversions</h4>
                    <p className="text-gray-400">
                      Local search optimization drives immediate action from nearby dentists
                      <span className="text-xs block mt-1">Source: Google Healthcare Study 2024</span>
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-3xl p-10 border border-amber-500/20"
              {...fadeInUp}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h4 className="text-2xl font-bold text-white mb-6">
                The Digital Advantage Formula
              </h4>
              <div className="space-y-4">
                <div className="bg-black/30 rounded-xl p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Average Monthly Cases (Current)</span>
                    <span className="text-white font-bold">100</span>
                  </div>
                </div>
                <div className="bg-black/30 rounded-xl p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">With Digital Marketing (+30%)</span>
                    <span className="text-amber-500 font-bold">130</span>
                  </div>
                </div>
                <div className="bg-black/30 rounded-xl p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Additional Monthly Revenue</span>
                    <span className="text-green-500 font-bold">$15,000</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-400 mt-4 text-center">
                Based on $500 average case value
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2 
            className="text-4xl font-bold text-white text-center mb-6"
            {...fadeInUp}
            viewport={{ once: true }}
          >
            Complete Digital Marketing Arsenal for Dental Labs
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-300 text-center mb-16 max-w-3xl mx-auto"
            {...fadeInUp}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Eight proven services designed specifically for dental laboratories. 
            Available individually or in money-saving bundles.
          </motion.p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Service Cards */}
            {[
              {
                icon: (
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                ),
                title: "Meta Ads Management",
                description: "Reach 77% of dentists active on Facebook & Instagram with laser-targeted campaigns",
                pricing: { base: 770, standard: 980, premium: 1410 }
              },
              {
                icon: (
                  <svg className="w-8 h-8" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                ),
                title: "Google Ads Management",
                description: "Capture high-intent searches from dentists actively looking for lab services",
                pricing: { base: 770, standard: 980, premium: 1410 }
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"/>
                  </svg>
                ),
                title: "TikTok Ads Management",
                description: "Connect with younger dentists where 62% consume professional content",
                pricing: { base: 770, standard: 980, premium: 1410 }
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
                  </svg>
                ),
                title: "SEO Optimization",
                description: "Rank #1 when dentists search for \"dental lab near me\" and specialty services",
                pricing: { base: 790, standard: 1000, premium: 1450 }
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                ),
                title: "Google Business Profile",
                description: "Be 2.7x more likely to be considered reputable with optimized GBP",
                pricing: { base: 315, standard: 420, premium: 675 }
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>
                  </svg>
                ),
                title: "Backlink Building",
                description: "Build authority with high-quality dental industry backlinks",
                pricing: { base: 420, standard: 630, premium: 990 }
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                  </svg>
                ),
                title: "Content Creation",
                description: "Educational content that positions your lab as the industry expert",
                pricing: { base: 210, standard: 420, premium: 760 }
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                  </svg>
                ),
                title: "Social Media Management",
                description: "Stay top-of-mind with consistent, professional social presence",
                pricing: { base: 315, standard: 525, premium: 895 }
              }
            ].map((service, index) => (
              <motion.div 
                key={index}
                className="bg-black/50 backdrop-blur-sm rounded-2xl p-6 border border-amber-500/20 hover:border-amber-500/50 transition-all cursor-pointer"
                {...fadeInUp}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                onClick={() => {
                  setSelectedService(service.title);
                  setShowServiceModal(true);
                }}
              >
                <div className="text-amber-500 mb-4 text-4xl font-bold">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                <p className="text-gray-400 text-sm mb-4">
                  {service.description}
                </p>
                <div className="space-y-2 text-sm mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Base:</span>
                    <span className="text-white font-bold">${service.pricing.base}/mo</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Standard:</span>
                    <span className="text-white font-bold">${service.pricing.standard}/mo</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Premium:</span>
                    <span className="text-white font-bold">${service.pricing.premium}/mo</span>
                  </div>
                </div>
                <button className="w-full py-2 bg-amber-500/20 text-amber-500 rounded-lg hover:bg-amber-500/30 transition-colors text-sm font-semibold">
                  Learn More →
                </button>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="mt-12 text-center"
            {...fadeInUp}
            viewport={{ once: true }}
          >
            <p className="text-gray-400 mb-4">All prices shown are management fees only. Ad spend billed separately.</p>
            <motion.a 
              href="https://bundle.buzzwordstrategies.com" 
              className="inline-block bg-amber-500 text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-amber-400 transform hover:scale-105 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Build Your Custom Bundle & Save
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Add Section CTA after Solution Section */}
      <SectionCTA variant="primary" source="after-solution" />

      {/* Bundle Pricing Section with Pre-configured Bundles */}
      <section id="pricing" className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2 
            className="text-4xl font-bold text-white text-center mb-6"
            {...fadeInUp}
            viewport={{ once: true }}
          >
            Smart Labs Bundle & Save
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-300 text-center mb-16 max-w-3xl mx-auto"
            {...fadeInUp}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Our most successful labs use multiple services for compound growth. 
            Save up to 20% with strategic bundles.
          </motion.p>

          {/* Pre-configured Bundles with Enhanced Bundle Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <EnhancedBundleCard 
              bundle={{
                id: 'foundation',
                name: 'Foundation Bundle',
                description: 'Essential digital presence for growing labs',
                services: ['SEO', 'GBP Ranker', 'Content'],
                basePrice: 1420,
                popular: false
              }}
              index={0}
            />
            
            <EnhancedBundleCard 
              bundle={{
                id: 'growth',
                name: 'Growth Bundle',
                description: 'Accelerate your lab\'s market expansion',
                services: ['Google Ads', 'Meta Ads', 'SEO', 'Content', 'Social Posts'],
                basePrice: 3255,
                popular: true
              }}
              index={1}
            />
            
            <EnhancedBundleCard 
              bundle={{
                id: 'domination',
                name: 'Domination Bundle',
                description: 'Complete digital marketing dominance',
                services: ['Google Ads', 'Meta Ads', 'TikTok Ads', 'SEO', 'GBP Ranker', 'Backlinks', 'Content', 'Social Posts'],
                basePrice: 5620,
                popular: false
              }}
              index={2}
            />
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Foundation Bundle */}
            <motion.div 
              className="bg-gray-900 rounded-3xl p-8 border border-gray-800 relative"
              {...fadeInUp}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="text-2xl font-bold text-white mb-2">Foundation Bundle</h3>
              <p className="text-gray-400 mb-6">Perfect for labs just starting digital marketing</p>
              
              <div className="text-4xl font-bold text-white mb-2">$2,497<span className="text-lg font-normal text-gray-400">/mo</span></div>
              <p className="text-sm text-gray-500 mb-6">Save $423/month vs individual services</p>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 text-amber-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Google Ads Management (Standard)
                </li>
                <li className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 text-amber-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  SEO Optimization (Base)
                </li>
                <li className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 text-amber-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Content Creation (Standard)
                </li>
                <li className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 text-amber-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Social Media Management (Base)
                </li>
              </ul>
              
              <button className="w-full bg-gray-800 text-white py-3 rounded-full font-bold hover:bg-gray-700 transition-all">
                Start Foundation Bundle
              </button>
              
              <p className="text-xs text-gray-500 mt-4 text-center">
                Best for labs under $1M annual revenue
              </p>
            </motion.div>
            
            {/* Growth Bundle - Most Popular */}
            <motion.div 
              className="bg-gradient-to-br from-amber-900/20 to-orange-900/20 rounded-3xl p-8 border-2 border-amber-500 relative transform scale-105"
              {...fadeInUp}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-amber-500 text-black px-4 py-1 rounded-full text-sm font-bold">
                MOST POPULAR
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-2">Growth Accelerator</h3>
              <p className="text-gray-400 mb-6">For labs ready to dominate their market</p>
              
              <div className="text-4xl font-bold text-white mb-2">$4,997<span className="text-lg font-normal text-gray-400">/mo</span></div>
              <p className="text-sm text-gray-500 mb-6">Save $1,173/month vs individual services</p>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 text-amber-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Google Ads Management (Premium)
                </li>
                <li className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 text-amber-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Meta Ads Management (Standard)
                </li>
                <li className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 text-amber-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  SEO Optimization (Standard)
                </li>
                <li className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 text-amber-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  GBP Optimization (Standard)
                </li>
                <li className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 text-amber-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Backlink Building (Base)
                </li>
                <li className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 text-amber-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Content Creation (Premium)
                </li>
                <li className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 text-amber-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Social Media (Standard)
                </li>
              </ul>
              
              <button className="w-full bg-amber-500 text-black py-3 rounded-full font-bold hover:bg-amber-400 transition-all">
                Start Growth Bundle
              </button>
              
              <p className="text-xs text-gray-400 mt-4 text-center">
                Best for labs $1M-$5M annual revenue
              </p>
            </motion.div>
            
            {/* Dominator Bundle */}
            <motion.div 
              className="bg-gray-900 rounded-3xl p-8 border border-gray-800 relative"
              {...fadeInUp}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-2xl font-bold text-white mb-2">Market Dominator</h3>
              <p className="text-gray-400 mb-6">Maximum impact for ambitious labs</p>
              
              <div className="text-4xl font-bold text-white mb-2">$7,997<span className="text-lg font-normal text-gray-400">/mo</span></div>
              <p className="text-sm text-gray-500 mb-6">Save $2,278/month vs individual services</p>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 text-amber-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  All 8 Services (Premium Tier)
                </li>
                <li className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 text-amber-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Weekly Strategy Calls
                </li>
                <li className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 text-amber-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Priority Support
                </li>
                <li className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 text-amber-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Custom Reporting Dashboard
                </li>
                <li className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 text-amber-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Competitor Monitoring
                </li>
              </ul>
              
              <button className="w-full bg-gray-800 text-white py-3 rounded-full font-bold hover:bg-gray-700 transition-all">
                Start Dominator Bundle
              </button>
              
              <p className="text-xs text-gray-500 mt-4 text-center">
                Best for labs over $5M annual revenue
              </p>
            </motion.div>
          </div>
          
          <motion.div 
            className="mt-16 bg-gradient-to-r from-amber-900/10 to-orange-900/10 rounded-3xl p-12 border border-amber-500/20"
            {...fadeInUp}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-3xl font-bold text-white mb-6 text-center">
              Bundle Discount Logic
            </h3>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div>
                <h4 className="text-xl font-semibold text-amber-500 mb-4">Service Quantity Discounts</h4>
                <ul className="space-y-2 text-gray-300">
                  <li>2 services: 1% off total</li>
                  <li>3 services: 2.5% off total</li>
                  <li>4 services: 4% off total</li>
                  <li>5 services: 5.5% off total</li>
                  <li>6 services: 7% off total</li>
                  <li>7 services: 8.5% off total</li>
                  <li>8 services: 10% off total</li>
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-amber-500 mb-4">Commitment Length Discounts</h4>
                <ul className="space-y-2 text-gray-300">
                  <li>3 months: 0% additional discount</li>
                  <li>6 months: 2% additional discount</li>
                  <li>9 months: 3.5% additional discount</li>
                  <li>12 months: 5% additional discount</li>
                  <li>18 months: 8% additional discount</li>
                  <li>24 months: 10% additional discount</li>
                </ul>
              </div>
            </div>
            <p className="text-center text-gray-400 mt-8">
              Discounts stack! Bundle 8 services with 24-month commitment for 20% total savings.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Performance Guarantee Section */}
      <PerformanceGuarantee />

      {/* Add Section CTA after Pricing */}
      <SectionCTA variant="secondary" source="after-pricing" />

      {/* Free Resources Section */}
      <FreeResources />

      {/* Simple ROI Calculator */}
      <SimpleROICalculator />

      {/* Discovery Call CTA */}
      <div className="py-16 bg-gray-900">
        <div className="max-w-4xl mx-auto px-6">
          <DiscoveryCallCTA />
        </div>
      </div>

      {/* Social Proof Section */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2 
            className="text-4xl font-bold text-white text-center mb-6"
            {...fadeInUp}
            viewport={{ once: true }}
          >
            Proven Strategies That Work for Dental Businesses
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-300 text-center mb-16 max-w-3xl mx-auto"
            {...fadeInUp}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            While we're just launching our dental lab specialization, these documented results 
            show what strategic digital marketing can achieve in the dental industry.
          </motion.p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Case Study 1 */}
            <motion.div 
              className="bg-gray-900 rounded-2xl p-8 border border-gray-800"
              {...fadeInUp}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-amber-500 text-6xl font-bold mb-4">250%</div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Increase in Appointment Requests
              </h3>
              <p className="text-gray-400 mb-4">
                DentalWorks achieved massive growth through Google Ads restructuring with geo-fencing 
                and improved their cost-per-click by 19%.
              </p>
              <p className="text-sm text-gray-500">
                Source: Cardinal Digital Marketing Case Study, 2023
              </p>
            </motion.div>
            
            {/* Case Study 2 */}
            <motion.div 
              className="bg-gray-900 rounded-2xl p-8 border border-gray-800"
              {...fadeInUp}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-amber-500 text-6xl font-bold mb-4">472%</div>
              <h3 className="text-xl font-semibold text-white mb-2">
                ROI in First 56 Days
              </h3>
              <p className="text-gray-400 mb-4">
                Viva Dental's integrated direct mail and digital campaign generated exceptional returns 
                with a 53% close ratio from calls.
              </p>
              <p className="text-sm text-gray-500">
                Source: 123 Postcards Case Study
              </p>
            </motion.div>
            
            {/* Case Study 3 */}
            <motion.div 
              className="bg-gray-900 rounded-2xl p-8 border border-gray-800"
              {...fadeInUp}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <div className="text-amber-500 text-6xl font-bold mb-4">125%</div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Monthly Profit Increase
              </h3>
              <p className="text-gray-400 mb-4">
                UK dental practice achieved 1100% ROI through comprehensive digital strategy, 
                advancing from Bronze to Platinum Invisalign status.
              </p>
              <p className="text-sm text-gray-500">
                Source: The Creative Composite Case Study
              </p>
            </motion.div>
          </div>
          
          <motion.div 
            className="mt-16 text-center"
            {...fadeInUp}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-gray-400 mb-8">
              These results demonstrate the power of strategic digital marketing in the dental industry. 
              <br />
              As specialists in dental lab marketing, we apply these proven strategies specifically for labs.
            </p>
            
            {/* Results Disclaimer */}
            <div className="mt-8 mb-8 p-3 bg-gray-800/50 rounded-lg border border-gray-700 max-w-4xl mx-auto">
              <p className="text-xs text-gray-400 italic">
                * These results are not typical and represent best-case scenarios from specific client campaigns. 
                Individual results vary based on market conditions, competition, budget, implementation, and other factors. 
                Past performance does not guarantee future results. Buzzword Strategies makes no earnings claims or return on investment guarantees.
              </p>
            </div>
            
            <motion.button 
              onClick={() => scrollToSection('audit-form')}
              className="bg-amber-500 text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-amber-400 transform hover:scale-105 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Your Custom Lab Growth Strategy
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Lead Capture Section */}
      <section id="audit-form" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2 
            className="text-4xl font-bold text-white text-center mb-16"
            {...fadeInUp}
            viewport={{ once: true }}
          >
            Start Growing Your Lab Today
          </motion.h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              {...fadeInLeft}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold text-white mb-6">
                Get Your Free Digital Marketing Audit
              </h3>
              <p className="text-xl text-gray-300 mb-8">
                Discover exactly how your lab can attract more dentists and increase case volume 
                with our comprehensive digital audit.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-amber-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-300">Website performance analysis</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-amber-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-300">Competitor digital presence review</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-amber-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-300">Custom growth opportunity report</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-amber-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-300">30-minute strategy consultation</span>
                </div>
              </div>
              
              <div className="bg-black/50 rounded-2xl p-6 border border-amber-500/20">
                <p className="text-amber-500 font-semibold mb-2">Limited Time Offer</p>
                <p className="text-gray-300">
                  We're accepting only 10 dental labs for our launch program. 
                  Get founding member pricing and priority support.
                </p>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-black/50 backdrop-blur-sm rounded-3xl p-8 border border-amber-500/20"
              {...fadeInUp}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label className="block text-gray-300 mb-2">Lab Name *</label>
                  <input 
                    type="text" 
                    {...register('lab_name', { required: 'Lab name is required' })}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-amber-500 focus:outline-none"
                  />
                  {errors.lab_name && <p className="text-red-500 text-sm mt-1">{errors.lab_name.message}</p>}
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2">Your Name *</label>
                  <input 
                    type="text" 
                    {...register('contact_name', { required: 'Contact name is required' })}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-amber-500 focus:outline-none"
                  />
                  {errors.contact_name && <p className="text-red-500 text-sm mt-1">{errors.contact_name.message}</p>}
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2">Email *</label>
                  <input 
                    type="email" 
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-amber-500 focus:outline-none"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2">Phone</label>
                  <input 
                    type="tel" 
                    {...register('phone')}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-amber-500 focus:outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2">Monthly Case Volume</label>
                  <select 
                    {...register('case_volume')}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-amber-500 focus:outline-none"
                  >
                    <option value="">Select range</option>
                    <option value="0-25">0-25 cases</option>
                    <option value="26-50">26-50 cases</option>
                    <option value="51-100">51-100 cases</option>
                    <option value="101-200">101-200 cases</option>
                    <option value="200+">200+ cases</option>
                  </select>
                </div>
                
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-amber-500 text-black py-4 rounded-full font-bold text-lg hover:bg-amber-400 transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Get My Free Audit'}
                </button>
                
                {submitMessage && (
                  <p className={`text-center ${submitMessage.includes('Thank you') ? 'text-green-500' : 'text-red-500'}`}>
                    {submitMessage}
                  </p>
                )}
                
                <p className="text-xs text-gray-500 text-center">
                  By submitting, you agree to receive marketing communications. 
                  We respect your privacy and never share your information.
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-6">
          <motion.h2 
            className="text-4xl font-bold text-white text-center mb-16"
            {...fadeInUp}
            viewport={{ once: true }}
          >
            Common Questions from Dental Labs
          </motion.h2>
          
          <div className="space-y-6">
            {[
              {
                question: "How is this different from generic marketing agencies?",
                answer: "We specialize exclusively in dental lab marketing. We understand your unique challenges: competing with DSOs, educating dentists about quality, navigating price pressures, and the technical nature of your services. Generic agencies waste time and money learning your industry - we already speak your language."
              },
              {
                question: "How quickly will I see results?",
                answer: "Most labs see initial results within 30 days: increased website traffic, phone calls, and email inquiries. Substantial case volume increases typically occur within 60-90 days. SEO and content marketing build momentum over 3-6 months for long-term growth."
              },
              {
                question: "What's included in the management fees?",
                answer: "Our fees cover strategy development, campaign creation and management, optimization, reporting, and ongoing consultation. Ad spend is billed separately - you pay Google, Meta, etc. directly, maintaining full transparency and control over your budget."
              },
              {
                question: "Do I need a big advertising budget?",
                answer: "No! We recommend starting with $1,000-2,500/month in ad spend, but we've helped labs grow significantly with just $500/month through smart targeting. Our management ensures every dollar works harder than competitors spending 5x more."
              },
              {
                question: "What if I'm not tech-savvy?",
                answer: "Perfect - that's why we're here! We handle all technical aspects while keeping you informed with clear, jargon-free reports. You focus on making great dental products; we'll ensure dentists find you online."
              }
            ].map((faq, index) => (
              <motion.div 
                key={index}
                className="bg-gray-900 rounded-2xl p-6 border border-gray-800"
                {...fadeInUp}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <h3 className="text-xl font-semibold text-white mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-400">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="py-12 bg-gray-900 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <img 
                src="https://images.squarespace-cdn.com/content/v1/673fc8d414047c5c20a42e65/ab4663d3-4840-47f0-88cf-a5b1144ed31a/Remove+background+project+%281%29.png?format=1000w" 
                alt="Buzzword Strategies" 
                className="h-8 mb-4"
              />
              <p className="text-gray-400 text-sm">
                Digital marketing exclusively for dental laboratories. 
                Compete smarter, grow faster.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#services" className="hover:text-amber-500">Google Ads</a></li>
                <li><a href="#services" className="hover:text-amber-500">Meta Ads</a></li>
                <li><a href="#services" className="hover:text-amber-500">SEO</a></li>
                <li><a href="#services" className="hover:text-amber-500">All Services</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#audit-form" className="hover:text-amber-500">Free Audit</a></li>
                <li><a href="https://bundle.buzzwordstrategies.com" className="hover:text-amber-500">Bundle Builder</a></li>
                <li><a href="#faq" className="hover:text-amber-500">FAQs</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>1603 Capitol Ave</li>
                <li>Ste 415 #465784</li>
                <li>Cheyenne, WY 82001</li>
                <li className="pt-2">
                  <a href="mailto:hello@buzzwordstrategies.com" className="hover:text-amber-500">
                    hello@buzzwordstrategies.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8">
            <div className="text-center text-gray-400 text-sm">
              <p className="mb-4">
                © 2024 Buzzword Strategies LLC. All rights reserved.
              </p>
              
              <div className="bg-black/50 rounded-lg p-4 text-xs max-w-4xl mx-auto">
                <p className="mb-2">
                  <strong>MARKETING DISCLOSURE:</strong> This website contains marketing material. 
                  Results shown are from documented case studies in the dental industry. Individual 
                  results will vary based on market conditions, competition, and implementation.
                </p>
                <p>
                  <strong>EARNINGS DISCLAIMER:</strong> We make no earnings claims or guarantees. 
                  Your results depend on many factors including your market, competition, budget, 
                  and execution of recommended strategies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Bundle Button */}
      <AnimatePresence>
        {showBundleButton && (
          <motion.a 
            href="https://bundle.buzzwordstrategies.com"
            className="fixed bottom-8 right-8 bg-amber-500 text-black px-6 py-3 rounded-full font-bold shadow-2xl hover:bg-amber-400 transform hover:scale-110 transition-all z-50"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            whileHover={{ scale: 1.1 }}
            onClick={() => {
              if (window.gtag) {
                window.gtag('event', 'click', {
                  link_url: 'https://bundle.buzzwordstrategies.com',
                  link_text: 'Build Custom Bundle'
                });
              }
            }}
          >
            Build Custom Bundle →
          </motion.a>
        )}
      </AnimatePresence>

      {/* Floating CTA Component */}
      <FloatingCTA />

      {/* Modal Forms */}
      <SEOAuditForm 
        isOpen={showSEOAuditForm} 
        onClose={() => setShowSEOAuditForm(false)} 
      />
      <BlogPostForm 
        isOpen={showBlogPostForm} 
        onClose={() => setShowBlogPostForm(false)} 
      />
      <DiscoveryCallModal 
        isOpen={showDiscoveryModal} 
        onClose={() => setShowDiscoveryModal(false)} 
      />
      <ServiceModal 
        service={selectedService}
        isOpen={showServiceModal}
        onClose={() => setShowServiceModal(false)}
      />
    </div>
  );
};

export default DentalLabMarketingLanding;
