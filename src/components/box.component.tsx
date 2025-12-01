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
  isPresent?: boolean;
}

const Box: FC<BoxProps> = ({
  width,
  height,
  backgroundColor,
  text,
  borderColor,
  textColor,
  fontSize = 48,
  fontBold,
  isPresent,
}) => {
  const borderStyle = isPresent ? "none" : `1px solid ${borderColor}`;
  const bowScale = 1.2; // make the bow a bit larger
  const bowBase = Math.max(12, Math.round((height as number) * 0.18));
  const bowSize = Math.round(bowBase * bowScale);
  // overlap value in px to remove gap between bow and box; increase to push bow lower
  const bowOverlap = 4;
  const bowTopOffset = -(bowSize - bowOverlap);
  return (
    <MuiBox
      sx={{
        width: { width },
        height: { height },
        backgroundColor: { backgroundColor },
        border: borderStyle,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 2,
        position: "relative",
        cursor: "pointer",
        overflow: "visible",
        fontSize: fontSize,
      }}
    >
      <>
        {isPresent && (
          <>
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: 0,
                transform: "translateX(-50%)",
                width: Math.max(8, Math.round(width * 0.12)) + "px",
                height: "100%",
                background: "#c62828",
                zIndex: 0,
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: 0,
                transform: "translateY(-50%)",
                height: Math.max(8, Math.round(height * 0.12)) + "px",
                width: "100%",
                background: "#c62828",
                zIndex: 0,
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: bowTopOffset + "px",
                transform: "translateX(-50%)",
                width:
                  Math.max(
                    20,
                    Math.round((width as number) * 0.36 * bowScale)
                  ) + "px",
                height:
                  Math.max(
                    12,
                    Math.round((height as number) * 0.18 * bowScale)
                  ) + "px",
                pointerEvents: "none",
                zIndex: 1001,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: "12%",
                  width: "46%",
                  height: "100%",
                  background: "#c62828",
                  borderRadius: "50% 50% 40% 60%",
                  transform: "rotate(-20deg) scale(1.02)",
                  boxShadow: "inset -2px -1px 4px rgba(0,0,0,0.08)",
                  overflow: "visible",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  right: "12%",
                  width: "46%",
                  height: "100%",
                  background: "#c62828",
                  borderRadius: "50% 50% 60% 40%",
                  transform: "rotate(20deg) scale(1.02)",
                  boxShadow: "inset 2px -1px 4px rgba(0,0,0,0.08)",
                  overflow: "visible",
                }}
              />
              {/* Knot (solid) */}
              <div
                style={{
                  position: "relative",
                  width:
                    Math.max(
                      12,
                      Math.round((width as number) * 0.14 * bowScale)
                    ) + "px",
                  height:
                    Math.max(
                      10,
                      Math.round((height as number) * 0.1 * bowScale)
                    ) + "px",
                  background: "#c62828",
                  borderRadius: "50%",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.12)",
                }}
              />
            </div>
          </>
        )}
        <div
          style={{
            color: textColor,
            fontSize: fontSize,
            fontWeight: fontBold,
            position: "relative",
            zIndex: 2,
          }}
        >
          {text}
        </div>
      </>
    </MuiBox>
  );
};

export default Box;
