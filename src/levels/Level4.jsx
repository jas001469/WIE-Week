import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Level4.css';

const Level4 = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showHints, setShowHints] = useState(false);
  const [currentMorse, setCurrentMorse] = useState('');
  const [currentWord, setCurrentWord] = useState('');
  const [revealedIndices, setRevealedIndices] = useState([]);
  const sceneRef = useRef(null);

  // Common 3-5 letter words for the puzzle
  const wordList = [
    'FIRE', 'CODE', 'GAME', 'GLOW', 'ZOOM', 
    'ECHO', 'JAVA', 'LOOP', 'DATA', 'BYTE'
  ];

  // Morse code dictionary
  const morseCode = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.',
    'F': '..-.', 'G': '--.', 'H': '....', 'I': '..', 'J': '.---',
    'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---',
    'P': '.--.', 'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-',
    'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-', 'Y': '-.--',
    'Z': '--..'
  };

  // Initialize random word and morse code
  useEffect(() => {
    const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
    setCurrentWord(randomWord);
    setCurrentMorse(encodeToMorse(randomWord));
    
    // Reveal exactly two random letters initially
    const indices = [];
    while (indices.length < 2) {
      const randomIndex = Math.floor(Math.random() * randomWord.length);
      if (!indices.includes(randomIndex)) {
        indices.push(randomIndex);
      }
    }
    setRevealedIndices(indices);
  }, []);

  const encodeToMorse = (word) => {
    return word.split('').map(char => morseCode[char]).join(' ');
  };

  // Light patterns based on current morse code
  useEffect(() => {
    if (!currentMorse) return;

    const morseParts = currentMorse.split(' ');
    let currentPart = 0;
    let step = 0;
    
    const interval = setInterval(() => {
      const pattern = morseParts[currentPart];
      const symbol = pattern ? pattern[step % pattern.length] : null;
      
      // Control all lights based on current symbol
      const lights = document.querySelectorAll('.light-element');
      lights.forEach(light => {
        light.style.opacity = symbol === '.' ? '1' : 
                             symbol === '-' ? '0.7' : '0.2';
      });
      
      step++;
      if (step >= pattern.length) {
        step = 0;
        currentPart = (currentPart + 1) % morseParts.length;
      }
    }, 300);

    return () => clearInterval(interval);
  }, [currentMorse]);

  // Parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!sceneRef.current) return;
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      sceneRef.current.style.transform = `
        perspective(1000px)
        rotateX(${(y - 0.5) * 5}deg)
        rotateY(${(x - 0.5) * 5}deg)
      `;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim().toUpperCase() === currentWord) {
      setFeedback('Correct! Well done!');
      // Redirect to Level 5 after a short delay
      setTimeout(() => {
        navigate("/Level5");
      }, 1500);
    } else {
      setFeedback('Not quite right. Keep trying!');
    }
  };

  return (
    <div className="level4-container">
      <div className="header">
        <h2>Morse Code Lights</h2>
        <p>Decipher the hidden word from the flashing lights</p>
      </div>
      
      <div className="instructions">
        <h3>How to Solve This Puzzle:</h3>
        <ol>
          <li>Watch the blinking pattern of the lights carefully</li>
          <li>Short blinks (bright) represent dots (•) in Morse code</li>
          <li>Long blinks (dim) represent dashes (–) in Morse code</li>
          <li>Pauses between blinks separate letters</li>
          <li>Match the pattern to the Morse code reference</li>
          <li>Use the two revealed letters to help decode the full word</li>
        </ol>
      </div>

      <div className="hint-panel">
        <button 
          onClick={() => setShowHints(!showHints)}
          className="hint-button"
        >
          {showHints ? 'Hide Reference' : 'Show Morse Reference'}
        </button>
        
        {showHints && (
          <div className="hints">
            <div className="morse-reference">
              <div className="morse-guide">
                <h4>Morse Code Basics:</h4>
                <p><strong>•</strong> = Dot (short flash)</p>
                <p><strong>–</strong> = Dash (long flash)</p>
                <p>Space between letters</p>
                <div className="example">
                  <p><strong>Example:</strong> ... --- ... = SOS</p>
                </div>
              </div>
              
              <div className="morse-table">
                <h4>Morse Code Alphabet:</h4>
                <div className="table-grid">
                  {Object.entries(morseCode).map(([letter, code]) => (
                    <div key={letter} className="morse-row">
                      <span className="letter">{letter}</span>
                      <span className="code">{code}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="letter-display">
        <p>Word Progress:</p>
        <div className="letters">
          {currentWord.split('').map((letter, i) => (
            <span 
              key={i} 
              className={`letter ${revealedIndices.includes(i) ? 'revealed' : ''}`}
            >
              {revealedIndices.includes(i) ? letter : '?'}
            </span>
          ))}
        </div>
        <p className="hint-text">Two letters have been revealed to help you start</p>
      </div>

      <div className="scene" ref={sceneRef}>
        <div className="sky"></div>
        
        <div className="buildings">
          <div className="building">
            <div className="windows">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="window light-element"></div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="street">
          <div className="street-lamp light-element"></div>
          <div className="street-lamp light-element"></div>
        </div>
        
        <div className="cars">
          <div className="car">
            <div className="headlight light-element"></div>
          </div>
        </div>
      </div>
      
      <div className="controls">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter decoded word..."
            maxLength={10}
          />
          <button type="submit" className="submit-button">Decrypt</button>
        </form>
        {feedback && <p className="feedback">{feedback}</p>}
      </div>
    </div>
  );
};

export default Level4;