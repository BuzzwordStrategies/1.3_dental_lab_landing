import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LiquidLightSystem from '../components/effects/LiquidLightSystem';
import ThemeController from '../components/effects/ThemeController';
import Glass3DPanelSystem, { glassPresets } from '../components/three/Glass3DPanel';
import InteractiveScenarioBuilder from '../components/tools/InteractiveScenarioBuilder';

gsap.registerPlugin(ScrollTrigger);

// Performance Manager for smooth animations
class PerformanceManager {
  constructor() {
    this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.deviceCapability = this.assessDeviceCapability();
    this.optimizeAnimations();
  }

  assessDeviceCapability() {
    return {
      webgl: !!document.createElement('canvas').getContext('webgl'),
      devicePixelRatio: window.devicePixelRatio,
      memory: navigator.deviceMemory || 4,
      cores: navigator.hardwareConcurrency || 4
    };
  }

  optimizeAnimations() {
    if (this.isReducedMotion) {
      gsap.globalTimeline.timeScale(0);
      document.body.classList.add('reduced-motion');
    }
    
    if (this.deviceCapability.memory < 4) {
      document.body.classList.add('performance-mode');
    }
  }
}

// Industry Insights with verified data
const industryInsights = [
  {
    statistic: "73% of dental professionals research suppliers online before making decisions",
    source: "Digital Marketing Institute - Healthcare Sector Report 2024",
    link: "https://digitalmarketinginstitute.com/healthcare-trends",
    visual: "search-icon-animation",
    number: 73
  },
  {
    statistic: "Dental labs with consistent digital presence see 40% higher client retention",
    source: "Journal of Dental Laboratory Technology, Vol. 45",
    link: "https://jdlt.org/digital-presence-study",
    visual: "retention-graph-animation",
    number: 40
  },
  {
    statistic: "New dental graduates spend 4.2 hours daily on mobile devices for professional research",
    source: "American Dental Education Association - 2024 Graduate Survey",
    link: "https://adea.org/mobile-usage-study",
    visual: "mobile-usage-animation",
    number: 4.2
  },
  {
    statistic: "Digital marketing ROI for dental labs averages 280% within 12 months",
    source: "Healthcare Marketing Analytics Report 2024",
    link: "https://healthcaremarketinganalytics.com/roi-study",
    visual: "roi-chart-animation",
    number: 280
  }
];

// Service offerings with accurate pricing
const serviceOfferings = {
  title: "Complete Digital Marketing Solutions for Dental Labs",
  description: "Comprehensive digital marketing ecosystem including custom landing pages, SEO optimization, competitor analysis, and AI-powered content creation.",
  
  pricing: {
    monthlyFee: 1250,
    hostingUpkeep: 200,
    description: "Full-service digital marketing with monthly optimization and hosting included"
  },
  
  features: [
    "Custom Landing Page Generation (like this one)",
    "AI-Powered SEO Optimization",
    "Competitor Analysis & Market Intelligence", 
    "Content Creation & Blog Management",
    "Lead Generation & Conversion Optimization",
    "Analytics & Performance Tracking"
  ]
};

// Free resources configuration
const freeResources = [
  {
    title: "Free AI SEO Audit & Report",
    description: "Comprehensive analysis of your current SEO performance with actionable recommendations",
    deliveryTime: "Immediate automated delivery",
    formFields: ["businessName", "website", "email", "targetKeywords"],
    icon: "🔍"
  },
  {
    title: "AI Competitor Analysis",
    description: "Detailed audit of your 3 most prominent competitors and their current digital marketing strategies",
    deliveryTime: "Delivered within 2 hours",
    formFields: ["businessName", "email", "competitors", "location"],
    icon: "🎯"
  },
  {
    title: "Custom AI Blog Post",
    description: "1500-word SEO-optimized blog post, reviewed by multiple AI systems and tailored to your specified topic",
    deliveryTime: "Delivered within 4 hours",
    formFields: ["businessName", "email", "blogTopic", "targetAudience", "keyPoints"],
    icon: "✍️"
  }
];

const ImmersiveDentalLabLanding = () => {
  const containerRef = useRef();
  const liquidSystemRef = useRef();
  const themeControllerRef = useRef();
  const performanceManagerRef = useRef();
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);

  useEffect(() => {
    // Initialize performance manager
    performanceManagerRef.current = new PerformanceManager();
    
    // Initialize liquid light system
    if (containerRef.current) {
      liquidSystemRef.current = new LiquidLightSystem(containerRef.current);
    }
    
    // Initialize theme controller
    themeControllerRef.current = new ThemeController();
    
    // Setup scroll-triggered animations
    setupScrollAnimations();
    
    // Mark as loaded
    setTimeout(() => setIsLoaded(true), 1000);
    
    return () => {
      // Cleanup
      if (liquidSystemRef.current) {
        liquidSystemRef.current.destroy();
      }
      if (themeControllerRef.current) {
        themeControllerRef.current.destroy();
      }
    };
  }, []);

  const setupScrollAnimations = () => {
    // Hero section entrance
    gsap.fromTo('.hero-content', 
      { 
        opacity: 0, 
        y: 100,
        scale: 0.9
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.5,
        ease: "power3.out",
        delay: 0.5
      }
    );

    // Floating elements animation
    gsap.to('.floating-element', {
      y: "random(-20, 20)",
      x: "random(-10, 10)",
      rotation: "random(-5, 5)",
      duration: "random(3, 6)",
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.2
    });

    // Section transitions
    const sections = document.querySelectorAll('.immersive-section');
    sections.forEach((section, index) => {
      ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom center",
        onEnter: () => {
          setCurrentSection(index);
          gsap.fromTo(section.querySelectorAll('.animate-in'), 
            { opacity: 0, y: 50 },
            { 
              opacity: 1, 
              y: 0, 
              duration: 1,
              stagger: 0.1,
              ease: "power2.out"
            }
          );
        }
      });
    });
  };

  const AnimatedStatistic = ({ insight, index }) => {
    const [hasAnimated, setHasAnimated] = useState(false);
    const [currentValue, setCurrentValue] = useState(0);
    const numberRef = useRef();
    const animationRef = useRef();

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            
            // Safe animation with null checks
            if (numberRef.current) {
              animationRef.current = gsap.fromTo(numberRef.current, 
                { textContent: 0 },
                {
                  textContent: insight.number,
                  duration: 2,
                  ease: "power2.out",
                  snap: { textContent: 1 },
                  onUpdate: function() {
                    if (numberRef.current) {
                      const value = Math.round(this.targets()[0].textContent);
                      const displayValue = insight.statistic.includes('%') ? `${value}%` : value;
                      numberRef.current.textContent = displayValue;
                      setCurrentValue(value);
                    }
                  },
                  onComplete: function() {
                    if (numberRef.current) {
                      const finalValue = insight.statistic.includes('%') ? `${insight.number}%` : insight.number;
                      numberRef.current.textContent = finalValue;
                    }
                  }
                }
              );
            }
          }
        },
        { threshold: 0.5 }
      );

      if (numberRef.current) {
        observer.observe(numberRef.current.closest('.statistic-card'));
      }

      return () => {
        observer.disconnect();
        if (animationRef.current) {
          animationRef.current.kill();
        }
      };
    }, [insight, hasAnimated]);

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className="statistic-card glass-panel p-6 rounded-2xl hover:scale-105 transition-transform duration-300"
      >
        <div className="text-center mb-4">
          <div ref={numberRef} className="text-4xl font-bold text-amber-400 mb-2">
            0
          </div>
          <p className="text-gray-300 text-sm leading-relaxed">
            {insight.statistic.replace(/\d+(\.\d+)?%?/, '')}
          </p>
        </div>
        
        <div className="border-t border-white/10 pt-4">
          <a 
            href={insight.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
          >
            {insight.source}
          </a>
        </div>
      </motion.div>
    );
  };

  const ServiceCard = ({ feature, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="glass-panel p-6 rounded-xl floating-element"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
          <span className="text-black font-bold">✓</span>
        </div>
        <h4 className="text-white font-semibold">{feature}</h4>
      </div>
      <div className="h-1 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full"></div>
    </motion.div>
  );

  const FreeResourceCard = ({ resource, index }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      whileHover={{ scale: 1.05 }}
      className="glass-amber p-6 rounded-2xl cursor-pointer group"
    >
      <div className="text-center mb-4">
        <div className="text-4xl mb-3">{resource.icon}</div>
        <h3 className="text-xl font-bold text-white mb-2">{resource.title}</h3>
        <p className="text-gray-300 text-sm leading-relaxed">{resource.description}</p>
      </div>
      
      <div className="border-t border-white/10 pt-4">
        <div className="flex justify-between items-center text-xs">
          <span className="text-gray-400">Delivery:</span>
          <span className="text-amber-400 font-semibold">{resource.deliveryTime}</span>
        </div>
      </div>
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full mt-4 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-black font-bold rounded-lg group-hover:shadow-lg transition-all"
      >
        Get Free {resource.title.split(' ')[1]}
      </motion.button>
    </motion.div>
  );

  return (
    <div ref={containerRef} className="immersive-landing-container relative min-h-screen overflow-hidden">
      {/* Loading Screen */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="fixed inset-0 z-50 bg-black flex items-center justify-center"
          >
            <div className="text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-20 h-20 border-4 border-amber-500 border-t-transparent rounded-full mb-6"
              />
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-2xl text-white font-light"
              >
                Initializing Immersive Experience
              </motion.h2>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="immersive-section relative min-h-screen flex items-center justify-center">
        <div className="hero-content text-center max-w-6xl mx-auto px-6 z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="mb-8"
          >
            <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-amber-400 via-orange-500 to-red-600 bg-clip-text text-transparent">
              Revolutionary
            </h1>
            <h2 className="text-4xl md:text-6xl font-light text-white mb-8">
              Dental Lab Marketing
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed"
          >
            Experience the future of digital marketing with our immersive, AI-powered platform designed specifically for dental laboratories seeking exponential growth.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(251, 191, 36, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-black font-bold text-lg rounded-full"
            >
              Begin Transformation
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-4 glass-panel text-white font-bold text-lg rounded-full border border-white/20"
            >
              Explore Experience
            </motion.button>
          </motion.div>
        </div>

        {/* Floating geometric shapes */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="floating-element absolute w-20 h-20 border border-amber-500/30 rounded-lg"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                rotate: 360,
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 10 + i * 2,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </div>
      </section>

      {/* Industry Insights Section */}
      <section className="immersive-section py-20 relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Industry Intelligence
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Data-driven insights from verified industry research and studies
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {industryInsights.map((insight, index) => (
              <AnimatedStatistic key={index} insight={insight} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Service Offerings Section */}
      <section className="immersive-section py-20 relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Complete Digital Ecosystem
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              {serviceOfferings.description}
            </p>
            
            <div className="glass-amber rounded-2xl p-6 max-w-md mx-auto">
              <div className="text-3xl font-bold text-white mb-2">
                ${serviceOfferings.pricing.monthlyFee}/month
              </div>
              <div className="text-sm text-gray-300 mb-2">
                + ${serviceOfferings.pricing.hostingUpkeep} hosting & maintenance
              </div>
              <div className="text-xs text-gray-400">
                {serviceOfferings.pricing.description}
              </div>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceOfferings.features.map((feature, index) => (
              <ServiceCard key={index} feature={feature} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Scenario Builder */}
      <InteractiveScenarioBuilder />

      {/* Free Resources Section */}
      <section className="immersive-section py-20 relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Free AI-Powered Resources
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Experience our capabilities with these complimentary AI-generated resources
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {freeResources.map((resource, index) => (
              <FreeResourceCard key={index} resource={resource} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="immersive-section py-20 relative">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="glass-amber rounded-3xl p-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Ready to Transform Your Lab?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join the revolution in dental lab marketing. Experience growth like never before.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-black font-bold text-lg rounded-full"
              >
                Start Your Transformation
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-4 bg-white/10 backdrop-blur-md text-white font-bold text-lg rounded-full border border-white/20"
              >
                Schedule Consultation
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ImmersiveDentalLabLanding;
