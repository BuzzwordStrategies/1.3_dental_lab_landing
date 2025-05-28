import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import BundleBuilderLanding from './pages/BundleBuilderLanding';
import DentalLabMarketingLanding from './pages/DentalLabMarketingLanding';
import TestDentalLab from './pages/TestDentalLab';
import './themes/light.css';
import './themes/dark.css';
import './components/Card.css';

function App() {
  useEffect(() => {
    // Set initial theme based on system preference or localStorage
    const savedTheme = localStorage.getItem('theme');
    const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const initialTheme = savedTheme || systemPreference;
    
    document.documentElement.classList.add(`theme-${initialTheme}`);
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/dental-lab" replace />} />
          <Route path="/bundle-builder" element={<BundleBuilderLanding />} />
          <Route path="/dental-lab" element={<DentalLabMarketingLanding />} />
          <Route path="/test" element={<TestDentalLab />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
