import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ModalContextProvider } from './context/ModalContext';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ModalContextProvider>
      <App />
    </ModalContextProvider>
  </React.StrictMode>
);

