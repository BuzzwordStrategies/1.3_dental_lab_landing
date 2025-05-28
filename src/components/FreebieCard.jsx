import React from 'react';
import Card from './Card';

const FreebieCard = ({ resource, onCTAClick }) => {
  const handleClick = () => {
    // Fire webhook to /api/lead-magnet?type={resource.id}
    const webhookUrl = `/api/lead-magnet?type=${resource.id}`;
    
    // Log the webhook call (in production, this would actually fire the webhook)
    console.log(`Firing webhook: ${webhookUrl}`);
    
    if (onCTAClick) {
      onCTAClick(resource);
    }
  };

  return (
    <Card className="freebie-card">
      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <div style={{ 
          fontSize: '3rem', 
          marginBottom: '1rem',
          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
        }}>
          {resource.icon}
        </div>
        
        <h3 style={{ 
          color: 'var(--text-primary)', 
          fontSize: '1.25rem', 
          fontWeight: '700',
          marginBottom: '0.75rem',
          lineHeight: '1.3'
        }}>
          {resource.title}
        </h3>
        
        <p style={{ 
          color: 'var(--text-secondary)', 
          fontSize: '0.875rem',
          lineHeight: '1.5',
          marginBottom: '1.5rem'
        }}>
          {resource.description}
        </p>
      </div>

      <button
        onClick={handleClick}
        style={{
          width: '100%',
          padding: '0.875rem 1.5rem',
          background: 'var(--accent)',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontSize: '0.875rem',
          fontWeight: '600',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          outline: 'none'
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'translateY(-1px)';
          e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = 'none';
        }}
        onFocus={(e) => {
          e.target.style.outline = '2px solid var(--accent)';
          e.target.style.outlineOffset = '2px';
        }}
        onBlur={(e) => {
          e.target.style.outline = 'none';
        }}
        aria-label={`Get ${resource.title}`}
      >
        {resource.title.includes('SEO Audit') && 'Get My Free SEO Audit'}
        {resource.title.includes('Competitor Analysis') && 'Get My Free Competitor Analysis'}
        {resource.title.includes('Blog Post') && 'Get My Free Custom Blog Post'}
      </button>

      <div style={{ 
        marginTop: '1rem',
        textAlign: 'center',
        fontSize: '0.75rem',
        color: 'var(--text-secondary)'
      }}>
        <span style={{ color: 'var(--accent)' }}>✓</span> No spam, ever
        <span style={{ margin: '0 0.5rem', color: 'var(--text-secondary)' }}>•</span>
        <span style={{ color: 'var(--accent)' }}>✓</span> Delivered within 24 hours
      </div>
    </Card>
  );
};

export default FreebieCard;
