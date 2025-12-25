import { Dispatch, SetStateAction, useEffect } from "react";
import styles from "./travel.module.css";
import { useAudio } from "../../../audio/audio.hooks";
import { AUDIO_PATHS } from "../../../audio/audio.utils";
import { TravelShell } from "../../../components/travel-shell/travel-shell.component";

interface Travel2023Props {
  showTree: boolean;
  setShowTree: Dispatch<SetStateAction<boolean>>;
  showJourney?: boolean;
  setShowJourney: Dispatch<SetStateAction<boolean>>;
  JourneyComponent?: any;
  journeyName: string;
}

export const Travel2023 = ({
  JourneyComponent,
  setShowTree,
  setShowJourney,
  journeyName,
}: Travel2023Props) => {
  const getJourneyClass = () => {
    if (journeyName === "Thanksgiving") {
      return styles.thanksgiving;
    } else if (journeyName === "Christmas Eve") {
      return styles.christmasEve;
    } else if (journeyName === "Christmas") {
      return styles.christmas;
    }
  };
  const { audioRefs, playSong, stopAllAudio } = useAudio(AUDIO_PATHS);

  useEffect(() => {
    const cleanup = async () => {
      await stopAllAudio();
    };
    cleanup();
    if (journeyName === "Thanksgiving") {
      playSong(audioRefs.jazz.current);
    } else if (journeyName === "Christmas Eve" || journeyName === "Christmas") {
      playSong(audioRefs.krampus.current);
    }
  }, [journeyName]);

  const handleEnd = () => {
    if (journeyName === "Thanksgiving") {
      playSong(audioRefs.krampus.current, audioRefs.jazz.current);
    }
    setShowTree(true);
    setShowJourney(false);
  };

  return (
    <>
      <TravelShell
        appClassName={`${styles.app} ${getJourneyClass() ?? ""}`}
        appHeaderClassName={styles.appHeader}
      >
        {JourneyComponent && (
          <JourneyComponent
            handleEnd={handleEnd}
            audioRefs={audioRefs}
            playSong={playSong}
          />
        )}
      </TravelShell>
    </>
  );
};
