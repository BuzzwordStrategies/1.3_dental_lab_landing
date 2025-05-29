// src/utils/tracking.js - Analytics tracking utilities
export const trackEvent = (eventName, parameters = {}) => {
  // Google Analytics 4 tracking
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      ...parameters,
      timestamp: new Date().toISOString()
    });
  }

  // Facebook Pixel tracking
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, parameters);
  }

  // Console log for development
  if (process.env.NODE_ENV === 'development') {
    console.log('Track Event:', eventName, parameters);
  }
};

export const trackPageView = (pagePath, pageTitle) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', process.env.REACT_APP_GA_MEASUREMENT_ID, {
      page_path: pagePath,
      page_title: pageTitle
    });
  }
};

export const trackFormSubmission = (formName, formData = {}) => {
  trackEvent('form_submit', {
    form_name: formName,
    ...formData
  });
};

export const trackButtonClick = (buttonName, location, url = null) => {
  trackEvent('button_click', {
    button_name: buttonName,
    location,
    ...(url && { destination_url: url })
  });
};

export const trackServiceInterest = (serviceName, tier, source) => {
  trackEvent('service_interest', {
    service_name: serviceName,
    service_tier: tier,
    source,
    value: getServiceValue(serviceName, tier)
  });
};

export const trackBundleInterest = (bundleName, services, totalValue) => {
  trackEvent('bundle_interest', {
    bundle_name: bundleName,
    services: services.join(', '),
    value: totalValue,
    service_count: services.length
  });
};

export const trackLeadGeneration = (leadType, value = 0) => {
  trackEvent('generate_lead', {
    lead_type: leadType,
    currency: 'USD',
    value
  });
};

export const trackDownload = (resourceName, resourceType) => {
  trackEvent('file_download', {
    resource_name: resourceName,
    resource_type: resourceType
  });
};

export const trackVideoPlay = (videoName, location) => {
  trackEvent('video_play', {
    video_name: videoName,
    location
  });
};

export const trackScrollDepth = (percentage) => {
  trackEvent('scroll', {
    percent_scrolled: percentage
  });
};

export const trackTimeOnPage = (timeInSeconds) => {
  trackEvent('timing_complete', {
    name: 'page_view_time',
    value: timeInSeconds
  });
};

export const trackCalculatorUse = (calculatorType, inputs, results) => {
  trackEvent('calculator_use', {
    calculator_type: calculatorType,
    inputs: JSON.stringify(inputs),
    results: JSON.stringify(results)
  });
};

export const trackModalOpen = (modalName, trigger) => {
  trackEvent('modal_open', {
    modal_name: modalName,
    trigger
  });
};

export const trackModalClose = (modalName, timeOpen) => {
  trackEvent('modal_close', {
    modal_name: modalName,
    time_open: timeOpen
  });
};

export const trackExternalLink = (url, linkText, location) => {
  trackEvent('click', {
    link_url: url,
    link_text: linkText,
    location,
    outbound: true
  });
};

// Helper function to get service value for tracking
const getServiceValue = (serviceName, tier) => {
  const serviceValues = {
    'Meta Ads': { Base: 770, Standard: 980, Premium: 1410 },
    'Google Ads': { Base: 770, Standard: 980, Premium: 1410 },
    'TikTok Ads': { Base: 770, Standard: 980, Premium: 1410 },
    'SEO Optimization': { Base: 790, Standard: 1000, Premium: 1450 },
    'Google Business Profile': { Base: 315, Standard: 420, Premium: 675 },
    'Backlink Building': { Base: 420, Standard: 630, Premium: 990 },
    'Content Creation': { Base: 210, Standard: 420, Premium: 760 },
    'Social Media Management': { Base: 315, Standard: 525, Premium: 895 }
  };

  return serviceValues[serviceName]?.[tier] || 0;
};

// Initialize tracking on page load
export const initializeTracking = () => {
  // Track initial page view
  trackPageView(window.location.pathname, document.title);

  // Track scroll depth
  let maxScroll = 0;
  const trackScroll = () => {
    const scrollPercent = Math.round(
      (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
    );
    
    if (scrollPercent > maxScroll && scrollPercent % 25 === 0) {
      maxScroll = scrollPercent;
      trackScrollDepth(scrollPercent);
    }
  };

  // Track time on page
  const startTime = Date.now();
  const trackTimeOnPageBeforeUnload = () => {
    const timeOnPage = Math.round((Date.now() - startTime) / 1000);
    trackTimeOnPage(timeOnPage);
  };

  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', trackScroll);
    window.addEventListener('beforeunload', trackTimeOnPageBeforeUnload);
  }
};

export default {
  trackEvent,
  trackPageView,
  trackFormSubmission,
  trackButtonClick,
  trackServiceInterest,
  trackBundleInterest,
  trackLeadGeneration,
  trackDownload,
  trackVideoPlay,
  trackScrollDepth,
  trackTimeOnPage,
  trackCalculatorUse,
  trackModalOpen,
  trackModalClose,
  trackExternalLink,
  initializeTracking
};
