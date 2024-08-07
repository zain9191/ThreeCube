import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { ThemeProvider } from './Context/ThemeContext';
import Modal from 'react-modal';

const container = document.getElementById('root');
const root = createRoot(container);
Modal.setAppElement('#root'); 

root.render(
  <React.StrictMode>
      <ThemeProvider>
        <App />
      </ThemeProvider>
  </React.StrictMode>
);
