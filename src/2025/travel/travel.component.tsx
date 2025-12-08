import { Journey2025 } from "../journey/journey-2025.component";
import styles from "./travel.module.css";
import { useAudio } from "../../audio/audio.hooks";
import { AUDIO_PATHS } from "../../audio/audio.utils";
import { FC, useEffect } from "react";

export const Travel2024: FC = () => {
  const { audioRefs, playSong } = useAudio(AUDIO_PATHS);

  return (
    <>
      <div className={styles.app}>
        <div className={styles.appHeader}>
          <div
            className="journey"
            onClick={() => playSong(audioRefs?.fire?.current)}
          >
            <Journey2025 handleEnd={() => {}} />
          </div>
        </div>
      </div>
    </>
  );
};
