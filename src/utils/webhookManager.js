// Webhook manager with retry logic and error handling
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

export const submitToWebhook = async (webhookUrl, data, retries = 0) => {
  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        metadata: {
          source: 'dental_lab_landing',
          version: '1.0',
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
          referrer: document.referrer
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Webhook failed with status: ${response.status}`);
    }

    // Log successful submission
    console.log('Webhook submission successful:', {
      url: webhookUrl,
      timestamp: new Date().toISOString()
    });

    return await response.json();
    
  } catch (error) {
    console.error(`Webhook submission failed (attempt ${retries + 1}):`, error);
    
    if (retries < MAX_RETRIES) {
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY * (retries + 1)));
      return submitToWebhook(webhookUrl, data, retries + 1);
    }
    
    // If all retries failed, store in localStorage for later submission
    const failedSubmissions = JSON.parse(localStorage.getItem('failedWebhooks') || '[]');
    failedSubmissions.push({
      url: webhookUrl,
      data,
      timestamp: new Date().toISOString(),
      error: error.message
    });
    localStorage.setItem('failedWebhooks', JSON.stringify(failedSubmissions));
    
    throw error;
  }
};

// Retry failed webhooks
export const retryFailedWebhooks = async () => {
  const failed = JSON.parse(localStorage.getItem('failedWebhooks') || '[]');
  const stillFailed = [];
  
  for (const submission of failed) {
    try {
      await submitToWebhook(submission.url, submission.data);
    } catch (error) {
      stillFailed.push(submission);
    }
  }
  
  localStorage.setItem('failedWebhooks', JSON.stringify(stillFailed));
};

// Set up automatic retry every 5 minutes
setInterval(retryFailedWebhooks, 5 * 60 * 1000);
