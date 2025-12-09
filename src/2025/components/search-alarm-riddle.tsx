import React, { useState } from "react";

interface Props {
  onComplete: (won: boolean) => void;
}

const GRID_COLS = 10;
const GRID_ROWS = 7;
const TOTAL = GRID_COLS * GRID_ROWS;
const TILE_SIZE = 56;
const SHELF_POST_WIDTH = 14;
const SHELF_POST_EXTRA = 24; // extra height above shelf
const ROW_GAP = 18;

const BOOK_COLORS = [
  "#c94f6d",
  "#6db7c9",
  "#f3b562",
  "#8ac97a",
  "#b18ce6",
  "#ff8fa3",
];

const SearchAlarmRiddle: React.FC<Props> = ({ onComplete }) => {
  const generateItems = () => {
    const items: string[] = [];
    const alarmIndex = Math.floor(Math.random() * TOTAL);
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
      if (pick === undefined) pick = Math.floor(Math.random() * BOOK_COLORS.length);

      colors.push(pick);

      const minH = Math.floor(TILE_SIZE * 0.5);
      const maxH = Math.floor(TILE_SIZE * 0.95);
      heights.push(minH + Math.floor(Math.random() * (maxH - minH + 1)));
    }
    return { colors, heights };
  };

  const [items, setItems] = useState<string[]>(generateItems);
  const [revealed, setRevealed] = useState<boolean[]>(
    Array.from({ length: TOTAL }, () => false)
  );
  const [wrong, setWrong] = useState<boolean[]>(
    Array.from({ length: TOTAL }, () => false)
  );
  const initialVisuals = generateVisuals();
  const [colors, setColors] = useState<number[]>(initialVisuals.colors);
  const [heights, setHeights] = useState<number[]>(initialVisuals.heights);

  const revealAt = (index: number) => {
    if (revealed[index] || wrong[index]) return;
    const val = items[index];
    if (val === "ALARM") {
      setRevealed((r) => {
        const copy = [...r];
        copy[index] = true;
        return copy;
      });
      setTimeout(() => onComplete(true), 800);
    } else {
      setWrong((w) => {
        const copy = [...w];
        copy[index] = true;
        return copy;
      });
    }
  };

  // Drag-and-drop removed — books are static on the shelf and only tappable.

  const shelfWidthPx = GRID_COLS * TILE_SIZE + (GRID_COLS - 1) * 12;
  const ROW_HEIGHT = TILE_SIZE + ROW_GAP;
  const shelfTotalHeight = GRID_ROWS * ROW_HEIGHT;

  return (
    <div className="story story-fullscreen-red" style={{ padding: 24 }}>
      <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
        <h2>Search the workshop</h2>
        <p>
          Tap books on the shelf to find the true alarm. Tap a book to check it.
        </p>

        <div style={{ marginTop: 18 }}>
          <div
            style={{
              position: "relative",
              width: shelfWidthPx,
              maxWidth: "100%",
              marginLeft: "auto",
              marginRight: "auto",
              height: shelfTotalHeight,
            }}
          >
            {/* big left post */}
            <div
              style={{
                position: "absolute",
                left: -SHELF_POST_WIDTH,
                top: -SHELF_POST_EXTRA,
                width: SHELF_POST_WIDTH,
                height: shelfTotalHeight + SHELF_POST_EXTRA,
                background: "#5a3b2a",
                borderRadius: 6,
                boxShadow: "inset 0 -4px 6px rgba(0,0,0,0.25)",
              }}
            />

            {/* big right post */}
            <div
              style={{
                position: "absolute",
                right: -SHELF_POST_WIDTH,
                top: -SHELF_POST_EXTRA,
                width: SHELF_POST_WIDTH,
                height: shelfTotalHeight + SHELF_POST_EXTRA,
                background: "#5a3b2a",
                borderRadius: 6,
                boxShadow: "inset 0 -4px 6px rgba(0,0,0,0.25)",
              }}
            />

            {Array.from({ length: GRID_ROWS }).map((_, row) => {
              const start = row * GRID_COLS;
              const top = row * ROW_HEIGHT;
              return (
                <div
                  key={row}
                  style={{
                    position: "absolute",
                    top,
                    left: 0,
                    right: 0,
                    height: ROW_HEIGHT,
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "center",
                  }}
                >
                  <div style={{ display: "flex", gap: 12 }}>
                    {Array.from({ length: GRID_COLS }).map((__, col) => {
                      const i = start + col;
                      const it = items[i];
                      const isRevealed = revealed[i];
                      const isWrong = wrong[i];
                      return (
                        <div
                          key={i}
                          onClick={() => revealAt(i)}
                          style={{
                            width: TILE_SIZE,
                            height: TILE_SIZE,
                            borderRadius: 6,
                            position: "relative",
                            background: "#4b2b16",
                            boxShadow: "0 8px 18px rgba(0,0,0,0.2)",
                            display: "flex",
                            alignItems: "flex-end",
                            justifyContent: "center",
                            color: isRevealed ? "#5b2f15" : "transparent",
                            fontWeight: 800,
                            cursor: "pointer",
                            userSelect: "none",
                          }}
                        >
                          <div
                            style={{
                              width: TILE_SIZE - 12,
                              height: heights[i],
                              background: BOOK_COLORS[colors[i]],
                              borderRadius: 3,
                              boxShadow: "0 6px 12px rgba(0,0,0,0.25)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: isRevealed && it === "ALARM" ? "#5b2f15" : "rgba(255,255,255,0.9)",
                              fontWeight: 900,
                              fontSize: 18,
                              position: "absolute",
                              bottom: 12,
                            }}
                          >
                            {isRevealed && it === "ALARM" ? "!" : ""}
                          </div>
                          {isWrong && (
                            <div
                              style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                pointerEvents: "none",
                              }}
                            >
                              <div
                                style={{
                                  color: "#ff5252",
                                  fontSize: 26,
                                  fontWeight: 900,
                                }}
                              >
                                ✖
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* shelf boards for this row */}
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
                    <div
                      style={{
                        width: shelfWidthPx,
                        maxWidth: "100%",
                        height: 12,
                        background: "#5a3b2a",
                        borderRadius: 0,
                        boxShadow: "inset 0 -4px 6px rgba(0,0,0,0.25)",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ height: 18 }} />
        <button
          onClick={() => {
            const idx = items.findIndex((x) => x === "ALARM");
            if (idx >= 0) revealAt(idx);
          }}
          style={{ marginTop: 10 }}
        >
          Reveal (debug)
        </button>
      </div>
    </div>
  );
};

export default SearchAlarmRiddle;
