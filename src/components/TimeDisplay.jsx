import React from 'react';
import { useLocation } from 'react-router-dom';
import { useTimer } from './TimerContext';

const formatTime = (seconds) => {
  const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
  const secs = String(seconds % 60).padStart(2, '0');
  return `${mins}:${secs}`;
};

const TimerDisplay = () => {
  const { seconds } = useTimer();
  const location = useLocation();

  // Hide on Home and Story pages
  if (location.pathname === '/' || location.pathname === '/Story') return null;

  return (
    <div style={{
      position: 'fixed',
      top: '630px',
      right: '20px',
      padding: '10px 20px',
      background: 'rgba(0, 0, 0, 0.8)',
      color: '#00FFFF',
      fontSize: '18px',
      fontWeight: 'bold',
      border: '2px solid #00FFFF',
      borderRadius: '10px',
      zIndex: 9999,
      boxShadow: '0 0 10px #00FFFF',
      fontFamily: "'Courier New', monospace"
    }}>
      ⏱ {formatTime(seconds)}
    </div>
  );
};

export default TimerDisplay;
