import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "./travel.module.css";
import Krampus from "../../assets/music/Krampus.mp3";
import Jazz from "../../assets/music/jazz.mp3";
import Rockin from "../../assets/music/rockinaroundthechristmastree.mp3";
import SantaBaby from "../../assets/music/santababy.mp3";
import WhiteChristmas from "../../assets/music/whitechristmas.mp3";
import Angels from "../../assets/music/angelswehaveheardonhigh.mp3";

interface TravelProps {
  showTree: boolean;
  setShowTree: Dispatch<SetStateAction<boolean>>;
  showJourney?: boolean;
  setShowJourney: Dispatch<SetStateAction<boolean>>;
  storyArray?: any;
  JourneyComponent?: any;
  journeyName: string;
}

const jazz = new Audio(Jazz);
const krampus = new Audio(Krampus);
const rockin = new Audio(Rockin);
const santaBaby = new Audio(SantaBaby);
const whiteChristmas = new Audio(WhiteChristmas);
const angels = new Audio(Angels);

export const Travel = ({
  storyArray,
  showJourney,
  JourneyComponent,
  setShowTree,
  setShowJourney,
  journeyName,
}: TravelProps) => {
  const [index, setIndex] = useState(Number);

  const getJourneyClass = () => {
    if (journeyName === "Thanksgiving") {
      return styles.thanksgiving;
    } else if (journeyName === "Christmas Eve") {
      return styles.christmasEve;
    } else if (journeyName === "Christmas") {
      return styles.christmas;
    }
  };

  const playSong = (song: any, previousSong?: any) => {
    previousSong.pause();
    song.play();
    song.loop = true;
  };

  useEffect(() => {
    if (journeyName === "Thanksgiving") {
      krampus.pause();
      krampus.currentTime = 0;
      jazz.play();
      jazz.loop = true;
    } else if (journeyName === "Christmas Eve" || journeyName === "Christmas") {
      jazz.pause();
      jazz.currentTime = 0;
      krampus.play();
      krampus.loop = true;
    }
  }, [journeyName]);

  const handleEnd = () => {
    if (journeyName === "Thanksgiving") {
      playSong(krampus, jazz);
    }
    // } else if (journeyName === "Christmas Eve") {
    //   playSong(jazz, krampus);
    // }
    setShowTree(true);
    setShowJourney(false);
  };

  const increment = () => {
    index === storyArray?.length - 1 ? handleEnd() : setIndex(index + 1);
  };

  return (
    <>
      <div className={`${styles.app} ${getJourneyClass()}`}>
        <div className={styles.appHeader}>
          {storyArray && (
            <div className="journey" onClick={increment}>
              {storyArray && storyArray[index]}
            </div>
          )}
          <div className="journey">
            {JourneyComponent && (
              <JourneyComponent
                index={index}
                handleEnd={handleEnd}
                krampus={krampus}
                rockin={rockin}
                santaBaby={santaBaby}
                whiteChristmas={whiteChristmas}
                angels={angels}
                playSong={playSong}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
