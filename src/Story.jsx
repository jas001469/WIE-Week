import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Story.css';
import echoImg from './images/echo.png';
import background from './images/bg2.png';

const storyline = [
  "Hello Agent, I'm ECHO 👋",
  "Your mission begins here.",
  "Solve each puzzle to stop Nemora.",
  "Let the cryptic hunt begin!"
];

const EchoStory = () => {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (index < storyline.length - 1) {
      const timer = setTimeout(() => setIndex(index + 1), 3000);
      return () => clearTimeout(timer);
    }
  }, [index]);

  const handleStartHunt = () => {
    navigate('/level1');
  };

  return (
    <div
      className="echo-page"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="echo-bot-section">
        <img src={echoImg} alt="Echo" className="echo-img" />
        <div className="chat-bubble">
          <p>{storyline[index]}</p>
        </div>
      </div>
      
      <button 
        className="start-hunt-button"
        onClick={handleStartHunt}
      >
        START YOUR HUNT
      </button>
    </div>
  );
};

export default EchoStory;