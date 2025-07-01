import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTimer } from './TimerContext';

const ResetButton = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { resetTimer } = useTimer();

  // Hide on Home and Story
  if (location.pathname === '/' || location.pathname === '/Story') return null;

  const handleReset = () => {
    resetTimer();
    navigate('/Level1');
  };

  return (
  <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 9999 }}>
    <button
      onClick={handleReset}
      style={{
        padding: '14px 28px',
        background: 'linear-gradient(135deg, #FF4444, #8B0000)',
        color: '#FFFFFF',
        border: '2px solid #FF8888',
        borderRadius: '12px',
        fontSize: '1rem',
        fontWeight: 'bold',
        fontFamily: "'Courier New', monospace",
        cursor: 'pointer',
        textShadow: '0 0 6px rgba(255, 255, 255, 0.3)',
        boxShadow: '0 0 15px rgba(255, 68, 68, 0.6)',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.05)';
        e.currentTarget.style.boxShadow = '0 0 25px rgba(255, 68, 68, 0.9)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = '0 0 15px rgba(255, 68, 68, 0.6)';
      }}
    >
      Reset Time & Go to Level 1
    </button>
  </div>
);
};

export default ResetButton;
