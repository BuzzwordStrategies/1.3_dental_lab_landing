import React from 'react';
import './Card.css';

const Card = ({ 
  children, 
  className = '', 
  onClick,
  accent = false,
  ...props 
}) => {
  return (
    <div 
      className={`card ${accent ? 'card-accent' : ''} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
