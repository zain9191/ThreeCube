import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { LanguageProvider } from './Context/LanguageContext';
import { ThemeProvider } from './Context/ThemeContext';
import Modal from 'react-modal'; // Import Modal

const container = document.getElementById('root');
const root = createRoot(container);
Modal.setAppElement('#root'); // Set the app element for accessibility

root.render(
  <React.StrictMode>
    <LanguageProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </LanguageProvider>
  </React.StrictMode>
);
