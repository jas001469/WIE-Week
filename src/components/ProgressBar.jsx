export default function ProgressBar({ correct, total }) {
  const percent = Math.round((correct / total) * 100);

  return (
    <div style={{
      width: "90%",
      maxWidth: "600px",
      margin: "1rem auto",
      fontFamily: "Orbitron, sans-serif",
    }}>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "0.4rem",
        fontSize: "0.95rem",
        color: "#ffffff",
        textShadow: "0 0 3px red"
      }}>
        <span>Correct {correct} of {total}</span>
        <span>{percent}%</span>
      </div>

      <div style={{
        height: "14px",
        width: "100%",
        backgroundColor: "#333",
        borderRadius: "8px",
        overflow: "hidden",
        boxShadow: "0 0 10px rgba(255,0,0,0.3)",
      }}>
        <div
          style={{
            height: "100%",
            width: percent + '%',
            background: "linear-gradient(90deg, crimson, red)",
            borderRadius: "8px",
            transition: "width 0.5s ease"
          }}
        />
      </div>
    </div>
  );
}