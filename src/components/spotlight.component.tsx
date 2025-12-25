import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import styles from "./spotlight/spotlight.module.css";

interface SpotlightProps {
  radius?: number;
  children?: React.ReactNode;
}

type SpotlightUpdateDetail = {
  active: boolean;
  x: number;
  y: number;
  radius: number;
};

const Spotlight: FC<SpotlightProps> = ({ radius = 120, children }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(true);
  const posRef = useRef({ x: -9999, y: -9999 });
  const rafIdRef = useRef<number | null>(null);

  const emitUpdate = useCallback(
    (nextActive: boolean, next: { x: number; y: number }) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const detail: SpotlightUpdateDetail = {
        active: nextActive,
        x: rect.left + next.x,
        y: rect.top + next.y,
        radius,
      };
      window.dispatchEvent(new CustomEvent<SpotlightUpdateDetail>(
        "spotlight:update",
        { detail }
      ));
    },
    [radius]
  );

  const applyVars = useCallback(
    (next: { x: number; y: number }) => {
      const el = containerRef.current;
      if (!el) return;
      el.style.setProperty("--sx", `${next.x}px`);
      el.style.setProperty("--sy", `${next.y}px`);
      el.style.setProperty("--radius", `${radius}px`);
      emitUpdate(true, next);
    },
    [emitUpdate, radius]
  );

  const setDefaultPosition = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;
    const next = { x: rect.width / 2, y: rect.height / 2 };
    posRef.current = next;
    applyVars(next);
    setActive(true);
  }, [applyVars]);

  const handleMove = (e: any) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    posRef.current = { x, y };

    if (rafIdRef.current == null) {
      rafIdRef.current = window.requestAnimationFrame(() => {
        rafIdRef.current = null;
        applyVars(posRef.current);
      });
    }
    setActive(true);
  };

  const handleLeave = () => {
    setActive(false);
    const next = { x: -9999, y: -9999 };
    posRef.current = next;
    const el = containerRef.current;
    if (el) {
      el.style.setProperty("--sx", `${next.x}px`);
      el.style.setProperty("--sy", `${next.y}px`);
      el.style.setProperty("--radius", `${radius}px`);
    }
    emitUpdate(false, next);
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
      if (rafIdRef.current != null) {
        window.cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      document.removeEventListener("mouseout", onDocMouseOut);
      window.removeEventListener("blur", onWindowBlur);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("resize", setDefaultPosition);
    };
  }, [setDefaultPosition]);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`${styles.container} ${active ? styles.active : ""}`}
    >
      <div className={styles.reveal} aria-hidden>
        {children}
      </div>
      <div className={styles.spotlight} />
    </div>
  );
};

export default Spotlight;
