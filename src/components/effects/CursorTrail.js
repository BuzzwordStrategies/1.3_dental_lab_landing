import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CursorTrail = () => {
  const [particles, setParticles] = useState([]);
  const [isMouseMoving, setIsMouseMoving] = useState(false);

  useEffect(() => {
    let timeout;

    const handleMouseMove = (e) => {
      setIsMouseMoving(true);
      
      // Clear existing timeout
      clearTimeout(timeout);
      
      // Set new timeout to stop particle generation after mouse stops
      timeout = setTimeout(() => {
        setIsMouseMoving(false);
      }, 100);

      if (particles.length > 20) return; // Limit particles for performance

      const particle = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
      };

      setParticles((prev) => [...prev.slice(-20), particle]);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timeout);
    };
  }, [particles.length]);

  // Clean up old particles
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles((prev) => prev.filter((p) => Date.now() - p.id < 1000));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[100]">
      <AnimatePresence>
        {isMouseMoving && particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-2 h-2 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(245, 158, 11, 0.8) 0%, rgba(245, 158, 11, 0) 70%)',
              boxShadow: '0 0 6px rgba(245, 158, 11, 0.6)',
            }}
            initial={{
              x: particle.x - 4,
              y: particle.y - 4,
              scale: 1,
              opacity: 1,
            }}
            animate={{
              scale: 0,
              opacity: 0,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.8,
              ease: 'easeOut',
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default CursorTrail;
