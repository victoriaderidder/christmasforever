import Riddle from "../../../components/riddle/riddle.component";

export const handle2025Riddle = (
  riddle: number,
  setShowStory: any,
  setRiddle: any,
  song?: any,
  previousSong?: any,
  playSong?: any
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
          question={"1 8 10 __ 90"}
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
    default:
      return null;
  }
};
