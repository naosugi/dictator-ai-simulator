import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GameProvider } from './contexts/GameContext';
import './styles/global.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GameProvider>
      <App />
    </GameProvider>
  </React.StrictMode>
);