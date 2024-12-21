import Riddle from "../../../components/riddle/riddle.component";
import squarePuzzle from "../../../2023/assets/img/squares.png";

export const handle2024Riddle = (
  riddle: number,
  setShowStory: any,
  setRiddle: any
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
      setRiddle(
        <Riddle
          question={
            <>
              <a
                href="https://connections.swellgarfo.com/game/-NmMqmx8orAb1oQnUu2i"
                target="_blank"
                rel="noreferrer"
              >
                Click here to continue...
              </a>
            </>
          }
          answer={[
            "snow, polar, northern, jingle",
            "snow polar northern jingle",
            "snowpolarnorthernjingle",
          ]}
          setShowElement={setShowStory}
        />
      );
      break;
    case 5:
      setRiddle(
        <Riddle
          question={
            "I fulfilled my duties for years, and now I am tired. I am ready to retire. Who am I?"
          }
          answer={["elfward"]}
          setShowElement={setShowStory}
        />
      );
      break;
    case 6:
      setRiddle(
        <Riddle
          question={"Buck, Cod, Dahlia, Rook, Cuckoo, Rail, Haddock, ?"}
          answer={["cub"]}
          setShowElement={setShowStory}
        />
      );
      break;
    case 7:
      setRiddle(
        <Riddle
          question={"What do you call a bear with no teeth?"}
          answer={["a gummy bear", "gummy bear"]}
          setShowElement={setShowStory}
        />
      );
      break;
    case 8:
      setRiddle(
        <Riddle
          question={
            <>
              North, south, east, or west
              <br />
              I won't tell you which way is best.
              <br />
              I'll point you in any direction you guess
              <br />
              But I can't reach the destination myself.
            </>
          }
          answer={["compass", "a compass"]}
          setShowElement={setShowStory}
        />
      );
      break;
    case 9:
      setRiddle(
        <Riddle
          question={"Vixen, Madison, Delta, Mars"}
          answer={[
            "four",
            "4",
            "fourth",
            "4th",
            "fourth in a series",
            "4th in a series",
            "4 in a series",
            "four in a series",
          ]}
          setShowElement={setShowStory}
        />
      );
      break;
    case 10:
      setRiddle(
        <Riddle
          question={
            <>
              <img src={squarePuzzle} alt="square puzzle" />
              <br />
              How many squares do you see?
            </>
          }
          answer={["40", "forty"]}
          setShowElement={setShowStory}
        />
      );
      break;
    case 11:
      setRiddle(
        <Riddle
          question={"Who is the Christmas king?"}
          answer={["stocking"]}
          setShowElement={setShowStory}
        />
      );
      break;
    case 12:
      setRiddle(
        <Riddle
          question={
            <>
              In our house, all four walls face south.
              <br />
              What color is the bear who walks past?
            </>
          }
          answer={["white"]}
          setShowElement={setShowStory}
        />
      );
      break;
    case 13:
      setRiddle(
        <Riddle
          question={
            <>
              Black as night, white as snow
              <br />
              Shrouded in cloaks from head to toe
              <br />
              We fly from south, to east, west, north
              <br />
              Two of a kind at opposite sides of the earth.
            </>
          }
          answer={["rook", "a rook", "rooks"]}
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
