import React, { useState, useRef } from "react";
import '../levels/Level2.css';

export default function DigitCodeInput({ onCorrect }) {
  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState(false);
  const inputRefs = useRef([]);

  const correctCode = "429675";

  const handleChange = (value, index) => {
    if (/^\d$/.test(value)) {
      const newDigits = [...digits];
      newDigits[index] = value;
      setDigits(newDigits);
      setError(false);
      if (index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      e.preventDefault(); // Prevent default backspace behavior
      const newDigits = [...digits];
  
      if (digits[index]) {
        // If current box is filled, just clear it
        newDigits[index] = "";
        setDigits(newDigits);
      } else if (index > 0) {
        // If current box is empty, move focus to previous and clear it
        newDigits[index - 1] = "";
        setDigits(newDigits);
        inputRefs.current[index - 1].focus();
      }
    }
  };
  

  const handleSubmit = () => {
    const userCode = digits.join("");
    if (userCode === correctCode) {
      onCorrect();
    } else {
      setError(true);
    }
  };

  return (
    <div className="code-input-box">
      <div className="digit-code-input">
        {digits.map((digit, idx) => (
          <input
            key={idx}
            type="text"
            maxLength="1"
            value={digit}
            onChange={(e) => handleChange(e.target.value, idx)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            ref={(el) => (inputRefs.current[idx] = el)}
            className="digit-box"
          />
        ))}
      </div>
      <button onClick={handleSubmit} className="submit-button">Submit</button>
      {error && <p className="error-message">Incorrect code. Try again.</p>}

    </div>
  );
  
}