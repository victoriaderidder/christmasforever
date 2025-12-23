import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAudio } from "../../audio/audio.hooks";
import { AUDIO_PATHS } from "../../audio/audio.utils";
import Spotlight from "../../components/spotlight.component";
import styles from "../App2025.module.css";
import {
  buildJourney2025Steps,
  isJourney2025RiddleStep,
  JOURNEY_2025_LAST_DARK_STEP_INDEX,
} from "./utils/2025-riddle-utils";

export interface Journey2025Props {
  handleEnd?: any;
  step?: string;
}

export const Journey2025 = ({
  handleEnd,
  step: propStep,
}: Journey2025Props) => {
  const { step: routeStep } = useParams<{ step: string }>();
  const navigate = useNavigate();
  const step = routeStep || propStep;
  const index = step !== undefined ? parseInt(step, 10) : 0;
  const { audioRefs, playSong, stopAllAudio } = useAudio(AUDIO_PATHS);
  const redBg = index > JOURNEY_2025_LAST_DARK_STEP_INDEX;

  const goNext = () => navigate(`/2025/${index + 1}`);

  const storyArray = buildJourney2025Steps({
    goNext,
    playSong,
    audio: {
      krampus: audioRefs.krampus.current,
      fire: audioRefs.fire.current,
      alarm: audioRefs.alarm.current,
      circus: audioRefs.circus.current,
      wizardsInWinter: audioRefs.wizardsInWinter.current,
      hotChocolate: audioRefs.hotChocolate.current,
    },
  });

  useEffect(() => {
    const fireAudio = audioRefs.fire.current;
    const krampusAudio = audioRefs.krampus.current;
    const alarmAudio = audioRefs.alarm.current;
    const wizardsInWinterAudio = audioRefs.wizardsInWinter.current;
    const circusAudio = audioRefs.circus.current;
    const hotChocolateAudio = audioRefs.hotChocolate.current;

    const desiredBaseline =
      index > JOURNEY_2025_LAST_DARK_STEP_INDEX ? "krampus" : "fire";
    const baselineAudio = desiredBaseline === "fire" ? fireAudio : krampusAudio;
    const otherBaselineAudio =
      desiredBaseline === "fire" ? krampusAudio : fireAudio;

    const specialAudio = [
      alarmAudio,
      wizardsInWinterAudio,
      circusAudio,
      hotChocolateAudio,
    ];

    const isSpecialPlaying = specialAudio.some((a) => a && !a.paused);
    const isBaselinePlaying = baselineAudio && !baselineAudio.paused;
    const isOtherBaselinePlaying =
      otherBaselineAudio && !otherBaselineAudio.paused;

    if (isOtherBaselinePlaying) {
      stopAllAudio();
      playSong(baselineAudio);
      return;
    }

    if (isBaselinePlaying) return;
    if (isSpecialPlaying) return;

    stopAllAudio();
    playSong(baselineAudio);
  }, [index, playSong, stopAllAudio]);

  const increment = () => {
    goNext();
    if (handleEnd && index === storyArray.length - 1) {
      handleEnd();
    }
  };

  if (index >= storyArray.length) {
    return (
      <div className={`story ${styles["story-fullscreen-red"]}`}>
        <span>Ending placeholder</span>
      </div>
    );
  }

  const currentStep = storyArray[index];
  const isRiddleStep = isJourney2025RiddleStep(currentStep);

  if (isRiddleStep) {
    return (
      <div
        className={`story ${redBg && styles["story-fullscreen-red"]}`}
        style={{
          padding: "24px",
          textAlign: "center",
          background: redBg ? undefined : "#000",
          position: "fixed",
          inset: 0,
          width: "100vw",
          height: "100vh",
        }}
      >
        {currentStep}
      </div>
    );
  }

  if (redBg) {
    return (
      <div
        className={`story ${styles["story-fullscreen-red"]}`}
        onClick={increment}
      >
        {currentStep}
      </div>
    );
  }

  return (
    <Spotlight radius={80}>
      <div className="story" onClick={increment}>
        {currentStep}
      </div>
    </Spotlight>
  );
};
