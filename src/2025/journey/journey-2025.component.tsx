import { useAudio } from "../../audio/audio.hooks";
import { AUDIO_PATHS } from "../../audio/audio.utils";
import Story from "../../components/story.component";
import Title from "../../components/title.component";
import Spotlight from "../../components/spotlight.component";
import { handle2025Riddle } from "./utils/2025-riddle-utils";
import { useState, useEffect } from "react";
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

  // spotlight handled by Spotlight component

  const increment = () => {
    index === storyArray?.length - 1 ? handleEnd() : setIndex(index + 1);
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

  return (
    <Spotlight radius={80}>
      {showStory ? (
        <div className="story" onClick={increment}>
          {storyArray[index]}
        </div>
      ) : (
        <div>{riddle}</div>
      )}
    </Spotlight>
  );
};
