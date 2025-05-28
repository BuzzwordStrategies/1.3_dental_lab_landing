import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Achievement System
const achievements = {
  firstScenario: {
    title: 'Strategic Thinker',
    description: 'Created your first growth scenario',
    icon: '🎯',
    points: 100
  },
  highGrowth: {
    title: 'Growth Hacker',
    description: 'Projected 3x revenue growth',
    icon: '🚀',
    points: 500
  },
  multiChannel: {
    title: 'Marketing Master',
    description: 'Combined 4+ marketing channels',
    icon: '🏆',
    points: 300
  },
  budgetOptimizer: {
    title: 'Budget Optimizer',
    description: 'Created cost-effective strategy',
    icon: '💰',
    points: 200
  }
};

// Service configurations with realistic impact data
const availableServices = [
  {
    id: 'google-ads',
    name: 'Google Ads',
    category: 'Paid Advertising',
    icon: '🎯',
    description: 'Targeted search advertising for dental labs',
    pricing: {
      Base: 1500,
      Standard: 2500,
      Premium: 4000
    },
    impact: {
      Base: { leadIncrease: 1.3, conversionRate: 0.02, timeToResults: 2 },
      Standard: { leadIncrease: 1.8, conversionRate: 0.035, timeToResults: 1 },
      Premium: { leadIncrease: 2.5, conversionRate: 0.05, timeToResults: 1 }
    },
    color: '#4285F4'
  },
  {
    id: 'seo',
    name: 'SEO Optimization',
    category: 'Organic Growth',
    icon: '🔍',
    description: 'Long-term organic search visibility',
    pricing: {
      Base: 800,
      Standard: 1500,
      Premium: 2500
    },
    impact: {
      Base: { leadIncrease: 1.2, conversionRate: 0.04, timeToResults: 6 },
      Standard: { leadIncrease: 1.6, conversionRate: 0.06, timeToResults: 4 },
      Premium: { leadIncrease: 2.2, conversionRate: 0.08, timeToResults: 3 }
    },
    color: '#34A853'
  },
  {
    id: 'social-media',
    name: 'Social Media Marketing',
    category: 'Brand Building',
    icon: '📱',
    description: 'Professional social presence and engagement',
    pricing: {
      Base: 600,
      Standard: 1200,
      Premium: 2000
    },
    impact: {
      Base: { leadIncrease: 1.15, conversionRate: 0.025, timeToResults: 3 },
      Standard: { leadIncrease: 1.4, conversionRate: 0.04, timeToResults: 2 },
      Premium: { leadIncrease: 1.8, conversionRate: 0.055, timeToResults: 2 }
    },
    color: '#E4405F'
  },
  {
    id: 'content-marketing',
    name: 'Content Marketing',
    category: 'Authority Building',
    icon: '✍️',
    description: 'Educational content and thought leadership',
    pricing: {
      Base: 500,
      Standard: 1000,
      Premium: 1800
    },
    impact: {
      Base: { leadIncrease: 1.1, conversionRate: 0.05, timeToResults: 4 },
      Standard: { leadIncrease: 1.3, conversionRate: 0.07, timeToResults: 3 },
      Premium: { leadIncrease: 1.6, conversionRate: 0.09, timeToResults: 2 }
    },
    color: '#FF6B35'
  },
  {
    id: 'email-marketing',
    name: 'Email Marketing',
    category: 'Nurturing',
    icon: '📧',
    description: 'Automated nurture sequences and newsletters',
    pricing: {
      Base: 300,
      Standard: 600,
      Premium: 1000
    },
    impact: {
      Base: { leadIncrease: 1.05, conversionRate: 0.08, timeToResults: 1 },
      Standard: { leadIncrease: 1.15, conversionRate: 0.12, timeToResults: 1 },
      Premium: { leadIncrease: 1.25, conversionRate: 0.15, timeToResults: 1 }
    },
    color: '#9C27B0'
  },
  {
    id: 'website-optimization',
    name: 'Website Optimization',
    category: 'Conversion',
    icon: '🌐',
    description: 'CRO and user experience improvements',
    pricing: {
      Base: 1000,
      Standard: 2000,
      Premium: 3500
    },
    impact: {
      Base: { leadIncrease: 1.1, conversionRate: 0.15, timeToResults: 2 },
      Standard: { leadIncrease: 1.2, conversionRate: 0.25, timeToResults: 1 },
      Premium: { leadIncrease: 1.3, conversionRate: 0.35, timeToResults: 1 }
    },
    color: '#FF9800'
  }
];

// Achievement notification component
const AchievementNotification = ({ achievement, onClose }) => (
  <motion.div
    initial={{ x: 300, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    exit={{ x: 300, opacity: 0 }}
    className="fixed top-4 right-4 z-50 bg-gradient-to-r from-amber-500 to-orange-600 text-black p-4 rounded-xl shadow-2xl max-w-sm"
  >
    <div className="flex items-center gap-3">
      <span className="text-2xl">{achievement.icon}</span>
      <div>
        <h4 className="font-bold">{achievement.title}</h4>
        <p className="text-sm opacity-90">{achievement.description}</p>
        <p className="text-xs font-bold">+{achievement.points} XP</p>
      </div>
      <button onClick={onClose} className="ml-auto text-black/70 hover:text-black">
        ✕
      </button>
    </div>
  </motion.div>
);

// Service card component
const ServiceCard = ({ service, onAdd }) => (
  <motion.div
    whileHover={{ scale: 1.02, y: -5 }}
    whileTap={{ scale: 0.98 }}
    className="glass-panel p-4 rounded-xl cursor-pointer transition-all hover:shadow-lg"
    style={{ borderLeft: `4px solid ${service.color}` }}
    onClick={() => onAdd(service.id)}
  >
    <div className="flex items-center gap-3 mb-2">
      <span className="text-2xl">{service.icon}</span>
      <div>
        <h4 className="text-white font-bold text-sm">{service.name}</h4>
        <p className="text-gray-400 text-xs">{service.category}</p>
      </div>
    </div>
    <p className="text-gray-300 text-xs mb-3">{service.description}</p>
    <div className="flex justify-between text-xs">
      <span className="text-gray-400">From</span>
      <span className="text-amber-400 font-bold">${service.pricing.Base}/mo</span>
    </div>
    <div className="mt-2 text-center">
      <span className="text-xs text-amber-400 hover:text-amber-300">Click to add →</span>
    </div>
  </motion.div>
);

// Scenario service component
const ScenarioService = ({ service, tier, onTierChange, onRemove }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    className="glass-amber p-4 rounded-xl transition-all"
    style={{ borderLeft: `4px solid ${service.color}` }}
  >
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-2">
        <span className="text-xl">{service.icon}</span>
        <span className="text-white font-bold text-sm">{service.name}</span>
      </div>
      <button
        onClick={() => onRemove(service.id)}
        className="text-red-400 hover:text-red-300 text-sm transition-colors"
      >
        ✕
      </button>
    </div>
    
    <div className="space-y-2">
      <div className="flex gap-1">
        {['Base', 'Standard', 'Premium'].map((tierOption) => (
          <button
            key={tierOption}
            onClick={() => onTierChange(service.id, tierOption)}
            className={`px-2 py-1 text-xs rounded transition-colors ${
              tier === tierOption
                ? 'bg-amber-500 text-black'
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            {tierOption}
          </button>
        ))}
      </div>
      
      <div className="flex justify-between text-xs">
        <span className="text-gray-300">Monthly Cost:</span>
        <span className="text-amber-400 font-bold">${service.pricing[tier]}</span>
      </div>
      
      <div className="flex justify-between text-xs">
        <span className="text-gray-300">Lead Increase:</span>
        <span className="text-green-400">+{((service.impact[tier].leadIncrease - 1) * 100).toFixed(0)}%</span>
      </div>
    </div>
  </motion.div>
);

const InteractiveScenarioBuilder = () => {
  const [currentData, setCurrentData] = useState({
    monthlyRevenue: 25000,
    activeDentistClients: 15,
    averageOrderValue: 1200,
    monthlyLeads: 8,
    conversionRate: 3.5
  });

  const [selectedServices, setSelectedServices] = useState(new Map());
  const [projections, setProjections] = useState(null);
  const [userAchievements, setUserAchievements] = useState(new Set());
  const [experience, setExperience] = useState(0);
  const [level, setLevel] = useState(1);
  const [showAchievement, setShowAchievement] = useState(null);
  const [scenarioName, setScenarioName] = useState('');

  // Calculate projections whenever services change
  useEffect(() => {
    calculateProjections();
    checkAchievements();
  }, [selectedServices, currentData]);

  // Level up system
  useEffect(() => {
    const newLevel = Math.floor(experience / 1000) + 1;
    if (newLevel > level) {
      setLevel(newLevel);
    }
  }, [experience, level]);

  const calculateProjections = () => {
    if (selectedServices.size === 0) {
      setProjections(null);
      return;
    }

    let totalCost = 0;
    let cumulativeLeadIncrease = 1;
    let cumulativeConversionIncrease = 1;
    let averageTimeToResults = 0;

    selectedServices.forEach((tier, serviceId) => {
      const service = availableServices.find(s => s.id === serviceId);
      if (service) {
        totalCost += service.pricing[tier];
        cumulativeLeadIncrease *= service.impact[tier].leadIncrease;
        cumulativeConversionIncrease *= (1 + service.impact[tier].conversionRate);
        averageTimeToResults += service.impact[tier].timeToResults;
      }
    });

    averageTimeToResults = averageTimeToResults / selectedServices.size;

    const projectedLeads = Math.round(currentData.monthlyLeads * cumulativeLeadIncrease);
    const projectedConversionRate = Math.min(15, currentData.conversionRate * cumulativeConversionIncrease);
    const projectedConversions = Math.round(projectedLeads * (projectedConversionRate / 100));
    const projectedRevenue = projectedConversions * currentData.averageOrderValue;
    const monthlyROI = totalCost > 0 ? ((projectedRevenue - currentData.monthlyRevenue - totalCost) / totalCost) * 100 : 0;
    const yearlyROI = totalCost > 0 ? (((projectedRevenue - currentData.monthlyRevenue) * 12 - totalCost * 12) / (totalCost * 12)) * 100 : 0;

    setProjections({
      totalCost,
      projectedLeads,
      projectedConversionRate,
      projectedConversions,
      projectedRevenue,
      monthlyROI,
      yearlyROI,
      averageTimeToResults,
      revenueIncrease: projectedRevenue - currentData.monthlyRevenue,
      leadIncrease: projectedLeads - currentData.monthlyLeads
    });
  };

  const checkAchievements = () => {
    const newAchievements = new Set(userAchievements);
    let newExperience = experience;

    // First scenario achievement
    if (selectedServices.size > 0 && !userAchievements.has('firstScenario')) {
      newAchievements.add('firstScenario');
      newExperience += achievements.firstScenario.points;
      setShowAchievement(achievements.firstScenario);
    }

    // High growth achievement
    if (projections && projections.yearlyROI >= 300 && !userAchievements.has('highGrowth')) {
      newAchievements.add('highGrowth');
      newExperience += achievements.highGrowth.points;
      setShowAchievement(achievements.highGrowth);
    }

    // Multi-channel achievement
    if (selectedServices.size >= 4 && !userAchievements.has('multiChannel')) {
      newAchievements.add('multiChannel');
      newExperience += achievements.multiChannel.points;
      setShowAchievement(achievements.multiChannel);
    }

    // Budget optimizer achievement
    if (projections && projections.totalCost <= 3000 && projections.yearlyROI >= 200 && !userAchievements.has('budgetOptimizer')) {
      newAchievements.add('budgetOptimizer');
      newExperience += achievements.budgetOptimizer.points;
      setShowAchievement(achievements.budgetOptimizer);
    }

    setUserAchievements(newAchievements);
    setExperience(newExperience);
  };

  const handleAddService = (serviceId) => {
    const newServices = new Map(selectedServices);
    newServices.set(serviceId, 'Standard');
    setSelectedServices(newServices);
  };

  const handleTierChange = (serviceId, tier) => {
    const newServices = new Map(selectedServices);
    newServices.set(serviceId, tier);
    setSelectedServices(newServices);
  };

  const handleRemoveService = (serviceId) => {
    const newServices = new Map(selectedServices);
    newServices.delete(serviceId);
    setSelectedServices(newServices);
  };

  return (
    <section id="scenario-builder" className="py-20 bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Achievement Notification */}
        <AnimatePresence>
          {showAchievement && (
            <AchievementNotification
              achievement={showAchievement}
              onClose={() => setShowAchievement(null)}
            />
          )}
        </AnimatePresence>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
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
            Interactive Growth Scenario Builder
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Build your custom growth strategy by selecting marketing services and see real-time projections
          </p>
        </motion.div>

        {/* Current State Input */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass-panel p-6 rounded-2xl mb-8"
        >
          <h3 className="text-xl font-bold text-white mb-4">Your Current Lab Metrics</h3>
          <div className="grid md:grid-cols-5 gap-4">
            <div>
              <label className="block text-gray-300 text-sm mb-2">Monthly Revenue</label>
              <input
                type="number"
                value={currentData.monthlyRevenue}
                onChange={(e) => setCurrentData({...currentData, monthlyRevenue: parseInt(e.target.value) || 0})}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm"
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm mb-2">Active Clients</label>
              <input
                type="number"
                value={currentData.activeDentistClients}
                onChange={(e) => setCurrentData({...currentData, activeDentistClients: parseInt(e.target.value) || 0})}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm"
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm mb-2">Avg Order Value</label>
              <input
                type="number"
                value={currentData.averageOrderValue}
                onChange={(e) => setCurrentData({...currentData, averageOrderValue: parseInt(e.target.value) || 0})}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm"
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm mb-2">Monthly Leads</label>
              <input
                type="number"
                value={currentData.monthlyLeads}
                onChange={(e) => setCurrentData({...currentData, monthlyLeads: parseInt(e.target.value) || 0})}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm"
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm mb-2">Conversion Rate (%)</label>
              <input
                type="number"
                step="0.1"
                value={currentData.conversionRate}
                onChange={(e) => setCurrentData({...currentData, conversionRate: parseFloat(e.target.value) || 0})}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm"
              />
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Available Services */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-bold text-white mb-4">Available Services</h3>
            <div className="space-y-3 min-h-[400px]">
              {availableServices
                .filter(service => !selectedServices.has(service.id))
                .map((service) => (
                  <ServiceCard 
                    key={service.id} 
                    service={service} 
                    onAdd={handleAddService}
                  />
                ))}
            </div>
          </motion.div>

          {/* Scenario Builder */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">Your Strategy</h3>
              <input
                type="text"
                placeholder="Scenario name"
                value={scenarioName}
                onChange={(e) => setScenarioName(e.target.value)}
                className="px-3 py-1 bg-white/10 border border-white/20 rounded text-white text-sm"
              />
            </div>
            
            <div className="glass-amber rounded-xl p-4 min-h-[400px] transition-all">
              {selectedServices.size === 0 ? (
                <div className="flex items-center justify-center h-full text-gray-400 text-center">
                  <div>
                    <div className="text-4xl mb-2">🎯</div>
                    <p>Click services on the left to build your strategy</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <AnimatePresence>
                    {Array.from(selectedServices.entries()).map(([serviceId, tier]) => {
                      const service = availableServices.find(s => s.id === serviceId);
                      return service ? (
                        <ScenarioService
                          key={serviceId}
                          service={service}
                          tier={tier}
                          onTierChange={handleTierChange}
                          onRemove={handleRemoveService}
                        />
                      ) : null;
                    })}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </motion.div>

          {/* Results */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-xl font-bold text-white mb-4">Projections</h3>
            
            {projections ? (
              <div className="space-y-4">
                <div className="glass-panel p-4 rounded-xl">
                  <div className="text-center mb-4">
                    <div className="text-3xl font-bold text-amber-500">
                      {projections.yearlyROI.toFixed(0)}%
                    </div>
                    <div className="text-gray-300 text-sm">Annual ROI</div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-300 text-sm">Monthly Cost:</span>
                      <span className="text-red-400 font-bold">${projections.totalCost.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300 text-sm">Revenue Increase:</span>
                      <span className="text-green-400 font-bold">+${projections.revenueIncrease.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300 text-sm">Lead Increase:</span>
                      <span className="text-blue-400 font-bold">+{projections.leadIncrease}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300 text-sm">Time to Results:</span>
                      <span className="text-purple-400 font-bold">{projections.averageTimeToResults.toFixed(1)} months</span>
                    </div>
                  </div>
                </div>

                <div className="glass-panel p-4 rounded-xl">
                  <h4 className="text-white font-bold mb-3">12-Month Projection</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Current Revenue:</span>
                      <span className="text-white">${currentData.monthlyRevenue.toLocaleString()}/mo</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Projected Revenue:</span>
                      <span className="text-amber-400 font-bold">${projections.projectedRevenue.toLocaleString()}/mo</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Annual Profit Increase:</span>
                      <span className="text-green-400 font-bold">${(projections.revenueIncrease * 12).toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-black font-bold rounded-xl"
                  onClick={() => document.getElementById('lead-magnets')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Get This Strategy Built
                </motion.button>
              </div>
            ) : (
              <div className="glass-panel p-8 rounded-xl text-center text-gray-400">
                <div className="text-4xl mb-4">📊</div>
                <p>Add services to see projections</p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="glass-amber rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Turn Your Scenario Into Reality?
            </h3>
            <p className="text-gray-300 mb-6">
              Our team can implement the exact strategy you've built here, with guaranteed results and ongoing optimization.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-black font-bold rounded-full"
                onClick={() => document.getElementById('lead-magnets')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Get Free Strategy Session
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white/10 backdrop-blur-md text-white font-bold rounded-full border border-white/20 hover:bg-white/20 transition-all"
                onClick={() => window.open('https://bundle.buzzwordstrategies.com', '_blank')}
              >
                View Our Services
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InteractiveScenarioBuilder;
