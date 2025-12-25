import { Button } from "@mui/material";
import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";

interface StoryProps {
  story: string;
  italic?: boolean;
  hideButton?: boolean;
}

const Story: FC<StoryProps> = ({ story, italic, hideButton }) => {
  const containerStyle: React.CSSProperties = {
    fontSize: "1.6rem",
    lineHeight: 1.4,
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
    padding: "0 24px",
    maxWidth: "70ch",
    margin: "0 auto",
    userSelect: "none",
  };

  const textStyle: React.CSSProperties = {
    display: "inline-block",
    fontStyle: italic ? "italic" : undefined,
  };

  return (
    <div style={containerStyle}>
      <span style={textStyle} data-journey-advance="true">
        {story}
      </span>
      {!hideButton && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            size="small"
            variant="contained"
            data-journey-advance="true"
            style={{
              color: "white",
              backgroundColor: "inherit",
            }}
          >
            <FontAwesomeIcon icon={faArrowRightLong} size="lg" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default Story;
