
export default function CodeInput({ answer, setAnswer, onSubmit, showHint }) {
  return (
    <div className="code-input-area">
      <label htmlFor="codeInput">//ACCESS:INPUT CODE//</label>
      <textarea
        id="codeInput"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        className="input-box"
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            onSubmit();
          }
        }}
        
      />
      <button className="submit-btn" onClick={onSubmit}>SUBMIT</button>
      {showHint && (
        <div className="hint-box">Hint: The answer may lie at E5 🕵️‍♀️</div>
      )}
    </div>
  );
}