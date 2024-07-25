import React from 'react';
import Scene from './components/Scene';
import { useTheme, ThemeProvider } from './Context/ThemeContext';
import { LanguageProvider } from './Context/LanguageContext';
import Component1 from './components/sideOne';
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
        <button className="button-theme-toggle" onClick={toggleTheme}>
      {theme === 'light' ? 'Dark' : 'Light'}
    </button>
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
