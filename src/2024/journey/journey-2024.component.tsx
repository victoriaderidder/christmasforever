import Story from "../../components/story.component";
import Title from "../../components/title.component";
import { handle2024Riddle } from "./utils/2024-riddle-utils";
import { useState } from "react";

export interface Journey2024Props {
  finale: any;
  handleEnd: any;
  playSong: any;
  krampus: any;
  angels: any;
}

export const Journey2024 = ({
  handleEnd,
  playSong,
  finale,
  krampus,
  angels,
}: Journey2024Props) => {
  const [showStory, setShowStory] = useState(true);
  const [riddle, setRiddle] = useState(<></>);
  const [index, setIndex] = useState(Number);

  const increment = () => {
    index === storyArray?.length - 1 ? handleEnd() : setIndex(index + 1);
  };

  const storyArray = [
    <Title title="> Santa Lizzy." />,
    <Story story={`It's the day before Christmas Eve.`} />,
    <Story story={`You and your elves have been working hard all year.`} />,
    <Story
      story={`On toys, of course, but also, your super sweet tricked out sleigh!`}
    />,
    <Story story={`You sit in the sleigh, admiring the handiwork.`} />,
    <Story story={`You have been Santa for five years!!!`} />,
    <Story story={`You have been Santa for five years!!!`} />,
    <Story story={`It's a huge milestone.`} />,
    <Story
      story={`(Though Santas generally make it a few centuries before being pushed off a roof.)`}
    />,
    <Story
      story={`To celebrate, the elves are throwing you a surprise party!`}
    />,
    <Story story={`You're not supposed to know about it...`} />,
    <Story story={`But they've been planning it for an entire year.`} />,
    <Story story={`And none of them are particularly subtle.`} />,
    <Title title="> GoodWill Toward Men." />,
    <Story story={`OUT OF YOUR WAY!!!! OUT OF YOUR WAY!!!!`} />,
    <Story story={`You race through the workshop.`} />,
    <Story story={`Elves complain as you ricochet into them.`} />,
    <Story story={`IDIOTS!!!!!! MOVE!!!!!!!!`} />,
    <Story story={`Don't they know you have important business?!?!!`} />,
    <Story story={`Tonight is Santa's surprise party!`} />,
    <Story story={`You are in charge of security.`} />,
    <Story
      story={`No Charles Calvins or evil advent calendars would dare cross you tonight!`}
    />,
    <Story
      story={`You're running so fast you barely notice the tree in front of`}
    />,
    <Story story={`WHAM!!!!!!!!!`} />,
    <Story
      story={`Oh no! The IMPORTANT SECURITY DEVICE flies out of your hands.`}
    />,
    <>
      <div onClick={() => handle2024Riddle(1, setShowStory, setRiddle)}>
        <Story story={`You hurry to pick it up, but it's all scrambled...`} />
      </div>
    </>,
    <Story story={`You frantically piece it back together. Phew!!`} />,
    <Story
      story={`Angel is the secret security codeword for the surprise party.`}
    />,
    <Story story={`DON'T TELL ANYBODY!!!`} />,
    <Title title="> La Befellena." />,
    <Story
      story={`You sigh as GoodWill Toward Men rushes out of the workshop.`}
    />,
    <Story story={`That's the third tree he's knocked down this week.`} />,
    <Story story={`Your helper elves scurry to put it back up.`} />,
    <Story story={`Everything has to be perfect.`} />,
    <Story
      story={`You are in charge of planning Santa Lizzy's surprise party!`}
    />,
    <Story story={`It's going to be the best surprise party of all time.`} />,
    <Story story={`The workshop is bathed in decorations:`} />,
    <Story story={`Streamers, balloons, banners...`} />,
    <Story
      story={`And every elf has signed a card with personal well wishes for Santa!`}
    />,
    <Story story={`You've truly thought of every detail.`} />,
    <Story story={`The workshop doorbell chimes.`} />,
    <Story story={`Oooooh, your surprise guest is here!!`} />,
    <Story story={`You rush to the door, then pause.`} />,
    <Story story={`The door code panel prompts you for a code.`} />,
    <Story story={`Dang it!`} />,
    <>
      <div onClick={() => handle2024Riddle(2, setShowStory, setRiddle)}>
        <Story story={`What was that code again??`} />
      </div>
    </>,
    <Story story={`Of course! 19!`} />,
    <Story story={`You quickly punch it in and the door opens to reveal...`} />,
    <Title title="> Mysterious Teddy Bear." />,
    <Story
      story={`You lumber inside as quickly as your little bear legs can take you.`}
    />,
    <Story story={`You may be fluffy, but it's cold at the North Pole!`} />,
    <Story
      story={`The door shuts behind you and you're filled with warmth --`}
    />,
    <Story story={`-- both central heating and the joy of Christmas!`} />,
    <Story
      story={`One year ago, Santa rescued you from an ancient advent calendar.`}
    />,
    <Story story={`(You don't remember much about that fateful day...)`} />,
    <Story story={`But you do know Santa gave you to the perfect child.`} />,
    <Story story={`You're very grateful!`} />,
    <Story
      story={`And you were so happy when La Befellena invited you to Santa's surprise party.`}
    />,
    <Story story={`You can't wait to see all your friends again!`} />,
    <Story story={`You fumble in your little bear pocket for something.`} />,
    <Story story={`You hold the gift wrapped box out to La Befellena.`} />,
    <Story story={`When she tries to take it, you hold firm.`} />,
    <>
      <div onClick={() => handle2024Riddle(3, setShowStory, setRiddle)}>
        <Story
          story={`After all, part of the gift is another of your homemade riddles!`}
        />
      </div>
    </>,
    <Story story={`You've truly never felt so jolly!`} />,
    <Title title="> Elfward." />,
    <Story
      story={`You are also a very special guest at this surprise party.`}
    />,
    <Story story={`You've truly never felt so jolly!`} />,

    <>
      <span>You just know it's going to be a very merry Christmas!!!</span>
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
