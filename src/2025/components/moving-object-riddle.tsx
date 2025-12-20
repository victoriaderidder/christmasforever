import React, { useEffect, useRef, useState } from "react";
import cookieImg from "../../2024/assets/img/cookie.png";
import Spotlight from "../../components/spotlight.component";

interface Props {
  onComplete: (won: boolean) => void;
  spotRadius?: number;
}

const rand = (min: number, max: number) => Math.random() * (max - min) + min;

const MovingObjectRiddle: React.FC<Props> = ({
  onComplete,
  spotRadius = 60,
}) => {
  const objRef = useRef<HTMLDivElement | null>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const prevSpeedRef = useRef<number>(0.5);

  const [pos, setPos] = useState({ x: 200, y: 200 });
  const posRef = useRef(pos);
  const [target, setTarget] = useState({ x: 500, y: 200 });
  const escapesRef = useRef<number>(0);
  const lastEscapeTime = useRef<number>(0);
  const [speed, setSpeed] = useState(0.5); // pixels per ms
  const [size, setSize] = useState(48);
  const [caughtCount, setCaughtCount] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [wiggle, setWiggle] = useState(false);
  const [frozen, setFrozen] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [forceVisible, setForceVisible] = useState(false);

  const clamp = (v: number, a: number, b: number) =>
    Math.max(a, Math.min(b, v));

  const ALWAYS_VISIBLE_FOR_TEST = true;

  const pickTarget = (avoid?: { x: number; y: number }) => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    if (!avoid) return { x: rand(60, w - 60), y: rand(60, h - 60) };

    const from = posRef.current || pos;
    const dx = from.x - avoid.x;
    const dy = from.y - avoid.y;
    let dist = Math.hypot(dx, dy);

    // aggression grows with number of finds so the cookie flees more strongly
    const aggression = 1 + Math.max(0, caughtCount) * 0.85;

    if (dist < 10) {
      const ang = Math.random() * Math.PI * 2;
      return {
        x: clamp(
          from.x + Math.cos(ang) * rand(120, 260) * aggression,
          60,
          w - 60
        ),
        y: clamp(
          from.y + Math.sin(ang) * rand(120, 260) * aggression,
          60,
          h - 60
        ),
      };
    }

    const baseLen = rand(160, 320);
    const len = baseLen * aggression;
    const nx = from.x + (dx / dist) * len + rand(-80, 80) * aggression;
    const ny = from.y + (dy / dist) * len + rand(-80, 80) * aggression;
    return { x: clamp(nx, 60, w - 60), y: clamp(ny, 60, h - 60) };
  };

  const pickOpposite = (avoid?: { x: number; y: number }) => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    // if avoid is not valid, fallback to random
    if (!avoid || avoid.x < 0 || avoid.y < 0 || avoid.x > w || avoid.y > h) {
      return pickTarget();
    }

    const cx = w / 2;
    const cy = h / 2;
    // vector from cursor toward center
    const vx = cx - avoid.x;
    const vy = cy - avoid.y;
    const vlen = Math.hypot(vx, vy);
    if (vlen < 10) return pickTarget();

    const ux = vx / vlen;
    const uy = vy / vlen;
    // go past center toward the opposite side, scaled to screen size
    const reach = Math.max(w, h) * 0.6 + rand(0, 160);
    const nx = cx + ux * reach + rand(-80, 80);
    const ny = cy + uy * reach + rand(-80, 80);
    return { x: clamp(nx, 60, w - 60), y: clamp(ny, 60, h - 60) };
  };

  const escapesPerRound = [2, 3, 7];

  useEffect(() => {
    const p = pickOpposite(mouseRef.current);
    setPos(p);
    posRef.current = p;
    // set how many escapes this first round should perform
    escapesRef.current = escapesPerRound[0] ?? 2;
    setTarget(pickTarget(mouseRef.current));
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
          // reached target, pick a new random one to keep moving
          setTarget(pickTarget());
        } else {
          const move = Math.min(dist, speed * dt);
          const nx = pos.x + (dx / dist) * move;
          const ny = pos.y + (dy / dist) * move;
          const np = { x: nx, y: ny };
          setPos(np);
          posRef.current = np;
        }
      }

      const m = mouseRef.current;
      const dd = Math.hypot(m.x - pos.x, m.y - pos.y);
      const inSpot = dd <= spotRadius;

      // object should only be visible when the spotlight is over it,
      // or when forceVisible is set during the catch sequence
      const shouldShow = (inSpot && isVisible) || forceVisible;

      if (inSpot && isVisible && !wiggle && !frozen) {
        const timeSinceLastEscape = now - lastEscapeTime.current;
        if (escapesRef.current > 0 && timeSinceLastEscape > 500) {
          // teleport to opposite side and keep moving
          const nt = pickOpposite(mouseRef.current);
          setPos(nt);
          posRef.current = nt;
          setTarget(pickTarget());
          escapesRef.current = Math.max(0, escapesRef.current - 1);
          lastEscapeTime.current = now;
        } else {
          handleHit();
        }
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
            const nt = pickOpposite(mouseRef.current);
            setPos(nt);
            posRef.current = nt;
            setTarget(pickTarget(mouseRef.current));
            // set escapes for the upcoming round based on the new caught count
            escapesRef.current = escapesPerRound[nc] ?? 2;
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
    ? "rotate(360deg) scale(2)"
    : wiggle
    ? "rotate(-8deg) scale(2)"
    : undefined;
  const transitionStr = spinning
    ? "transform 2000ms linear"
    : wiggle
    ? "transform 80ms ease-in-out"
    : "transform 120ms linear, opacity 200ms";

  const visibleNow =
    ALWAYS_VISIBLE_FOR_TEST ||
    (isVisible &&
      Math.hypot(mouseRef.current.x - pos.x, mouseRef.current.y - pos.y) <=
        spotRadius) ||
    forceVisible;

  const objStyle: React.CSSProperties = {
    position: "fixed",
    left: pos.x - size / 2,
    top: pos.y - size / 2,
    width: size,
    height: size,
    borderRadius: "50%",
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
    transform: isVisible ? "scale(1)" : "scale(0.3)",
    transition: "transform 260ms ease, opacity 260ms ease",
    opacity: isVisible ? 1 : 0,
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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

      {/* keyframes for cookie spin celebration */}
      <style>{`@keyframes cookieSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>

      {/*
        The object is rendered inside the spotlight mask when not forcing
        visibility; when `forceVisible` is true we render it outside the
        Spotlight so it remains visible even if the spotlight isn't over it.
      */}
      {forceVisible ? (
        <>
          <div style={spotlightGlowStyle} />
          <div
            ref={objRef}
            style={{ ...objStyle, zIndex: 2800 }}
            className={wiggle ? "wiggle" : ""}
          >
            <div style={innerCoreStyle}>
              <img
                src={cookieImg}
                alt="cookie"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  animation: spinning ? "cookieSpin 2000ms linear" : undefined,
                }}
              />
            </div>
          </div>
        </>
      ) : (
        <div aria-hidden>
          <div ref={objRef} style={objStyle} className={wiggle ? "wiggle" : ""}>
            <div style={innerCoreStyle}>
              <img
                src={cookieImg}
                alt="cookie"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  animation: spinning ? "cookieSpin 2000ms linear" : undefined,
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MovingObjectRiddle;
