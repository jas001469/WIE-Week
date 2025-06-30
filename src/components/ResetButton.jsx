import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTimer } from './TimerContext';

const ResetButton = () => {
  const navigate = useNavigate();
  const { resetTimer } = useTimer();

  const handleReset = () => {
    resetTimer();
    navigate('/Level1');
  };

  return (
    <button
      onClick={handleReset}
      style={{
        marginTop: '20px',
        padding: '10px 20px',
        backgroundColor: '#FF4444',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '1rem',
        fontFamily: "'Courier New', monospace",
        boxShadow: '0 0 10px rgba(255, 68, 68, 0.5)',
        transition: 'background 0.3s ease'
      }}
    >
      🔁 Reset & Go to Level 1
    </button>
  );
};

export default ResetButton;
