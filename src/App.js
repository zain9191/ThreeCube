import React from 'react';
import Scene from './Scene';
import './styles.css';

const App = () => {
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
    <div className="app-container">
      <Scene />
      <div className="button-container">
        <button className="button-previous" onClick={handlePrevious}>Previous</button>
        <button className="button-next" onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default App;
