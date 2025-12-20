import React, { useEffect, useState, useRef } from "react";

export interface MazeRiddleProps {
  onComplete: (won: boolean) => void;
  rows?: number;
  cols?: number;
}

type Cell = {
  r: number;
  c: number;
  walls: { N: boolean; S: boolean; E: boolean; W: boolean };
  visited?: boolean;
};

function generateMaze(rows: number, cols: number): Cell[][] {
  const attemptLimit = 10;
  const targetFraction = 0.25;
  const targetMin = Math.floor(rows * cols * targetFraction);

  const bfsShortestPathLen = (g: Cell[][]) => {
    const R = g.length;
    const C = g[0].length;
    const seen = Array.from({ length: R }, () => Array(C).fill(false));
    const q: { r: number; c: number; d: number }[] = [{ r: 0, c: 0, d: 0 }];
    seen[0][0] = true;
    while (q.length) {
      const cur = q.shift()!;
      if (cur.r === R - 1 && cur.c === C - 1) return cur.d;
      const cell = g[cur.r][cur.c];
      if (!cell.walls.N && cur.r > 0 && !seen[cur.r - 1][cur.c]) {
        seen[cur.r - 1][cur.c] = true;
        q.push({ r: cur.r - 1, c: cur.c, d: cur.d + 1 });
      }
      if (!cell.walls.S && cur.r < R - 1 && !seen[cur.r + 1][cur.c]) {
        seen[cur.r + 1][cur.c] = true;
        q.push({ r: cur.r + 1, c: cur.c, d: cur.d + 1 });
      }
      if (!cell.walls.W && cur.c > 0 && !seen[cur.r][cur.c - 1]) {
        seen[cur.r][cur.c - 1] = true;
        q.push({ r: cur.r, c: cur.c - 1, d: cur.d + 1 });
      }
      if (!cell.walls.E && cur.c < C - 1 && !seen[cur.r][cur.c + 1]) {
        seen[cur.r][cur.c + 1] = true;
        q.push({ r: cur.r, c: cur.c + 1, d: cur.d + 1 });
      }
    }
    return Infinity;
  };

  let lastGrid: Cell[][] | null = null;
  for (let attempt = 0; attempt < attemptLimit; attempt++) {
    // initialize grid
    const grid: Cell[][] = [];
    for (let r = 0; r < rows; r++) {
      const row: Cell[] = [];
      for (let c = 0; c < cols; c++)
        row.push({
          r,
          c,
          walls: { N: true, S: true, E: true, W: true },
          visited: false,
        });
      grid.push(row);
    }

    // carve perfect maze with iterative DFS
    const stack: Cell[] = [];
    const start = grid[0][0];
    start.visited = true;
    stack.push(start);

    const neighborsUnvisited = (cell: Cell) => {
      const list: { cell: Cell; dir: string }[] = [];
      const { r, c } = cell;
      if (r > 0 && !grid[r - 1][c].visited)
        list.push({ cell: grid[r - 1][c], dir: "N" });
      if (r < rows - 1 && !grid[r + 1][c].visited)
        list.push({ cell: grid[r + 1][c], dir: "S" });
      if (c > 0 && !grid[r][c - 1].visited)
        list.push({ cell: grid[r][c - 1], dir: "W" });
      if (c < cols - 1 && !grid[r][c + 1].visited)
        list.push({ cell: grid[r][c + 1], dir: "E" });
      return list;
    };

    while (stack.length) {
      const cur = stack[stack.length - 1];
      const n = neighborsUnvisited(cur);
      if (n.length === 0) {
        stack.pop();
        continue;
      }
      const pick = n[Math.floor(Math.random() * n.length)];
      const next = pick.cell;
      const dir = pick.dir;
      if (dir === "N") {
        cur.walls.N = false;
        next.walls.S = false;
      } else if (dir === "S") {
        cur.walls.S = false;
        next.walls.N = false;
      } else if (dir === "E") {
        cur.walls.E = false;
        next.walls.W = false;
      } else if (dir === "W") {
        cur.walls.W = false;
        next.walls.E = false;
      }
      next.visited = true;
      stack.push(next);
    }

    // clear visited flags
    for (let r = 0; r < rows; r++)
      for (let c = 0; c < cols; c++) grid[r][c].visited = false;

    // small chance of extra openings (kept very low)
    const p = 0.02;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (c < cols - 1 && grid[r][c].walls.E && Math.random() < p) {
          grid[r][c].walls.E = false;
          grid[r][c + 1].walls.W = false;
        }
        if (r < rows - 1 && grid[r][c].walls.S && Math.random() < p) {
          grid[r][c].walls.S = false;
          grid[r + 1][c].walls.N = false;
        }
      }
    }

    // compute solution path
    const getSolutionPath = (g: Cell[][]) => {
      const R = g.length;
      const C = g[0].length;
      const parents = new Map<string, string | null>();
      const q: { r: number; c: number }[] = [{ r: 0, c: 0 }];
      const seen = Array.from({ length: R }, () => Array(C).fill(false));
      seen[0][0] = true;
      parents.set(`0,0`, null);
      while (q.length) {
        const cur = q.shift()!;
        if (cur.r === R - 1 && cur.c === C - 1) break;
        const cell = g[cur.r][cur.c];
        const push = (nr: number, nc: number) => {
          if (!seen[nr][nc]) {
            seen[nr][nc] = true;
            parents.set(`${nr},${nc}`, `${cur.r},${cur.c}`);
            q.push({ r: nr, c: nc });
          }
        };
        if (!cell.walls.N && cur.r > 0) push(cur.r - 1, cur.c);
        if (!cell.walls.S && cur.r < R - 1) push(cur.r + 1, cur.c);
        if (!cell.walls.W && cur.c > 0) push(cur.r, cur.c - 1);
        if (!cell.walls.E && cur.c < C - 1) push(cur.r, cur.c + 1);
      }
      const path: { r: number; c: number }[] = [];
      let k: string | null = `${R - 1},${C - 1}`;
      if (!parents.has(k)) return path;
      while (k) {
        const [rr, cc] = k.split(",").map((x) => parseInt(x, 10));
        path.push({ r: rr, c: cc });
        k = parents.get(k) ?? null;
      }
      return path.reverse();
    };

    const solution = getSolutionPath(grid);
    const solutionSet = new Set(solution.map((p) => `${p.r},${p.c}`));

    // attach decoys along the solution path
    const maxRC = Math.max(rows, cols);
    const decoyCount = Math.floor(maxRC / 3);
    const manhattan = (r: number, c: number) =>
      Math.abs(r - (rows - 1)) + Math.abs(c - (cols - 1));

    for (let d = 0; d < decoyCount; d++) {
      if (solution.length < 3) break;
      const attachIndex = 1 + Math.floor(Math.random() * (solution.length - 2));
      let cr = solution[attachIndex].r;
      let cc = solution[attachIndex].c;
      const baseSteps = Math.max(4, Math.floor(maxRC * 0.4));
      const steps = Math.floor(baseSteps * (0.7 + Math.random() * 1.0));
      for (let s = 0; s < steps; s++) {
        const nbrs: { r: number; c: number; dir: string }[] = [];
        if (cr > 0) nbrs.push({ r: cr - 1, c: cc, dir: "N" });
        if (cr < rows - 1) nbrs.push({ r: cr + 1, c: cc, dir: "S" });
        if (cc > 0) nbrs.push({ r: cr, c: cc - 1, dir: "W" });
        if (cc < cols - 1) nbrs.push({ r: cr, c: cc + 1, dir: "E" });

        const candidates = nbrs.filter((n) => {
          if (solutionSet.has(`${n.r},${n.c}`)) return false;
          const around = [
            [n.r - 1, n.c],
            [n.r + 1, n.c],
            [n.r, n.c - 1],
            [n.r, n.c + 1],
          ];
          for (const [ar, ac] of around) {
            if (ar < 0 || ar >= rows || ac < 0 || ac >= cols) continue;
            if (
              ar === solution[attachIndex].r &&
              ac === solution[attachIndex].c
            )
              continue;
            if (solutionSet.has(`${ar},${ac}`)) return false;
          }
          const from = grid[cr][cc];
          if (n.dir === "N" && !from.walls.N) return false;
          if (n.dir === "S" && !from.walls.S) return false;
          if (n.dir === "W" && !from.walls.W) return false;
          if (n.dir === "E" && !from.walls.E) return false;
          return true;
        });
        if (candidates.length === 0) break;
        const toward = candidates.filter(
          (n) => manhattan(n.r, n.c) < manhattan(cr, cc)
        );
        const pick = (toward.length ? toward : candidates)[
          Math.floor(
            Math.random() * (toward.length ? toward.length : candidates.length)
          )
        ];
        const cell = grid[cr][cc];
        const next = grid[pick.r][pick.c];
        if (pick.dir === "N") {
          cell.walls.N = false;
          next.walls.S = false;
        } else if (pick.dir === "S") {
          cell.walls.S = false;
          next.walls.N = false;
        } else if (pick.dir === "E") {
          cell.walls.E = false;
          next.walls.W = false;
        } else if (pick.dir === "W") {
          cell.walls.W = false;
          next.walls.E = false;
        }

        // small side branch
        if (Math.random() < 0.35) {
          const bCandidates: { r: number; c: number; dir: string }[] = [];
          if (pick.dir === "N" || pick.dir === "S") {
            if (pick.c > 0)
              bCandidates.push({ r: pick.r, c: pick.c - 1, dir: "W" });
            if (pick.c < cols - 1)
              bCandidates.push({ r: pick.r, c: pick.c + 1, dir: "E" });
          } else {
            if (pick.r > 0)
              bCandidates.push({ r: pick.r - 1, c: pick.c, dir: "N" });
            if (pick.r < rows - 1)
              bCandidates.push({ r: pick.r + 1, c: pick.c, dir: "S" });
          }
          const bFiltered = bCandidates.filter(
            (b) => !solutionSet.has(`${b.r},${b.c}`)
          );
          if (bFiltered.length) {
            const b = bFiltered[Math.floor(Math.random() * bFiltered.length)];
            const from = grid[pick.r][pick.c];
            const to = grid[b.r][b.c];
            if (b.dir === "N") {
              from.walls.N = false;
              to.walls.S = false;
            } else if (b.dir === "S") {
              from.walls.S = false;
              to.walls.N = false;
            } else if (b.dir === "E") {
              from.walls.E = false;
              to.walls.W = false;
            } else if (b.dir === "W") {
              from.walls.W = false;
              to.walls.E = false;
            }
          }
        }

        cr = pick.r;
        cc = pick.c;
      }
    }

    // ensure goal has only the one opening from the solution
    if (solution.length >= 2) {
      const goalPrev = solution[solution.length - 2];
      const goal = grid[rows - 1][cols - 1];
      // determine direction from goalPrev -> goal
      let keepDir: string | null = null;
      if (goalPrev.r === rows - 1 && goalPrev.c === cols - 2) keepDir = "W";
      else if (goalPrev.r === rows - 2 && goalPrev.c === cols - 1)
        keepDir = "N";
      // close other neighbor openings
      const neighborsCoords = [
        { r: rows - 2, c: cols - 1, dir: "N" },
        { r: rows - 1, c: cols - 2, dir: "W" },
      ];
      for (const n of neighborsCoords) {
        const { r: nr, c: nc, dir } = n as any;
        if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) continue;
        if (dir !== keepDir) {
          if (dir === "N") {
            goal.walls.N = true;
            grid[nr][nc].walls.S = true;
          } else if (dir === "W") {
            goal.walls.W = true;
            grid[nr][nc].walls.E = true;
          }
        }
      }
      // ensure there is an opening out of the maze (south edge of the goal)
      goal.walls.S = false;
    }

    lastGrid = grid;
    const shortest = bfsShortestPathLen(grid);
    if (shortest >= targetMin) return grid;
  }

  if (lastGrid) return lastGrid;
  const finalGrid: Cell[][] = [];
  for (let r = 0; r < rows; r++) {
    const row: Cell[] = [];
    for (let c = 0; c < cols; c++)
      row.push({
        r,
        c,
        walls: { N: true, S: true, E: true, W: true },
        visited: false,
      });
    finalGrid.push(row);
  }
  return finalGrid;
}

const MazeRiddle: React.FC<MazeRiddleProps> = ({
  onComplete,
  rows = 41,
  cols = 41,
}) => {
  const [grid, setGrid] = useState<Cell[][] | null>(null);
  const [player, setPlayer] = useState<{ r: number; c: number }>({
    r: 0,
    c: 0,
  });
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setGrid(generateMaze(rows, cols));
    setPlayer({ r: 0, c: 0 });
  }, [rows, cols]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!grid) return;
      let dr = 0,
        dc = 0;
      let dir: keyof Cell["walls"] | null = null;
      if (e.key === "ArrowUp") {
        dr = -1;
        dir = "N";
      } else if (e.key === "ArrowDown") {
        dr = 1;
        dir = "S";
      } else if (e.key === "ArrowLeft") {
        dc = -1;
        dir = "W";
      } else if (e.key === "ArrowRight") {
        dc = 1;
        dir = "E";
      } else {
        return;
      }
      e.preventDefault();
      const nr = player.r + dr;
      const nc = player.c + dc;
      if (nc < 0 || nc >= cols || nr < 0) return;
      const cell = grid[player.r][player.c];
      // @ts-ignore
      const blocked = cell.walls[dir];
      if (!blocked) {
        setPlayer({ r: nr, c: nc });
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [grid, player, rows, cols]);

  useEffect(() => {
    if (!grid) return;
    if (player.r === rows - 1 && player.c === cols - 1) onComplete(true);
  }, [player, grid]);

  if (!grid) return <div>Generating maze...</div>;

  const cellSize =
    rows > 35 || cols > 35
      ? 12
      : rows > 25 || cols > 25
      ? 14
      : rows > 15 || cols > 15
      ? 18
      : 28;

  return (
    <div style={{ textAlign: "center" }}>
      <div
        ref={containerRef}
        tabIndex={0}
        style={{
          display: "inline-block",
          outline: "none",
          background: "#111",
          padding: 8,
        }}
      >
        <div
          style={{
            position: "relative",
            width: cols * cellSize,
            height: rows * cellSize,
          }}
        >
          {/* floor cells */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
              gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
              position: "absolute",
              left: 0,
              top: 0,
              zIndex: 1,
            }}
          >
            {grid.map((row, r) =>
              row.map((cell, c) => {
                const isPlayer = player.r === r && player.c === c;
                const isGoal = r === rows - 1 && c === cols - 1;
                return (
                  <div
                    key={`${r}-${c}`}
                    style={{
                      width: cellSize,
                      height: cellSize,
                      boxSizing: "border-box",
                      background: isPlayer ? "#c30f16" : "#00873e",
                      transition: "none",
                    }}
                  />
                );
              })
            )}
          </div>
          {(() => {
            const goalCell = grid[rows - 1][cols - 1];
            if (!goalCell.walls.S) {
              return (
                <div
                  style={{
                    position: "absolute",
                    left: (cols - 1) * cellSize + 1,
                    top: rows * cellSize,
                    width: cellSize - 2,
                    height: cellSize - 4,
                    background: "#00873e",
                    zIndex: 1,
                  }}
                />
              );
            }
            return null;
          })()}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: cols * cellSize,
              height: rows * cellSize,
              pointerEvents: "none",
              zIndex: 2,
            }}
          >
            {(() => {
              const wallThickness = Math.max(2, Math.floor(cellSize / 6));
              const walls: React.ReactNode[] = [];
              for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                  const cell = grid[r][c];
                  if (cell.walls.E) {
                    walls.push(
                      <div
                        key={`v-${r}-${c}`}
                        style={{
                          position: "absolute",
                          left:
                            c * cellSize +
                            cellSize -
                            Math.floor(wallThickness / 2),
                          top: r * cellSize,
                          width: wallThickness,
                          height: cellSize,
                          background: "#222",
                        }}
                      />
                    );
                  }
                  if (cell.walls.S) {
                    walls.push(
                      <div
                        key={`h-${r}-${c}`}
                        style={{
                          position: "absolute",
                          left: c * cellSize,
                          top:
                            r * cellSize +
                            cellSize -
                            Math.floor(wallThickness / 2),
                          width: cellSize,
                          height: wallThickness,
                          background: "#222",
                        }}
                      />
                    );
                  }
                  if (r === 0 && cell.walls.N) {
                    walls.push(
                      <div
                        key={`h-n-${r}-${c}`}
                        style={{
                          position: "absolute",
                          left: c * cellSize,
                          top: -Math.floor(wallThickness / 2),
                          width: cellSize,
                          height: wallThickness,
                          background: "#222",
                        }}
                      />
                    );
                  }
                  if (c === 0 && cell.walls.W) {
                    walls.push(
                      <div
                        key={`v-w-${r}-${c}`}
                        style={{
                          position: "absolute",
                          left: -Math.floor(wallThickness / 2),
                          top: r * cellSize,
                          width: wallThickness,
                          height: cellSize,
                          background: "#222",
                        }}
                      />
                    );
                  }
                }
              }
              return walls;
            })()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MazeRiddle;
