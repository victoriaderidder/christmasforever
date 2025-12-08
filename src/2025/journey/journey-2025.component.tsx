import { useAudio } from "../../audio/audio.hooks";
import { AUDIO_PATHS } from "../../audio/audio.utils";
import Story from "../../components/story.component";
import Title from "../../components/title.component";
import { handle2025Riddle } from "./utils/2025-riddle-utils";
import { useState, useRef, useEffect } from "react";
import "../App2025.css";

export interface Journey2025Props {
  handleEnd: any;
  audioRefs?: any;
}

export const Journey2025 = ({ handleEnd }: Journey2025Props) => {
  const [showStory, setShowStory] = useState(true);
  const [riddle, setRiddle] = useState(<></>);
  const [index, setIndex] = useState(0);
  const { audioRefs, playSong, stopAllAudio } = useAudio(AUDIO_PATHS);

  // start fire audio when the Journey mounts
  useEffect(() => {
    const fire = audioRefs.fire.current;
    if (fire) {
      try {
        playSong(fire);
      } catch (err) {
        console.error("Failed to play fire audio:", err);
      }
    }

    return () => {
      try {
        if (fire) {
          fire.pause();
          fire.currentTime = 0;
        }
      } catch (err) {
        console.error("Failed to stop fire audio on unmount:", err);
      }
      try {
        stopAllAudio();
      } catch (err) {
        /* ignore */
      }
    };
  }, []);

  // spotlight / reveal state
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [pos, setPos] = useState({ x: -9999, y: -9999 });
  const [active, setActive] = useState(true);
  const radius = 80;

  const increment = () => {
    index === storyArray?.length - 1 ? handleEnd() : setIndex(index + 1);
  };

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

  const storyArray = [
    <Title title="> Santa Lizzy." />,
    <Story story={`It's the day before Christmas Eve.`} />,
    <Story story={`You and your elves have been working hard all year.`} />,
    <Story
      story={`On toys, of course, but also, your super sweet tricked out sleigh!`}
    />,
    <Story story={`You sit in the sleigh, admiring the handiwork.`} />,
    <Story story={`You have been Santa for five years!!!`} />,
    <Story story={`You have been Santa for five years!!!`} />,
    <Story story={`It's a huge milestone.`} />,
    <Story
      story={`(Though Santas generally make it a few centuries before being pushed off a roof.)`}
    />,
    <Story
      story={`To celebrate, the elves are throwing you a surprise party!`}
    />,
    <Story story={`You're not supposed to know about it...`} />,
    <Story story={`But they've been planning it for an entire year.`} />,
    <Story story={`And none of them are particularly subtle.`} />,
    <Title title="> GoodWill Toward Men." />,
    <Story story={`OUT OF YOUR WAY!!!! OUT OF YOUR WAY!!!!`} />,
    <Story story={`You race through the workshop.`} />,
    <>
      <span>What could be more magical than that?</span>
    </>,
  ];

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
        {showStory ? (
          <div className="story" onClick={increment}>
            {storyArray[index]}
          </div>
        ) : (
          <div>{riddle}</div>
        )}
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
