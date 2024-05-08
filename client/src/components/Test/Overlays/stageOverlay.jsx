import React, { useState, useEffect } from "react";
import "./stageOverlay.css";

const StageOverlay = ({ stageText, duration }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  return isVisible ? (
    <div className="stage-overlay">
      <div className="bordered-text">{stageText}</div>
    </div>
  ) : null;
};

export default StageOverlay;
