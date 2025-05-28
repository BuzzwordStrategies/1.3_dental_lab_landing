import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Achievement Badge Component
const AchievementBadge = ({ title, description, unlocked, icon }) => (
  <motion.div
    initial={{ scale: 0, rotate: -180 }}
    animate={{ 
      scale: unlocked ? 1 : 0.7, 
      rotate: 0,
      opacity: unlocked ? 1 : 0.5 
    }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
    className={`p-4 rounded-xl border-2 ${
      unlocked 
        ? 'bg-gradient-to-br from-amber-500/20 to-orange-600/20 border-amber-500' 
        : 'bg-gray-800/50 border-gray-600'
    }`}
  >
    <div className="text-2xl mb-2">{icon}</div>
    <h4 className={`font-bold ${unlocked ? 'text-amber-400' : 'text-gray-400'}`}>
      {title}
    </h4>
    <p className={`text-sm ${unlocked ? 'text-white' : 'text-gray-500'}`}>
      {description}
    </p>
  </motion.div>
);

// Progress Bar Component
const ProgressBar = ({ value, max, label, color = "amber" }) => {
  const percentage = Math.min(100, (value / max) * 100);
  
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-2">
        <span className="text-white font-medium">{label}</span>
        <span className="text-gray-300">{value.toLocaleString()}</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`h-full bg-gradient-to-r ${
            color === 'amber' 
              ? 'from-amber-500 to-orange-600' 
              : color === 'green'
              ? 'from-green-500 to-emerald-600'
              : 'from-blue-500 to-cyan-600'
          } relative`}
        >
          <div className="absolute inset-0 bg-white/20 animate-pulse" />
        </motion.div>
      </div>
    </div>
  );
};

// Animated Chart Component
const AnimatedChart = ({ roi, investment, revenue }) => {
  const maxHeight = 200;
  const investmentHeight = Math.max(20, (investment / 10000) * maxHeight);
  const revenueHeight = Math.max(20, (revenue / 10000) * maxHeight);
  
  return (
    <div className="flex items-end justify-center gap-8 h-64 p-6">
      {/* Investment Bar */}
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: investmentHeight }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="w-16 bg-gradient-to-t from-red-600 to-red-400 rounded-t-lg relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/20 animate-pulse" />
        </motion.div>
        <span className="text-red-400 font-bold mt-2">Investment</span>
        <span className="text-white text-sm">${investment.toLocaleString()}</span>
      </div>
      
      {/* Revenue Bar */}
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: revenueHeight }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          className="w-16 bg-gradient-to-t from-green-600 to-green-400 rounded-t-lg relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/20 animate-pulse" />
        </motion.div>
        <span className="text-green-400 font-bold mt-2">Revenue</span>
        <span className="text-white text-sm">${revenue.toLocaleString()}</span>
      </div>
      
      {/* ROI Indicator */}
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center"
        >
          <span className="text-black font-bold text-lg">{roi.toFixed(0)}%</span>
        </motion.div>
        <span className="text-amber-400 font-bold mt-2">ROI</span>
      </div>
    </div>
  );
};

const ROICalculator = () => {
  const [inputs, setInputs] = useState({
    monthlyBudget: 2000,
    conversionRate: 3,
    averageOrderValue: 800,
    customerLifetimeValue: 5000,
    currentMonthlyRevenue: 15000
  });

  const [results, setResults] = useState({
    monthlyLeads: 0,
    monthlyRevenue: 0,
    yearlyRevenue: 0,
    roi: 0,
    paybackPeriod: 0
  });

  const [level, setLevel] = useState(1);
  const [experience, setExperience] = useState(0);
  const [achievements, setAchievements] = useState({
    firstCalculation: false,
    highROI: false,
    budgetOptimizer: false,
    revenueGrowth: false,
    masterCalculator: false
  });

  const [showConfetti, setShowConfetti] = useState(false);
  const [showChart, setShowChart] = useState(false);

  // Calculate ROI whenever inputs change
  useEffect(() => {
    const monthlyLeads = (inputs.monthlyBudget / 100) * (inputs.conversionRate / 100) * 100;
    const monthlyNewRevenue = monthlyLeads * inputs.averageOrderValue;
    const yearlyRevenue = monthlyNewRevenue * 12;
    const yearlyInvestment = inputs.monthlyBudget * 12;
    const roi = yearlyInvestment > 0 ? ((yearlyRevenue - yearlyInvestment) / yearlyInvestment) * 100 : 0;
    const paybackPeriod = monthlyNewRevenue > 0 ? inputs.monthlyBudget / monthlyNewRevenue : 0;

    setResults({
      monthlyLeads: Math.round(monthlyLeads),
      monthlyRevenue: Math.round(monthlyNewRevenue),
      yearlyRevenue: Math.round(yearlyRevenue),
      roi: roi,
      paybackPeriod: paybackPeriod
    });

    // Add experience points
    setExperience(prev => prev + 10);

    // Check achievements
    checkAchievements(roi, monthlyNewRevenue);
  }, [inputs]);

  // Level up system
  useEffect(() => {
    const newLevel = Math.floor(experience / 1000) + 1;
    if (newLevel > level) {
      setLevel(newLevel);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  }, [experience, level]);

  const checkAchievements = (roi, revenue) => {
    const newAchievements = { ...achievements };
    
    if (!achievements.firstCalculation) {
      newAchievements.firstCalculation = true;
    }
    
    if (roi > 200 && !achievements.highROI) {
      newAchievements.highROI = true;
      setExperience(prev => prev + 500);
    }
    
    if (inputs.monthlyBudget > 5000 && !achievements.budgetOptimizer) {
      newAchievements.budgetOptimizer = true;
      setExperience(prev => prev + 300);
    }
    
    if (revenue > 10000 && !achievements.revenueGrowth) {
      newAchievements.revenueGrowth = true;
      setExperience(prev => prev + 400);
    }
    
    if (Object.values(newAchievements).filter(Boolean).length >= 4 && !achievements.masterCalculator) {
      newAchievements.masterCalculator = true;
      setExperience(prev => prev + 1000);
    }
    
    setAchievements(newAchievements);
  };

  const handleInputChange = (field, value) => {
    setInputs(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0
    }));
  };

  const getROIColor = (roi) => {
    if (roi < 100) return 'text-red-400';
    if (roi < 200) return 'text-yellow-400';
    if (roi < 300) return 'text-green-400';
    return 'text-emerald-400';
  };

  const getROIMessage = (roi) => {
    if (roi < 100) return "Let's optimize your strategy! 🎯";
    if (roi < 200) return "Good returns! Keep growing! 📈";
    if (roi < 300) return "Excellent ROI! You're crushing it! 🚀";
    return "Phenomenal returns! You're a marketing master! 👑";
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
      {/* Confetti Effect */}
      <AnimatePresence>
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-50">
            {Array.from({ length: 50 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
                  y: -10,
                  rotate: 0,
                  scale: 0
                }}
                animate={{ 
                  y: (typeof window !== 'undefined' ? window.innerHeight : 800) + 10,
                  rotate: 360,
                  scale: 1
                }}
                exit={{ opacity: 0 }}
                transition={{ 
                  duration: 3,
                  delay: Math.random() * 2,
                  ease: "easeOut"
                }}
                className="absolute w-3 h-3 bg-gradient-to-r from-amber-400 to-orange-600 rounded-full"
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-6">
        {/* Header with Level System */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center items-center gap-4 mb-6">
            <div className="glass-panel px-6 py-3 rounded-full">
              <span className="text-amber-400 font-bold">Level {level}</span>
            </div>
            <div className="flex-1 max-w-xs bg-gray-700 rounded-full h-3 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(experience % 1000) / 10}%` }}
                className="h-full bg-gradient-to-r from-amber-500 to-orange-600"
              />
            </div>
            <div className="glass-panel px-4 py-2 rounded-full">
              <span className="text-white text-sm">{experience} XP</span>
            </div>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-amber-400 to-orange-600 bg-clip-text text-transparent">
            ROI Calculator Game
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Calculate your marketing ROI and unlock achievements! Level up your dental lab's growth strategy.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Input Controls */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="glass-panel p-6 rounded-2xl">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <span>🎮</span> Input Parameters
              </h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-300 mb-2">Monthly Marketing Budget</label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-400">$</span>
                    <input
                      type="number"
                      value={inputs.monthlyBudget}
                      onChange={(e) => handleInputChange('monthlyBudget', e.target.value)}
                      className="w-full pl-8 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-amber-500 transition-colors"
                    />
                  </div>
                  <div className="mt-2">
                    <input
                      type="range"
                      min="500"
                      max="10000"
                      step="100"
                      value={inputs.monthlyBudget}
                      onChange={(e) => handleInputChange('monthlyBudget', e.target.value)}
                      className="w-full accent-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Conversion Rate (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={inputs.conversionRate}
                    onChange={(e) => handleInputChange('conversionRate', e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-amber-500 transition-colors"
                  />
                  <div className="mt-2">
                    <input
                      type="range"
                      min="0.5"
                      max="10"
                      step="0.1"
                      value={inputs.conversionRate}
                      onChange={(e) => handleInputChange('conversionRate', e.target.value)}
                      className="w-full accent-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Average Order Value</label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-400">$</span>
                    <input
                      type="number"
                      value={inputs.averageOrderValue}
                      onChange={(e) => handleInputChange('averageOrderValue', e.target.value)}
                      className="w-full pl-8 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-amber-500 transition-colors"
                    />
                  </div>
                  <div className="mt-2">
                    <input
                      type="range"
                      min="200"
                      max="2000"
                      step="50"
                      value={inputs.averageOrderValue}
                      onChange={(e) => handleInputChange('averageOrderValue', e.target.value)}
                      className="w-full accent-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Customer Lifetime Value</label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-400">$</span>
                    <input
                      type="number"
                      value={inputs.customerLifetimeValue}
                      onChange={(e) => handleInputChange('customerLifetimeValue', e.target.value)}
                      className="w-full pl-8 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-amber-500 transition-colors"
                    />
                  </div>
                  <div className="mt-2">
                    <input
                      type="range"
                      min="1000"
                      max="20000"
                      step="500"
                      value={inputs.customerLifetimeValue}
                      onChange={(e) => handleInputChange('customerLifetimeValue', e.target.value)}
                      className="w-full accent-amber-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="glass-panel p-6 rounded-2xl">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span>🏆</span> Achievements
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <AchievementBadge
                  title="First Steps"
                  description="Made your first calculation"
                  unlocked={achievements.firstCalculation}
                  icon="🎯"
                />
                <AchievementBadge
                  title="High Roller"
                  description="Achieved 200%+ ROI"
                  unlocked={achievements.highROI}
                  icon="💎"
                />
                <AchievementBadge
                  title="Big Spender"
                  description="Budget over $5,000"
                  unlocked={achievements.budgetOptimizer}
                  icon="💰"
                />
                <AchievementBadge
                  title="Revenue King"
                  description="$10K+ monthly revenue"
                  unlocked={achievements.revenueGrowth}
                  icon="👑"
                />
              </div>
            </div>
          </motion.div>

          {/* Results Display */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="glass-panel p-6 rounded-2xl">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <span>📊</span> Results Dashboard
              </h3>

              <div className="space-y-6">
                {/* ROI Display */}
                <div className="text-center p-6 bg-gradient-to-br from-amber-500/20 to-orange-600/20 rounded-xl border border-amber-500/30">
                  <motion.div
                    key={results.roi}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className={`text-6xl font-bold mb-2 ${getROIColor(results.roi)}`}
                  >
                    {results.roi.toFixed(0)}%
                  </motion.div>
                  <p className="text-white font-medium">Return on Investment</p>
                  <p className="text-gray-300 text-sm mt-2">{getROIMessage(results.roi)}</p>
                </div>

                {/* Progress Bars */}
                <ProgressBar
                  value={results.monthlyLeads}
                  max={100}
                  label="Monthly Leads"
                  color="blue"
                />
                
                <ProgressBar
                  value={results.monthlyRevenue}
                  max={50000}
                  label="Monthly Revenue"
                  color="green"
                />
                
                <ProgressBar
                  value={results.yearlyRevenue}
                  max={600000}
                  label="Yearly Revenue"
                  color="amber"
                />

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-blue-400">
                      {results.monthlyLeads}
                    </div>
                    <div className="text-gray-300 text-sm">Monthly Leads</div>
                  </div>
                  
                  <div className="bg-white/5 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-green-400">
                      {results.paybackPeriod.toFixed(1)}
                    </div>
                    <div className="text-gray-300 text-sm">Payback (months)</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Chart Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowChart(!showChart)}
              className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold rounded-lg"
            >
              {showChart ? '📊 Hide Chart' : '📈 Show Chart'}
            </motion.button>
          </motion.div>

          {/* Chart Visualization */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <AnimatePresence mode="wait">
              {showChart ? (
                <motion.div
                  key="chart"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="glass-panel p-6 rounded-2xl h-96"
                >
                  <h3 className="text-xl font-bold text-white mb-4 text-center">
                    📈 Visual Breakdown
                  </h3>
                  <AnimatedChart 
                    roi={results.roi} 
                    investment={inputs.monthlyBudget}
                    revenue={results.monthlyRevenue}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="summary"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="glass-panel p-6 rounded-2xl h-96 flex flex-col justify-center"
                >
                  <h3 className="text-xl font-bold text-white mb-6 text-center">
                    📈 Growth Projection
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-white/5 rounded-lg">
                      <span className="text-gray-300">Monthly Investment</span>
                      <span className="text-red-400 font-bold">
                        ${inputs.monthlyBudget.toLocaleString()}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center p-4 bg-white/5 rounded-lg">
                      <span className="text-gray-300">Monthly Return</span>
                      <span className="text-green-400 font-bold">
                        ${results.monthlyRevenue.toLocaleString()}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center p-4 bg-white/5 rounded-lg">
                      <span className="text-gray-300">Yearly Profit</span>
                      <span className="text-amber-400 font-bold">
                        ${(results.yearlyRevenue - (inputs.monthlyBudget * 12)).toLocaleString()}
                      </span>
                    </div>
                    
                    <div className="text-center p-4 bg-gradient-to-r from-amber-500/20 to-orange-600/20 rounded-lg border border-amber-500/30">
                      <div className="text-3xl font-bold text-amber-400">
                        {((results.monthlyRevenue / inputs.monthlyBudget) || 0).toFixed(1)}x
                      </div>
                      <div className="text-gray-300 text-sm">Revenue Multiplier</div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mt-12"
        >
          <div className="glass-panel p-8 rounded-2xl max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Achieve These Results? 🚀
            </h3>
            <p className="text-gray-300 mb-6">
              Get a custom marketing strategy designed to maximize your ROI and grow your dental lab.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-black font-bold rounded-full"
              onClick={() => document.getElementById('lead-magnets')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Start Your Growth Journey
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ROICalculator;
