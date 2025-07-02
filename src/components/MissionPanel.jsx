export default function MissionPanel() {
  const contentStyle = {
    maxHeight: "160px",
    overflowY: "auto",
    paddingRight: "8px",
    scrollbarWidth: "thin", // Firefox
    scrollbarColor: "#ff0055 transparent", // Firefox
  };

  const webkitScrollbarStyle = `
    .mission-content::-webkit-scrollbar {
      width: 6px;
    }
    .mission-content::-webkit-scrollbar-track {
      background: transparent;
    }
    .mission-content::-webkit-scrollbar-thumb {
      background-color: #ff0055;
      border-radius: 10px;
      box-shadow: 0 0 5px rgba(255, 0, 85, 0.5);
    }
  `;

  return (
    <>
      <style>{webkitScrollbarStyle}</style>
      <div className="mission-box">
        <h2 className="mission-header">MISSION</h2>
        <div className="mission-content" style={contentStyle}>
          <p className="mission-text">
            The Heart of the Battlefield
            <br />
            In the center's embrace where four winds flow,
            <br />
            Both white and black, their banners show.
            <br />
            A knight may leap, a bishop glide,
            <br />
            The queen might cross this open wide.
            <br />
            From pawn’s first step to regal dance,
            <br />
            This square invites each bold advance.
            <br />
            It's no mere corner, no edge to hide
            <br />
            Here, ambition and courage collide.
            <br />
            When eagles soar and battles thrive,
            <br />
            Only on this square can the dream survive
          </p>
        </div>
      </div>
    </>
  );
}