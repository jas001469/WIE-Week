import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ClockVideo from "../components/ClockVideo.jsx";
import DigitCodeInput from "../components/DigitalCodeInput.jsx";
import CodeChallenge from "../components/CodeChallenge.jsx";
import echoRobot from "../images/echo-robot.png";
import backgroundImage from "../images/level2bg.png";

export default function LevelTwo() {
  const navigate = useNavigate();
  const [showCodeInput, setShowCodeInput] = useState(true);
  const [showCodeChallenge, setShowCodeChallenge] = useState(false);
  const [levelCompleted, setLevelCompleted] = useState(false);
  const [fadeTransition, setFadeTransition] = useState(false);
  const [showCongrats, setShowCongrats] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const defaultText = "Welcome to the Clockwork Loop, Agent.Time is folding.Each tick hides a digit.The hour rewinds, the minute sparks chaos.Crack the code before the loop resets.Nemora is listening...";
  const hintText = "The throne stands above. The middle bears its echo. The base holds it all. Their totals aren't just numbers — shift them where A begins at 1. Read downward.";
  const [dialogueText, setDialogueText] = useState(defaultText);

  const handleCodeCorrect = () => {
    setShowCongrats(true);
    setDialogueText(
      "Agent, numbers weren't all.Nemora sealed her core in a puzzle where mass means truth.The pyramid lies gravity is gone.See with logic, not eyes.Decode its burden. From throne to dust, it remembers"
    );
    setTimeout(() => {
      setFadeTransition(true);
      setShowCongrats(false);
      setTimeout(() => {
        setShowCodeInput(false);
        setShowCodeChallenge(true);
        setFadeTransition(false);
      }, 400);
    }, 1200);
  };

  const handleChallengePass = () => {
    setLevelCompleted(true);
    // Redirect to Level 3 after a short delay
    setTimeout(() => {
      navigate("/Level3");
    }, 1500);
  };

  const handleShowHint = () => {
    setDialogueText(hintText);
    setShowHint(true);
  };

  return (
    <div style={{
      backgroundImage: `linear-gradient(to bottom, rgba(11, 11, 11, 0.4), rgba(26, 0, 0, 0.4)), url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      minHeight: '100vh',
      width: '100vw',
      padding: '0 20px 40px',
      boxSizing: 'border-box',
      overflowX: 'hidden',
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      fontFamily: "'Orbitron', 'Courier New', monospace",
      color: '#f1f1f1'
    }}>
      <style>{`
        @keyframes floatY {
          0% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
          100% { transform: translateY(0); }
        }
      `}</style>

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '24px 10px 10px'
      }}>
        <h1 style={{
          fontSize: '2rem',
          color: '#ffffff',
          letterSpacing: '3px',
          textShadow: '0 0 4px #ff003c, 0 0 8px #ff003c, 0 0 12px #ff003c, 0 0 20px #ff003c',
          borderBottom: '3px solid #ff003c',
          paddingBottom: '6px',
          display: 'inline-block',
          marginBottom: '10px'
        }}>LEVEL TWO</h1>
        
        <div style={{
          background: '#1a1a1a',
          padding: '10px 18px',
          borderRadius: '8px',
          boxShadow: '0 0 10px #ff003c',
          color: '#ff003c',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          fontSize: '0.95rem'
        }}>ECHO HINTS</div>
      </div>

      <div style={{
        display: 'flex',
        gap: '30px',
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexWrap: 'wrap'
      }}>
        <div style={{
          flex: 1,
          minWidth: '280px',
          maxWidth: '480px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <div style={{
            border: '2px solid #ff003c',
            padding: '10px 20px',
            borderRadius: '10px',
            background: '#1a1a1a',
            marginBottom: '20px',
            textAlign: 'center',
            width: '100%',
            maxWidth: '225px'
          }}>
            <h2 style={{
              color: '#ff003c',
              margin: 0,
              fontSize: '1.4rem',
              fontFamily: "'Orbitron', monospace",
              textShadow: '0 0 6px #ff003c'
            }}>The Clockwork Loop</h2>
          </div>
          
          <ClockVideo />
          
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            marginTop: '40px',
            gap: '12px',
            maxWidth: '100%',
            width: '100%',
            position: 'relative',
            animation: 'floatY 3s ease-in-out infinite',
            zIndex: 2
          }}>
            <img src={echoRobot} alt="Echo Robot" style={{
              width: '150px',
              height: 'auto',
              filter: 'drop-shadow(0 0 10px red)'
            }} />
            <div style={{
              background: 'rgba(31, 31, 31, 0.9)',
              color: '#f1f1f1',
              padding: '10px 14px',
              borderRadius: '10px',
              boxShadow: '0 0 10px #ff0000',
              fontSize: '0.9rem',
              lineHeight: '1.4',
              flex: 1,
              zIndex: 2,
              backdropFilter: 'blur(10px) saturate(180%)'
            }}>
              <p>{dialogueText}</p>
            </div>
          </div>
        </div>

        <div style={{
          flex: 1,
          minWidth: '280px',
          maxWidth: '480px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <div style={{
            transition: 'opacity 0.4s ease-in-out',
            opacity: fadeTransition ? 0 : 1,
            width: '100%'
          }}>
            {showCodeInput && <DigitCodeInput onCorrect={handleCodeCorrect} />}
            {showCodeChallenge && (
              <CodeChallenge
                onPass={handleChallengePass}
                levelCompleted={levelCompleted}
                onThreeFails={handleShowHint}
              />
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media screen and (max-width: 1024px) {
          .level-two-layout {
            flex-direction: column;
            align-items: center;
          }
        
          .top-header {
            flex-direction: column;
            gap: 10px;
            text-align: center;
          }
        
          .left-section, .right-section {
            max-width: 100%;
            padding: 0 10px;
          }
        
          .robot-hint-container {
            flex-direction: column;
            align-items: center;
            text-align: center;
          }
        
          .robot-dialogue {
            font-size: 0.85rem;
            padding: 10px;
          }
        
          .robot-img {
            width: 120px;
          }
        
          .clock-video {
            max-width: 220px;
          }
        
          .clockwork-box {
            max-width: 180px;
            padding: 8px 14px;
          }
        
          .clockwork-box .panel-title {
            font-size: 1.2rem;
          }
        }
        
        @media screen and (max-width: 600px) {
          .digit-box {
            width: 48px;
            height: 58px;
            font-size: 1.6rem;
          }
        
          .submit-button,
          .check-button {
            padding: 8px 16px;
            font-size: 0.9rem;
          }
        
          .hint-box {
            font-size: 0.8rem;
            padding: 8px 12px;
          }
        
          .game-heading {
            font-size: 1.5rem;
          }
        
          .code-challenge-editor {
            padding: 12px;
          }
        
          .code-block,
          .code-blank {
            font-size: 0.85rem;
          }
        
          .clock-video {
            max-width: 180px;
          }
        }
        
        @media screen and (max-width: 1024px) {
          .level-two-wrapper {
            overflow-y: auto;
            height: auto;
            min-height: 100vh;
          }
        
          body, html {
            overflow-y: auto;
            overflow-x: hidden;
          }
        }
        
        @media screen and (max-width: 1024px) {
          .level-two-layout {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 20px 0;
          }
        
          .left-section,
          .right-section {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }
        
          .robot-hint-container {
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}