import React, { useEffect, useRef, useState } from "react";

interface Props {
  onComplete: (won: boolean) => void;
}

const TARGET = "DISASTER";

const HotChocolateHeat: React.FC<Props> = ({ onComplete }) => {
  const [heat, setHeat] = useState(0); // 0..100
  const [revealed, setRevealed] = useState<boolean[]>(
    Array.from({ length: TARGET.length }, () => false)
  );
  const [letters, setLetters] = useState<string[]>(() => {
    return TARGET.split("").sort(() => Math.random() - 0.5);
  });
  const stirRef = useRef<any>({ lastAngle: null });
  const mugRef = useRef<HTMLDivElement | null>(null);
  const [rotation, setRotation] = useState(0); // degrees

  useEffect(() => {
    const t = setInterval(() => {
      setHeat((h) => Math.max(0, h - 0.6));
    }, 400);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const TARGET_SECONDS = 10;
    const RADS_PER_SEC_NOMINAL = 2 * Math.PI * 1; // 1 rotation/sec
    const nominalRads = RADS_PER_SEC_NOMINAL * TARGET_SECONDS; // ~125.66
    const HEAT_PER_RAD = 20 / nominalRads;

    const ref = stirRef.current;
    ref.lastAngle = null;

    const onMove = (e: MouseEvent) => {
      const el = mugRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const angle = Math.atan2(e.clientY - cy, e.clientX - cx);
      if (ref.lastAngle == null) {
        ref.lastAngle = angle;
        return;
      }
      let delta = angle - ref.lastAngle;
      // normalize to [-PI, PI]
      delta = ((delta + Math.PI) % (2 * Math.PI)) - Math.PI;
      ref.lastAngle = angle;
      const absDelta = Math.abs(delta);
      if (absDelta < 0.0001) return;
      setHeat((h) => Math.min(100, h + absDelta * HEAT_PER_RAD));
      // accumulate rotation so marshmallows rotate following the
      // user's stirring speed. Convert radians -> degrees.
      // Flip sign so the visual rotation matches the expected stirring direction.
      const degDelta = delta * (180 / Math.PI);
      setRotation((r) => r + degDelta);
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const swapLetters = (i: number, j: number) => {
    setLetters((ls) => {
      const copy = [...ls];
      const tmp = copy[i];
      copy[i] = copy[j];
      copy[j] = tmp;
      return copy;
    });
  };

  const submit = () => {
    if (letters.join("") === TARGET) {
      onComplete(true);
    } else {
      // small penalty
      setHeat((h) => Math.max(0, h - 8));
    }
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <div style={{ width: 560, maxWidth: "90%", textAlign: "center" }}>
          <div
            style={{ marginTop: 16, display: "flex", justifyContent: "center" }}
          >
            <div
              ref={mugRef}
              style={{
                width: 380,
                height: 380,
                borderRadius: 190,
                // mug exterior (green)
                background:
                  "radial-gradient(circle at 30% 25%, #5aa36a 0%, #3c8a51 40%, #2d6b3f 100%)",
                boxShadow: "inset 0 12px 36px rgba(0,0,0,0.6)",
                position: "relative",
              }}
            >
              {/* mug rim (visible ring) */}
              <div
                style={{
                  position: "absolute",
                  inset: 28,
                  pointerEvents: "none",
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.15), rgba(255,255,255,0.04))",
                  boxShadow: "inset 0 8px 14px rgba(0,0,0,0.25)",
                  borderRadius: 180,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 40,
                  borderRadius: 160,
                  background:
                    "radial-gradient(circle at 40% 25%, #6b4226 0%, #4b2b16 40%, #2b170d 100%)",
                  overflow: "hidden",
                  transform: `rotate(${rotation}deg)`,
                  transformOrigin: "50% 50%",
                }}
              >
                <div style={{ position: "relative", width: "100%", height: "100%" }}>
                  {letters.map((ch, i) => {
                    const n = letters.length;
                    // require a small base amount of heat before any letters appear
                    const BASE_OFFSET = 12; // percent
                    const effectiveMax = Math.max(0, 100 - BASE_OFFSET);
                    const effectiveRange = effectiveMax / n;
                    const start = i * effectiveRange;
                    const progress = Math.max(
                      0,
                      Math.min(1, (heat - BASE_OFFSET - start) / effectiveRange)
                    );
                    const show = progress > 0;

                    // arrange in a circle
                    const angle = (i / n) * Math.PI * 2;
                    const radiusPercent = 36; // percent of inner box
                    const left = 50 + Math.cos(angle) * radiusPercent;
                    const top = 50 + Math.sin(angle) * radiusPercent;

                    const tileW = 64;
                    const tileH = 56;

                    const baseStyle: React.CSSProperties = {
                      position: "absolute",
                      left: `${left}%`,
                      top: `${top}%`,
                      transform: `translate(-50%, -50%) rotate(${ -rotation }deg)`,
                      width: tileW,
                      height: tileH,
                      borderRadius: 14,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    };

                    if (!show) {
                      return (
                        <div
                          key={i}
                          aria-hidden
                          style={{
                            ...baseStyle,
                            background: "transparent",
                          }}
                        />
                      );
                    }

                    return (
                      <button
                        key={i}
                        onClick={() => swapLetters(i, (i + 1) % letters.length)}
                        style={{
                          ...baseStyle,
                          border: "1px solid rgba(0,0,0,0.06)",
                          background: "linear-gradient(180deg,#ffffff,#f7f7f7)",
                          boxShadow: "0 8px 16px rgba(0,0,0,0.12)",
                          fontSize: 20,
                          fontWeight: 800,
                          color: "#5b2f15",
                          cursor: "pointer",
                        }}
                      >
                        <span style={{ opacity: progress, color: "#5b2f15" }}>{ch}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
              {/* heat meter */}
              <div
                style={{
                  position: "absolute",
                  right: -28,
                  top: 8,
                  width: 14,
                  height: 320,
                  background: "rgba(255,255,255,0.06)",
                  borderRadius: 10,
                  display: "flex",
                  alignItems: "flex-end",
                }}
              >
                <div
                  style={{
                    width: 14,
                    height: `${(heat / 100) * 320}px`,
                    background: "linear-gradient(180deg,#ffb347,#ff6b6b)",
                    borderRadius: 10,
                  }}
                />
              </div>
            </div>
          </div>

          <div
            style={{
              marginTop: 18,
              display: "flex",
              justifyContent: "center",
              gap: 12,
            }}
          >
            {heat > 12 ? (
              <>
                <button onClick={submit} style={{ padding: "8px 12px" }}>
                  Submit
                </button>
                <button
                  onClick={() =>
                    setLetters(TARGET.split("").sort(() => Math.random() - 0.5))
                  }
                  style={{ padding: "8px 12px" }}
                >
                  Shuffle
                </button>
              </>
            ) : (
              // placeholders to preserve layout while buttons are hidden
              <div style={{ width: 220, height: 36 }} />
            )}
          </div>

          <p style={{ marginTop: 10, opacity: 0.8 }}>
            Heat: {Math.round(heat)}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default HotChocolateHeat;
