import React, { useEffect, useRef, useState } from "react";
import HotChocolateAnswer from "../../components/hot-chocolate-answer";

interface Props {
  onComplete: (won: boolean) => void;
}

const TARGET = "DISASTER";

const HotChocolateRiddle: React.FC<Props> = ({ onComplete }) => {
  const [heat, setHeat] = useState(0); // 0..100
  const [letters, setLetters] = useState<string[]>(() => {
    const arr = TARGET.split("");
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  });
  const [available, setAvailable] = useState<boolean[]>(
    Array.from({ length: TARGET.length }, () => true)
  );
  const [answerSlots, setAnswerSlots] = useState<
    Array<{ letter: string; fromIndex: number } | null>
  >(Array.from({ length: TARGET.length }, () => null));
  const stirRef = useRef<any>({ lastAngle: null });
  const mugRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);
  const [rotation, setRotation] = useState(0); // degrees
  const BASE_OFFSET = 12; // percent before any letters appear
  const decayRef = useRef<number | null>(null);
  const [revealComplete, setRevealComplete] = useState(false);

  useEffect(() => {
    decayRef.current = window.setInterval(() => {
      setHeat((h) => Math.max(0, h - 0.6));
    }, 400);
    return () => {
      if (decayRef.current) window.clearInterval(decayRef.current);
    };
  }, []);

  useEffect(() => {
    const TARGET_SECONDS = 10;
    const RADS_PER_SEC_NOMINAL = 2 * Math.PI * 1; // 1 rotation/sec
    const nominalRads = RADS_PER_SEC_NOMINAL * TARGET_SECONDS; // ~125.66
    const HEAT_PER_RAD = 13 / nominalRads;

    const ref = stirRef.current;
    ref.lastAngle = null;

    const onMove = (e: MouseEvent) => {
      const el = innerRef.current;
      // only allow stirring when cursor is over the brown inner liquid div
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (
        !(
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom
        )
      ) {
        // reset lastAngle when cursor leaves the inner area to avoid large deltas
        stirRef.current.lastAngle = null;
        return;
      }
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      // circular hit test: ignore stirring when cursor is near the rim
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const radius = Math.min(rect.width, rect.height) / 2;
      // require cursor to be comfortably inside the liquid (avoid rim): 86% of radius
      if (dist > radius * 0.86) {
        stirRef.current.lastAngle = null;
        return;
      }
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
      // if reveal is complete, stop updating heat/rotation
      if (revealComplete) return;
      setHeat((h) => Math.min(100, h + absDelta * HEAT_PER_RAD));
      // accumulate rotation so marshmallows rotate following the
      // user's stirring speed. Convert radians -> degrees.
      const degDelta = delta * (180 / Math.PI);
      setRotation((r) => r + degDelta);
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [revealComplete]);

  // when heat reaches the threshold that reveals the last tile, mark revealComplete
  useEffect(() => {
    const n = letters.length;
    const effectiveMax = Math.max(0, 100 - BASE_OFFSET);
    const effectiveRange = effectiveMax / n;
    const lastStart = (n - 1) * effectiveRange;
    const needed = BASE_OFFSET + lastStart;
    if (!revealComplete && heat >= needed) {
      setRevealComplete(true);
      if (decayRef.current) {
        window.clearInterval(decayRef.current);
        decayRef.current = null;
      }
      // ensure all letters are fully visible
      setHeat(100);
    }
  }, [heat, letters, revealComplete]);

  const handleClickMarshmallow = (letter: string, fromIndex: number) => {
    // find first empty slot
    const firstEmptyIndex = answerSlots.findIndex((slot) => slot === null);
    if (firstEmptyIndex !== -1) {
      handleDropToSlot(firstEmptyIndex, { letter, fromIndex });
    }
  };

  const handleDropToSlot = (
    slotIndex: number,
    data: { letter: string; fromIndex: number; fromSlot?: number }
  ) => {
    // mark that a drop completed (used to prevent restoring on dragend)
    dragCompletedRef.current = true;
    setAnswerSlots((prev) => {
      const copy = [...prev];
      // if the drag came from another answer slot, perform a swap: move target -> origin
      if (data.fromSlot != null && data.fromSlot !== slotIndex) {
        const target = copy[slotIndex];
        if (target) {
          // move the current occupant into the origin slot
          copy[data.fromSlot] = target;
        } else {
          // target empty: clear origin
          copy[data.fromSlot] = null;
        }
      } else {
        // drag originated from mug: if target occupied, free its original index
        if (copy[slotIndex]) {
          const prevItem = copy[slotIndex]!;
          setAvailable((v) => {
            const c = [...v];
            c[prevItem.fromIndex] = true;
            return c;
          });
        }
      }

      // ensure no other slot still references this same fromIndex (prevent duplicates)
      for (let k = 0; k < copy.length; k++) {
        if (
          k !== slotIndex &&
          copy[k] &&
          copy[k]!.fromIndex === data.fromIndex
        ) {
          copy[k] = null;
        }
      }

      // place incoming letter into the target slot
      copy[slotIndex] = { letter: data.letter, fromIndex: data.fromIndex };
      return copy;
    });
    // mark the letter's origin index as not available (now placed in a slot)
    setAvailable((v) => {
      const c = [...v];
      c[data.fromIndex] = false;
      return c;
    });
  };

  // called when a drag starts from an answer slot
  const draggingRef = useRef<{
    slotIndex: number;
    letter: string;
    fromIndex: number;
  } | null>(null);
  const dragCompletedRef = useRef(false);

  const onStartDragFromSlot = (slotIndex: number) => {
    const item = answerSlots[slotIndex];
    if (!item) return;
    // remember origin so we can clear it on a successful drop; do not mutate UI yet
    draggingRef.current = {
      slotIndex,
      letter: item.letter,
      fromIndex: item.fromIndex,
    };
    dragCompletedRef.current = false;
  };

  const onEndDragFromSlot = (_slotIndex: number) => {
    // clear transient tracking; any necessary state changes are handled on successful drops
    draggingRef.current = null;
    dragCompletedRef.current = false;
  };

  const handleRemoveFromSlot = (slotIndex: number) => {
    setAnswerSlots((prev) => {
      const copy = [...prev];
      const item = copy[slotIndex];
      if (item) {
        setAvailable((v) => {
          const c = [...v];
          c[item.fromIndex] = true;
          return c;
        });
      }
      copy[slotIndex] = null;
      return copy;
    });
  };

  // automatically check the assembled answer when all slots are filled
  useEffect(() => {
    if (!revealComplete) return;
    const allFilled = answerSlots.every((s) => s !== null);
    if (!allFilled) return;
    const assembled = answerSlots.map((s) => (s ? s.letter : "")).join("");
    if (assembled === TARGET) {
      onComplete(true);
    }
  }, [answerSlots, revealComplete]);

  return (
    <div className="story story-fullscreen-red hot-chocolate-riddle">
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
                ref={innerRef}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e: React.DragEvent<HTMLDivElement>) => {
                  const raw = e.dataTransfer.getData("application/json");
                  if (raw) {
                    try {
                      const data = JSON.parse(raw);
                      if (data && data.fromIndex != null) {
                        dragCompletedRef.current = true;
                        // if the drag came from an answer slot, clear that origin slot
                        if (data.fromSlot != null) {
                          setAnswerSlots((prev) => {
                            const copy = [...prev];
                            copy[data.fromSlot] = null;
                            return copy;
                          });
                        }
                        // restore availability for the original letter index
                        setAvailable((v) => {
                          const c = [...v];
                          c[data.fromIndex] = true;
                          return c;
                        });
                      }
                    } catch (err) {
                      // ignore
                    }
                  }
                }}
              >
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                  }}
                >
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
                      transform: `translate(-50%, -50%) rotate(${-rotation}deg)`,
                      width: tileW,
                      height: tileH,
                      borderRadius: 14,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    };

                    if (!show || !available[i]) {
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
                        draggable
                        onClick={() => handleClickMarshmallow(ch, i)}
                        onDragStart={(e) => {
                          e.dataTransfer.setData(
                            "application/json",
                            JSON.stringify({ letter: ch, fromIndex: i })
                          );
                          e.dataTransfer.effectAllowed = "move";
                        }}
                        style={{
                          ...baseStyle,
                          border: "1px solid rgba(0,0,0,0.06)",
                          background: "linear-gradient(180deg,#ffffff,#f7f7f7)",
                          boxShadow: "0 8px 16px rgba(0,0,0,0.12)",
                          fontSize: 20,
                          fontWeight: 800,
                          color: "#5b2f15",
                          cursor: "grab",
                          userSelect: "none",
                          WebkitUserSelect: "none",
                        }}
                      >
                        <span
                          style={{
                            opacity: progress,
                            color: "#5b2f15",
                            userSelect: "none",
                            WebkitUserSelect: "none",
                          }}
                        >
                          {ch}
                        </span>
                      </button>
                    );
                  })}
                </div>
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
          ></div>

          {revealComplete && (
            <HotChocolateAnswer
              slots={answerSlots}
              onDropToSlot={handleDropToSlot}
              onRemoveFromSlot={handleRemoveFromSlot}
              onStartDragFromSlot={onStartDragFromSlot}
              onEndDragFromSlot={onEndDragFromSlot}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default HotChocolateRiddle;
