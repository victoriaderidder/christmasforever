import { FC } from "react";
import MuiBox from "@mui/material/Box";

interface StarProps {
  width: number;
  height: number;
  backgroundColor: string;
  borderColor: string;
  textColor: string;
  text: string;
  fontSize?: number;
  fontBold?: string;
}

const Star: FC<StarProps> = ({
  width,
  height,
  backgroundColor,
  text,
  borderColor,
  textColor,
  fontSize = "48px",
  fontBold,
}) => {
  return (
    <MuiBox
      sx={{
        width: { width },
        height: { height },
        backgroundColor: { backgroundColor },
        border: `1px solid ${borderColor}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 2,
        position: "relative",
        cursor: "pointer",
        fontSize: { fontSize },
        clipPath:
          "polygon(50% 5%, 61% 40%, 95% 40%, 68% 60%, 79% 95%, 50% 75%, 21% 95%, 32% 60%, 5% 40%, 39% 40%)",
      }}
    >
      <>
        <div
          style={{
            color: textColor,
            fontSize: fontSize,
            fontWeight: fontBold,
            position: "relative",
            top: "-8%",
          }}
        >
          {text}
        </div>
      </>
    </MuiBox>
  );
};

export default Star;
