import { Dispatch, SetStateAction, useEffect } from "react";
import styles from "./travel.module.css";
import { useAudio } from "../../../audio/audio.hooks";
import { AUDIO_PATHS } from "../../../audio/audio.utils";

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
  const { audioRefs, playSong } = useAudio(AUDIO_PATHS);

  useEffect(() => {
    if (journeyName === "Thanksgiving") {
      audioRefs.krampus.current.pause();
      audioRefs.finale.current.pause();
      audioRefs.krampus.current.currentTime = 0;
      audioRefs.finale.current.currentTime = 0;
      playSong(audioRefs.jazz.current);
    } else if (journeyName === "Christmas Eve" || journeyName === "Christmas") {
      audioRefs.jazz.current.pause();
      audioRefs.finale.current.pause();
      audioRefs.finale.current.currentTime = 0;
      audioRefs.jazz.current.currentTime = 0;
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
      <div className={`${styles.app} ${getJourneyClass()}`}>
        <div className={styles.appHeader}>
          <div className="journey">
            {JourneyComponent && (
              <JourneyComponent
                handleEnd={handleEnd}
                audioRefs={audioRefs}
                playSong={playSong}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
