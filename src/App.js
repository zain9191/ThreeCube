
import React from 'react';
import Scene from './Cube';

const App = () => {
  const handleButtonClick = (direction) => {
    const event = new CustomEvent('adjustCubeRotation', { detail: direction });
    window.dispatchEvent(event);
  };

  return (
    <div className="app-container">
      <Scene />
      <div className="button-container">
        <button className="button-up" onClick={() => handleButtonClick('up')}>Up</button>
        <button className="button-down" onClick={() => handleButtonClick('down')}>Down</button>
        <button className="button-left" onClick={() => handleButtonClick('left')}>Left</button>
        <button className="button-right" onClick={() => handleButtonClick('right')}>Right</button>
      </div>
    </div>
  );
};

export default App;
