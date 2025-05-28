import React, { useState, useEffect } from 'react';

const ThemeToggle = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Check localStorage and system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const initialTheme = savedTheme || systemPreference;
    
    setTheme(initialTheme);
    applyTheme(initialTheme);
  }, []);

  const applyTheme = (newTheme) => {
    const html = document.documentElement;
    html.classList.remove('theme-light', 'theme-dark');
    html.classList.add(`theme-${newTheme}`);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="theme-toggle"
      style={{
        background: 'var(--glass-bg, rgba(255,255,255,.08))',
        backdropFilter: 'blur(var(--blur-strength))',
        WebkitBackdropFilter: 'blur(var(--blur-strength))',
        border: '1px solid var(--glass-border, rgba(255,255,255,.1))',
        borderRadius: '50%',
        width: '48px',
        height: '48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'transform 0.2s ease',
        fontSize: '20px',
        color: 'var(--text-primary)',
        outline: 'none'
      }}
      onFocus={(e) => {
        e.target.style.outline = '2px solid var(--accent)';
        e.target.style.outlineOffset = '2px';
      }}
      onBlur={(e) => {
        e.target.style.outline = 'none';
      }}
      onMouseEnter={(e) => {
        e.target.style.transform = 'scale(1.1)';
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = 'scale(1)';
      }}
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
};

export default ThemeToggle;
