import React from 'react';
import { DataProvider } from './contexts/DataContext';
import DentalLabLanding from './pages/DentalLabLanding';
import './styles/glassmorphism.css';
import './styles/animations.css';

function App() {
  return (
    <DataProvider>
      <div className="App">
        <DentalLabLanding />
      </div>
    </DataProvider>
  );
}

export default App;
