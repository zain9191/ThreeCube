// App.js
import React from 'react';
import Scene from './components/Scene';
import { useTheme } from './Context/ThemeContext';
import './Style/css/main.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const App = () => {
  const { theme, toggleTheme } = useTheme();
  console.log('App:', { theme, toggleTheme }); 

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
        <button className="button-previous" onClick={handlePrevious}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <button className="button-next" onClick={handleNext}>
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
        <div className="custom-theme-toggle">
          <input type="checkbox" id="custom-switch" className="custom-checkbox" onChange={toggleTheme} />
          <label htmlFor="custom-switch" className="custom-label">Toggle</label>
        </div>
      </div>
    </div>
  );
};

export default App;
