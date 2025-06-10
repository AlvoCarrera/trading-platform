import React from "react";

const LoadingAI = () => {
  return (
    <div className="loading-indicator">
      <div className="dots">
        <span className="dot" />
        <span className="dot" />
        <span className="dot" />
        <span className="dot" />
      </div>
      <p>Consultando IA...</p>
    </div>
  );
};

export default LoadingAI;
