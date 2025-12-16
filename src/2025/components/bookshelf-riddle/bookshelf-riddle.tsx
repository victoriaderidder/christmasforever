import React, { useState, useRef, useEffect } from "react";
import { useAudio } from "../../../audio/audio.hooks";
import { AUDIO_PATHS } from "../../../audio/audio.utils";
import styles from "./bookshelf-riddle.module.css";
import "./bookshelf-riddle.global.css";

interface Props {
  onComplete: (won: boolean) => void;
}

const GRID_COLS = 12;
const GRID_ROWS = 8;
const TOTAL = GRID_COLS * GRID_ROWS;
const TILE_SIZE = 56;
const GAP = 8;
const SHELF_POST_WIDTH = 14;
const ROW_GAP = 14;

const BOOK_COLORS = [
  "#c94f6d",
  "#6db7c9",
  "#f3b562",
  "#8ac97a",
  "#b18ce6",
  "#ff8fa3",
];

const BookshelfRiddle: React.FC<Props> = ({ onComplete }) => {
  const generateItems = () => {
    const items: string[] = [];
    const alarmRow = Math.max(0, GRID_ROWS - 3);
    const alarmCol = Math.min(GRID_COLS - 1, 3);
    const alarmIndex = alarmRow * GRID_COLS + alarmCol;
    for (let i = 0; i < TOTAL; i++) {
      if (i === alarmIndex) items.push("ALARM");
      else if (Math.random() < 0.15) items.push("SMOKE");
      else items.push("JUNK");
    }
    return items;
  };

  const generateVisuals = () => {
    const colors: number[] = [];
    const heights: number[] = [];
    const offsets: number[] = [];
    const alarmRow = Math.max(0, GRID_ROWS - 3);
    const alarmCol = Math.min(GRID_COLS - 1, 3);
    const alarmIndex = alarmRow * GRID_COLS + alarmCol;
    for (let i = 0; i < TOTAL; i++) {
      const col = i % GRID_COLS;
      const row = Math.floor(i / GRID_COLS);
      const forbidden = new Set<number>();
      if (col > 0) forbidden.add(colors[i - 1]);
      if (row > 0) forbidden.add(colors[i - GRID_COLS]);

      const choices = BOOK_COLORS.map((_, idx) => idx).filter(
        (c) => !forbidden.has(c)
      );
      let pick = choices[Math.floor(Math.random() * choices.length)];
      if (pick === undefined)
        pick = Math.floor(Math.random() * BOOK_COLORS.length);

      colors.push(pick);

      const tallest = Math.floor(TILE_SIZE * 0.95);
      const middle = Math.floor(TILE_SIZE * 0.75);
      // 90% tallest, 10% middle
      heights.push(Math.random() < 0.7 ? tallest : middle);
    }
    // Ensure the correct (ALARM) book is always the tallest
    if (alarmIndex >= 0 && alarmIndex < heights.length) {
      heights[alarmIndex] = Math.floor(TILE_SIZE * 0.95);
    }
    return { colors, heights, offsets };
  };

  const [items] = useState<string[]>(generateItems);
  const [revealed, setRevealed] = useState<boolean[]>(
    Array.from({ length: TOTAL }, () => false)
  );
  const [wrong, setWrong] = useState<boolean[]>(
    Array.from({ length: TOTAL }, () => false)
  );
  const [fallingIndex, setFallingIndex] = useState<number | null>(null);
  const bookRefs = useRef<Array<HTMLDivElement | null>>(
    Array(TOTAL).fill(null)
  );
  const [floating, setFloating] = useState<{
    left: number;
    top: number;
    width: number;
    height: number;
    color: string;
    index: number;
    transform?: string;
    opacity?: number;
  } | null>(null);
  const floatingRaf = useRef<number | null>(null);
  // Start a JS-driven fall animation for the floating book
  const startFloatingAnimation = (rect: DOMRect, index: number, bg: string) => {
    if (floatingRaf.current) {
      cancelAnimationFrame(floatingRaf.current);
      floatingRaf.current = null;
    }
    // longer duration with an initial pop-out phase
    const duration = 2000; // total ms (was 1400)
    const popFrac = 0.12; // portion for the pop (about 168ms)
    const popDuration = duration * popFrac;
    const fallDuration = duration - popDuration;
    const start = performance.now();

    const step = (now: number) => {
      const elapsed = now - start;
      if (elapsed < popDuration) {
        const tp = elapsed / popDuration; // 0..1
        // ease-out for pop
        const easePop = 1 - Math.pow(1 - tp, 3);
        const popTranslate = Math.round(-8 * easePop);
        const popScale = 1.08 + (1.18 - 1.08) * easePop;
        setFloating((prev) => {
          if (!prev || prev.index !== index) return prev;
          return {
            ...prev,
            transform: `translateY(${popTranslate}px) rotate(0deg) scale(${popScale})`,
            opacity: 1,
          };
        });
        floatingRaf.current = requestAnimationFrame(step);
        return;
      }

      const t = Math.min(1, (elapsed - popDuration) / fallDuration);
      // ease-in for fall, then ease-out effect via cubic
      const ease = 1 - Math.pow(1 - t, 3);
      const deltaY = Math.round(ease * 420); // a bit longer fall
      const rotation = Math.round(ease * 48);
      const scale = 1.18 + (0.9 - 1.18) * ease;
      const opacity = 1 - ease;

      setFloating((prev) => {
        if (!prev || prev.index !== index) return prev;
        return {
          ...prev,
          transform: `translateY(${deltaY}px) rotate(${rotation}deg) scale(${scale})`,
          opacity,
        };
      });

      if (t < 1) {
        floatingRaf.current = requestAnimationFrame(step);
      } else {
        floatingRaf.current = null;
        // small delay to allow final frame to settle before cleanup
        setTimeout(() => {
          onComplete(true);
          setFloating(null);
        }, 80);
      }
    };

    floatingRaf.current = requestAnimationFrame(step);
  };

  // cleanup on unmount
  useEffect(() => {
    return () => {
      if (floatingRaf.current) cancelAnimationFrame(floatingRaf.current);
    };
  }, []);
  // audio: stop krampus and play alarm while this riddle is mounted
  const { audioRefs, playSong, stopAllAudio } = useAudio(AUDIO_PATHS);
  useEffect(() => {
    stopAllAudio();
    const alarmAudio = audioRefs?.alarm?.current;
    const krampusAudio = audioRefs?.krampus?.current;
    if (alarmAudio) {
      playSong(alarmAudio, krampusAudio);
    }
    return () => {
      if (krampusAudio) {
        playSong(krampusAudio, alarmAudio);
      } else if (alarmAudio) {
        try {
          alarmAudio.pause();
          alarmAudio.currentTime = 0;
        } catch (e) {
          /* ignore */
        }
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const initialVisuals = generateVisuals();
  const [colors] = useState<number[]>(initialVisuals.colors);
  const [heights] = useState<number[]>(initialVisuals.heights);
  const [offsets] = useState<number[]>(initialVisuals.offsets);

  const revealAt = (index: number) => {
    if (revealed[index] || wrong[index]) return;
    const val = items[index];
    if (val === "ALARM") {
      setRevealed((r) => {
        const copy = [...r];
        copy[index] = true;
        return copy;
      });
      // capture the book's screen position and create a floating copy
      const el = bookRefs.current[index];
      if (el && typeof window !== "undefined") {
        const rect = el.getBoundingClientRect();
        const bg =
          getComputedStyle(el).backgroundColor || BOOK_COLORS[colors[index]];
        setFloating({
          left: rect.left,
          top: rect.top,
          width: rect.width,
          height: rect.height,
          color: bg,
          index,
          transform: "translateY(0px) rotate(0deg) scale(1.08)",
          opacity: 1,
        });
        // hide original and mark as falling
        setFallingIndex(index);
        // start JS-driven fall animation to avoid CSS containment/transform issues
        startFloatingAnimation(rect, index, bg);
      } else {
        setFallingIndex(index);
        setTimeout(() => {
          onComplete(true);
          setFloating(null);
        }, 950);
      }
    } else {
      setWrong((w) => {
        const copy = [...w];
        copy[index] = true;
        return copy;
      });
    }
  };

  const booksAreaWidth = GRID_COLS * TILE_SIZE + (GRID_COLS - 1) * GAP;
  const totalShelfWidth = booksAreaWidth + SHELF_POST_WIDTH * 2;
  const ROW_HEIGHT = TILE_SIZE + ROW_GAP;
  const shelfTotalHeight = GRID_ROWS * ROW_HEIGHT;

  return (
    <div
      className={`story story-fullscreen-red ${styles.container}`}
      style={{ padding: 24 }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          minHeight: "100vh",
        }}
      >
        <div
          className={styles.shelf}
          style={{
            width: totalShelfWidth,
            height: shelfTotalHeight,
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "-6vh",
          }}
        >
          {/* big left post */}
          <div
            className={styles.post}
            style={{
              left: 0,
              width: SHELF_POST_WIDTH,
              height: shelfTotalHeight,
            }}
          />

          {/* big right post */}
          <div
            className={styles.post}
            style={{
              right: 0,
              width: SHELF_POST_WIDTH,
              height: shelfTotalHeight,
            }}
          />
          <div
            className={styles.topBoard}
            style={{ top: `-8px`, left: 0, right: 0 }}
          />

          {Array.from({ length: GRID_ROWS }).map((_, row) => {
            const start = row * GRID_COLS;
            const top = row * ROW_HEIGHT;
            return (
              <div
                key={row}
                className={styles.row}
                style={{ top, height: ROW_HEIGHT }}
              >
                <div
                  className={styles.booksInner}
                  style={{ left: SHELF_POST_WIDTH, right: SHELF_POST_WIDTH }}
                >
                  {Array.from({ length: GRID_COLS }).map((__, col) => {
                    const i = start + col;
                    const it = items[i];
                    const isRevealed = revealed[i];
                    const isWrong = wrong[i];
                    const isFalling = fallingIndex === i;
                    const wrongCount = wrong.filter(Boolean).length;
                    let animName = "";
                    let animDur = 0.9;
                    if (isWrong) {
                      if (wrongCount < 5) {
                        animName = "shakeSmall";
                        animDur = 0.9;
                      } else if (wrongCount < 15) {
                        animName = "shakeMedium";
                        animDur = 0.7;
                      } else {
                        animName = "shakeLarge";
                        animDur = 0.55;
                      }
                    }
                    return (
                      <div
                        key={i}
                        onClick={() => revealAt(i)}
                        className={styles.cell}
                        style={{
                          width: TILE_SIZE,
                          height: TILE_SIZE,
                          color: isRevealed ? "#5b2f15" : "transparent",
                          fontWeight: 800,
                          cursor: "pointer",
                        }}
                      >
                        <div
                          ref={(el) => (bookRefs.current[i] = el)}
                          className={`${styles.spine} ${
                            isRevealed && it === "ALARM"
                              ? styles.spineRevealed
                              : ""
                          }`}
                          style={{
                            width: TILE_SIZE - 8,
                            height: heights[i],
                            background: BOOK_COLORS[colors[i]],
                            bottom: 12 + (offsets[i] || 0),
                            transform: isFalling
                              ? undefined
                              : isRevealed && it === "ALARM"
                              ? "scale(1.06) translateY(-4px)"
                              : "none",
                            visibility: isFalling ? "hidden" : undefined,
                            ...(isWrong && animName
                              ? {
                                  animation: `${animName} ${animDur}s infinite ease-in-out`,
                                  animationDelay: `${(i % 5) * 0.06}s`,
                                }
                              : {}),
                          }}
                        ></div>
                      </div>
                    );
                  })}
                </div>
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <div className={styles.shelfBoard} />
                </div>
              </div>
            );
          })}
        </div>
        {floating && (
          <div
            className={styles.floating}
            style={{
              left: floating.left,
              top: floating.top,
              width: floating.width,
              height: floating.height,
              background: floating.color,
              // override CSS animation so we can drive transform via JS
              animation: "none",
              transform: floating.transform,
              opacity: floating.opacity,
            }}
          />
        )}
      </div>
    </div>
  );
};

export default BookshelfRiddle;
