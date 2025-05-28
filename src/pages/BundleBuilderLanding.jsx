import React, { useState, useEffect } from 'react';
import ThemeToggle from '../components/ThemeToggle';
import ServiceCard from '../components/ServiceCard';
import FreebieCard from '../components/FreebieCard';
import DiscountSlider from '../components/DiscountSlider';
import Card from '../components/Card';
import servicesData from '../data/services.json';

const BundleBuilderLanding = () => {
  const [selectedServices, setSelectedServices] = useState([]);
  const [months, setMonths] = useState(3);
  const [discount, setDiscount] = useState(0);

  // Calculate total price
  const calculatePrice = () => {
    const subtotal = selectedServices.reduce((total, service) => total + service.price, 0);
    return subtotal * (1 - discount);
  };

  const handleServiceSelection = (selection) => {
    setSelectedServices(prev => {
      const existing = prev.find(s => s.serviceId === selection.serviceId);
      
      if (selection.tier === null) {
        // Remove service
        return prev.filter(s => s.serviceId !== selection.serviceId);
      } else if (existing) {
        // Update existing service
        return prev.map(s => 
          s.serviceId === selection.serviceId 
            ? { ...s, tier: selection.tier, price: selection.price }
            : s
        );
      } else {
        // Add new service
        return [...prev, selection];
      }
    });
  };

  const handleMonthsChange = (newMonths, newDiscount) => {
    setMonths(newMonths);
    setDiscount(newDiscount);
  };

  const handleFreebieClick = (resource) => {
    // Open modal form (simplified for now)
    alert(`Opening form for: ${resource.title}`);
  };

  const totalPrice = calculatePrice();
  const savings = selectedServices.reduce((total, service) => total + service.price, 0) * discount;

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'var(--bg-primary)',
      color: 'var(--text-primary)'
    }}>
      {/* Header */}
      <header style={{ 
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid var(--glass-border, rgba(255,255,255,.1))'
      }}>
        <h1 style={{ 
          fontSize: '1.5rem',
          fontWeight: '700',
          color: 'var(--text-primary)',
          margin: 0
        }}>
          Buzzword Strategies
        </h1>
        <ThemeToggle />
      </header>

      <main style={{ padding: '2rem' }}>
        {/* Hero Section */}
        <section style={{ 
          textAlign: 'center',
          marginBottom: '4rem',
          maxWidth: '800px',
          margin: '0 auto 4rem'
        }}>
          <h2 style={{ 
            fontSize: '3rem',
            fontWeight: '700',
            marginBottom: '1rem',
            background: 'linear-gradient(135deg, var(--accent), var(--text-primary))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Dental Lab Marketing Bundle Builder
          </h2>
          <p style={{ 
            fontSize: '1.25rem',
            color: 'var(--text-secondary)',
            lineHeight: '1.6',
            marginBottom: '2rem'
          }}>
            Build your custom marketing package with our proven services designed specifically for dental laboratories.
          </p>
        </section>

        {/* Free Resources Section */}
        <section style={{ marginBottom: '4rem' }}>
          <h3 style={{ 
            fontSize: '2rem',
            fontWeight: '700',
            textAlign: 'center',
            marginBottom: '2rem',
            color: 'var(--text-primary)'
          }}>
            Free Resources for Dental Labs
          </h3>
          
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            {servicesData.freeResources.map((resource) => (
              <FreebieCard 
                key={resource.id}
                resource={resource}
                onCTAClick={handleFreebieClick}
              />
            ))}
          </div>
        </section>

        {/* Bundle Builder Section */}
        <section style={{ marginBottom: '4rem' }}>
          <h3 style={{ 
            fontSize: '2rem',
            fontWeight: '700',
            textAlign: 'center',
            marginBottom: '2rem',
            color: 'var(--text-primary)'
          }}>
            Build Your Marketing Bundle
          </h3>

          <div style={{ 
            display: 'grid',
            gridTemplateColumns: '2fr 1fr',
            gap: '2rem',
            maxWidth: '1400px',
            margin: '0 auto'
          }}>
            {/* Services Grid */}
            <div>
              <div style={{ 
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                gap: '1.5rem'
              }}>
                {servicesData.services.map((service) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    onSelectionChange={handleServiceSelection}
                    selectedTier={selectedServices.find(s => s.serviceId === service.id)?.tier}
                  />
                ))}
              </div>
            </div>

            {/* Sticky Price Summary */}
            <div style={{ position: 'sticky', top: '2rem', height: 'fit-content' }}>
              <Card>
                <h4 style={{ 
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  marginBottom: '1rem',
                  color: 'var(--text-primary)'
                }}>
                  Bundle Summary
                </h4>

                <DiscountSlider 
                  onMonthsChange={handleMonthsChange}
                  initialMonths={months}
                />

                <div style={{ marginBottom: '1rem' }}>
                  {selectedServices.length === 0 ? (
                    <p style={{ 
                      color: 'var(--text-secondary)',
                      fontStyle: 'italic',
                      textAlign: 'center',
                      padding: '2rem 0'
                    }}>
                      Select services to see pricing
                    </p>
                  ) : (
                    <>
                      {selectedServices.map((service) => (
                        <div key={service.serviceId} style={{ 
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '0.5rem',
                          fontSize: '0.875rem'
                        }}>
                          <span style={{ color: 'var(--text-secondary)' }}>
                            {service.serviceName} ({service.tier})
                          </span>
                          <span style={{ color: 'var(--text-primary)' }}>
                            ${service.price}/mo
                          </span>
                        </div>
                      ))}
                      
                      <hr style={{ 
                        border: 'none',
                        borderTop: '1px solid var(--glass-border)',
                        margin: '1rem 0'
                      }} />
                      
                      {discount > 0 && (
                        <div style={{ 
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '0.5rem',
                          fontSize: '0.875rem',
                          color: 'var(--accent)'
                        }}>
                          <span>Discount ({Math.round(discount * 100)}%)</span>
                          <span>-${savings.toFixed(2)}/mo</span>
                        </div>
                      )}
                      
                      <div style={{ 
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: '1.25rem',
                        fontWeight: '700',
                        color: 'var(--text-primary)'
                      }}>
                        <span>Total</span>
                        <span>${totalPrice.toFixed(2)}/mo</span>
                      </div>
                    </>
                  )}
                </div>

                {selectedServices.length > 0 && (
                  <button
                    style={{
                      width: '100%',
                      padding: '1rem',
                      background: 'var(--accent)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-1px)';
                      e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = 'none';
                    }}
                    onClick={() => {
                      alert(`Bundle total: $${totalPrice.toFixed(2)}/mo for ${months} months`);
                    }}
                  >
                    Get Started - ${totalPrice.toFixed(2)}/mo
                  </button>
                )}
              </Card>
            </div>
          </div>
        </section>

        {/* Simple ROI CTA Banner */}
        <section style={{ marginBottom: '4rem' }}>
          <Card>
            <div style={{ textAlign: 'center', padding: '2rem 0' }}>
              <h4 style={{ 
                fontSize: '1.5rem',
                fontWeight: '700',
                marginBottom: '1rem',
                color: 'var(--text-primary)'
              }}>
                Calculate Your Marketing ROI
              </h4>
              <p style={{ 
                color: 'var(--text-secondary)',
                marginBottom: '1.5rem',
                fontSize: '1rem'
              }}>
                See how our marketing services can impact your dental lab's growth
              </p>
              <button
                style={{
                  padding: '0.875rem 2rem',
                  background: 'transparent',
                  color: 'var(--accent)',
                  border: '2px solid var(--accent)',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'var(--accent)';
                  e.target.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.color = 'var(--accent)';
                }}
                onClick={() => {
                  alert('ROI Calculator coming soon!');
                }}
              >
                Calculate ROI
              </button>
            </div>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer style={{ 
        textAlign: 'center',
        padding: '2rem',
        fontSize: '0.875rem',
        color: 'var(--text-secondary)',
        borderTop: '1px solid var(--glass-border, rgba(255,255,255,.1))'
      }}>
        © 2025 Buzzword Strategies. All rights reserved.
      </footer>
    </div>
  );
};

export default BundleBuilderLanding;
