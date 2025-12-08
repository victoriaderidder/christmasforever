import React, { FC, useEffect, useState, useMemo, useRef } from "react";

interface KrampusEyesRiddleProps {
  onComplete: (won: boolean) => void;
}

const PAIR_COUNT = 250;

type Pair = {
  id: number;
  x: number; // center x in px
  y: number; // center y in px
  angle: number; // rotation deg
  size: number; // scale
  z: number; // z-index
  color: string; // base color
  isAnswer?: boolean;
};

const rand = (min: number, max: number) => Math.random() * (max - min) + min;

const KrampusEyesRiddle: FC<KrampusEyesRiddleProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [message, setMessage] = useState("Which eyes do you see?");
  const [attempts, setAttempts] = useState(0);
  const [reveal, setReveal] = useState(false);

  const pairs: Pair[] = useMemo(() => {
    const w = 800;
    const h = 420;
    const p: Pair[] = [];
    // pick an answer index
    const answerIndex = Math.floor(Math.random() * PAIR_COUNT);
    const colorOptions = ["yellow", "green", "blue", "amber"];

    // precompute a fixed answer position and size so we can reserve a small
    // clearance area around it — this guarantees a sliver of the red eyes
    // remains visible even when other pairs overlap.
    const answerX = Math.round(w * 0.18);
    const answerY = Math.round(h - 60);
    const answerSize = Math.round(rand(12, 18));
    const minClearance = Math.max(12, Math.round(answerSize * 0.9)) + 8;

    for (let i = 0; i < PAIR_COUNT; i++) {
      const isAnswer = i === answerIndex;
      // make the answer pair noticeably smaller so it's hidden under others
      const size = isAnswer ? answerSize : rand(22, 40);

      // choose a position; for non-answer pairs ensure they are not placed
      // too close to the answer center (leave a small clear area)
      let x = rand(40, w - 40);
      let y = rand(40, h - 40);
      if (isAnswer) {
        x = answerX;
        y = answerY;
      } else {
        let attempts = 0;
        while (attempts < 40) {
          const dx = x - answerX;
          const dy = y - answerY;
          if (Math.hypot(dx, dy) > minClearance) break;
          x = rand(40, w - 40);
          y = rand(40, h - 40);
          attempts++;
        }
      }

      const pair: Pair = {
        id: i,
        x,
        y,
        angle: rand(-30, 30),
        size,
        z: isAnswer ? 0 : Math.floor(rand(2, 8)),
        color: isAnswer
          ? "#b30000"
          : colorOptions[Math.floor(rand(0, colorOptions.length))],
        isAnswer,
      };
      p.push(pair);
    }
    return p;
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;
    const threshold = 36; // px
    let found: Pair | null = null;
    let nearestDist = Infinity;
    for (const pair of pairs) {
      const dx = cx - pair.x;
      const dy = cy - pair.y;
      const d = Math.hypot(dx, dy);
      if (d < nearestDist) {
        nearestDist = d;
        found = pair;
      }
    }

    setAttempts((a) => a + 1);
    if (found && nearestDist <= threshold && found.isAnswer) {
      setReveal(true);
    }
  };

  // find the answer pair for the reveal overlay
  const answerPair = pairs.find((p) => p.isAnswer);

  return (
    <div style={{ color: "white", textAlign: "center" }}>
      <p style={{ marginBottom: 12 }}>{message}</p>
      <div
        ref={containerRef}
        onClick={handleClick}
        style={{
          width: 800,
          height: 420,
          margin: "0 auto",
          position: "relative",
          background: "radial-gradient(ellipse at center, #111 0%, #000 60%)",
          border: "1px solid rgba(255,255,255,0.04)",
          overflow: "hidden",
          visibility: reveal ? "hidden" : "visible",
        }}
      >
        {pairs.map((pair) => {
          const leftEye = {
            position: "absolute",
            left: pair.x - pair.size,
            top: pair.y - pair.size / 2,
            width: pair.size,
            height: pair.size,
            borderRadius: "50%",
            background: pair.isAnswer
              ? "radial-gradient(circle, rgba(255,120,120,1) 0%, rgba(160,20,20,1) 40%)"
              : pair.color === "green"
              ? "radial-gradient(circle, rgba(200,255,200,1) 0%, rgba(60,160,80,0.9) 40%)"
              : pair.color === "blue"
              ? "radial-gradient(circle, rgba(180,215,255,1) 0%, rgba(60,120,200,0.9) 40%)"
              : pair.color === "amber"
              ? "radial-gradient(circle, rgba(255,220,150,1) 0%, rgba(200,130,50,0.9) 40%)"
              : "radial-gradient(circle, rgba(255,238,150,1) 0%, rgba(200,150,80,0.9) 40%)",
            transform: pair.isAnswer ? "none" : `rotate(${pair.angle}deg)`,
            boxShadow: pair.isAnswer
              ? "0 0 24px 6px rgba(180,20,20,0.45)"
              : "0 0 8px 2px rgba(200,180,100,0.08)",
            zIndex: pair.z,
            pointerEvents: "none",
          } as React.CSSProperties;

          const rightEye = {
            position: "absolute",
            left: pair.x,
            top: pair.y - pair.size / 2,
            width: pair.size,
            height: pair.size,
            borderRadius: "50%",
            background: pair.isAnswer
              ? "radial-gradient(circle, rgba(255,60,60,1) 0%, rgba(120,10,10,1) 40%)"
              : pair.color === "green"
              ? "radial-gradient(circle, rgba(140,255,160,1) 0%, rgba(50,140,70,0.9) 40%)"
              : pair.color === "blue"
              ? "radial-gradient(circle, rgba(160,200,255,1) 0%, rgba(40,90,180,0.9) 40%)"
              : pair.color === "amber"
              ? "radial-gradient(circle, rgba(255,190,110,1) 0%, rgba(180,110,40,0.9) 40%)"
              : "radial-gradient(circle, rgba(220,220,200,1) 0%, rgba(160,140,100,0.9) 40%)",
            transform: pair.isAnswer ? "none" : `rotate(${pair.angle}deg)`,
            boxShadow: pair.isAnswer
              ? "0 0 28px 8px rgba(200,40,40,0.5)"
              : "0 0 8px 2px rgba(200,180,100,0.06)",
            zIndex: pair.isAnswer ? 999 : pair.z,
            pointerEvents: "none",
          } as React.CSSProperties;

          return (
            <React.Fragment key={pair.id}>
              <div style={leftEye} />
              <div style={rightEye} />
            </React.Fragment>
          );
        })}
        {pairs.map((pair) => {
          // base sizes
          const eyeSize = pair.size;
          const scleraSize = eyeSize * 1.15;
          const irisSize = Math.max(6, Math.round(eyeSize * 0.5));
          const pupilSize = Math.max(
            4,
            Math.round(irisSize * (pair.isAnswer ? 0.35 : 0.5))
          );

          const commonWrapper: React.CSSProperties = {
            position: "absolute",
            left: pair.x - scleraSize / 2,
            top: pair.y - scleraSize / 2,
            width: scleraSize,
            height: scleraSize,
            transform: pair.isAnswer ? "none" : `rotate(${pair.angle}deg)`,
            zIndex: pair.z,
            pointerEvents: "none",
          };

          const scleraStyle: React.CSSProperties = {
            position: "absolute",
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            background:
              "radial-gradient(circle at 35% 35%, #fff 0%, #f3f3f3 40%, #d9d9d9 100%)",
            boxShadow:
              "inset 0 -6px 18px rgba(0,0,0,0.45), 0 2px 6px rgba(0,0,0,0.35)",
            overflow: "hidden",
          };

          let irisBase: any;
          if (pair.isAnswer) {
            irisBase = {
              background:
                "radial-gradient(circle at 40% 35%, #ff9b9b 0%, #d12b2b 35%, #6e0b0b 80%)",
              boxShadow: "0 0 28px 10px rgba(200,40,40,0.28)",
            };
          } else {
            switch (pair.color) {
              case "green":
                irisBase = {
                  background:
                    "radial-gradient(circle at 40% 35%, #c8ff9b 0%, #38a745 35%, #0b3e1a 80%)",
                  boxShadow: "0 0 10px 4px rgba(20,100,40,0.12)",
                };
                break;
              case "blue":
                irisBase = {
                  background:
                    "radial-gradient(circle at 40% 35%, #a7d8ff 0%, #2b6fb5 35%, #08294a 80%)",
                  boxShadow: "0 0 10px 4px rgba(30,80,140,0.12)",
                };
                break;
              case "amber":
                irisBase = {
                  background:
                    "radial-gradient(circle at 40% 35%, #ffd88a 0%, #d18b2b 35%, #6b3c10 80%)",
                  boxShadow: "0 0 10px 4px rgba(160,100,40,0.12)",
                };
                break;
              case "yellow":
              default:
                irisBase = {
                  background:
                    "radial-gradient(circle at 40% 35%, #ffd55a 0%, #c37f12 40%, #5b3a10 80%)",
                  boxShadow: "0 0 8px 3px rgba(200,160,90,0.06)",
                };
                break;
            }
          }

          const irisStyle: React.CSSProperties = {
            position: "absolute",
            left: `calc(50% - ${irisSize / 2}px)`,
            top: `calc(50% - ${irisSize / 2}px)`,
            width: irisSize,
            height: irisSize,
            borderRadius: pair.isAnswer ? "40% / 60%" : "50%",
            ...irisBase,
            border: "1px solid rgba(0,0,0,0.25)",
          } as React.CSSProperties;

          const pupilStyle: React.CSSProperties = pair.isAnswer
            ? {
                position: "absolute",
                left: `calc(50% - ${pupilSize / 2}px)`,
                top: `calc(50% - ${pupilSize}px)`,
                width: pupilSize,
                height: pupilSize * 2,
                borderRadius: "20%",
                background: "rgba(10,0,0,1)",
                boxShadow: "0 0 18px 6px rgba(160,10,10,0.25)",
                transform: "translateY(10%)",
              }
            : {
                position: "absolute",
                left: `calc(50% - ${pupilSize / 2}px)`,
                top: `calc(50% - ${pupilSize / 2}px)`,
                width: pupilSize,
                height: pupilSize,
                borderRadius: "50%",
                background: "#000",
                boxShadow:
                  "inset 0 -2px 6px rgba(255,255,255,0.04), 0 0 6px rgba(0,0,0,0.6)",
              };

          const eyelidStyle: React.CSSProperties = {
            position: "absolute",
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0) 40%)",
            pointerEvents: "none",
          };
          const leftWrapper = {
            ...commonWrapper,
            left: pair.x - scleraSize,
            zIndex: pair.isAnswer ? 999 : pair.z,
          } as React.CSSProperties;
          // right eye offset
          const rightWrapper = {
            ...commonWrapper,
            left: pair.x,
            zIndex: pair.isAnswer ? 999 : pair.z,
          } as React.CSSProperties;

          return (
            <React.Fragment key={pair.id}>
              <div style={leftWrapper}>
                <div style={scleraStyle} />
                <div style={irisStyle} />
                <div style={pupilStyle} />
                <div style={eyelidStyle} />
              </div>
              <div style={rightWrapper}>
                <div style={scleraStyle} />
                <div style={irisStyle} />
                <div style={pupilStyle} />
                <div style={eyelidStyle} />
              </div>
            </React.Fragment>
          );
        })}
      </div>
      {reveal && (
        <div
          aria-hidden
          onClick={() => {
            // ensure we don't attempt multiple completions
            setReveal(false);
            try {
              onComplete(true);
            } catch (err) {
              // swallow any errors from parent callback
              console.error(err);
            }
          }}
          style={{
            position: "fixed",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background:
              "radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 40%)",
            zIndex: 2000,
            pointerEvents: "auto",
            cursor: "pointer",
          }}
        >
          {/* full-screen subtle red tint */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(120,10,10,0.18)",
              zIndex: 1,
              pointerEvents: "none",
            }}
          />
          {/* blurred radial red glow centered behind the eyes */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(circle at 50% 45%, rgba(220,40,40,0.7) 0%, rgba(180,30,30,0.45) 30%, rgba(120,15,15,0.28) 55%, rgba(0,0,0,0) 100%)",
              filter: "blur(80px) saturate(1.1)",
              zIndex: 1,
              pointerEvents: "none",
              mixBlendMode: "screen",
            }}
          />
          <div
            style={{
              width: "80vw",
              maxWidth: 1400,
              height: "60vh",
              maxHeight: 1000,
              position: "relative",
              zIndex: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 40,
            }}
          >
            {answerPair ? (
              <>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      width: "80vmin",
                      height: "80vmin",
                      borderRadius: "50%",
                      background:
                        "radial-gradient(circle at 35% 35%, #fff 0%, #f3f3f3 40%, #d9d9d9 100%)",
                      boxShadow:
                        "inset 0 -12px 36px rgba(0,0,0,0.55), 0 6px 18px rgba(0,0,0,0.45)",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        width: "36vmin",
                        height: "36vmin",
                        borderRadius: "40% / 60%",
                        background:
                          "radial-gradient(circle at 40% 35%, #ff9b9b 0%, #d12b2b 35%, #6e0b0b 80%)",
                        boxShadow: "0 0 80px 36px rgba(200,40,40,0.32)",
                        position: "absolute",
                        left: "calc(50% - 18vmin)",
                        top: "calc(50% - 18vmin)",
                        border: "2px solid rgba(0,0,0,0.25)",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        left: "calc(50% - 7vmin)",
                        top: "calc(50% - 14vmin)",
                        width: "14vmin",
                        height: "28vmin",
                        borderRadius: "20%",
                        background: "rgba(10,0,0,1)",
                        boxShadow: "0 0 60px 24px rgba(160,10,10,0.32)",
                        transform: "translateY(10%)",
                      }}
                    />
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      width: "80vmin",
                      height: "80vmin",
                      borderRadius: "50%",
                      background:
                        "radial-gradient(circle at 35% 35%, #fff 0%, #f3f3f3 40%, #d9d9d9 100%)",
                      boxShadow:
                        "inset 0 -12px 36px rgba(0,0,0,0.55), 0 6px 18px rgba(0,0,0,0.45)",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        width: "36vmin",
                        height: "36vmin",
                        borderRadius: "40% / 60%",
                        background:
                          "radial-gradient(circle at 40% 35%, #ff9b9b 0%, #d12b2b 35%, #6e0b0b 80%)",
                        boxShadow: "0 0 80px 36px rgba(200,40,40,0.32)",
                        position: "absolute",
                        left: "calc(50% - 18vmin)",
                        top: "calc(50% - 18vmin)",
                        border: "2px solid rgba(0,0,0,0.25)",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        left: "calc(50% - 7vmin)",
                        top: "calc(50% - 14vmin)",
                        width: "14vmin",
                        height: "28vmin",
                        borderRadius: "20%",
                        background: "rgba(10,0,0,1)",
                        boxShadow: "0 0 60px 24px rgba(160,10,10,0.32)",
                        transform: "translateY(10%)",
                      }}
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div
                  style={{
                    width: "45vmin",
                    height: "45vmin",
                    borderRadius: "50%",
                    background:
                      "radial-gradient(circle, rgba(255,120,120,1) 0%, rgba(160,20,20,1) 40%)",
                    boxShadow: "0 0 120px 48px rgba(200,30,30,0.45)",
                    transform: "translateY(6%)",
                  }}
                />
                <div
                  style={{
                    width: "45vmin",
                    height: "45vmin",
                    borderRadius: "50%",
                    background:
                      "radial-gradient(circle, rgba(255,40,40,1) 0%, rgba(120,10,10,1) 40%)",
                    boxShadow: "0 0 160px 64px rgba(220,40,40,0.5)",
                    transform: "translateY(6%)",
                  }}
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default KrampusEyesRiddle;
