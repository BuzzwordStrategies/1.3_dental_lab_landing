import React, { useEffect, useState, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

const CountUp = ({ 
  start = 0, 
  end, 
  duration = 2000, 
  prefix = '', 
  suffix = '', 
  decimals = 0,
  separator = ','
}) => {
  const [count, setCount] = useState(start);
  const countRef = useRef(null);
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  useEffect(() => {
    if (!inView) return;

    let startTimestamp = null;
    const startValue = start;
    const endValue = end;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(easeOutQuart * (endValue - startValue) + startValue);
      
      setCount(currentCount);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(endValue);
      }
    };

    window.requestAnimationFrame(step);
  }, [inView, start, end, duration]);

  // Format number with separator
  const formatNumber = (num) => {
    const parts = num.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator);
    return parts.join('.');
  };

  // Format with decimals
  const formattedCount = decimals > 0 
    ? formatNumber(count.toFixed(decimals))
    : formatNumber(count);

  return (
    <span ref={ref}>
      {prefix}{formattedCount}{suffix}
    </span>
  );
};

export default CountUp;
