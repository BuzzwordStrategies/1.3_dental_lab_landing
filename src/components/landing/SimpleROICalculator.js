import React, { useState } from 'react';
import { motion } from 'framer-motion';

const SimpleROICalculator = () => {
  const [monthlyRevenue, setMonthlyRevenue] = useState(50000);
  const [growthPercentage, setGrowthPercentage] = useState(30);
  const [marketingBudget, setMarketingBudget] = useState(2500);

  const additionalRevenue = (monthlyRevenue * growthPercentage) / 100;
  const annualAdditionalRevenue = additionalRevenue * 12;
  const annualMarketingCost = marketingBudget * 12;
  const netProfit = annualAdditionalRevenue - annualMarketingCost;
  const roi = ((netProfit / annualMarketingCost) * 100).toFixed(0);

  return (
    <section className="py-20 bg-gray-900">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-white text-center mb-6">
            Calculate Your Potential ROI
          </h2>
          <p className="text-xl text-gray-300 text-center mb-12 max-w-3xl mx-auto">
            See how much additional revenue digital marketing could generate for your dental lab
          </p>

          <div className="bg-black/50 backdrop-blur-sm rounded-3xl p-8 border border-amber-500/20">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <label className="block text-gray-300 mb-2">Current Monthly Revenue</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">$</span>
                  <input
                    type="number"
                    value={monthlyRevenue}
                    onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg pl-8 pr-4 py-3 text-white focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Expected Growth %</label>
                <div className="relative">
                  <input
                    type="number"
                    value={growthPercentage}
                    onChange={(e) => setGrowthPercentage(Number(e.target.value))}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-amber-500 focus:outline-none"
                  />
                  <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">%</span>
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-gray-300 mb-2">Monthly Marketing Budget</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">$</span>
                  <input
                    type="number"
                    value={marketingBudget}
                    onChange={(e) => setMarketingBudget(Number(e.target.value))}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg pl-8 pr-4 py-3 text-white focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-gray-700 pt-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-900/50 rounded-xl p-6">
                  <h3 className="text-gray-400 text-sm mb-2">Additional Monthly Revenue</h3>
                  <p className="text-3xl font-bold text-amber-500">
                    ${additionalRevenue.toLocaleString()}
                  </p>
                </div>

                <div className="bg-gray-900/50 rounded-xl p-6">
                  <h3 className="text-gray-400 text-sm mb-2">Annual Net Profit</h3>
                  <p className="text-3xl font-bold text-green-500">
                    ${netProfit.toLocaleString()}
                  </p>
                </div>

                <div className="md:col-span-2 bg-gradient-to-r from-amber-900/20 to-orange-900/20 rounded-xl p-6 text-center">
                  <h3 className="text-gray-400 text-sm mb-2">Return on Investment</h3>
                  <p className="text-5xl font-bold text-white">
                    {roi}%
                  </p>
                  <p className="text-gray-400 text-sm mt-2">
                    For every $1 spent, you get ${(roi / 100).toFixed(2)} back
                  </p>
                </div>
              </div>
            </div>

            <p className="text-xs text-gray-500 text-center mt-6">
              * Calculator provides estimates based on industry averages. Actual results vary based on 
              market conditions, competition, and implementation quality.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SimpleROICalculator;
