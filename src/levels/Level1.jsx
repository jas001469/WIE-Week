import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImg from "../images/background.png";
import sudokuGridImg from "../images/soduku.png";
import robotImg from "../images/robot.png";
import { useTimer } from "../components/TimerContext.jsx";


const echoRiddles = [
  {
    intro: "Symmetry hides, but patterns shine.",
    fullRiddle: `1. Trace the path of symmetry, find the center.  
(There lies your first digit.)

2. Now, from the heart, jump diagonally northeast.  
(It's a narrow path, but a bright one.)

3. Turn to the outer guardians, like the ends of a rainbow. Choose the one you wish you could always go to.
**bottom-left, bottom-right. Choose the bottom right

4. Where dawn unfolds its earliest light.

5. You start anew at dawn's gate —  
one-third through the journey,  
Gravity takes hold.  
You drift with the sun, then descend into the longest shadow.`,
    finalCode: "56187"
  },
  {
    intro: "Stars guide the wise, but only one falls at midnight.",
    fullRiddle: `Find the celestial midpoint, where every path crosses.

1. From the heavens, glide southeast through diagonal stars — land on the third echo.

2. Now turn to the North Wind — the top corners. 3. The one that guards the setting sun holds your third digit.

4. Where the echo of the second row meets the fire of the east — lies your next mark.

5. Trace the fall of Orion — begin on his belt (middle row), move west one-third of the way, then descend until you strike a wall.`,
    finalCode: "57168"
  },
  {
    intro: "Not all structures are built on bricks — some are made of balance.",
    fullRiddle: `1. Seek the axis of reflection. Where left mirrors right and top mirrors bottom, there lies your first truth.

2. A builder once stepped northwest from the center — twice — before he struck gold.

3. In the archive of the ancients, the one who faced the rising sun stood in the lowest shadows.

4. In the tallest tower, where windows catch the morning light, a digit hides.

5. Start at the leftmost point of dawn, rise two levels, then slip east with caution.`,
    finalCode: "56181"
  },
  {
    intro: "Every maze has a heartbeat. Follow its pulse.",
    fullRiddle: `1. Feel the center beat — it pulses from symmetry. Begin there.

2. Trace the lifeblood flowing to its twin in the northeast — two hops away.

3. The exit to the maze lies hidden in a corner, always watching. Pick the corner your instinct trusts most.

4. A whisper came from the sky's edge — where the birds rest at first light.

5. Begin at sunrise's gate. Take a third of the step across, then fall like rain down the column until you reach the root.`,
    finalCode: "51288"
  }
];

export default function SudokuGame() {
  const navigate = useNavigate();
  const selectedRiddle = echoRiddles[Math.floor(Math.random() * echoRiddles.length)];
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState(["", "", "", "", ""]);
  const [message, setMessage] = useState("");
  const [levelCleared, setLevelCleared] = useState(false);
  const [showRiddlePopup, setShowRiddlePopup] = useState(false);
  const [showIntroPopup, setShowIntroPopup] = useState(true);
  const correctUserId = selectedRiddle.finalCode.split("");
  const inputRefs = useRef([]);

  const handleUserIdChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newId = [...userId];
    newId[index] = value;
    setUserId(newId);
    if (value && index < 4) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleSubmit = () => {
    if (userId.join("") === correctUserId.join("")) {
      setMessage("✅ Correct! Level unlocked.");
      setLevelCleared(true);
    } else {
      setMessage("❌ Incorrect ID. Try again.");
    }
  };

  const handleNextLevel = () => {
    navigate("/Level2", { state: { userName, level1Completed: true } });
  };

    const { startTimer } = useTimer();

  useEffect(() => {
    startTimer();
  }, []);

  return (
    <div style={{
      height: '100vh',
      width: '100vw',
      background: `radial-gradient(circle at 50% 50%, #2a0a0a 0%, #1a0000 30%, #0a0000 70%, #000 100%), url(${backgroundImg})`,
      position: 'fixed',
      top: 0,
      left: 0,
      padding: '20px',
      color: '#ff4444',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: "'Courier New', monospace"
    }}>
      <style>{`
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px #ff0000, inset 0 0 20px rgba(255, 0, 0, 0.1); }
          50% { box-shadow: 0 0 30px #ff0000, 0 0 40px #ff0000, inset 0 0 30px rgba(255, 0, 0, 0.2); }
        }
        @keyframes glitch {
          0% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
          100% { transform: translate(0); }
        }
        @keyframes scan {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100vw); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Background effects */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `radial-gradient(circle at 20% 20%, rgba(255, 0, 0, 0.15) 0%, transparent 50%),
                    radial-gradient(circle at 80% 80%, rgba(139, 0, 0, 0.15) 0%, transparent 50%)`,
        pointerEvents: 'none',
        animation: 'scan 3s linear infinite'
      }}></div>

      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `linear-gradient(45deg, transparent 48%, rgba(255, 0, 0, 0.02) 49%, rgba(255, 0, 0, 0.02) 51%, transparent 52%),
                    linear-gradient(-45deg, transparent 48%, rgba(139, 0, 0, 0.02) 49%, rgba(139, 0, 0, 0.02) 51%, transparent 52%)`,
        backgroundSize: '20px 20px',
        pointerEvents: 'none'
      }}></div>

      <h1 style={{
        position: 'absolute',
        top: '2vh',
        left: '2vw',
        fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
        fontWeight: 'bold',
        color: '#ff0000',
        textShadow: '0 0 20px #ff0000, 0 0 40px #ff0000',
        zIndex: 10,
        borderBottom: '#ff0000 2px solid'
      }}>LEVEL 1</h1>

      <div style={{
        position: 'absolute',
        top: '1vh',
        right: '1vw',
        zIndex: 10,
        fontSize: '0.85em',
        padding: '4px 8px'
      }}>
        <button
          onClick={() => setShowRiddlePopup(true)}
          style={{
            background: 'transparent',
            border: '2px solid #ff0000',
            borderRadius: '10px',
            padding: '18px 32px',
            fontSize: '1.3rem',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            opacity: 1,
            fontWeight: 'bold',
            color: '#ff0000',
            boxShadow: '0 0 20px #ff0000, inset 0 0 20px rgba(255, 0, 0, 0.1)',
            animation: 'pulse-glow 2s infinite'
          }}
        >
          Echo Riddles
        </button>
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: '4vw',
        flex: 1,
        marginTop: '15vh',
        position: 'relative',
        zIndex: 5,
        height: 'calc(100vh - 15vh)'
      }}>
        <div style={{
          flex: 1,
          maxWidth: 'min(400px, 45vw)'
        }}>
          <p style={{
            color: '#ff6666',
            fontSize: 'clamp(0.7rem, 1.5vw, 0.9rem)',
            marginBottom: '5px',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            border: '#ff0000 2px solid'
          }}>CIPHER GRID ACTIVATE v1.0</p>
          <h2 style={{
            color: '#ff0000',
            fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
            marginBottom: '20px',
            textShadow: '0 0 10px #ff0000'
          }}>// SUDOKODE</h2>
          <img src={sudokuGridImg} alt="Sudoku Grid" style={{
            width: '100%',
            height: 'auto',
            maxHeight: '90vh',
            maxWidth: '100vw',
            objectFit: 'contain',
            border: '2px solid #ff4444',
            borderRadius: '18px',
            boxShadow: '0 0 60px rgba(255, 68, 68, 0.7), inset 0 0 60px rgba(255, 68, 68, 0.22)',
            background: 'rgba(255, 68, 68, 0.16)',
            padding: '36px'
          }} />
        </div>

        <div style={{
          flex: 1,
          maxWidth: 'min(600px, 60vw)',
          background: 'rgba(0, 0, 0, 0.7)',
          border: '2px solid #ff0000',
          borderRadius: '20px',
          padding: 'clamp(25px, 5vw, 50px)',
          boxShadow: '0 0 40px rgba(255, 0, 0, 0.4), inset 0 0 40px rgba(255, 0, 0, 0.15)',
          backdropFilter: 'blur(12px)',
          maxHeight: '85vh',
          overflowY: 'auto'
        }}>
          <label style={{
            display: 'block',
            color: '#ff6666',
            fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)',
            textTransform: 'uppercase',
            letterSpacing: '1.5px',
            marginBottom: '14px'
          }}>//INPUT AGENT NAME</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              background: 'rgba(0, 0, 0, 0.8)',
              border: '2px solid #ff4444',
              borderRadius: '8px',
              color: '#ff6666',
              fontFamily: "'Courier New', monospace",
              fontSize: 'clamp(0.8rem, 1.5vw, 1rem)',
              marginBottom: '20px',
              transition: 'all 0.3s ease'
            }}
          />

          <label style={{
            display: 'block',
            color: '#ff6666',
            fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)',
            textTransform: 'uppercase',
            letterSpacing: '1.5px',
            marginBottom: '14px',
            marginTop: '1rem'
          }}>//OBJECTIVE</label>
          <p style={{
            color: '#ff6666',
            fontSize: 'clamp(0.7rem, 1.2vw, 0.9rem)',
            lineHeight: '1.4',
            marginBottom: '20px',
            opacity: '0.8'
          }}>
            Use the riddle to decrypt the 5-digit Agent Key.  
            Focus on position, not arithmetic. Let the grid speak.
          </p>

          <label style={{
            display: 'block',
            color: '#ff6666',
            fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)',
            textTransform: 'uppercase',
            letterSpacing: '1.5px',
            marginBottom: '14px'
          }}>//ACCESS: INPUT AGENT KEY</label>
          <div style={{
            display: 'flex',
            gap: '10px',
            marginBottom: '15px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            {userId.map((digit, i) => (
              <input
                key={i}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleUserIdChange(i, e.target.value)}
                ref={(el) => (inputRefs.current[i] = el)}
                style={{
                  width: 'clamp(40px, 8vw, 50px)',
                  height: 'clamp(40px, 8vw, 50px)',
                  background: 'rgba(0, 0, 0, 0.8)',
                  border: '2px solid #ff0000',
                  borderRadius: '8px',
                  color: '#ff0000',
                  fontFamily: "'Courier New', monospace",
                  fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  transition: 'all 0.3s ease'
                }}
              />
            ))}
          </div>

          <p style={{
            color: '#888',
            fontSize: 'clamp(0.8rem, 1.5vw, 1.1rem)',
            fontStyle: 'italic',
            textAlign: 'center',
            marginBottom: '20px'
          }}>Only true agents will decode this.</p>

          <button onClick={handleSubmit} style={{
            width: '100%',
            padding: '15px',
            background: 'linear-gradient(45deg, #ff0000, #cc0000)',
            border: 'none',
            borderRadius: '10px',
            color: 'white',
            fontFamily: "'Courier New', monospace",
            fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 0 20px rgba(255, 0, 0, 0.3)'
          }}>
            SUBMIT
          </button>

          {message && <p style={{
            marginTop: '20px',
            textAlign: 'center',
            fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)',
            fontWeight: 'bold',
            color: message.startsWith("✅") ? '#00ff88' : '#ff5555'
          }}>{message}</p>}

          {levelCleared && (
            <button onClick={handleNextLevel} style={{
              width: '100%',
              padding: '15px',
              background: 'linear-gradient(45deg, #8b0000, #cc0000)',
              border: 'none',
              borderRadius: '10px',
              color: 'white',
              fontFamily: "'Courier New', monospace",
              fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 0 20px rgba(139, 0, 0, 0.3)',
              marginTop: '15px'
            }}>
              NEXT LEVEL →
            </button>
          )}
        </div>
      </div>

      <div style={{
        position: 'fixed',
        bottom: '2vh',
        left: '2vw',
        zIndex: 10,
        display: 'flex',
        alignItems: 'flex-end',
        gap: '20px'
      }}>
        <img src={robotImg} alt="Robot" style={{
          width: 'clamp(160px, 28vw, 220px)',
          height: 'auto',
          filter: 'drop-shadow(0 0 10px #ff4444)'
        }} />
        <div style={{
          background: 'rgba(0, 0, 0, 0.9)',
          border: '2px solid #ff4444',
          borderRadius: '15px',
          padding: '15px',
          maxWidth: 'min(300px, 25vw)',
          position: 'relative',
          boxShadow: '0 0 20px rgba(255, 68, 68, 0.3)'
        }}>
          <div style={{
            color: '#ff6666',
            fontStyle: 'italic',
            fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)',
            lineHeight: '1.4',
            fontFamily: "'Courier New', monospace"
          }}>{selectedRiddle.intro}</div>
        </div>
      </div>

      {showRiddlePopup && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
          backdropFilter: 'blur(5px)'
        }}>
          <div style={{
            background: 'rgba(0, 0, 0, 0.9)',
            border: '2px solid #ff4444',
            borderRadius: '15px',
            padding: '30px',
            maxWidth: 'min(600px, 90vw)',
            width: '90%',
            maxHeight: '80vh',
            overflowY: 'auto',
            boxShadow: '0 0 30px rgba(255, 68, 68, 0.3), inset 0 0 30px rgba(255, 68, 68, 0.1)',
            animation: 'fadeIn 0.4s ease-in-out'
          }}>
            <h2 style={{
              color: '#ff4444',
              marginBottom: '20px',
              textAlign: 'center',
              textShadow: '0 0 10px #ff4444',
              fontSize: 'clamp(1.2rem, 3vw, 1.5rem)'
            }}>Echo Riddle</h2>
            <p style={{
              fontSize: '0.9rem',
              whiteSpace: 'pre-line',
              color: '#ff6666',
              lineHeight: '1.6'
            }}>
              {selectedRiddle.fullRiddle}
            </p>
            <button
              onClick={() => setShowRiddlePopup(false)}
              style={{
                width: '100%',
                padding: '12px',
                background: 'linear-gradient(45deg, #ff0000, #cc0000)',
                border: 'none',
                borderRadius: '8px',
                color: 'white',
                fontFamily: "'Courier New', monospace",
                fontWeight: 'bold',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                marginTop: '1.5rem'
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {showIntroPopup && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
          backdropFilter: 'blur(5px)'
        }}>
          <div style={{
            background: 'rgba(0, 0, 0, 0.9)',
            border: '2px solid #ff4444',
            borderRadius: '15px',
            padding: '30px',
            maxWidth: 'min(600px, 90vw)',
            width: '90%',
            maxHeight: '80vh',
            overflowY: 'auto',
            boxShadow: '0 0 30px rgba(255, 68, 68, 0.3), inset 0 0 30px rgba(255, 68, 68, 0.1)',
            animation: 'fadeIn 0.4s ease-in-out',
            color: '#ff6666',
            lineHeight: '1.6'
          }}>
            <h2 style={{
              color: '#ff4444',
              marginBottom: '20px',
              textAlign: 'center',
              textShadow: '0 0 10px #ff4444',
              fontSize: 'clamp(1.2rem, 3vw, 1.5rem)'
            }}>[ECHO SYSTEM INITIALIZED...]</h2>
            <p>Agent welcome.</p>
            <p>The cipher lies beneath the surface.  
            This time, the symmetry is broken—but not lost.  
            Order is chaos in disguise. Five digits. One shot.</p>
            <p>Pattern matters. Pay attention to position, not prominence.  
            Decrypt the Key ID. This is not arithmetic—it's awareness.</p>
            <button
              onClick={() => setShowIntroPopup(false)}
              style={{
                width: '100%',
                padding: '12px',
                background: 'linear-gradient(45deg, #00aa00, #008800)',
                border: 'none',
                borderRadius: '8px',
                color: 'white',
                fontFamily: "'Courier New', monospace",
                fontWeight: 'bold',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                marginTop: '1.5rem'
              }}
            >
              Begin
            </button>
          </div>
        </div>
      )}
    </div>
  );
}