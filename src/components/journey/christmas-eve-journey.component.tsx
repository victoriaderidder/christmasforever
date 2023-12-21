import Story from "../story/story.component";
import Title from "../title/title.component";
import Riddle from "../riddle/riddle.component";
import { useState } from "react";

interface ChristmasEveJourneyProps {
  handleEnd: any;
  krampus: any;
  rockin: any;
  whiteChristmas: any;
  santaBaby: any;
  angels: any;
  playSong: any;
}

export const ChristmasEveJourney = ({
  handleEnd,
  krampus,
  rockin,
  whiteChristmas,
  angels,
  santaBaby,
  playSong,
}: ChristmasEveJourneyProps) => {
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
            songHandling={playSong}
            song1={rockin}
            song2={krampus}
          />
        );
        break;
      case 2:
        setRiddle(
          <Riddle
            question={"🟦🎄"}
            answer={["blue christmas"]}
            setShowElement={setShowStory}
            songHandling={playSong}
            song1={whiteChristmas}
            song2={rockin}
          />
        );
        break;
      case 3:
        setRiddle(
          <Riddle
            question={"🎅🏻🍼"}
            answer={["santa baby"]}
            setShowElement={setShowStory}
            songHandling={playSong}
            song1={santaBaby}
            song2={whiteChristmas}
          />
        );
        break;
      case 4:
        setRiddle(
          <Riddle
            question={"👼🏻👂🏻⬆️"}
            answer={["angels we have heard on high"]}
            setShowElement={setShowStory}
            songHandling={playSong}
            song1={angels}
            song2={santaBaby}
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
            songHandling={playSong}
            song1={krampus}
            song2={angels}
          />
        );
        break;

      default:
        return null;
    }
  };

  const storyArray = [
    <Title title="> La Befellena." />,
    <Story story={`You have never felt so betrayed in your entire life.`} />,
    <Story
      story={`Elfward has been one of your three best friends for the past 647 years.`}
    />,
    <Story story={`But now...`} />,
    <Story story={`He might just be a regular friend!`} />,
    <Story story={`That thought pains you deeply.`} />,
    <Story
      story={`Truly, it's all you've been thinking of since he trapped you here.`}
    />,
    <Story
      story={`Well, that and the fact that your magic is useless here.`}
    />,
    <Story story={`You think you know the origin of this advent calendar:`} />,
    <Story story={`Something dark. Something ancient.`} />,
    <Story story={`Like you, but evil!`} />,
    <Story
      story={`You hope Elfward doesn't know the true nature of the advent calendar...`}
    />,
    <Story story={`But you fear the worst.`} />,
    <Title title="> GoodWill Toward Men." />,
    <Story story={`Stupid, stupid, STUPID!`} />,
    <Story
      story={`You should have expected Elfward would turn on you eventually.`}
    />,
    <Story
      story={`You think back to all the signs you've noticed over the years.`}
    />,
    <Story story={`Like that time he beat you at the head elf election!`} />,
    <Story story={`What kind of friend would do that?!`} />,
    <Story
      story={`You've been furiously ruminating about this for...a month, probably?`}
    />,
    <Story story={`To be fair, there is not a lot to do in here.`} />,
    <Story story={`You are trapped in a box no bigger than a broom closet.`} />,
    <Story
      story={`You've paced the entire thing thousands of times, but there's no way out.`}
    />,
    <Story
      story={`You're just going to have to hope somebody comes to rescue you.`}
    />,
    <Story story={`YOU HATE THAT.`} />,
    <Title title="> Santa Lizzy." />,
    <Story story={`You walk, and walk, and walk through a hallway.`} />,
    <Story story={`You lick the candycane in your hand...`} />,
    <Story story={`(...don't worry, it's not peppermint...)`} />,
    <Story story={`...and use it to make a mark on the wall.`} />,
    <Story
      story={`A trail of marks stretches almost infinitely behind you.`}
    />,
    <Story story={`You don't think about Elfward at all.`} />,
    <Story
      story={`You especially don't think about what a horrible awful rotten traitor he is.`}
    />,
    <Story
      story={`You do not clench the candycane in your hand so hard that it almost breaks.`}
    />,
    <Story story={`No, you're just worried about getting out of here.`} />,
    <Story story={`You have no idea how long it's been.`} />,
    <Story
      story={`But you're sure if you don't escape soon, Christmas will be ruined!!`}
    />,
    <Title title="> Elfward." />,
    <Story story={`You slowly come to in a room thrumming with lights.`} />,
    <Story story={`You look around for everybody else, but you're alone.`} />,
    <Story story={`This...is not turning out like you planned.`} />,
    <Story
      story={`You'd been envisioning sort of a fun, festive advent adventure!`}
    />,
    <Story
      story={`One that would span 24 days and really get your point across.`}
    />,
    <Story story={`But something tells you it's Christmas Eve...`} />,
    <Story
      story={`How can you cram 24 days of advent into just one night?!`}
    />,
    <Story
      story={`The panel in front of you is playing a Christmas tune...`}
    />,
    <Story story={`It sounds familiar.`} />,
    <>
      <div onClick={() => handleRiddle(1)}>
        <Story story={`It's driving you crazy! What could it be?`} />
      </div>
    </>,
    <Story story={`"Rockin' Around the Christmas Tree!" you exclaim.`} />,
    <Story story={`The wall in front of you rumbles.`} />,
    <Story
      story={`It splits open to reveal a large room filled with mysterious items.`}
    />,
    <Story story={`You step inside and start exploring.`} />,
    <Story story={`You're surrounded by puzzles: 24 of them, to be exact!`} />,
    <Story story={`(You guess you've already done #25.)`} />,
    <Story story={`You touch one of the puzzles.`} />,
    <Story story={`It pulses, then disappears!`} />,
    <Title title="> GoodWill Toward Men." />,
    <Story
      story={`You are literally just minding your own business when --`}
    />,
    <Story story={`Suddenly, the wall in front of you starts to glow.`} />,
    <Story
      story={`This is the first thing to happen to you in at least a month.`}
    />,
    <>
      <div onClick={() => handleRiddle(2)}>
        <Story story={`You peer at the mysterious symbols...`} />
      </div>
    </>,
    <Story story={`Well that makes no sense whatsoever.`} />,
    <Story story={`Everybody knows Christmas is white.`} />,
    <Story story={`Whoever made this puzzle is an idiot.`} />,
    <Story story={`Nonetheless, the wall in front of you slides open.`} />,
    <Story story={`You run out into a long, seemingly endless hallway.`} />,
    <Story story={`You keep running. There's no time to waste!`} />,
    <Title title="> Santa Lizzy." />,
    <Story story={`It feels like you've been walking for a month.`} />,
    <Story story={`You've never seen a single twist or turn.`} />,
    <Story
      story={`But according to your candycane trail, you've never retraced your steps.`}
    />,
    <Story story={`You see something glowing faintly in the distance.`} />,
    <Story story={`You race towards it and find...`} />,
    <Story story={`A wall.`} />,
    <Story story={`A wall!!!`} />,
    <Story story={`You're so happy to see a wall!`} />,
    <>
      <div onClick={() => handleRiddle(3)}>
        <Story story={`The wall glows with strange symbols.`} />
      </div>
    </>,
    <Story story={`You find this song deeply offensive.`} />,
    <Story story={`Nonetheless, the wall slides open.`} />,
    <Story story={`You wait in anticipation as it reveals...`} />,
    <Story story={`Another freaking hallway.`} />,
    <Story story={`You start walking again...`} />,
    <Title title="> La Befellena." />,
    <Story story={`You're not really sure where you are...`} />,
    <Story story={`It's sort of a nebulous void.`} />,
    <Story story={`You've tried walking in every direction.`} />,
    <Story story={`But you always seem to wind up right where you started.`} />,
    <Story story={`There's nothing but misty blackness.`} />,
    <Story story={`A faint tune starts playing in the distance.`} />,
    <>
      <div onClick={() => handleRiddle(4)}>
        <Story story={`You think you've heard it before...`} />
      </div>
    </>,
    <Story story={`"Angels We Have Heard on High!" you exclaim.`} />,
    <Story story={`Slowly, the mist starts to clear.`} />,
    <Story story={`Light fills the void.`} />,
    <Story story={`You find yourself in a room with many open doorways.`} />,
    <Story story={`How will you choose which path to take?`} />,
    <Story story={`It's probably better to just stay where you are.`} />,
    <Title title="> Elfward." />,
    <Story story={`That's 5 riddles down and 20 to go.`} />,
    <Story
      story={`You're not sure what happens when you solve the last one.`}
    />,
    <Story
      story={`Everybody, having learned a valuable lesson about...Christmas?`}
    />,
    <Story story={`Will be released from the advent calendar?`} />,
    <Story
      story={`Honestly, you were hoping you'd be able to write your own riddles.`}
    />,
    <Story story={`These just aren't getting your point across.`} />,
    <Story story={`You touch the next puzzle.`} />,
    <Story story={`It begins glowing, but it doesn't go anywhere.`} />,
    <>
      <div onClick={() => handleRiddle(5)}>
        <Story story={`This must be your puzzle!`} />
      </div>
    </>,
    <Story
      story={`As soon as you speak the answer, the door behind you crashes shut.`}
    />,
    <Story story={`You try to open it, but it's no use.`} />,
    <Story story={`Suddenly, you feel eyes on you.`} />,
    <Story story={`Almost as if you're being watched.`} />,
    <Story story={`You swear you can hear the breathing of someone...`} />,
    <Story story={`Or something?`} />,
    <Story story={`You know you're not alone anymore.`} />,
    <Story story={`You slowly turn around...`} />,
    <Story story={`TO BE CONTINUED`} />,
    <>
      <span onClick={() => handleEnd()}>
        <Story story={`...TOMORROW`} />
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
