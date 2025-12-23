import React, { useState } from "react";

interface RiddleRouteWrapperProps {
  children: (onComplete: () => void) => React.ReactElement;
  redBackground?: boolean;
}

export const RiddleRouteWrapper: React.FC<RiddleRouteWrapperProps> = ({
  children,
  redBackground = true,
}) => {
  const [complete, setComplete] = useState(false);

  const handleComplete = () => {
    setComplete(true);
  };

  if (complete) {
    return (
      <div
        className={`story ${redBackground ? "story-fullscreen-red" : ""}`}
        style={{
          padding: "24px",
          textAlign: "center",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "48px",
        }}
      >
        Complete!
      </div>
    );
  }

  return (
    <div
      className={`story ${redBackground ? "story-fullscreen-red" : ""}`}
      style={{ padding: "24px", textAlign: "center", minHeight: "100vh" }}
    >
      {children(handleComplete)}
    </div>
  );
};
