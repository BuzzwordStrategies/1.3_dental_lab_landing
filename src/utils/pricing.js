// src/utils/pricing.js - Pricing calculation utilities
import { SERVICES, calculateBundleDiscount, calculateCommitmentDiscount } from '../data/services.js';

export const calculateServicePrice = (serviceName, tier = 'Base') => {
  const service = SERVICES[serviceName];
  if (!service) return 0;
  return service.pricing[tier] || 0;
};

export const calculateBundlePrice = (services, tier = 'Base', commitmentMonths = 3) => {
  const baseTotal = services.reduce((total, serviceName) => {
    return total + calculateServicePrice(serviceName, tier);
  }, 0);

  const serviceDiscount = calculateBundleDiscount(services.length);
  const commitmentDiscount = calculateCommitmentDiscount(commitmentMonths);
  
  const totalDiscount = serviceDiscount + commitmentDiscount;
  const discountAmount = baseTotal * totalDiscount;
  const finalPrice = baseTotal - discountAmount;

  return {
    baseTotal,
    serviceDiscount: serviceDiscount * 100,
    commitmentDiscount: commitmentDiscount * 100,
    totalDiscount: totalDiscount * 100,
    discountAmount,
    finalPrice,
    monthlySavings: discountAmount
  };
};

export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

export const calculateROI = (currentRevenue, growthPercentage, marketingBudget) => {
  const additionalRevenue = currentRevenue * (growthPercentage / 100);
  const annualAdditionalRevenue = additionalRevenue * 12;
  const annualMarketingCost = marketingBudget * 12;
  const netProfit = annualAdditionalRevenue - annualMarketingCost;
  const roi = ((netProfit / annualMarketingCost) * 100);
  
  return {
    monthlyAdditionalRevenue: additionalRevenue,
    annualAdditionalRevenue,
    annualMarketingCost,
    annualNetProfit: netProfit,
    roi: Math.max(0, roi),
    returnMultiplier: Math.max(1, (annualAdditionalRevenue / annualMarketingCost))
  };
};

export default {
  calculateServicePrice,
  calculateBundlePrice,
  formatPrice,
  calculateROI
};
