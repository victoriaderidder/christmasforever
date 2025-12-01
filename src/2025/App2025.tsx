import { FC, useRef, useState } from "react";
import Home from "../components/home.component";
import "./App2025.css";

const App2025: FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [pos, setPos] = useState({ x: -9999, y: -9999 });
  const [active, setActive] = useState(false);

  const handleMove = (e: React.MouseEvent) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setPos({ x, y });
    setActive(true);
  };

  const handleLeave = () => {
    setActive(false);
    setPos({ x: -9999, y: -9999 });
  };

  const radius = 40; // px

  const mask = `radial-gradient(circle ${radius}px at ${pos.x}px ${pos.y}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 40%, rgba(0,0,0,0) 70%)`;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`app2025 ${active ? "active" : ""}`}
    >
      {active && (
        <div
          className="reveal-white"
          aria-hidden
          style={{ WebkitMaskImage: mask, maskImage: mask }}
        >
          <Home />
          <h1 style={{ color: "white", fontSize: 64, margin: 0 }}>
            Christmas 2025
          </h1>
          <p style={{ color: "white", fontSize: 20, marginTop: 18 }}>
            Coming Soon...
          </p>
        </div>
      )}
      <div
        className="spotlight"
        style={{
          ["--sx" as any]: `${pos.x}px`,
          ["--sy" as any]: `${pos.y}px`,
          ["--radius" as any]: `${radius}px`,
        }}
      />
    </div>
  );
};

export default App2025;
