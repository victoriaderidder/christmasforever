import Riddle from "../../../../components/riddle/riddle.component";

export const handleChristmasEveRiddle = (
  riddle: any,
  setShowStory: any,
  setRiddle: any,
  song: any,
  previousSong: any
) => {
  setShowStory(false);
  switch (riddle) {
    case 1:
      setRiddle(
        <Riddle
          question={"🎸🔄🎄"}
          answer={[
            "rockin around the christmas tree",
            "rocking around the christmas tree",
            "rockin' around the christmas tree",
          ]}
          setShowElement={setShowStory}
          song={song}
          previousSong={previousSong}
        />
      );
      break;
    case 2:
      setRiddle(
        <Riddle
          question={"🟦🎄"}
          answer={["blue christmas"]}
          setShowElement={setShowStory}
          song={song}
          previousSong={previousSong}
        />
      );
      break;
    case 3:
      setRiddle(
        <Riddle
          question={"🎅🏻🍼"}
          answer={["santa baby"]}
          setShowElement={setShowStory}
          song={song}
          previousSong={previousSong}
        />
      );
      break;
    case 4:
      setRiddle(
        <Riddle
          question={"👼🏻👂🏻⬆️"}
          answer={["angels we have heard on high"]}
          setShowElement={setShowStory}
          song={song}
          previousSong={previousSong}
        />
      );
      break;
    case 5:
      setRiddle(
        <Riddle
          question={
            <>
              <p>Clue here: reading initials spells this message's answer.</p>
              <p>Simple, even very easy!</p>
            </>
          }
          answer={["christmas eve"]}
          setShowElement={setShowStory}
          song={song}
          previousSong={previousSong}
        />
      );
      break;

    default:
      return null;
  }
};
