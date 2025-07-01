import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Level4.css';

const Level4 = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showHints, setShowHints] = useState(false);
  const [currentWord, setCurrentWord] = useState('');
  const [revealedIndices, setRevealedIndices] = useState([]);
  const [blinkStatus, setBlinkStatus] = useState('');
  const [blinkIndex, setBlinkIndex] = useState(0); // index of letter being blinked
  const sceneRef = useRef(null);

  const wordList = ['CODE', 'LAMP', 'NODE', 'SIGN', 'DARK', 'GLOW', 'BYTE', 'PING', 'BEEP', 'WATT'];

  const morseCode = {
    A: '.-', B: '-...', C: '-.-.', D: '-..', E: '.', F: '..-.', G: '--.', H: '....',
    I: '..', J: '.---', K: '-.-', L: '.-..', M: '--', N: '-.', O: '---', P: '.--.',
    Q: '--.-', R: '.-.', S: '...', T: '-', U: '..-', V: '...-', W: '.--',
    X: '-..-', Y: '-.--', Z: '--..'
  };

  useEffect(() => {
    const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
    setCurrentWord(randomWord);
    const indices = [];
    while (indices.length < 1) {
      const rand = Math.floor(Math.random() * randomWord.length);
      if (!indices.includes(rand)) indices.push(rand);
    }
    setRevealedIndices(indices);
  }, []);

  useEffect(() => {
    if (!currentWord) return;
    if (blinkIndex >= currentWord.length) return;

    // Skip revealed letter
    while (revealedIndices.includes(blinkIndex)) {
      setBlinkIndex((prev) => prev + 1);
      return;
    }

    const currentChar = currentWord[blinkIndex];
    const code = morseCode[currentChar.toUpperCase()]?.split('') || [];
    let step = 0;

    setBlinkStatus(`Now blinking for letter ${blinkIndex + 1}`);

    const interval = setInterval(() => {
      if (step < code.length) {
        const symbol = code[step];
        document.querySelectorAll('.light-element').forEach(light => {
          light.style.opacity = symbol === '.' ? '1' : '0.7';
        });
      } else {
        document.querySelectorAll('.light-element').forEach(light => {
          light.style.opacity = '0.1';
        });
      }

      step++;
      if (step > code.length) step = 0;
    }, 800); // Adjust blink speed here

    return () => clearInterval(interval);
  }, [currentWord, blinkIndex, revealedIndices]);

  // Watch for input length to advance blinkIndex
  useEffect(() => {
    const typedIndices = currentWord.split('').map((_, i) =>
      revealedIndices.includes(i) || inputValue.length > i
    );

    const nextIndex = typedIndices.findIndex((v, i) => !v);

    if (nextIndex !== -1 && nextIndex !== blinkIndex) {
      setBlinkIndex(nextIndex);
    }
  }, [inputValue, currentWord, revealedIndices]);

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
      setFeedback('✅ Correct! Well done!');
      setTimeout(() => navigate('/Level5'), 200);
    } else {
      setFeedback('❌ Not quite right. Try again!');
    }
  };

  return (
    <div className="level4-container">
      <div className="header">
        <h2>Morse Code Lights</h2>
        <p>Decode the blinking pattern</p>
      </div>

      <div className="instructions">
        <h3>How to Solve:</h3>
        <ol>
          <li>Short blink = Dot (•), Long blink = Dash (–)</li>
          <li>Breaks between symbols = Letters</li>
          <li>Use hints and revealed letters to decode</li>
        </ol>
      </div>

      <div className="hint-panel">
        <button onClick={() => setShowHints(!showHints)} className="hint-button">
          {showHints ? 'Hide Reference' : 'Show Morse Reference'}
        </button>
        {showHints && (
          <div className="hints">
            <div className="morse-reference">
              <div className="morse-guide">
                <h4>Morse Basics:</h4>
                <p><strong>•</strong> = Dot (short)</p>
                <p><strong>–</strong> = Dash (long)</p>
                <p><em>... --- ...</em> = SOS</p>
              </div>
              <div className="morse-table">
                <h4>Alphabet Table:</h4>
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
            <span key={i} className={`letter ${revealedIndices.includes(i) ? 'revealed' : ''}`}>
              {revealedIndices.includes(i) ? letter : inputValue[i] || '?'}
            </span>
          ))}
        </div>
        <p className="hint-text">One letter revealed to assist you</p>
      </div>

      {blinkStatus && (
        <div className="blink-indicator">
          <p>{blinkStatus}</p>
        </div>
      )}

      <div className="scene" ref={sceneRef}>
        <div className="sky" />
        <div className="buildings">
          <div className="building">
            <div className="windows">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="window light-element" />
              ))}
            </div>
          </div>
        </div>
        <div className="street">
          <div className="street-lamp light-element" />
          <div className="street-lamp light-element" />
        </div>
        <div className="cars">
          <div className="car">
            <div className="headlight light-element" />
          </div>
        </div>
      </div>

      <div className="controls">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value.toUpperCase())}
            placeholder="Enter decoded word..."
            maxLength={currentWord.length}
          />
          <button type="submit" className="submit-button">Decrypt</button>
        </form>
        {feedback && <p className="feedback">{feedback}</p>}
      </div>
    </div>
  );
};

export default Level4;
