import React, { createContext, useContext, useState, useEffect } from 'react';
import Papa from 'papaparse';

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const [pricingData, setPricingData] = useState([]);
  const [imageData, setImageData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [caseStudies, setCaseStudies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        
        const files = [
          { url: '/data/pricing.csv', setter: setPricingData },
          { url: '/data/image-links.csv', setter: setImageData },
          { url: '/data/product-tile.csv', setter: setProductData },
          { url: '/data/case-studies.csv', setter: setCaseStudies }
        ];

        const promises = files.map(({ url, setter }) => 
          new Promise((resolve, reject) => {
            Papa.parse(url, {
              download: true,
              header: true,
              skipEmptyLines: true,
              complete: (results) => {
                if (results.errors.length > 0) {
                  console.warn(`Parsing warnings for ${url}:`, results.errors);
                }
                setter(results.data);
                resolve(results.data);
              },
              error: (error) => {
                console.error(`Error loading ${url}:`, error);
                reject(error);
              }
            });
          })
        );

        await Promise.all(promises);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Helper functions for data manipulation
  const getServicesByTier = (tier) => {
    return pricingData.filter(item => item.Tier === tier);
  };

  const getServiceByName = (serviceName, tier = 'Base') => {
    return pricingData.find(item => 
      item.Service === serviceName && item.Tier === tier
    );
  };

  const calculateBundlePrice = (selectedServices) => {
    if (!selectedServices.length) return { total: 0, savings: 0 };
    
    const bundleSize = selectedServices.length;
    let total = 0;
    let originalTotal = 0;

    selectedServices.forEach(service => {
      const priceData = pricingData.find(item => 
        item.Service === service.name &&
        item.Tier === service.tier &&
        parseInt(item['Subscription Length']) === service.subscriptionLength &&
        parseInt(item['# Products in Bundle']) === bundleSize
      );

      if (priceData) {
        total += parseFloat(priceData['Final Monthly Price After Discounts']);
        originalTotal += parseFloat(priceData['Base + Markup (Rounded)']);
      }
    });

    return {
      total: total.toFixed(2),
      savings: (originalTotal - total).toFixed(2),
      originalTotal: originalTotal.toFixed(2)
    };
  };

  const getImageForService = (serviceName, tier) => {
    const imageItem = imageData.find(item => 
      item.Image === serviceName && item.Tier === tier
    );
    return imageItem ? imageItem.Link : '/images/logos/default.png';
  };

  const getProductDetails = (serviceName) => {
    return productData.find(item => item.Service === serviceName);
  };

  const getCaseStudiesForService = (serviceName) => {
    return caseStudies.filter(study => 
      study.Service.toLowerCase().includes(serviceName.toLowerCase())
    );
  };

  const value = {
    // Raw data
    pricingData,
    imageData,
    productData,
    caseStudies,
    
    // Loading states
    isLoading,
    error,
    
    // Helper functions
    getServicesByTier,
    getServiceByName,
    calculateBundlePrice,
    getImageForService,
    getProductDetails,
    getCaseStudiesForService,
    
    // Statistics for data visualization
    stats: {
      totalServices: productData.length,
      totalCaseStudies: caseStudies.length,
      averageResults: caseStudies.length > 0 ? 
        caseStudies.reduce((acc, study) => {
          const match = study.Results.match(/(\d+)%/);
          return acc + (match ? parseInt(match[1]) : 0);
        }, 0) / caseStudies.length : 0
    }
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
