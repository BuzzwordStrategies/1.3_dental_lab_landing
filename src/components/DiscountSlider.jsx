import React, { useState } from 'react';

const DiscountSlider = ({ onMonthsChange, initialMonths = 3 }) => {
  const [months, setMonths] = useState(initialMonths);

  const handleChange = (e) => {
    const newMonths = parseInt(e.target.value);
    setMonths(newMonths);
    
    // Calculate discount: min(0.02 * (months/3 - 1), 0.20)
    const discount = Math.min(0.02 * ((newMonths / 3) - 1), 0.20);
    
    if (onMonthsChange) {
      onMonthsChange(newMonths, discount);
    }
  };

  const discount = Math.min(0.02 * ((months / 3) - 1), 0.20);
  const discountPercent = Math.round(discount * 100);

  return (
    <div className="discount-slider" style={{ marginBottom: '1rem' }}>
      <label 
        htmlFor="months-slider"
        style={{ 
          display: 'block', 
          marginBottom: '0.5rem',
          color: 'var(--text-primary)',
          fontWeight: '600'
        }}
      >
        Subscription Length: {months} months
      </label>
      
      <div style={{ position: 'relative', marginBottom: '0.5rem' }}>
        <input
          id="months-slider"
          type="range"
          min="3"
          max="24"
          step="3"
          value={months}
          onChange={handleChange}
          style={{
            width: '100%',
            height: '8px',
            borderRadius: '4px',
            background: 'var(--bg-secondary)',
            outline: 'none',
            cursor: 'pointer'
          }}
          onFocus={(e) => {
            e.target.style.outline = '2px solid var(--accent)';
            e.target.style.outlineOffset = '2px';
          }}
          onBlur={(e) => {
            e.target.style.outline = 'none';
          }}
        />
        
        {/* Tooltip */}
        {discountPercent > 0 && (
          <div
            style={{
              position: 'absolute',
              top: '-40px',
              left: `${((months - 3) / (24 - 3)) * 100}%`,
              transform: 'translateX(-50%)',
              background: 'var(--accent)',
              color: 'white',
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '12px',
              fontWeight: '600',
              whiteSpace: 'nowrap'
            }}
          >
            Save {discountPercent}% monthly
          </div>
        )}
      </div>
      
      <div 
        style={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          fontSize: '12px',
          color: 'var(--text-secondary)'
        }}
      >
        <span>3 months</span>
        <span>24 months</span>
      </div>
      
      {discountPercent > 0 && (
        <div 
          style={{ 
            marginTop: '0.5rem',
            padding: '8px',
            background: 'var(--glass-bg)',
            borderRadius: '6px',
            fontSize: '14px',
            color: 'var(--accent)',
            textAlign: 'center',
            fontWeight: '600'
          }}
        >
          🎉 You're saving {discountPercent}% with this commitment!
        </div>
      )}
    </div>
  );
};

export default DiscountSlider;
