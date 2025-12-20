import React, { useEffect, useRef, useState } from "react";
import cookieImg from "../../../assets/img/cookie.png";
import Spotlight from "../../../components/spotlight.component";
import styles from "./moving-cookie-riddle.module.css";

interface Props {
  onComplete: (won: boolean) => void;
  spotRadius?: number;
}

// Configuration
const CONFIG = {
  ALWAYS_VISIBLE_FOR_TEST: false,
  INITIAL_SPEED: 0.5,
  SPEED_MULTIPLIER: 1.2,
  SIZE_MULTIPLIER: 0.75,
  INITIAL_SIZE: 48,
  MIN_SIZE: 14,
  MIN_SPEED: 0.1,
  ESCAPES_PER_ROUND: [3, 5, 10],
  ESCAPE_COOLDOWN: 500,
  CATCH_DURATION: 2000,
  RESPAWN_DELAY: 300,
};

const rand = (min: number, max: number) => Math.random() * (max - min) + min;
const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

const MovingCookieRiddle: React.FC<Props> = ({
  onComplete,
  spotRadius = 60,
}) => {
  const objRef = useRef<HTMLDivElement | null>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const prevSpeedRef = useRef<number>(CONFIG.INITIAL_SPEED);
  const posRef = useRef({ x: 200, y: 200 });
  const escapesRef = useRef<number>(0);
  const lastEscapeTime = useRef<number>(0);

  const [pos, setPos] = useState({ x: 200, y: 200 });
  const [target, setTarget] = useState({ x: 500, y: 200 });
  const [speed, setSpeed] = useState(CONFIG.INITIAL_SPEED);
  const [size, setSize] = useState(CONFIG.INITIAL_SIZE);
  const [caughtCount, setCaughtCount] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [frozen, setFrozen] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [forceVisible, setForceVisible] = useState(false);

  // Position utilities
  const pickRandomTarget = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    return { x: rand(60, w - 60), y: rand(60, h - 60) };
  };

  const pickOppositeTarget = (avoidPoint?: { x: number; y: number }) => {
    const w = window.innerWidth;
    const h = window.innerHeight;

    if (
      !avoidPoint ||
      avoidPoint.x < 0 ||
      avoidPoint.y < 0 ||
      avoidPoint.x > w ||
      avoidPoint.y > h
    ) {
      return pickRandomTarget();
    }

    const cx = w / 2;
    const cy = h / 2;
    const vx = cx - avoidPoint.x;
    const vy = cy - avoidPoint.y;
    const vlen = Math.hypot(vx, vy);

    if (vlen < 10) return pickRandomTarget();

    const ux = vx / vlen;
    const uy = vy / vlen;
    const reach = Math.max(w, h) * 0.6 + rand(0, 160);
    const nx = cx + ux * reach + rand(-80, 80);
    const ny = cy + uy * reach + rand(-80, 80);

    return { x: clamp(nx, 60, w - 60), y: clamp(ny, 60, h - 60) };
  };

  const updatePosition = (newPos: { x: number; y: number }) => {
    setPos(newPos);
    posRef.current = newPos;
  };

  // Escape logic
  const performEscape = (now: number) => {
    const newPos = pickOppositeTarget(mouseRef.current);
    updatePosition(newPos);
    setTarget(pickRandomTarget());
    escapesRef.current = Math.max(0, escapesRef.current - 1);
    lastEscapeTime.current = now;
  };

  const canEscape = (now: number) => {
    return (
      escapesRef.current > 0 &&
      now - lastEscapeTime.current > CONFIG.ESCAPE_COOLDOWN
    );
  };

  // Catch logic
  const handleCatch = () => {
    if (frozen) return;

    prevSpeedRef.current = speed;
    setFrozen(true);
    setSpeed(0);
    setForceVisible(true);
    setSpinning(true);

    setTimeout(() => {
      setSpinning(false);
      setIsVisible(false);

      setCaughtCount((c) => {
        const newCount = c + 1;
        setSize((s) =>
          Math.max(CONFIG.MIN_SIZE, Math.round(s * CONFIG.SIZE_MULTIPLIER))
        );
        const newSpeed = Math.max(
          CONFIG.MIN_SPEED,
          prevSpeedRef.current * CONFIG.SPEED_MULTIPLIER
        );

        if (newCount >= 3) {
          setTimeout(() => {
            setForceVisible(false);
            onComplete(true);
          }, CONFIG.RESPAWN_DELAY);
        } else {
          setTimeout(() => {
            const newPos = pickOppositeTarget(mouseRef.current);
            updatePosition(newPos);
            setTarget(pickRandomTarget());
            escapesRef.current = CONFIG.ESCAPES_PER_ROUND[newCount] ?? 2;
            setIsVisible(true);
            setFrozen(false);
            setForceVisible(false);
            setSpeed(newSpeed);
            prevSpeedRef.current = newSpeed;
          }, CONFIG.RESPAWN_DELAY);
        }

        return newCount;
      });
    }, CONFIG.CATCH_DURATION);
  };

  // Initialize
  useEffect(() => {
    const initialPos = pickOppositeTarget(mouseRef.current);
    updatePosition(initialPos);
    escapesRef.current = CONFIG.ESCAPES_PER_ROUND[0] ?? 2;
    setTarget(pickRandomTarget());
  }, []);

  // Mouse tracking
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    document.addEventListener("mousemove", onMove);
    return () => document.removeEventListener("mousemove", onMove);
  }, []);

  // Movement loop
  useEffect(() => {
    let raf = 0;
    let last = performance.now();

    const step = (now: number) => {
      const dt = now - last;
      last = now;

      // Move cookie
      if (!frozen) {
        const dx = target.x - pos.x;
        const dy = target.y - pos.y;
        const dist = Math.hypot(dx, dy);

        if (dist < 2) {
          setTarget(pickRandomTarget());
        } else {
          const move = Math.min(dist, speed * dt);
          const nx = pos.x + (dx / dist) * move;
          const ny = pos.y + (dy / dist) * move;
          updatePosition({ x: nx, y: ny });
        }
      }

      // Check spotlight collision
      const m = mouseRef.current;
      const dd = Math.hypot(m.x - pos.x, m.y - pos.y);
      const inSpot = dd <= spotRadius;

      if (inSpot && isVisible && !frozen) {
        if (canEscape(now)) {
          performEscape(now);
        } else {
          handleCatch();
        }
      }

      raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [pos, target, speed, isVisible, frozen, forceVisible, spotRadius]);

  // Compute styles
  const isVisibleNow =
    CONFIG.ALWAYS_VISIBLE_FOR_TEST ||
    (isVisible &&
      Math.hypot(mouseRef.current.x - pos.x, mouseRef.current.y - pos.y) <=
        spotRadius) ||
    forceVisible;

  const cookieClasses = [styles.cookie, spinning && styles.spinning]
    .filter(Boolean)
    .join(" ");

  const cookieCoreClasses = [styles.cookieCore, !isVisible && styles.hidden]
    .filter(Boolean)
    .join(" ");

  const cookieImageClasses = [styles.cookieImage, spinning && styles.spinning]
    .filter(Boolean)
    .join(" ");

  const getTransform = () => {
    if (spinning) {
      // Always scale to 2x the initial size, regardless of current size
      const targetSize = CONFIG.INITIAL_SIZE * 2;
      const scaleFactor = targetSize / size;
      return `rotate(360deg) scale(${scaleFactor})`;
    }
    return undefined;
  };

  const cookieStyle = {
    left: pos.x - size / 2,
    top: pos.y - size / 2,
    width: size,
    height: size,
    transform: getTransform(),
    opacity: isVisibleNow ? 1 : 0,
  };

  const glowStyle = {
    width: spotRadius * 3,
    height: spotRadius * 3,
    left: pos.x - (spotRadius * 3) / 2,
    top: pos.y - (spotRadius * 3) / 2,
  };

  return (
    <>
      <Spotlight radius={frozen ? 0 : spotRadius}>
        <div aria-hidden />
      </Spotlight>

      {forceVisible ? (
        <>
          <div className={styles.spotlightGlow} style={glowStyle} />
          <div
            ref={objRef}
            className={cookieClasses}
            style={{ ...cookieStyle, zIndex: 2800 }}
          >
            <div className={cookieCoreClasses}>
              <img
                src={cookieImg}
                alt="cookie"
                className={cookieImageClasses}
              />
            </div>
          </div>
        </>
      ) : (
        <div aria-hidden>
          <div ref={objRef} className={cookieClasses} style={cookieStyle}>
            <div className={cookieCoreClasses}>
              <img
                src={cookieImg}
                alt="cookie"
                className={cookieImageClasses}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MovingCookieRiddle;
