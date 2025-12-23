import React from "react";
import styles from "./peppermint-stick.module.css";

interface PeppermintStickProps {
  onComplete?: () => void;
}

const PeppermintStickRiddle: React.FC<PeppermintStickProps> = ({
  onComplete,
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
      }}
    >
      <div className={`${styles.peppermintStick}`} />
    </div>
  );
};

export default PeppermintStickRiddle;
