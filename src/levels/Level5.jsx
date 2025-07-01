import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Timer from "../components/Timer.jsx";
import ProgressBar from "../components/ProgressBar.jsx";
import QuestionPanel from "../components/QuestionPanel.jsx";
import questions from "../components/level5Questions";
import "./Level5.css";
import echoRobot from "../images/echo-robot.png";
import bgImage from "../images/new-bg.png";

export default function Level5() {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(900); // 5 minutes in seconds (changed from 900)
  const [current, setCurrent] = useState(0);
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timer);
          setIsComplete(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleAnswerSubmit = () => {
    const correct = questions[current].a.toLowerCase().trim();
    const user = input.toLowerCase().trim();
    
    if (user === correct) {
      setScore(score + 1);
      setFeedback("✅ Correct! Good job.");
    } else {
      setFeedback("❌ Incorrect answer.");
    }
    
    setInput("");
    
    // Check if this was the last question
    if (current + 1 >= questions.length) {
      setIsComplete(true);
    } else {
      setCurrent(current + 1);
    }
  };

  useEffect(() => {
    if (isComplete) {
      // Redirect to Level 6 after a short delay
      const timer = setTimeout(() => {
        navigate("/Level6", {  // Changed from "/Level6" to "/level6" (case-sensitive)
          state: {
            score,
            totalQuestions: questions.length,
            timeRemaining: timeLeft
          }
        });
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [isComplete, navigate, score, timeLeft]);

  // Calculate progress percentage (fixed to show 100% when all questions answered)
  const progressPercentage = isComplete ? 100 : ((current / questions.length) * 100);

  return (
    <div
      className="level5-container"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <h1 className="level-heading">LEVEL 5</h1>

      <div className="echo-instruction">
        <img src={echoRobot} alt="Echo Robot" className="echo-robot" />
        <div className="robot-dialogue">
          Every second matters. Answer all {questions.length} encrypted protocols before the session self-terminates.
        </div>
      </div>

      <div className="echo-hints right">ECHO HINTS</div>
      <Timer timeLeft={timeLeft} />
      <ProgressBar current={progressPercentage} /> {/* Updated to use percentage */}
      <QuestionPanel
        question={!isComplete ? questions[current] : null}
        input={input}
        setInput={setInput}
        onSubmit={handleAnswerSubmit}
        feedback={feedback}
        isComplete={isComplete}
        score={score}
        currentIndex={current}
        timeLeft={timeLeft}
        totalQuestions={questions.length}
      />
    </div>
  );
}