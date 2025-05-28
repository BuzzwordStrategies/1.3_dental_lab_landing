import React, { useState } from 'react';
import Card from './Card';

const ServiceCard = ({ service, onSelectionChange, selectedTier = null }) => {
  const [activeTier, setActiveTier] = useState(selectedTier);

  const handleTierSelect = (tier) => {
    const newTier = activeTier === tier.name ? null : tier.name;
    setActiveTier(newTier);
    
    if (onSelectionChange) {
      onSelectionChange({
        serviceId: service.id,
        serviceName: service.name,
        tier: newTier,
        price: newTier ? tier.price : 0
      });
    }
  };

  return (
    <Card accent className="service-card">
      <div style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ 
          color: 'var(--text-primary)', 
          fontSize: '1.25rem', 
          fontWeight: '700',
          marginBottom: '0.5rem'
        }}>
          {service.name}
        </h3>
        <p style={{ 
          color: 'var(--text-secondary)', 
          fontSize: '0.875rem',
          lineHeight: '1.5'
        }}>
          {service.description}
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {service.tiers.map((tier) => (
          <div
            key={tier.name}
            onClick={() => handleTierSelect(tier)}
            style={{
              padding: '1rem',
              borderRadius: '8px',
              border: `2px solid ${activeTier === tier.name ? 'var(--accent)' : 'transparent'}`,
              background: activeTier === tier.name 
                ? 'var(--glass-bg)' 
                : 'rgba(255,255,255,0.03)',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              if (activeTier !== tier.name) {
                e.target.style.background = 'rgba(255,255,255,0.05)';
              }
            }}
            onMouseLeave={(e) => {
              if (activeTier !== tier.name) {
                e.target.style.background = 'rgba(255,255,255,0.03)';
              }
            }}
            onFocus={(e) => {
              e.target.style.outline = '2px solid var(--accent)';
              e.target.style.outlineOffset = '2px';
            }}
            onBlur={(e) => {
              e.target.style.outline = 'none';
            }}
            tabIndex={0}
            role="button"
            aria-pressed={activeTier === tier.name}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleTierSelect(tier);
              }
            }}
          >
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: '0.5rem'
            }}>
              <span style={{ 
                fontWeight: '600', 
                color: 'var(--text-primary)',
                fontSize: '1rem'
              }}>
                {tier.name}
              </span>
              <span style={{ 
                fontWeight: '700', 
                color: 'var(--accent)',
                fontSize: '1.125rem'
              }}>
                ${tier.price}/mo
              </span>
            </div>
            
            <ul style={{ 
              listStyle: 'none', 
              padding: 0, 
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '0.25rem'
            }}>
              {tier.features.map((feature, index) => (
                <li key={index} style={{ 
                  fontSize: '0.875rem', 
                  color: 'var(--text-secondary)',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <span style={{ 
                    color: 'var(--accent)', 
                    marginRight: '0.5rem',
                    fontSize: '0.75rem'
                  }}>
                    ✓
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
            
            {tier.postsPerWeek && (
              <div style={{ 
                marginTop: '0.5rem',
                fontSize: '0.75rem',
                color: 'var(--accent)',
                fontWeight: '600'
              }}>
                {tier.postsPerWeek} posts per week
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ServiceCard;
