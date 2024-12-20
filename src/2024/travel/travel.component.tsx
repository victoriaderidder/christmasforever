import { Dispatch, SetStateAction, useEffect } from "react";
import { Journey2024 } from "../journey/journey-2024.component";
import styles from "./travel.module.css";
import Krampus from "../../assets/music/krampus.mp3";
import Angels from "../../2023/assets/music/angelswehaveheardonhigh.mp3";
import Finale from "../../2023/assets/music/deckthehalls.mp3";

interface Travel2024Props {
  temp: boolean;
}

const krampus = new Audio(Krampus);
// const rockin = new Audio(Rockin);
// const santaBaby = new Audio(SantaBaby);
// const whiteChristmas = new Audio(WhiteChristmas);
const angels = new Audio(Angels);
const finale = new Audio(Finale);

export const Travel2024 = ({ temp }: Travel2024Props) => {
  const playSong = (song: any, previousSong?: any) => {
    previousSong.pause();
    previousSong.currentTime = 0;
    song.play();
    song.loop = true;
  };

  // useEffect(() => {
  //   if (journeyName === "Thanksgiving") {
  //     krampus.pause();
  //     finale.pause();
  //     krampus.currentTime = 0;
  //     finale.currentTime = 0;
  //     jazz.play();
  //     jazz.loop = true;
  //   } else if (journeyName === "Christmas Eve" || journeyName === "Christmas") {
  //     jazz.pause();
  //     finale.pause();
  //     finale.currentTime = 0;
  //     jazz.currentTime = 0;
  //     krampus.play();
  //     krampus.loop = true;
  //   }
  // }, [journeyName]);

  const handleEnd = () => {
    // if (journeyName === "Thanksgiving") {
    //   playSong(krampus, jazz);
    // }
    // setShowTree(true);
    // setShowJourney(false);
  };

  return (
    <>
      <div className={styles.app}>
        <div className={styles.appHeader}>
          <div className="journey">
            <Journey2024
              handleEnd={handleEnd}
              krampus={krampus}
              // rockin={rockin}
              // santaBaby={santaBaby}
              // whiteChristmas={whiteChristmas}
              angels={angels}
              finale={finale}
              playSong={playSong}
            />
          </div>
        </div>
      </div>
    </>
  );
};
