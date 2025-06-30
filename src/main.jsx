import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import { TimerProvider } from './components/TimerContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <TimerProvider>
        <App />
      </TimerProvider>
    </BrowserRouter>
  </React.StrictMode>
);