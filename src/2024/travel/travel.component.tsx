import { Dispatch, SetStateAction, useEffect } from "react";
import { Journey2024 } from "../journey/journey-2024.component";
import styles from "./travel.module.css";
import Krampus from "../../assets/music/krampus.mp3";
import Angels from "../../2023/assets/music/angelswehaveheardonhigh.mp3";
import Chipmunk from "../assets/music/chipmunksong.mp3";
import JBR from "../assets/music/jinglebellrock.mp3";
import LastChristmas from "../assets/music/lastchristmas.mp3";
import SilentNight from "../assets/music/silentnight.mp3";
import Finale from "../../2023/assets/music/deckthehalls.mp3";
import Circus from "../assets/music/circus.mp3";

interface Travel2024Props {
  temp: boolean;
}

const krampus = new Audio(Krampus);
const jbr = new Audio(JBR);
const silentNight = new Audio(SilentNight);
const lastChristmas = new Audio(LastChristmas);
const chipmunk = new Audio(Chipmunk);
const angels = new Audio(Angels);
const finale = new Audio(Finale);
const circus = new Audio(Circus);

export const Travel2024 = ({ temp }: Travel2024Props) => {
  const playSong = (song: any, previousSong?: any) => {
    previousSong.pause();
    previousSong.currentTime = 0;
    song.play();
    song.loop = true;
  };

  angels.play();
  angels.loop = true;

  const handleEnd = () => {};

  return (
    <>
      <div className={styles.app}>
        <div className={styles.appHeader}>
          <div className="journey">
            <Journey2024
              handleEnd={handleEnd}
              krampus={krampus}
              angels={angels}
              finale={finale}
              silentNight={silentNight}
              lastChristmas={lastChristmas}
              jbr={jbr}
              circus={circus}
              chipmunk={chipmunk}
              playSong={playSong}
            />
          </div>
        </div>
      </div>
    </>
  );
};
