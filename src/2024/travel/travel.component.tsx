import { Journey2024 } from "../journey/journey-2024.component";
import styles from "./travel.module.css";
import { useAudio } from "../../audio/audio.hooks";
import { AUDIO_PATHS } from "../../audio/audio.utils";
import { useEffect } from "react";

interface Travel2024Props {
  temp: boolean;
}

export const Travel2024 = ({ temp }: Travel2024Props) => {
  const { audioRefs, playSong } = useAudio(AUDIO_PATHS);

  useEffect(() => {
    playSong(audioRefs?.angels.current);
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
