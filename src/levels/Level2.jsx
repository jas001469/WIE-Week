import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ClockVideo from "../components/ClockVideo.jsx";
import DigitCodeInput from "../components/DigitalCodeInput.jsx";
import CodeChallenge from "../components/CodeChallenge.jsx";
import echoRobot from "../images/echo-robot.png";
import backgroundImage from "../images/level2bg.png";

const introMessages = [
  "Agent, align your mind. Time will twist, stay sharp.",
  "Every tick you hear is a clue — or a warning.",
  "Only fools chase minutes. Seek the message hidden beneath.",
  "Nemora mocks those who rush. Patience deciphers chaos.",
  "Let’s prove we are worthy enough to play this game.",
];

export default function LevelTwo() {
  const navigate = useNavigate();
  const [showCodeInput, setShowCodeInput] = useState(true);
  const [showCodeChallenge, setShowCodeChallenge] = useState(false);
  const [levelCompleted, setLevelCompleted] = useState(false);
  const [fadeTransition, setFadeTransition] = useState(false);
  const [showCongrats, setShowCongrats] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const hintText =
    "The throne stands above. The middle bears its echo. The base holds it all. Their totals aren't just numbers — shift them where A begins at 1. Read downward.";

  const defaultText =
    introMessages[Math.floor(Math.random() * introMessages.length)];

  const [dialogueText, setDialogueText] = useState(defaultText);

  const handleCodeCorrect = () => {
    setShowCongrats(true);
    setDialogueText(
      "Agent, numbers weren't all. Nemora sealed her core in a puzzle where mass means truth. The pyramid lies, gravity is gone. See with logic, not eyes. Decode its burden. From throne to dust, it remembers."
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
    setTimeout(() => {
      navigate("/Level3");
    }, 1500);
  };

  const handleShowHint = () => {
    setDialogueText(hintText);
    setShowHint(true);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        padding: "0 20px 40px",
        boxSizing: "border-box",
        overflowX: "hidden",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        backgroundImage: `linear-gradient(to bottom, rgba(11, 11, 11, 0.4), rgba(26, 0, 0, 0.4)), url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        fontFamily: "'Orbitron', 'Courier New', monospace",
        color: "#f1f1f1",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "24px 10px 10px",
          flexWrap: "wrap",
        }}
      >
        <h1
          style={{
            fontSize: "2rem",
            color: "#fff",
            letterSpacing: "3px",
            textShadow:
              "0 0 4px #ff003c, 0 0 8px #ff003c, 0 0 12px #ff003c, 0 0 20px #ff003c",
            borderBottom: "3px solid #ff003c",
            paddingBottom: "6px",
            display: "inline-block",
            marginBottom: "10px",
            fontFamily: "Orbitron, monospace",
          }}
        >
          LEVEL TWO
        </h1>

        <div
          onClick={handleShowHint}
          style={{
            background: "#1a1a1a",
            padding: "10px 18px",
            borderRadius: "8px",
            boxShadow: "0 0 10px #ff003c",
            color: "#ff003c",
            fontWeight: "bold",
            textTransform: "uppercase",
            fontSize: "0.95rem",
            fontFamily: "Orbitron, monospace",
            cursor: "pointer",
          }}
        >
          ECHO HINTS
        </div>
      </div>

      {/* Main Layout */}
      <div
        style={{
          display: "flex",
          gap: "30px",
          justifyContent: "center",
          alignItems: "flex-start",
          flexWrap: "wrap",
        }}
      >
        {/* Left Section */}
        <div
          style={{
            flex: 1,
            minWidth: "280px",
            maxWidth: "480px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              border: "2px solid #ff003c",
              padding: "10px 20px",
              borderRadius: "10px",
              background: "#1a1a1a",
              marginBottom: "20px",
              textAlign: "center",
              width: "100%",
              maxWidth: "225px",
            }}
          >
            <h2
              style={{
                color: "#ff003c",
                margin: 0,
                fontSize: "1.5rem",
                fontWeight: "bold",
                textShadow: "0 0 6px #ff003c",
                fontFamily: "Orbitron, monospace",
              }}
            >
              The Clockwork Loop
            </h2>
          </div>

          <ClockVideo />

          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              marginTop: "40px",
              gap: "12px",
              maxWidth: "100%",
              width: "100%",
              position: "relative",
              animation: "floatY 3s ease-in-out infinite",
              zIndex: 2,
              flexWrap: "wrap",
            }}
          >
            <img
              src={echoRobot}
              alt="Echo Robot"
              style={{
                width: "150px",
                height: "auto",
                filter: "drop-shadow(0 0 10px red)",
              }}
            />
            <div
              style={{
                background: "rgba(31, 31, 31, 0.9)",
                color: "#f1f1f1",
                padding: "10px 14px",
                borderRadius: "10px",
                boxShadow: "0 0 10px #ff0000",
                fontSize: "0.9rem",
                lineHeight: 1.4,
                flex: 1,
                zIndex: 2,
                backdropFilter: "blur(10px) saturate(180%)",
                WebkitBackdropFilter: "blur(10px) saturate(180%)",
                maxWidth: "590px",
                width: "100%",
              }}
            >
              <p>{dialogueText}</p>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div
          style={{
            flex: 1,
            minWidth: "280px",
            maxWidth: "480px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              transition: "opacity 0.4s ease-in-out",
              width: "100%",
              opacity: fadeTransition ? 0 : 1,
            }}
          >
            {showCodeInput && (
              <>
                <div
                  style={{
                    border: "2px solid #ff003c",
                    borderRadius: "10px",
                    padding: "20px",
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                    color: "#f1f1f1",
                    fontFamily: "'Courier New', monospace",
                    whiteSpace: "pre-line",
                    boxShadow: "0 0 12px #ff003c",
                    marginBottom: "30px",
                    textAlign: "left",
                    lineHeight: "1.5",
                  }}
                >
                  <strong style={{ fontSize: "1.1rem", color: "#ff003c" }}>
                    Agent Riddle
                  </strong>
                  <br />
                  Time drifts in two directions, yet leaves a single trail.{"\n"}
                  The first shadow cast by the backward hour holds your starting step.{"\n"}
                  The minute’s fury flashes thrice, in perfect rhythm — do not disturb its dance.{"\n"}
                  And as the loop folds in on itself, the final echoes of the hour whisper the last two truths.{"\n"}
                  Six sparks. One ignition key.{"\n"}
                  Trace their story in order, not motion, but memory.
                </div>

                <DigitCodeInput onCorrect={handleCodeCorrect} />
              </>
            )}

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
    </div>
  );
}
