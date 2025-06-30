import { useNavigate } from "react-router-dom";
import TopBar from "../components/TopBar";
import ChessBoard from "../components/ChessBoard";
import MissionPanel from "../components/MissionPanel";
import CodeInput from "../components/CodeInput";
import ModalViewer from "../components/ModalViewer";
import echoRobot from "../images/echo.png";
import riddles from "../components/riddles.js";
import { useState } from "react";

export default function LevelThree() {
  const navigate = useNavigate();
  const [selectedTile, setSelectedTile] = useState(null);
  const [answer, setAnswer] = useState("");
  const [tileClicks, setTileClicks] = useState(0);
  const [resultMessage, setResultMessage] = useState("");
  const [robotMessage, setRobotMessage] = useState(
    "Nemora's mind hides not in memory or logic, but in chaotic patterns. We found fragments in an old war simulation—64 cells, one silent truth. Most are noise. Some deceive. Only one whispers the end. Unmask the silence. Find the whisper before checkmate."
  );

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
      // Redirect to Level 4 after a short delay
      setTimeout(() => {
        navigate("/Level4");
      }, 1500);
    } else {
      setResultMessage("❌ Incorrect answer. Try again.");
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: "2rem",
      position: "relative"
    }}>
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backdropFilter: "blur(3px)",
        background: "rgba(0, 0, 0, 0)",
        zIndex: -1
      }}></div>

      <div style={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem 1.5rem",
        boxSizing: "border-box"
      }}>
        <TopBar />
        <div style={{
          height: "2px",
          width: "100%",
          background: "red",
          margin: "0.5rem 0"
        }}></div>
      </div>

      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        gap: "3rem",
        flexWrap: "wrap",
        width: "100%",
        maxWidth: "1200px",
        marginTop: "2rem"
      }}>
        <div style={{
          flex: 1,
          minWidth: "300px",
          maxWidth: "400px",
          width: "100%",
          padding: "1rem",
          transform: "scale(0.9)",
          transformOrigin: "top center",
          border: "2px solid rgb(117, 22, 41)",
          boxShadow: "0 0 15px rgb(193, 77, 114)",
          borderRadius: "10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          background: "rgba(0, 0, 0, 0.6)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(19px)",
          marginTop: "-60px"
        }}>
          <div style={{
            position: "relative",
            display: "inline-block",
            fontSize: "1.1rem",
            padding: "0.3rem 1.2rem",
            fontFamily: "Orbitron",
            border: "2px solid white",
            background: "rgba(0, 0, 0, 0.6)",
            marginBottom: "1rem",
            letterSpacing: "1px",
            color: "white"
          }}>
            // CHECKMATE FILES
            <div style={{
              content: "",
              position: "absolute",
              height: "100%",
              width: "4px",
              top: 0,
              left: "-8px",
              backgroundColor: "white"
            }}></div>
            <div style={{
              content: "",
              position: "absolute",
              height: "100%",
              width: "4px",
              top: 0,
              right: "-8px",
              backgroundColor: "white"
            }}></div>
          </div>
          <ChessBoard onTileClick={handleTileClick} />
        </div>

        <div style={{
          flex: 1,
          minWidth: "300px",
          maxWidth: "400px",
          width: "100%",
          padding: "1rem",
          transform: "scale(1)",
          transformOrigin: "top center",
          border: "2px solid rgb(117, 22, 41)",
          boxShadow: "0 0 15px rgb(193, 77, 114)",
          borderRadius: "10px",
          display: "flex",
          flexDirection: "column",
          gap: "0.8rem",
          justifyContent: "flex-start",
          alignItems: "center",
          background: "rgba(0, 0, 0, 0.6)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(19px)",
          marginTop: "-60px"
        }}>
          <MissionPanel />
          <CodeInput
            answer={answer}
            setAnswer={setAnswer}
            onSubmit={handleSubmit}
            showHint={false}
          />

          {resultMessage && (
            <div style={{
              textAlign: "center",
              marginTop: "1rem",
              color: resultMessage.startsWith("✅") ? "lightgreen" : "red"
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

      <div style={{
  position: "fixed",
  bottom: "-30px", // Only define bottom once here
  left: "1rem",
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-end",
  gap: "0.8rem",
  zIndex: 15,
  padding: "0.5rem",
  animation: "floatBot 3s ease-in-out infinite alternate",
  transform: "translateY(40px)"
}}>
        <img 
          src={echoRobot} 
          alt="Robot Assistant" 
          style={{
            width: "160px",
            height: "auto",
            opacity: "0.95",
            pointerEvents: "none",
            transform: "translateY(3px)",
            filter: "drop-shadow(0 0 5px red) drop-shadow(0 0 5px red)"
          }} 
        />
        <div style={{
          background: "rgba(0, 0, 0, 0.4)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          border: "1.5px solid rgba(255, 0, 0, 0.35)",
          borderRadius: "12px",
          padding: "0.6rem 1rem",
          fontFamily: "monospace",
          fontSize: "0.85rem",
          color: "#f5f5f5",
          textShadow: "0 0 3px red",
          boxShadow: "0 0 15px rgba(255, 0, 0, 0.4)",
          maxWidth: "380px",
          textAlign: "center",
          marginBottom: "2rem",
          transition: "all 0.3s ease-in-out"
        }}>
          {robotMessage}
        </div>
      </div>

      <style>{`
        @keyframes floatBot {
          0% { transform: translateY(0); }
          100% { transform: translateY(-10px); }
        }
        
        @media (max-width: 1024px) {
          .main-content {
            flex-direction: column;
            align-items: center;
            gap: 2rem;
          }
        
          .left-panel, .right-panel {
            max-width: 90%;
            transform: scale(1);
          }
        }
        
        @media (max-width: 768px) {
          html, body {
            overflow-y: auto;
            align-items: flex-start;
          }
        
          .top-bar {
            flex-direction: column;
            align-items: center;
            padding: 1rem;
            gap: 0.5rem;
            text-align: center;
          }
        
          .level-title {
            font-size: 1.4rem;
          }
        
          .top-indicators span {
            font-size: 0.75rem;
            padding: 0.3rem 0.5rem;
          }
        
          .main-content {
            flex-direction: column;
            align-items: center;
            padding: 1rem;
            gap: 1.5rem;
          }
        
          .left-panel,
          .right-panel {
            max-width: 95%;
            padding: 1rem;
          }
        
          .chessboard {
            grid-template-columns: repeat(8, 22px);
            grid-template-rows: repeat(8, 22px);
          }
        
          .code-input-area label,
          .input-box {
            width: 100%;
            max-width: 100%;
            font-size: 0.85rem;
          }
        
          .mission-box {
            max-width: 260px;
            font-size: 10px;
            padding: 0.8rem;
            aspect-ratio: unset;
          }
        
          .main-content {
            gap: 1rem;
            padding-bottom: 2rem; 
          }
        
          .robot-container {
            position: static;
            margin-top: 1rem;
            animation: none;
            justify-content: center;
          }
        
          .robot-helper {
            width: 100px;
          }
        
          .robot-dialogue {
            font-size: 0.75rem;
            padding: 0.6rem;
            max-width: 180px;
            margin-bottom: 1rem;
          }
        
          .submit-btn {
            font-size: 0.85rem;
            padding: 0.5rem 1rem;
          }
        
          .hint-box {
            font-size: 0.75rem;
          }
        
          .modal-box {
            width: 95%;
          }
        }
        
        @media (max-width: 480px) {
          .chessboard {
            grid-template-columns: repeat(8, 18px);
            grid-template-rows: repeat(8, 18px);
          }
        
          .section-title {
            font-size: 0.85rem;
            padding: 0.2rem 0.8rem;
          }
        
          .level-title {
            font-size: 1.2rem;
          }
        
          .top-indicators span {
            font-size: 0.65rem;
          }
        
          .submit-btn {
            font-size: 0.75rem;
            padding: 0.4rem 0.9rem;
          }
        
          .robot-helper {
            width: 80px;
          }
        
          .robot-dialogue {
            font-size: 0.7rem;
            padding: 0.4rem 0.8rem;
          }
        }
        @media (max-width: 768px) {
          html, body {
            overflow-y: auto;
            align-items: flex-start;
          }
        
          .top-bar {
            flex-direction: row;        
            justify-content: space-between;
            align-items: center;
            padding: 0.75rem 1rem;
            width: 100%;
            box-sizing: border-box;
            gap: 0.5rem;
          }
        
          .level-title {
            font-size: 1.3rem;
            margin: 0;
            white-space: nowrap;   
          }
        
          .top-indicators span {
            font-size: 0.75rem;
            padding: 0.3rem 0.6rem;
            white-space: nowrap;
            max-width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
        @media (min-width: 769px) {
          .main-content {
            margin-top: 2rem;
          }
        }
        @media (min-width: 1025px) {
          .top-bar {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            z-index: 10;
          }
        
          .main-content {
            margin-top: 4.5rem; 
          }
        }
        @media (max-width: 480px) {
          .left-panel,
          .right-panel {
            max-width: 90%;
            transform: scale(0.9); 
            padding: 0.5rem;
          }
        
          .mission-box {
            max-width: 90%;
            font-size: 10px;
            padding: 0.6rem;
          }
        
          .input-box {
            height: 60px;
            font-size: 0.75rem;
            padding: 0.4rem;
          }
        
          .submit-btn {
            font-size: 0.75rem;
            padding: 0.4rem 0.8rem;
          }
        
          .modal-box {
            padding: 1rem;
          }
        }
        @media (max-width: 900px) and (min-width: 700px) {
          .robot-container {
            position: static;         
            margin-top: 2rem;        
            animation: none;           
            justify-content: center;   
          }
        
          .robot-dialogue {
            margin-bottom: 0;         
          }
        }
        @media (max-width: 1024px) and (min-width: 768px) {
          html, body {
            overflow-y: auto !important;
            align-items: flex-start;
          }
        
          .level3-container {
            padding-bottom: 160px;
          }
        
          .top-bar {
            flex-direction: column; 
            align-items: center;
            gap: 1rem;                 
            padding: 1.5rem 1rem;
          }
        
          .robot-container {
            position: static;
            margin-top: 2rem;
            animation: none;
            justify-content: center;
          }
        
          .left-panel,
          .right-panel {
            max-width: 90%;
            transform: scale(0.95);
          }
        }
      `}</style>
    </div>
  );
}