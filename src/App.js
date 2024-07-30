import React from 'react';
import Scene from './components/Scene';
import { useTheme, ThemeProvider } from './Context/ThemeContext';
import { LanguageProvider } from './Context/LanguageContext';
import './Style/css/main.css';

const App = () => {
  const { theme, toggleTheme } = useTheme();

  const handleNext = () => {
    console.log('Next button clicked');
    const event = new CustomEvent('adjustCubeRotation', { detail: 'next' });
    window.dispatchEvent(event);
  };

  const handlePrevious = () => {
    console.log('Previous button clicked');
    const event = new CustomEvent('adjustCubeRotation', { detail: 'previous' });
    window.dispatchEvent(event);
  };

  return (
    <div className={`app-container ${theme}`}>
      <Scene />
      <div className="button-container">
        <button className="button-previous" onClick={handlePrevious}>Previous</button>
        <button className="button-next" onClick={handleNext}>Next</button>
        <div className="custom-theme-toggle">
          <input type="checkbox" id="custom-switch" className="custom-checkbox" onChange={toggleTheme} />
          <label htmlFor="custom-switch" className="custom-label">Toggle</label>
        </div>
      </div>
    </div>
  );
};

const WrappedApp = () => (
  <LanguageProvider>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </LanguageProvider>
);

export default WrappedApp;
