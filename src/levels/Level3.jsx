import { useNavigate } from "react-router-dom";
import TopBar from "../components/TopBar";
import ChessBoard from "../components/ChessBoard";
import MissionPanel from "../components/MissionPanel";
import ModalViewer from "../components/ModalViewer";
import CodeInput from "../components/CodeInput";
import echoRobot from "../images/echo.png";
import riddles from "../components/riddles.js";
import { useState, useEffect } from "react";
import bgImage from "../images/new-bg.png";

export default function LevelThree() {
  const navigate = useNavigate();
  const [selectedTile, setSelectedTile] = useState(null);
  const [answer, setAnswer] = useState("");
  const [tileClicks, setTileClicks] = useState(0);
  const [resultMessage, setResultMessage] = useState("");
  const [robotMessage, setRobotMessage] = useState("");
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    const introMessages = [
      "Let’s prove ourselves worthy to play this game.",
      "The board awaits your move.",
      "Decode the unknown. E5 might help...",
      "Welcome, strategist. Are you ready?",
      "Only the curious will win.",
      "Before you seek hints, seek within."
    ];
    setRobotMessage(introMessages[Math.floor(Math.random() * introMessages.length)]);
  }, []);

  const handleHintClick = () => {
    setShowHint(true);
    setRobotMessage(
      "Nemora's mind hides not in memory or logic, but in chaotic patterns. We found fragments in an old war simulation—64 cells, one silent truth. Most are noise. Some deceive. Only one whispers the end. Unmask the silence. Find the whisper before checkmate."
    );
  };

  const handleTileClick = (id) => {
    setSelectedTile(id);
    setResultMessage("");
    const updatedClicks = tileClicks + 1;
    setTileClicks(updatedClicks);

    if (updatedClicks === 2 && id !== "E5") {
      setRobotMessage(
        "Not the queen's pawn but the king's first pride, Step two squares forth and claim the wide. A center square where battles ignite—Find this bold step, and you'll be right."
      );
    }
  };

  const handleSubmit = () => {
    const userAnswer = answer.trim().toLowerCase();
    const correctAnswer = riddles["E5"].answer.toLowerCase();

    if (!userAnswer) {
      setResultMessage("❌ Please enter an answer.");
      return;
    }

    if (userAnswer === correctAnswer) {
      setResultMessage("✅ Well done! You've passed the level.");
      setTimeout(() => navigate("/Level4"), 200);
    } else {
      setResultMessage("❌ Incorrect answer. Try again.");
    }
  };

  const level3Container = {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    fontFamily: "'Orbitron', sans-serif",
    overflow: "hidden",
    width: "100%",
    height: "100%"
  };

  const bgOverlay = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backdropFilter: "blur(3px)",
    background: "rgba(0,0,0,0)",
    zIndex: -1
  };

  const topBar = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 1.5rem",
    width: "100%",
    boxSizing: "border-box",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10
  };

  const topbarDivider = { flexGrow: 1 };

  const mainContent = {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: "3rem",
    flexWrap: "wrap",
    width: "100%",
    maxWidth: "1200px",
    marginTop: "4.5rem"
  };

  const panelBase = {
    flex: 1,
    minWidth: "300px",
    marginTop: "-60px",
    background: "rgba(0,0,0,0.6)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    border: "2px solid rgb(117,22,41)",
    boxShadow: "0 0 15px rgb(193,77,114)",
    borderRadius: "10px"
  };

  const leftPanel = {
    ...panelBase,
    maxWidth: "400px",
    width: "100%",
    padding: "1rem",
    transform: "scale(0.9)",
    transformOrigin: "top center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    border: "2px solid red",
    boxShadow: "0 0 15px red"
  };

  const rightPanel = {
    ...panelBase,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: "1rem",
    width: "100%",
    maxWidth: "400px",
    maxHeight: "none",
    gap: "1.2rem"
  };

  const robotContainer = {
    position: "fixed",
    bottom: "-30px",
    left: "1rem",
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    gap: "0.8rem",
    zIndex: 15,
    padding: "0.5rem",
    animation: "floatBot 3s ease-in-out infinite alternate"
  };

  const robotHelper = {
    width: "160px",
    opacity: 0.95,
    pointerEvents: "none",
    transform: "translateY(3px)",
    filter: "drop-shadow(0 0 5px red) drop-shadow(0 0 5px red)"
  };

  const robotDialogue = {
    width: "600px",
    maxWidth: "90vw",
    marginBottom: "4rem",
    background: "rgba(0,0,0,0.4)",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
    border: "1.5px solid rgba(255,0,0,0.35)",
    borderRadius: "12px",
    padding: "0.6rem 1rem",
    fontFamily: "monospace",
    fontSize: "0.85rem",
    color: "#f5f5f5",
    textShadow: "0 0 3px red",
    boxShadow: "0 0 15px rgba(255,0,0,0.4)",
    textAlign: "center"
  };

  return (
    <div style={level3Container}>
      <div style={bgOverlay} />

      <div style={topBar}>
        <TopBar onHintClick={handleHintClick} />
        <div style={topbarDivider} />
      </div>

      <div style={mainContent}>
        <div style={leftPanel}>
          <ChessBoard onTileClick={handleTileClick} />
        </div>

        <div style={rightPanel}>
          <MissionPanel />
          <CodeInput
            answer={answer}
            setAnswer={setAnswer}
            onSubmit={handleSubmit}
            showHint={showHint}
          />
          {resultMessage && (
            <div style={{
              marginTop: "1rem",
              padding: "0.6rem 1rem",
              borderRadius: "8px",
              color: resultMessage.startsWith("✅") ? "#0f0" : "#f00",
              background: resultMessage.startsWith("✅") ? "rgba(0,255,0,0.1)" : "rgba(255,0,0,0.1)",
              fontWeight: "bold",
              textAlign: "center",
              width: "100%"
            }}>
              {resultMessage}
            </div>
          )}
        </div>
      </div>

      <ModalViewer
        selectedTile={selectedTile}
        closeModal={() => setSelectedTile(null)}
        riddle={riddles[selectedTile] || null}
      />

      <div style={robotContainer}>
        <img src={echoRobot} alt="Robot Assistant" style={robotHelper} />
        <div style={robotDialogue}>{robotMessage}</div>
      </div>

      <style>
        {`
          @keyframes floatBot {
            0% { transform: translateY(0); }
            100% { transform: translateY(-10px); }
          }
        `}
      </style>
    </div>
  );
}
