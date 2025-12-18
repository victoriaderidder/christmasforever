import React, { useEffect, useRef, useState } from "react";
import styles from "./potion-riddle.module.css";

interface Props {
  onComplete: (won: boolean, quality?: number) => void;
}

type RoundConfig = {
  length: number;
  showInterval: number;
};

const ROUNDS: RoundConfig[] = [
  { length: 3, showInterval: 900 },
  { length: 5, showInterval: 750 },
  { length: 7, showInterval: 600 },
];

const PAD_COUNT = 7;

const randomSequence = (len: number) => {
  const seq: number[] = [];
  for (let i = 0; i < len; i++) seq.push(Math.floor(Math.random() * PAD_COUNT));
  return seq;
};

const PotionRiddle: React.FC<Props> = ({ onComplete }) => {
  const [roundIndex, setRoundIndex] = useState(0);
  const [sequence, setSequence] = useState<number[]>([]);
  const [showing, setShowing] = useState(false);
  const [playIndex, setPlayIndex] = useState(0);
  const [userIndex, setUserIndex] = useState(0);
  const [activePad, setActivePad] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [allFailed, setAllFailed] = useState(false);
  const [allActive, setAllActive] = useState(false);
  const [inputEnabled, setInputEnabled] = useState(false);
  const padGridRef = useRef<HTMLDivElement | null>(null);
  const [noAnimMode, setNoAnimMode] = useState(false);

  const timers = useRef<number[]>([]);
  const tumbleOffsets = useRef<
    Array<{ tx: number; ty: number; rot: number; delay: number }>
  >([]);
  const transitionListeners = useRef<Array<{ el: Element; fn: EventListener }>>(
    []
  );
  const restoreScheduled = useRef(false);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    startRound(roundIndex);
    return () => {
      cleanup();
      isMounted.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roundIndex]);

  useEffect(() => {
    if (!allFailed) {
      tumbleOffsets.current = [];
      return;
    }
    const h = typeof window !== "undefined" ? window.innerHeight : 768;
    const dist = h * 1.6;
    tumbleOffsets.current = Array.from({ length: PAD_COUNT }).map((_, i) => {
      const tx = 0;
      const ty = dist + Math.floor(Math.random() * 120);
      const rot = 0;
      const delay = Math.floor(Math.random() * 600);
      return { tx, ty, rot, delay };
    });
  }, [allFailed]);

  function cleanup() {
    timers.current.forEach((id) => clearTimeout(id));
    timers.current = [];
    // remove any transitionend listeners
    try {
      transitionListeners.current.forEach(({ el, fn }) =>
        el.removeEventListener("transitionend", fn)
      );
    } catch (e) {
      /* ignore */
    }
    transitionListeners.current = [];
    restoreScheduled.current = false;
    if (!isMounted.current) return;
    setActivePad(null);
    setShowing(false);
    setInputEnabled(false);
    setAllFailed(false);
    setNoAnimMode(false);
  }

  function startRound(idx: number) {
    restoreScheduled.current = false;
    cleanup();
    // ensure any temporary no-animation mode is cleared so pads animate normally
    setNoAnimMode(false);
    // ensure any temporary no-animation class is cleared so pads animate normally
    try {
      if (padGridRef.current) {
        const buttons = Array.from(
          padGridRef.current.querySelectorAll("button")
        ) as HTMLButtonElement[];
        buttons.forEach((b) => b.classList.remove(styles.noAnim));
      }
    } catch (e) {
      /* ignore */
    }
    if (!isMounted.current) return;
    const cfg = ROUNDS[idx];
    const seq = randomSequence(cfg.length);
    setSequence(seq);
    setPlayIndex(0);
    setUserIndex(0);
    const preDelay = 1000;
    setInputEnabled(false);
    const startTimer = window.setTimeout(() => {
      if (!isMounted.current) return;
      setShowing(true);
      seq.forEach((pad, i) => {
        const t = window.setTimeout(() => {
          if (!isMounted.current) return;
          setActivePad(pad);
          const off = window.setTimeout(() => {
            if (!isMounted.current) return;
            setActivePad(null);
          }, cfg.showInterval * 0.6);
          if (isMounted.current) timers.current.push(off as unknown as number);
        }, cfg.showInterval * i);
        if (isMounted.current) timers.current.push(t as unknown as number);
      });

      const lastFlashStart = cfg.showInterval * (seq.length - 1);
      const lastFlashOff = lastFlashStart + cfg.showInterval * 0.6;
      const finishDelay = Math.max(
        Math.ceil(lastFlashOff + 80),
        cfg.showInterval * seq.length + 80
      );
      const finish = window.setTimeout(() => {
        if (!isMounted.current) return;
        setShowing(false);
        setActivePad(null);
        setInputEnabled(true);
      }, finishDelay);
      if (isMounted.current) timers.current.push(finish as unknown as number);
    }, preDelay);
    if (isMounted.current) timers.current.push(startTimer as unknown as number);
  }

  function handlePadClick(pad: number) {
    if (showing || allFailed || allActive || !isMounted.current) return;
    setActivePad(pad);
    const off = window.setTimeout(() => {
      if (!isMounted.current) return;
      setActivePad(null);
    }, 160);
    timers.current.push(off as unknown as number);

    if (pad !== sequence[userIndex]) {
      setFeedback("miss");
      const fbOff2 = window.setTimeout(() => {
        if (!isMounted.current) return;
        setFeedback(null);
      }, 400);
      timers.current.push(fbOff2 as unknown as number);

      setAllFailed(true);
      setInputEnabled(false);
      setActivePad(null);

      // schedule restoration as soon as pads have finished their fall animation
      // compute after tumbleOffsets is populated by the effect (next tick)
      const computeTimer = window.setTimeout(() => {
        if (!isMounted.current) return;
        try {
          const FALL_DURATION = 1300;
          const offsets = tumbleOffsets.current || [];
          const maxDelay = offsets.length
            ? Math.max(...offsets.map((o) => o.delay))
            : 0;
          const restoreAfter = Math.max(80, maxDelay + FALL_DURATION + 10);

          // Attach transitionend listeners to detect exactly when the fall finishes
          // and restore immediately. Fallback to a timeout in case events don't fire.
          const restoreNow = () => {
            if (restoreScheduled.current || !isMounted.current) return;
            restoreScheduled.current = true;
            try {
              // clear listeners
              transitionListeners.current.forEach(({ el, fn }) =>
                el.removeEventListener("transitionend", fn)
              );
            } catch (e) {
              /* ignore */
            }
            transitionListeners.current = [];

            // First: enable no-animation mode while keeping failed state
            // so React renders with transitions disabled but pads stay off-screen
            if (!isMounted.current) return;
            setNoAnimMode(true);

            // Next frame: clear failed state so transforms snap to base (with transitions off)
            const snapBack = window.setTimeout(() => {
              if (!isMounted.current) return;
              setAllFailed(false);

              // Then restart - if already at round 0, force restart by calling startRound directly
              const nextTick = window.setTimeout(() => {
                if (!isMounted.current) return;
                setUserIndex(0);
                restoreScheduled.current = false;
                if (roundIndex === 0) {
                  startRound(0);
                } else {
                  setRoundIndex(0);
                }
              }, 16);
              if (isMounted.current)
                timers.current.push(nextTick as unknown as number);
            }, 16);
            if (isMounted.current)
              timers.current.push(snapBack as unknown as number);
          };

          try {
            if (padGridRef.current) {
              const buttons = Array.from(
                padGridRef.current.querySelectorAll("button")
              ) as HTMLButtonElement[];
              let remaining = buttons.length;
              const onEnd = (ev: TransitionEvent) => {
                if (!isMounted.current) return;
                // only react to transform/opacity transitions
                if (
                  ev.propertyName !== "transform" &&
                  ev.propertyName !== "opacity"
                )
                  return;
                const el = ev.currentTarget as Element;
                el.removeEventListener("transitionend", onEnd as EventListener);
                remaining -= 1;
                if (remaining <= 0) restoreNow();
              };

              buttons.forEach((b) => {
                b.addEventListener("transitionend", onEnd as EventListener);
                transitionListeners.current.push({
                  el: b,
                  fn: onEnd as EventListener,
                });
              });
            }
          } catch (e) {
            /* ignore */
          }

          // fallback in case transitionend doesn't fire for some reason
          const fallback = window.setTimeout(
            () => restoreNow(),
            restoreAfter + 40
          );
          timers.current.push(fallback as unknown as number);
        } catch (e) {
          // ignore
        }
      }, 0);
      timers.current.push(computeTimer as unknown as number);
      return;
    }

    const nextUser = userIndex + 1;
    setUserIndex(nextUser);
    setFeedback("good");
    const fbOff = window.setTimeout(() => {
      if (!isMounted.current) return;
      setFeedback(null);
    }, 220);
    timers.current.push(fbOff as unknown as number);

    if (nextUser >= sequence.length) {
      const successHold = 1000;
      setAllActive(true);
      setInputEnabled(false);
      setActivePad(null);

      if (roundIndex < ROUNDS.length - 1) {
        const t = window.setTimeout(() => {
          if (!isMounted.current) return;
          setAllActive(false);
          setRoundIndex(roundIndex + 1);
        }, successHold);
        timers.current.push(t as unknown as number);
      } else {
        const finish = window.setTimeout(() => {
          if (!isMounted.current) return;
          setAllActive(false);
          onComplete(true, 100);
        }, successHold);
        timers.current.push(finish as unknown as number);
      }
    }
  }

  return (
    <div className={styles.container}>
      <div
        ref={padGridRef}
        className={`${styles.padGrid} ${allActive ? styles.spin : ""}`}
        aria-hidden={showing}
      >
        {Array.from({ length: PAD_COUNT }).map((_, i) => {
          const angle = (360 / PAD_COUNT) * i; // degrees
          const RADIUS = 90; // px - increased to spread pads into a wider circle
          const baseTransform = `rotate(${angle}deg) translate(${RADIUS}px) rotate(-${angle}deg)`;
          let transform = baseTransform;
          let transitionDelay = 0;
          let opacity = 1;
          if (allFailed && tumbleOffsets.current[i]) {
            const t = tumbleOffsets.current[i];
            transform = `${baseTransform} translate(${t.tx}px, ${t.ty}px)`;
            transitionDelay = t.delay;
            opacity = 0;
          }
          return (
            <button
              key={i}
              data-index={i}
              className={`${styles.pad} ${
                activePad === i ? styles.active : ""
              } ${allFailed ? styles.failed : ""} ${
                allActive ? styles.allActive : ""
              } ${noAnimMode ? styles.noAnim : ""}`}
              onClick={() => handlePadClick(i)}
              disabled={!inputEnabled || allFailed || allActive}
              style={{
                transform,
                transitionDelay: `${transitionDelay}ms`,
                opacity,
                transition: noAnimMode ? "none" : undefined,
              }}
              aria-label={`pad ${i + 1}`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PotionRiddle;
