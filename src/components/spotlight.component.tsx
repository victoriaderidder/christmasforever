import React, { FC, useRef, useState, useEffect } from "react";
import "../2025/App2025.css";

interface SpotlightProps {
  radius?: number;
  children?: React.ReactNode;
}

const Spotlight: FC<SpotlightProps> = ({ radius = 120, children }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [pos, setPos] = useState({ x: -9999, y: -9999 });
  const [active, setActive] = useState(true);

  const handleMove = (e: any) => {
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

  useEffect(() => {
    const onDocMouseOut = (e: MouseEvent) => {
      if (!(e.relatedTarget as Node)) {
        handleLeave();
      }
    };

    const onWindowBlur = () => handleLeave();
    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden") handleLeave();
    };

    document.addEventListener("mouseout", onDocMouseOut);
    window.addEventListener("blur", onWindowBlur);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      document.removeEventListener("mouseout", onDocMouseOut);
      window.removeEventListener("blur", onWindowBlur);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  const mask = `radial-gradient(circle ${radius}px at ${pos.x}px ${pos.y}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 40%, rgba(0,0,0,0) 70%)`;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`app2025 ${active ? "active" : ""}`}
      style={{ cursor: active ? "none" : "auto" }}
    >
      <div
        className="reveal-white"
        aria-hidden
        style={{ WebkitMaskImage: mask, maskImage: mask }}
      >
        {children}
      </div>
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

export default Spotlight;
