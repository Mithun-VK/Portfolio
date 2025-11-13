import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// Import global styles
import './styles/variables.css';
import './styles/global.css';
import './styles/themes.css';

// Get root element
const rootElement = document.getElementById('root');

if (!rootElement) {
  // Create root element if it doesn't exist (fallback)
  const newRoot = document.createElement('div');
  newRoot.id = 'root';
  document.body.appendChild(newRoot);
  
  console.error('Root element not found in HTML. Created dynamically.');
}

// Create root
const root = ReactDOM.createRoot(rootElement || document.getElementById('root'));

// Render app
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// Optional: Measure performance
// import reportWebVitals from './reportWebVitals';
// reportWebVitals(console.log);
