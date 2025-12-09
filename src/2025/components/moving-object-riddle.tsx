import React, { useEffect, useRef, useState } from "react";
import Spotlight from "../../components/spotlight.component";

interface Props {
  onComplete: (won: boolean) => void;
  spotRadius?: number;
}

const rand = (min: number, max: number) => Math.random() * (max - min) + min;

const MovingObjectRiddle: React.FC<Props> = ({ onComplete, spotRadius = 60 }) => {
  const objRef = useRef<HTMLDivElement | null>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const prevSpeedRef = useRef<number>(0.5);

  const [pos, setPos] = useState({ x: 200, y: 200 });
  const [target, setTarget] = useState({ x: 500, y: 200 });
  const [speed, setSpeed] = useState(0.5); // pixels per ms
  const [size, setSize] = useState(48);
  const [caughtCount, setCaughtCount] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [wiggle, setWiggle] = useState(false);
  const [frozen, setFrozen] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [forceVisible, setForceVisible] = useState(false);

  const pickTarget = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    return { x: rand(60, w - 60), y: rand(60, h - 60) };
  };

  useEffect(() => {
    setPos(pickTarget());
    setTarget(pickTarget());
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    document.addEventListener("mousemove", onMove);
    return () => document.removeEventListener("mousemove", onMove);
  }, []);

  // movement loop
  useEffect(() => {
    let raf = 0;
    let last = performance.now();

    const step = (now: number) => {
      const dt = now - last;
      last = now;

      if (!frozen) {
        const dx = target.x - pos.x;
        const dy = target.y - pos.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 2) {
          const nt = pickTarget();
          setTarget(nt);
        } else {
          const move = Math.min(dist, speed * dt);
          const nx = pos.x + (dx / dist) * move;
          const ny = pos.y + (dy / dist) * move;
          setPos({ x: nx, y: ny });
        }
      }

      const m = mouseRef.current;
      const dd = Math.hypot(m.x - pos.x, m.y - pos.y);
      const inSpot = dd <= spotRadius;

      // object should only be visible when the spotlight is over it,
      // or when forceVisible is set during the catch sequence
      const shouldShow = (inSpot && isVisible) || forceVisible;

      if (inSpot && isVisible && !wiggle && !frozen) {
        handleHit();
      }

      raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pos, target, speed, isVisible, wiggle, frozen, forceVisible, spotRadius]);

  const handleHit = () => {
    if (frozen) return;
    setWiggle(true);
    prevSpeedRef.current = speed;
    // stop movement and hold in place
    setFrozen(true);
    setSpeed(0);
    // ensure visibility and start spinning for 2s
    setForceVisible(true);
    setSpinning(true);

    // small immediate feedback
    setTimeout(() => setWiggle(false), 120);

    // after 2s, stop spinning and hide, then respawn or finish
    setTimeout(() => {
      setSpinning(false);
      setIsVisible(false);

      setCaughtCount((c) => {
        const nc = c + 1;
        setSize((s) => Math.max(14, Math.round(s * 0.75)));
        const newSpeed = Math.max(0.1, prevSpeedRef.current * 1.8);

        if (nc >= 3) {
          setTimeout(() => {
            setForceVisible(false);
            onComplete(true);
          }, 300);
        } else {
          setTimeout(() => {
            const nt = pickTarget();
            setPos(nt);
            setTarget(pickTarget());
            setIsVisible(true);
            setFrozen(false);
            setForceVisible(false);
            setSpeed(newSpeed);
            prevSpeedRef.current = newSpeed;
          }, 300);
        }

        return nc;
      });
    }, 2000);
  };

  // compute transform and transition depending on state
  const transformStr = spinning
    ? "rotate(360deg) scale(1.05)"
    : wiggle
    ? "rotate(-8deg) scale(1.05)"
    : undefined;
  const transitionStr = spinning
    ? "transform 2000ms linear"
    : wiggle
    ? "transform 80ms ease-in-out"
    : "transform 120ms linear, opacity 200ms";

  const visibleNow = (isVisible && Math.hypot(mouseRef.current.x - pos.x, mouseRef.current.y - pos.y) <= spotRadius) || forceVisible;

  const objStyle: React.CSSProperties = {
    position: "fixed",
    left: pos.x - size / 2,
    top: pos.y - size / 2,
    width: size,
    height: size,
    borderRadius: "50%",
    background: "linear-gradient(135deg,#ffd36b,#ff6b6b)",
    boxShadow: "0 6px 18px rgba(0,0,0,0.35)",
    transform: transformStr,
    transition: transitionStr,
    opacity: visibleNow ? 1 : 0,
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#3a2",
    fontWeight: 700,
    zIndex: 2000,
  };

  const innerCoreStyle: React.CSSProperties = {
    width: "60%",
    height: "60%",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.9)",
    transform: isVisible ? "scale(1)" : "scale(0.3)",
    transition: "transform 260ms ease, opacity 260ms ease",
    opacity: isVisible ? 1 : 0,
  };

  const spotlightGlowStyle: React.CSSProperties = {
    position: "fixed",
    // make the glow larger than the spotlight radius
    width: spotRadius * 3,
    height: spotRadius * 3,
    left: pos.x - (spotRadius * 3) / 2,
    top: pos.y - (spotRadius * 3) / 2,
    borderRadius: "50%",
    pointerEvents: "none",
    background: `radial-gradient(
      circle at 50% 50%,
      rgba(255, 150, 40, 1) 0%,
      rgba(255, 165, 50, 0.95) 12%,
      rgba(255, 200, 80, 0.85) 28%,
      rgba(255, 220, 120, 0.6) 44%,
      rgba(255, 240, 200, 0.45) 60%,
      rgba(255, 250, 250, 0.22) 78%,
      rgba(255, 255, 255, 0) 100%
    )`,
    filter: "blur(14px)",
    mixBlendMode: "screen",
    zIndex: 2800,
    opacity: 1,
    animation: "flicker 360ms infinite",
    transition: "opacity 160ms ease, left 120ms linear, top 120ms linear",
  } as React.CSSProperties;

  return (
    <>
      {/* Render spotlight always so cursor behavior is consistent. */}
      <Spotlight radius={spotRadius}>
        <div aria-hidden />
      </Spotlight>

      {/*
        The object is rendered inside the spotlight mask when not forcing
        visibility; when `forceVisible` is true we render it outside the
        Spotlight so it remains visible even if the spotlight isn't over it.
      */}
      {forceVisible ? (
        <>
          <div style={spotlightGlowStyle} />
          <div ref={objRef} style={{ ...objStyle, zIndex: 2800 }} className={wiggle ? "wiggle" : ""}>
            <div style={innerCoreStyle} />
          </div>
        </>
      ) : (
        <div aria-hidden>
          <div ref={objRef} style={objStyle} className={wiggle ? "wiggle" : ""}>
            <div style={innerCoreStyle} />
          </div>
        </div>
      )}

      <div
        style={{
          position: "fixed",
          left: 20,
          top: 20,
          zIndex: 3000,
          color: "#fff",
          fontSize: 14,
          background: "rgba(0,0,0,0.4)",
          padding: "6px 10px",
          borderRadius: 6,
        }}
      >
        Finds: {caughtCount} / 3
      </div>
    </>
  );
};

export default MovingObjectRiddle;

