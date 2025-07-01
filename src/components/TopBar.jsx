export default function TopBar({ onHintClick }) {
  return (
    <div className="top-bar">
      <h1 className="level-title">LEVEL 3</h1>
      <div className="top-indicators">
        <span className="echo-hint" onClick={onHintClick}>
          🤖 ECHO HINTS
        </span>
      </div>
    </div>
  );
}