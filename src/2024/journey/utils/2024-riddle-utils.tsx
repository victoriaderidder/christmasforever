import Riddle from "../../../components/riddle/riddle.component";
import CookieClicker from "../../cookie-clicker/cookie-clicker.component";

export const handle2024Riddle = (
  riddle: number,
  setShowStory: any,
  setRiddle: any,
  playSong?: any,
  song?: any,
  previousSong?: any
) => {
  setShowStory(false);
  switch (riddle) {
    case 1:
      setRiddle(
        <Riddle
          question={"taedvn eoln igedrgabern gegong vloe"}
          answer={["angel"]}
          setShowElement={setShowStory}
        />
      );
      break;
    case 2:
      setRiddle(
        <Riddle
          question={"1 9 10 __ 90"}
          answer={["19"]}
          setShowElement={setShowStory}
        />
      );
      break;
    case 3:
      setRiddle(
        <Riddle
          question={
            "CHEER + 7 = the way this Mysterious Teddy Bear is feeling today!"
          }
          answer={["jolly"]}
          setShowElement={setShowStory}
        />
      );
      break;
    case 4:
      setShowStory(false);
      playSong(previousSong, song);
      setRiddle(<CookieClicker setShowStory={setShowStory} />);
      break;
    case 5:
      setRiddle(
        <Riddle
          question={
            <>
              What two word phrase do you get if you remove two letters?
              <p />
              SUTRWPROILSEEPTATRETRSY
            </>
          }
          answer={["surprise party"]}
          setShowElement={setShowStory}
        />
      );
      break;
    case 6:
      setRiddle(
        <Riddle
          question={"🔔🪨"}
          answer={["jingle bell rock"]}
          setShowElement={setShowStory}
          songHandling={playSong}
          song1={previousSong}
          song2={song}
        />
      );
      break;
    case 7:
      setRiddle(
        <Riddle
          question={"🔇🌃"}
          answer={["silent night"]}
          setShowElement={setShowStory}
          songHandling={playSong}
          song1={previousSong}
          song2={song}
        />
      );
      break;
    case 8:
      setRiddle(
        <Riddle
          question={"🐿️🎵"}
          answer={["chipmunk song", "the chipmunk song"]}
          setShowElement={setShowStory}
          songHandling={playSong}
          song1={previousSong}
          song2={song}
        />
      );
      break;
    case 9:
      setRiddle(
        <Riddle
          question={"👹"}
          answer={["krampus"]}
          setShowElement={setShowStory}
          songHandling={playSong}
          song1={previousSong}
          song2={song}
        />
      );
      break;
    case 10:
      setRiddle(
        <Riddle
          question={"SEVEN - ONE = 2. NINE + THREE = 9. TEN + TWO = ?"}
          answer={["six", "6"]}
          setShowElement={setShowStory}
        />
      );
      break;
    case 11:
      setRiddle(
        <Riddle
          question={"permit yonder materialize blaze"}
          answer={["let there be light"]}
          setShowElement={setShowStory}
        />
      );
      break;
    case 12:
      setRiddle(
        <Riddle
          question={"⬅️🎄"}
          answer={["last christmas"]}
          setShowElement={setShowStory}
          songHandling={playSong}
          song1={previousSong}
          song2={song}
        />
      );
      break;
    case 13:
      setRiddle(
        <Riddle
          question={
            <>
              What is the only letter of the alphabet missing from this list?
              <br />B C D E G P T Z
            </>
          }
          answer={["v"]}
          setShowElement={setShowStory}
        />
      );
      break;
    default:
      return null;
  }
};
