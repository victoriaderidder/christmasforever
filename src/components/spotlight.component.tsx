import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import styles from "../2025/App2025.module.css";

interface SpotlightProps {
  radius?: number;
  children?: React.ReactNode;
}

const Spotlight: FC<SpotlightProps> = ({ radius = 120, children }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [pos, setPos] = useState({ x: -9999, y: -9999 });
  const [active, setActive] = useState(true);

  const setDefaultPosition = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;
    setPos({ x: rect.width / 2, y: rect.height / 2 });
    setActive(true);
  }, []);

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
    const raf = window.requestAnimationFrame(() => {
      setDefaultPosition();
    });

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
    window.addEventListener("resize", setDefaultPosition);

    return () => {
      window.cancelAnimationFrame(raf);
      document.removeEventListener("mouseout", onDocMouseOut);
      window.removeEventListener("blur", onWindowBlur);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("resize", setDefaultPosition);
    };
  }, [setDefaultPosition]);

  const mask = `radial-gradient(circle ${radius}px at ${pos.x}px ${pos.y}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 40%, rgba(0,0,0,0) 70%)`;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`${styles.app2025} ${active ? styles.active : ""}`}
      style={{ cursor: active ? "none" : "auto" }}
    >
      <div
        className={styles["reveal-white"]}
        aria-hidden
        style={{ WebkitMaskImage: mask, maskImage: mask }}
      >
        {children}
      </div>
      <div
        className={styles.spotlight}
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
