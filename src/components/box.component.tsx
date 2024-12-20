import { FC } from "react";
import MuiBox from "@mui/material/Box";

interface BoxProps {
  width: number;
  height: number;
  backgroundColor: string;
  borderColor: string;
  textColor: string;
  text: string;
  fontSize?: number;
  fontBold?: string;
}

const Box: FC<BoxProps> = ({
  width,
  height,
  backgroundColor,
  text,
  borderColor,
  textColor,
  fontSize,
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
        fontSize: "48px",
      }}
    >
      <>
        <div
          style={{
            color: textColor,
            fontSize: fontSize,
            fontWeight: fontBold,
          }}
        >
          {text}
        </div>
      </>
    </MuiBox>
  );
};

export default Box;
