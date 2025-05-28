// Webhook endpoints configuration
const WEBHOOK_ENDPOINTS = {
  seoAudit: process.env.REACT_APP_N8N_SEO_AUDIT_WEBHOOK || 'https://your-n8n-instance.com/webhook/seo-audit',
  blogPost: process.env.REACT_APP_N8N_BLOG_POST_WEBHOOK || 'https://your-n8n-instance.com/webhook/blog-post',
};

// Extract UTM parameters from URL
const getUTMParams = () => {
  const params = new URLSearchParams(window.location.search);
  const utmParams = {};
  
  ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(param => {
    const value = params.get(param);
    if (value) {
      utmParams[param] = value;
    }
  });
  
  return utmParams;
};

// Submit form data to N8N webhook
export const submitFormToN8N = async (formType, formData) => {
  let enrichedData;
  
  try {
    // Add metadata
    enrichedData = {
      ...formData,
      source: 'dental-lab-landing',
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      referrer: document.referrer,
      utmParams: getUTMParams(),
      formType,
      pageUrl: window.location.href,
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };

    const response = await fetch(WEBHOOK_ENDPOINTS[formType], {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(enrichedData),
    });

    if (!response.ok) {
      throw new Error(`Webhook failed: ${response.status}`);
    }

    // Track conversion in GA4
    if (window.gtag) {
      window.gtag('event', 'generate_lead', {
        currency: 'USD',
        value: formType === 'seoAudit' ? 497 : 297,
        lead_type: formType,
      });
    }

    // Track in Facebook Pixel
    if (window.fbq) {
      window.fbq('track', 'Lead', {
        content_name: formType,
        value: formType === 'seoAudit' ? 497 : 297,
        currency: 'USD'
      });
    }

    // Store successful submission
    const submissions = JSON.parse(localStorage.getItem('successfulSubmissions') || '[]');
    submissions.push({
      formType,
      timestamp: Date.now(),
      email: formData.email
    });
    localStorage.setItem('successfulSubmissions', JSON.stringify(submissions));

    return { success: true };
  } catch (error) {
    console.error('Webhook submission failed:', error);
    
    // Fallback: Store locally and retry later
    const failedSubmissions = JSON.parse(localStorage.getItem('pendingSubmissions') || '[]');
    failedSubmissions.push({ 
      formType, 
      data: enrichedData || formData, 
      timestamp: Date.now(),
      error: error.message 
    });
    localStorage.setItem('pendingSubmissions', JSON.stringify(failedSubmissions));
    
    // Still return success to user to avoid frustration
    return { success: true, offline: true };
  }
};

// Retry failed submissions
export const retryFailedSubmissions = async () => {
  const pendingSubmissions = JSON.parse(localStorage.getItem('pendingSubmissions') || '[]');
  
  if (pendingSubmissions.length === 0) return;
  
  const remainingSubmissions = [];
  
  for (const submission of pendingSubmissions) {
    try {
      const response = await fetch(WEBHOOK_ENDPOINTS[submission.formType], {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...submission.data,
          retryAttempt: true,
          originalTimestamp: submission.timestamp
        }),
      });

      if (!response.ok) {
        throw new Error(`Retry failed: ${response.status}`);
      }
      
      console.log(`Successfully retried submission for ${submission.formType}`);
    } catch (error) {
      console.error(`Failed to retry submission:`, error);
      remainingSubmissions.push(submission);
    }
  }
  
  // Update pending submissions
  localStorage.setItem('pendingSubmissions', JSON.stringify(remainingSubmissions));
};

// Track form events
export const trackFormEvent = (action, formType, additionalData = {}) => {
  // Google Analytics 4
  if (window.gtag) {
    window.gtag('event', action, {
      form_type: formType,
      ...additionalData
    });
  }
  
  // Facebook Pixel
  if (window.fbq) {
    const fbEventMap = {
      'form_start': 'InitiateCheckout',
      'form_abandon': 'CustomEvent',
      'form_complete': 'Lead'
    };
    
    const fbEvent = fbEventMap[action] || 'CustomEvent';
    window.fbq('track', fbEvent, {
      content_name: formType,
      custom_event_type: action,
      ...additionalData
    });
  }
  
  // Custom analytics endpoint
  fetch('/api/analytics', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      event: action,
      formType,
      timestamp: Date.now(),
      ...additionalData
    })
  }).catch(() => {}); // Fail silently
};

// Check if user has already submitted a form
export const hasUserSubmittedForm = (formType, email) => {
  const submissions = JSON.parse(localStorage.getItem('successfulSubmissions') || '[]');
  return submissions.some(sub => 
    sub.formType === formType && 
    sub.email === email &&
    Date.now() - sub.timestamp < 30 * 24 * 60 * 60 * 1000 // 30 days
  );
};

// Initialize retry mechanism
if (typeof window !== 'undefined') {
  // Retry failed submissions on page load
  window.addEventListener('load', () => {
    setTimeout(retryFailedSubmissions, 5000);
  });
  
  // Retry when connection is restored
  window.addEventListener('online', () => {
    console.log('Connection restored, retrying failed submissions...');
    retryFailedSubmissions();
  });
}
