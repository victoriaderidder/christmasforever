import { FC, useRef, useState } from "react";

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

  // spotlight size (smaller)
  const radius = 40; // px

  // radial-gradient mask string (both standard and WebKit)
  const mask = `radial-gradient(circle ${radius}px at ${pos.x}px ${pos.y}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 40%, rgba(0,0,0,0) 70%)`;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100vw",
        height: "100vh",
        background: "#000000",
        color: "white",
        cursor: "none",
        zIndex: 999,
        overflow: "hidden",
      }}
    >
      <style>{`
        .app2025-text { color: black; font-family: inherit; }
        .app2025-text::selection { background: transparent; }
        /* Base reveal container (black text) stays visible */
        .reveal { }
        /* White overlay is masked so only text under the spotlight appears white */
        .reveal-white {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
          -webkit-mask-image: ${mask};
          mask-image: ${mask};
          -webkit-mask-repeat: no-repeat;
          mask-repeat: no-repeat;
        }

        /* spotlight visual */
        .spotlight {
          position: fixed;
          left: 0;
          top: 0;
          pointer-events: none;
          width: ${radius * 2}px;
          height: ${radius * 2}px;
          border-radius: 50%;
          transform: translate(calc(var(--sx, -9999px) - ${radius}px), calc(var(--sy, -9999px) - ${radius}px));
          /* blended layered spotlight: smooth orange -> yellow -> white transitions */
          background: radial-gradient(circle at 50% 50%,
            rgba(255,150,40,1) 0%,
            rgba(255,165,50,0.95) 12%,
            rgba(255,200,80,0.85) 28%,
            rgba(255,220,120,0.6) 44%,
            rgba(255,240,200,0.45) 60%,
            rgba(255,250,250,0.22) 78%,
            rgba(255,255,255,0) 100%);
          filter: blur(4px);
          opacity: ${active ? 1 : 0};
          transition: opacity 160ms ease;
          z-index: 1000;
          animation: flicker 360ms infinite;
        }

        @keyframes flicker {
          0% { transform: translate(calc(var(--sx, -9999px) - ${radius}px), calc(var(--sy, -9999px) - ${radius}px)) scale(1); opacity: 0.96 }
          40% { transform: translate(calc(var(--sx, -9999px) - ${radius}px), calc(var(--sy, -9999px) - ${radius}px)) scale(1.03); opacity: 1 }
          70% { transform: translate(calc(var(--sx, -9999px) - ${radius}px), calc(var(--sy, -9999px) - ${radius}px)) scale(0.99); opacity: 0.94 }
          100% { transform: translate(calc(var(--sx, -9999px) - ${radius}px), calc(var(--sy, -9999px) - ${radius}px)) scale(1); opacity: 0.96 }
        }
      `}</style>

      {/* Base text (black) always visible */}
      <div className="reveal">
        <h1 className="app2025-text" style={{ fontSize: 64, margin: 0 }}>
          Christmas 2025
        </h1>
        <p className="app2025-text" style={{ fontSize: 20, marginTop: 18 }}>
          Coming Soon...
        </p>
      </div>

      {/* White overlay text masked by spotlight (only shows where cursor is) */}
      {active && (
        <div className="reveal-white" aria-hidden>
          <h1 style={{ color: "white", fontSize: 64, margin: 0 }}>Christmas 2025</h1>
          <p style={{ color: "white", fontSize: 20, marginTop: 18 }}>Coming Soon...</p>
        </div>
      )}

      {/* spotlight element positioned via CSS variables updated below */}
      <div
        className="spotlight"
        style={{
          // set CSS variables for transform calculations
          // use px values for left/top via --sx/--sy
          // these will be updated on mouse move via inline style object
          // initial values push it off-screen
          ["--sx" as any]: `${pos.x}px`,
          ["--sy" as any]: `${pos.y}px`,
        }}
      />
    </div>
  );
};

export default App2025;
