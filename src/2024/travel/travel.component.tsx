import { Journey2024 } from "../journey/journey-2024.component";
import styles from "./travel.module.css";
import { useAudio } from "../../audio/audio.hooks";
import { AUDIO_PATHS } from "../../audio/audio.utils";
import { FC, useEffect } from "react";

export const Travel2024: FC = () => {
  const { audioRefs, playSong } = useAudio(AUDIO_PATHS);

  useEffect(() => {
    const play = async () => {
      await playSong(audioRefs?.angels.current);
      console.log(audioRefs?.angels);
    };
    play();
  }, []);

  const handleEnd = () => {};

  return (
    <>
      <div className={styles.app}>
        <div className={styles.appHeader}>
          <div className="journey">
            <Journey2024 handleEnd={handleEnd} audioRefs={audioRefs} />
          </div>
        </div>
      </div>
    </>
  );
};
