import { Journey2024 } from "../journey/journey-2024.component";
import styles from "./travel.module.css";
import { useAudio } from "../../audio/audio.hooks";
import { AUDIO_PATHS } from "../../audio/audio.utils";
import { FC, useEffect } from "react";
import { TravelShell } from "../../components/travel-shell/travel-shell.component";

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
      <TravelShell appClassName={styles.app} appHeaderClassName={styles.appHeader}>
        <Journey2024 handleEnd={handleEnd} audioRefs={audioRefs} />
      </TravelShell>
    </>
  );
};
