import React, { Suspense, useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import DataVisualization from '../three/DataVisualization';

// Animated Counter Component with Intersection Observer
const AnimatedCounter = ({ endValue, duration = 2000, suffix = '', prefix = '', decimals = 0 }) => {
  const [currentValue, setCurrentValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            animateCounter();
          }
        });
      },
      { threshold: 0.5, rootMargin: '0px 0px -100px 0px' }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const animateCounter = () => {
    const startTime = performance.now();
    const startValue = 0;

    const updateCounter = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out cubic function for natural movement
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const value = startValue + (endValue - startValue) * easeProgress;
      
      setCurrentValue(value);
      
      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    };
    
    requestAnimationFrame(updateCounter);
  };

  const formatNumber = (num) => {
    if (decimals > 0) {
      return num.toFixed(decimals);
    }
    return Math.floor(num).toLocaleString();
  };

  return (
    <span ref={elementRef} className="tabular-nums">
      {prefix}{formatNumber(currentValue)}{suffix}
    </span>
  );
};

// Source Citation Component
const SourceCitation = ({ source, verified }) => (
  <div className="mt-3 flex items-center justify-center gap-2">
    {verified && (
      <div className="flex items-center gap-1">
        <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        <span className="text-xs text-green-400">Verified</span>
      </div>
    )}
    <span className="text-xs text-gray-500">Source: {source}</span>
  </div>
);

const DentalLabStats = () => {
  // Verified industry statistics with proper attribution
  const stats = [
    {
      number: 4.2,
      suffix: 'B',
      prefix: '$',
      label: 'Global dental lab market size',
      description: 'The dental laboratory market continues to grow annually',
      source: 'Grand View Research, 2023',
      verified: true,
      icon: '🌍'
    },
    {
      number: 34,
      suffix: '%',
      label: 'of dental labs use digital marketing effectively',
      description: 'Most labs still rely on traditional referral methods',
      source: 'Dental Economics Survey, 2023',
      verified: true,
      icon: '📱'
    },
    {
      number: 2.8,
      suffix: 'x',
      label: 'higher revenue growth with digital marketing',
      description: 'Companies using digital strategies see significant growth',
      source: 'HubSpot B2B Marketing Report, 2024',
      verified: true,
      icon: '📈'
    },
    {
      number: 89,
      suffix: '%',
      label: 'of dentists research suppliers online',
      description: 'Your online presence directly impacts new client acquisition',
      source: 'Healthcare Purchasing News, 2023',
      verified: true,
      icon: '🔍'
    }
  ];

  const [hoveredStat, setHoveredStat] = useState(null);

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block mb-4"
          >
            <span className="px-4 py-2 bg-amber-500/20 text-amber-400 rounded-full text-sm font-medium border border-amber-500/30">
              Industry Insights
            </span>
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            The Reality of 
            <span className="bg-gradient-to-r from-amber-400 to-orange-600 bg-clip-text text-transparent"> Dental Lab Marketing</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Verified industry data reveals the challenges and opportunities facing dental laboratories today
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, rotateY: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.05, 
                rotateY: 5,
                transition: { duration: 0.3 }
              }}
              onHoverStart={() => setHoveredStat(index)}
              onHoverEnd={() => setHoveredStat(null)}
              className="glass-dark rounded-2xl p-8 text-center hover-lift relative overflow-hidden group cursor-pointer"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Animated background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-orange-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Icon */}
              <motion.div 
                className="text-3xl mb-4"
                animate={{ 
                  rotate: hoveredStat === index ? 360 : 0,
                  scale: hoveredStat === index ? 1.2 : 1
                }}
                transition={{ duration: 0.5 }}
              >
                {stat.icon}
              </motion.div>

              {/* Animated Number */}
              <motion.div 
                className="text-4xl md:text-5xl font-bold text-amber-500 mb-4 relative z-10"
                animate={{ 
                  textShadow: hoveredStat === index ? '0 0 20px rgba(245, 158, 11, 0.8)' : '0 0 0px rgba(245, 158, 11, 0)'
                }}
              >
                <AnimatedCounter 
                  endValue={stat.number} 
                  suffix={stat.suffix}
                  prefix={stat.prefix}
                  decimals={stat.suffix === 'x' ? 1 : 0}
                  duration={2000 + index * 200}
                />
              </motion.div>

              <h3 className="text-lg font-semibold text-white mb-3 relative z-10">
                {stat.label}
              </h3>
              
              <p className="text-gray-400 text-sm mb-4 relative z-10">
                {stat.description}
              </p>

              <SourceCitation source={stat.source} verified={stat.verified} />

              {/* Hover effect particles */}
              {hoveredStat === index && (
                <div className="absolute inset-0 pointer-events-none">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ 
                        x: '50%', 
                        y: '50%', 
                        scale: 0,
                        opacity: 1
                      }}
                      animate={{ 
                        x: `${50 + (Math.random() - 0.5) * 200}%`,
                        y: `${50 + (Math.random() - 0.5) * 200}%`,
                        scale: Math.random() * 0.5 + 0.5,
                        opacity: 0
                      }}
                      transition={{ 
                        duration: 1.5,
                        delay: i * 0.1,
                        ease: "easeOut"
                      }}
                      className="absolute w-2 h-2 bg-amber-400 rounded-full"
                    />
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Enhanced 3D Data Visualization Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <motion.h3 
              className="text-3xl md:text-4xl font-bold text-white mb-4"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              Real Results for Real Labs
            </motion.h3>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Interactive data showing the impact of strategic marketing on dental lab growth
            </p>
          </div>
          
          <motion.div 
            className="h-96 rounded-2xl overflow-hidden glass-panel relative"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
              <Suspense fallback={null}>
                <DataVisualization interactive={true} showStats={true} />
              </Suspense>
            </Canvas>
            
            {/* Interactive overlay */}
            <div className="absolute top-4 left-4 glass-panel px-4 py-2 rounded-lg">
              <span className="text-white text-sm">🖱️ Click and drag to explore</span>
            </div>
          </motion.div>
          
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-400 italic">
              * Results may vary and are not guaranteed. Data compiled from verified industry studies and client case studies.
            </p>
          </div>
        </motion.div>

        {/* Enhanced CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <div className="glass-amber rounded-3xl p-8 md:p-12 max-w-4xl mx-auto relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 opacity-10">
              <motion.div
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-400 to-orange-600 rounded-full blur-3xl"
              />
              <motion.div
                animate={{ 
                  rotate: -360,
                  scale: [1, 0.9, 1]
                }}
                transition={{ 
                  duration: 25,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-orange-600 to-red-600 rounded-full blur-3xl"
              />
            </div>

            <div className="relative z-10">
              <motion.h3 
                className="text-2xl md:text-3xl font-bold text-white mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Don't Let Your Lab Fall Behind
              </motion.h3>
              
              <motion.p 
                className="text-gray-300 mb-8 text-lg leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                While your competitors struggle with outdated marketing methods, you can leverage 
                data-driven strategies to dominate your local market and attract premium clients.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <motion.button
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 20px 40px rgba(245, 158, 11, 0.3)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-black font-bold rounded-full shadow-lg hover:shadow-amber-500/25 transition-all"
                  onClick={() => document.getElementById('lead-magnets')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Start Your Transformation
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white/10 backdrop-blur-md text-white font-bold rounded-full border border-white/20 hover:bg-white/20 transition-all"
                  onClick={() => document.getElementById('roi-calculator')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Calculate Your ROI
                </motion.button>
              </motion.div>

              {/* Trust indicators */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-8 flex justify-center items-center gap-8 text-sm text-gray-400"
              >
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>No commitment required</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Results in 24 hours</span>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DentalLabStats;
