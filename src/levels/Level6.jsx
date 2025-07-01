import React, { useState } from 'react';
import qrCode from '../images/qr-code.png';
import backg from '../images/backg.png'; // ✅ Background image
import { useTimer } from '../components/TimerContext.jsx';

const formatTime = (seconds) => {
  const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
  const secs = String(seconds % 60).padStart(2, '0');
  return `${mins}:${secs}`;

};

const Level6 = () => {
  const [showHints, setShowHints] = useState(false);
  const { stopTimer, finalTime, seconds } = useTimer();

  const handleEnd = () => {
    stopTimer();
    alert(`Timer stopped at: ${formatTime(seconds)}`);

  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundImage: `url(${backg})`, // ✅ Set background
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      padding: '20px',
    }}>
      <div style={{
        background: 'rgba(0, 0, 0, 0.9)',
        border: '3px solid #FF4444',
        borderRadius: '15px',
        padding: '40px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '30px',
        boxShadow: '0 0 30px rgba(255, 68, 68, 0.6)',
        maxWidth: '1400px',
        width: '95%',
        minHeight: '600px',
        animation: 'quantumGlow 8s ease-in-out infinite',
        fontSize: '1.3rem',
        isolation: 'isolate'
      }}>
        <header style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '10px 0',
          borderBottom: '1px solid #FF8888'
        }}>
          <h1 style={{
            fontSize: '1rem',
            color: '#FFFFFF',
            textShadow: '0 0 10px #FF4444'
          }}>LEVEL 6: ECHO MYSTERY: FINAL CASE FILE</h1>
          <div>
            <button style={{
              backgroundColor: '#111',
              border: '2px solid #FF8888',
              color: '#FF8888',
              padding: '8px 16px',
              fontFamily: "'Courier New', monospace",
              fontSize: '0.9rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              textShadow: '0 0 5px rgba(255, 68, 68, 0.6)'
            }} onClick={() => setShowHints(true)}>ECHO HINTS</button>
          </div>
        </header>

        <main style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '40px',
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'flex-start',
            gap: '40px',
            maxWidth: '1200px',
            width: '100%',
            padding: '10px',
          }}>
            <div>
              <img src={qrCode} alt="QR Code" style={{
                width: '280px',
                height: '280px',
                border: '5px solid #FFFFFF',
                borderRadius: '10px',
                background: 'linear-gradient(#111, #111) padding-box, linear-gradient(45deg, #FF4444, #1a0000, #8d2f2f, #FF8888) border-box',
                filter: 'drop-shadow(0 0 20px rgba(255, 68, 68, 0.6))',
                flexShrink: 0
              }} />
            </div>

            <div style={{
              color: '#FFFFFF',
              fontSize: '1.1rem',
              maxWidth: '600px',
              lineHeight: 1.7,
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
            }}>
              <h2 style={{
                fontSize: '1.8rem',
                marginBottom: '8px',
                textShadow: '0 0 15px rgba(255, 68, 68, 0.7)',
                background: 'linear-gradient(45deg, #FF4444, #FF6600, #FF0066)',
                backgroundClip: 'text',
                color: 'transparent',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>TOP SECRET – ACCESS LEVEL: ALPHA</h2>

              <p style={{ color: '#00FFFF', textShadow: '0 0 6px rgba(0, 255, 255, 0.5)' }}>
                “The mind of an AI breaks not from circuits, but from silence.” <span style={{
                  color: '#FFFFFF',
                  textShadow: '0 0 10px rgba(255,255,255,0.5)'
                }}>Echo collapsed at 12:59 PM. Only four entered that day. One shattered her mind.
                  The logs don't agree. The room doesn't lie. The traitor left no prints — just patterns.</span>
              </p>

              <p style={{
                fontWeight: 'bold',
                color: '#FF8888',
                textShadow: '0 0 10px rgba(255, 68, 68, 0.6)'
              }}>
                MISSION: Identify the saboteur who allowed Nemora's corrupted logic to enter Echo. Only one is guilty. Three are distractions. Trust no logs. Cross-reference stories. Think emotionally, not just mechanically. Dare to dive into the digital abyss?
              </p>

              <p style={{
                fontWeight: 'bold',
                color: '#ffffff',
                textShadow: '0 0 8px rgba(255,255,255,0.2)',
              }}>
                Your Task: From the conflicting stories above, identify the real saboteur. Submit their name in the answer box to complete the Cryptic Hunt. First correct submission wins.
              </p>
            </div>
          </div>
        </main>

        {showHints && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0, 0, 0, 0.85)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
            padding: '20px',
            boxSizing: 'border-box'
          }}>
            <div style={{
              background: '#111',
              border: '2px solid #FF8888',
              borderRadius: '12px',
              padding: '30px 40px',
              maxWidth: '600px',
              width: '90%',
              color: '#f5f5f5',
              boxShadow: '0 0 30px rgba(255, 68, 68, 0.6)',
              textAlign: 'left',
              fontSize: '1rem',
              animation: 'fadeIn 0.3s ease-in-out'
            }}>
              <h2 style={{
                color: '#FF4444',
                textShadow: '0 0 10px rgba(255, 68, 68, 0.6)',
                fontSize: '1.8rem',
                marginBottom: '15px'
              }}>ECHO HINTS</h2>
              <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', marginTop: '10px' }}>
                <li style={{ marginBottom: '10px', lineHeight: 1.6 }}>Only one person was seen near the Core Room, but never logged access.</li>
                <li style={{ marginBottom: '10px', lineHeight: 1.6 }}>Only one person's job leaves no trace in code — just in how Echo feels.</li>
                <li style={{ marginBottom: '10px', lineHeight: 1.6 }}>Echo didn't break mechanically — she broke emotionally.</li>
              </ul>
              <button onClick={() => setShowHints(false)} style={{
                marginTop: '20px',
                padding: '10px 20px',
                fontSize: '1rem',
                backgroundColor: '#FF4444',
                color: '#000',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontFamily: "'Courier New', monospace",
                transition: 'background 0.3s ease'
              }}>
                Close
              </button>
            </div>
          </div>
        )}

        <button onClick={handleEnd} style={{
          marginTop: '40px',
          backgroundColor: '#ff4757',
          color: '#fff',
          padding: '14px 28px',
          border: 'none',
          borderRadius: '10px',
          fontSize: '18px',
          cursor: 'pointer',
          boxShadow: '0 4px 14px rgba(0,0,0,0.2)',
          transition: 'all 0.3s ease',
        }}
          onMouseOver={e => (e.target.style.backgroundColor = '#e84118')}
          onMouseOut={e => (e.target.style.backgroundColor = '#ff4757')}
        >
          🛑 End Timer
        </button>

        {finalTime !== null && (
          <p style={{
            marginTop: '30px',
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#00ffcc',
            textShadow: '0 0 10px #00ffcc'
          }}>
            Final Time: ⏱ {formatTime(finalTime)}
          </p>
        )}
      </div>
    </div>
  );
};

export default Level6;