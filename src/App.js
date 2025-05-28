import React from 'react';
import { DataProvider } from './contexts/DataContext';
import ImmersiveDentalLabLanding from './pages/ImmersiveDentalLabLanding';
import './styles/glassmorphism.css';
import './styles/animations.css';
import './styles/immersive.css';

function App() {
  return (
    <DataProvider>
      <div className="App">
        <ImmersiveDentalLabLanding />
      </div>
    </DataProvider>
  );
}

export default App;
