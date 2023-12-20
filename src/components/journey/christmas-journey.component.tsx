import Story from "../story/story.component";
import Title from "../title/title.component";
import Riddle from "../riddle/riddle.component";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface ChristmasJourneyProps {
  handleEnd: any;
  setShowJourney: Dispatch<SetStateAction<boolean>>;
}

export const ChristmasJourney = ({
  handleEnd,
  setShowJourney,
}: ChristmasJourneyProps) => {
  const [showStory, setShowStory] = useState(true);
  const [riddle, setRiddle] = useState(<></>);
  const [index, setIndex] = useState(Number);

  const increment = () => {
    index === storyArray?.length - 1 ? handleEnd() : setIndex(index + 1);
  };

  const handleRiddle = (riddle: number) => {
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
          />
        );
        break;
      case 2:
        setRiddle(
          <Riddle
            question={"🟦🎄"}
            answer={["blue christmas"]}
            setShowElement={setShowStory}
          />
        );
        break;
      case 3:
        setRiddle(
          <Riddle
            question={"👼🏻👂🏻⬆️"}
            answer={["angels we have heard on high"]}
            setShowElement={setShowStory}
          />
        );
        break;
      case 4:
        setRiddle(
          <Riddle
            question={"🎅🏻 👶🏻"}
            answer={["santa baby"]}
            setShowElement={setShowStory}
          />
        );
        break;
      case 5:
        setRiddle(
          <Riddle
            question={"Why didn't the teddy bear eat his lunch?"}
            answer={["stuffed", "he was stuffed"]}
            setShowElement={setShowStory}
          />
        );
        break;
      default:
        return null;
    }
  };

  const storyArray = [
    <Title title="> Mysterious Teddy Bear." />,
    <Story
      story={`You have lived inside this advent calendar for as long as you can remember.`}
    />,
    <>
      <div onClick={() => handleRiddle(2)}>
        <Story story={`You peer at the mysterious symbols...`} />
      </div>
    </>,
    <>
      <span onClick={() => handleEnd()}>
        <Story story={`temp end`} />
      </span>
    </>,
  ];

  return (
    <>
      {showStory ? (
        <div className="story" onClick={increment}>
          {storyArray[index]}
        </div>
      ) : (
        <div>{riddle}</div>
      )}
    </>
  );
};
