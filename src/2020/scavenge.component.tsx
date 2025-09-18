import { FC, useState } from "react";
import styled from "@emotion/styled";
import peppermintScimitar from "./assets/peppermint-scimitar.webp";

const GridContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const GridItem = styled.button`
  background: none;
  border: none;
  color: #0000ee;
  cursor: pointer;
  font-size: 1.5em;
  padding: 5px;
  text-decoration: underline;

  &:visited {
    color: #0000ee;
  }
`;

const MessageContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const BackButton = styled.button`
  padding: 10px 20px;
  font-size: 1.2em;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  color: white;
  background: black;
`;

const ScavengeGrid: FC = () => {
  const [showMessage, setShowMessage] = useState<"error" | "success" | null>(
    null
  );
  const WINNING_INDEX = 643;

  const handleClick = (index: number) => {
    setShowMessage(index === WINNING_INDEX ? "success" : "error");
  };

  const handleBack = () => {
    setShowMessage(null);
  };

  if (showMessage === "success") {
    return (
      <MessageContainer>
        <img src={peppermintScimitar} width="40%" height="40%" />
        <h1
          style={{
            textAlign: "center",
            margin: "0",
          }}
        >
          +1 peppermint scimitar!
        </h1>
      </MessageContainer>
    );
  }

  if (showMessage === "error") {
    return (
      <MessageContainer>
        <h1>404 GIFT NOT FOUND</h1>
        <BackButton onClick={handleBack}>go back</BackButton>
      </MessageContainer>
    );
  }

  return (
    <GridContainer>
      {Array(720)
        .fill("X")
        .map((_, index) => (
          <GridItem key={index} onClick={() => handleClick(index)}>
            X
          </GridItem>
        ))}
    </GridContainer>
  );
};

export default ScavengeGrid;
