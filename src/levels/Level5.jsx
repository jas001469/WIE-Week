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
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes in seconds
  const [current, setCurrent] = useState(0);
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [robotMessage, setRobotMessage] = useState(
    `Every second matters. Answer all ${questions.length} encrypted protocols before the session self-terminates.`
  );

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
    const normalize = (str) => str.toLowerCase().replace(/\s+/g, "").trim();
const correct = normalize(questions[current].a);
const user = normalize(input);


    if (user === correct) {
      setScore(score + 1);
      setFeedback("✅ Correct! Good job.");
      setInput("");

      if (current + 1 >= questions.length) {
        setIsComplete(true);
      } else {
        setCurrent(current + 1);
      }
    } else {
      setFeedback("❌ Incorrect answer.");
      setInput("");
    }
  };

  useEffect(() => {
    if (isComplete && score === questions.length) {
      const timer = setTimeout(() => {
        navigate("/Level6", {
          state: {
            score,
            totalQuestions: questions.length,
            timeRemaining: timeLeft,
          },
        });
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [isComplete, navigate, score, timeLeft]);

  const progressPercentage = isComplete
    ? 100
    : (current / questions.length) * 100;

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
        <div className="robot-dialogue">{robotMessage}</div>
      </div>

      <div
        className="echo-hints right"
        onClick={() =>
          setRobotMessage(
            "Hint: Answer all the questions correctly to move to the next level."
          )
        }
      >
        ECHO HINTS
      </div>

      <Timer timeLeft={timeLeft} />
      <ProgressBar correct={score} total={questions.length} />

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