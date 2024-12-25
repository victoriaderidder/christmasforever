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
    case 14:
      setRiddle(
        <Riddle
          question={
            <>
              Walk on the living, they don't even mumble. <br />
              Walk on the dead, they mutter and grumble.
            </>
          }
          answer={["leaves", "leaf"]}
          setShowElement={setShowStory}
        />
      );
      break;
    case 15:
      setRiddle(
        <Riddle
          question={"Too much heat may cause me to freeze. What am I?"}
          answer={[
            "computer",
            "a computer",
            "engine",
            "an engine",
            "criminal",
            "a criminal",
            "electronics",
          ]}
          setShowElement={setShowStory}
        />
      );
      break;
    case 16:
      setRiddle(
        <Riddle
          question={
            <>
              I don't know what I am, but I know what I'm not.
              <br />
              I am not somebody who likes this season a lot.
              <br />
              I am not anyone who brings gifts and cheer.
              <br />
              I am not someone that nobody fears.
              <br />
              Who am I not?
            </>
          }
          answer={["santa", "santa claus"]}
          setShowElement={setShowStory}
        />
      );
      break;
    case 17:
      setRiddle(
        <Riddle
          question={
            <>
              If you're good, you needn't fear me.
              <br />
              If you're bad, you will be seeing me.
              <br />
              On Christmas Eve only I will smile.
              <br />
              Spare the rod and spoil the child.
            </>
          }
          answer={["krampus"]}
          setShowElement={setShowStory}
        />
      );
      break;
    case 18:
      setRiddle(
        <Riddle
          question={
            <>
              If you throw me out the window,
              <br />
              I'll leave a grieving wife.
              <br />
              But bring me back through the door,
              <br />
              And you'll see someone giving life.
            </>
          }
          answer={["n", "the letter n"]}
          setShowElement={setShowStory}
        />
      );
      break;
    case 19:
      setRiddle(
        <Riddle
          question={
            <>
              To avoid the calf, I veered sharply to the left.
              <br />
              Meeting friends after work helps executives network effectively.
              <br />
              My parents told me to never cross the road without looking.
            </>
          }
          answer={["521", "5 2 1"]}
          setShowElement={setShowStory}
        />
      );
      break;
    default:
      return null;
  }
};
