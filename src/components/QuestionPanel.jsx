import { useEffect, useState } from "react";

export default function QuestionPanel({
  question,
  input,
  setInput,
  onSubmit,
  feedback,
  isComplete,
  score,
  currentIndex,
  timeLeft
}) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
    const timeout = setTimeout(() => setAnimate(false), 500);
    return () => clearTimeout(timeout);
  }, [question]);

  return (
    <div className="panels">
      {/* Question Section */}
      <div className={`question-box ${animate ? "fade" : ""}`}>
        {!isComplete && timeLeft > 0 ? (
          <>
            <p className="q-head">QUESTIONS</p>
            <p className="q-subhead">{`QUESTION ${currentIndex + 1}`}</p>
            <p className="q-content">{question?.q}</p>
            <div className="q-divider" />
            <p className="q-type">TYPE: {question?.type?.toUpperCase() || "RIDDLE"}</p>
          </>
        ) : isComplete && score === 20 ? (
          <p className="q-head glow">✅<br /> All questions completed. Great work!</p>
        ) : (
          <p className="q-head danger">⏱<br />Questions left incomplete. Time ran out!</p>
        )}
      </div>

      {/* Answer Section */}
      <div className="answer-box">
        <p className="a-head">ANSWERS</p>
        <p className="a-sub">Please type your answers here</p>

        {!isComplete && timeLeft > 0 ? (
          <>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter your answer..."
            />
            <button onClick={onSubmit}>SUBMIT</button>
            <p className="feedback">{feedback}</p>
          </>
        ) : isComplete && score === 20 ? (
          <p className="feedback pass">🎉 Congrats! Level Passed</p>
        ) : (
          <p className="feedback fail">You haven’t scored enough. Failed!</p>
        )}
      </div>
    </div>
  );
}