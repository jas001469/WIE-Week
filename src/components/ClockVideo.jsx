import React from "react";
import "../levels/Level2.css";
import clockLoopVideo from "../images/clock-loop (2).mp4";

export default function ClockVideo() {
  return (
    <div className="clock-video-container">
      <video src={clockLoopVideo} autoPlay muted loop className="clock-video" />
    </div>
  );
}