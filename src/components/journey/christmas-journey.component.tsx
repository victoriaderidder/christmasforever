import Story from "../story/story.component";
import Title from "../title/title.component";
import Riddle from "../riddle/riddle.component";
import { useState } from "react";

interface ChristmasJourneyProps {
  handleEnd: any;
}

export const ChristmasJourney = ({ handleEnd }: ChristmasJourneyProps) => {
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
            question={"Why didn't the teddy bear eat his lunch?"}
            answer={["stuffed", "he was stuffed", "because he was stuffed"]}
            setShowElement={setShowStory}
          />
        );
        break;
      case 2:
        setRiddle(
          <Riddle
            question={
              <>
                <p>D, D, P, V, C, C, D, ?, R</p>
                <p>
                  To show your understanding, you'll need more than just the
                  letter…
                </p>
              </>
            }
            answer={["blitzen"]}
            setShowElement={setShowStory}
          />
        );
        break;
      case 3:
        setRiddle(
          <Riddle
            question={
              <>
                <a
                  href="https://mywordle.strivemath.com/?word=fccoj"
                  target="_blank"
                  rel="noreferrer"
                >
                  Click here to continue...
                </a>
              </>
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

      default:
        return null;
    }
  };

  const storyArray = [
    <Title title="> Elfward." />,
    <Story story={`You slowly turn around.`} />,
    <Story
      story={`At the other end of the room stands a large and mysterious teddy bear.`}
    />,
    <Story
      story={`He seems to loom over you by at least a couple of inches.`}
    />,
    <Story story={`You don't know whether to be afraid or confused.`} />,
    <Title title="> Mysterious Teddy Bear." />,
    <Story story={`You did not create this advent calendar.`} />,
    <Story story={`You do not know who created it.`} />,
    <Story story={`You do not know who created you.`} />,
    <Story
      story={`Yet you have lived inside this advent calendar for as long as you can remember.`}
    />,
    <Story
      story={`You think you have been waiting your whole life for this moment.`}
    />,
    <Story story={`Slowly, you cross the room.`} />,
    <Story
      story={`The elf backs away, pressing himself against the far wall.`}
    />,
    <Story story={`You hold out a sheet of paper.`} />,
    <>
      <div onClick={() => handleRiddle(1)}>
        <Story
          story={`Something is scrawled on it in your own childlike handwriting...`}
        />
      </div>
    </>,
    <Story
      story={`You are so pleased that the elf has solved your very own riddle!`}
    />,
    <Story story={`You excitedly gesture to the rest of the riddles.`} />,
    <Title title="> Elfward." />,
    <Story
      story={`It seems that this mysterious teddy bear would like you to continue.`}
    />,
    <Story
      story={`You were going to anyway, but now you have a very intimidating overseer.`}
    />,
    <Story story={`So that's just great.`} />,
    <Story story={`You touch the next riddle.`} />,
    <Story story={`Away it goes!`} />,
    <Title title="> Santa Lizzy." />,
    <Story story={`There's a light at the end of your hallway.`} />,
    <Story
      story={`You've been walking so long that you can barely believe it.`}
    />,
    <Story story={`The closer you get, the brighter it becomes.`} />,
    <Story story={`All of a sudden, your way is blocked!`} />,
    <Story story={`There's some sort of translucent barrier.`} />,
    <Story story={`You press against it, but it's no use.`} />,
    <>
      <div onClick={() => handleRiddle(2)}>
        <Story story={`There are letters on the floor in front of you...`} />
      </div>
    </>,
    <Story story={`Oh man, you miss Blitzen.`} />,
    <Story story={`You miss Donner, and Dancer, and...all of them!`} />,
    <Story story={`You hope they're doing okay without you.`} />,
    <Story story={`And you hope you'll see them soon.`} />,
    <Story story={`You take a deep breath and rush into the light!`} />,
    <Title title="> GoodWill Toward Men." />,
    <Story story={`You have been running at top speed FOR HOURS.`} />,
    <Story story={`(Possibly more like 5 minutes.)`} />,
    <Story story={`You're not sure where you're going.`} />,
    <Story story={`But you are going to get there as fast as possible!`} />,
    <Story
      story={`You are running so fast that you don't see the shimmering air in front of you.`}
    />,
    <Story story={`You slam facefirst into an invisible barrier!`} />,
    <Story story={`That's got to hurt...`} />,
    <Story
      story={`You pull yourself together and take a look at the shimmering barrier.`}
    />,
    <>
      <div onClick={() => handleRiddle(3)}>
        <Story story={`It looks like some sort of grid...`} />
      </div>
    </>,
    <Story story={`JOLLY?!??!?!`} />,
    <Story story={`What kind of cruel joke is this?`} />,
    <Story story={`YOU ARE NOT FEELING JOLLY.`} />,
    <Story story={`But at least the barrier has disappeared.`} />,
    <Story story={`You see a light at the end of the passage.`} />,
    <Story story={`You race towards it!`} />,
    <Title title="> La Befellena." />,
    <Story
      story={`You are just minding your own business and not being indecisive at all.`}
    />,
    <Story story={`You hear footsteps coming from all around you.`} />,
    <Story
      story={`You're sure this must be the evil thing behind the advent calendar.`}
    />,
    <Story story={`You fervently wish your magic worked here.`} />,
    <Story
      story={`Though you are quite elderly, you get into a fighting stance --`}
    />,
    <Story story={`Just as GoodWill Toward Men and Santa Lizzy race in!`} />,
    <Story story={`You are so glad to see your friends.`} />,
    <Story story={`And they are so glad to see you!`} />,
    <Story
      story={`You have a brief celebration before the next riddle arrives.`}
    />,
    <>
      <div onClick={() => handleRiddle(4)}>
        <Story story={`It seems to fill the entire floor...`} />
      </div>
    </>,
    <Title title="> Mysterious Teddy Bear." />,
    <Story story={`You are very pleased that the riddles are being solved!`} />,
    <Story
      story={`You have been here for many years and never seen anything like this.`}
    />,
    <Story
      story={`Something tells you that if enough riddles are solved...`}
    />,
    <Story story={`...you might be able to leave the advent calendar!`} />,
    <Story story={`This seems so scary to you.`} />,
    <Story story={`The advent calendar is the only home you've ever known.`} />,
    <Story
      story={`But you have always dreamed of being a child's beloved toy.`}
    />,
    <Story story={`Maybe that dream will finally come true!`} />,
    <Story story={`You can scarcely dare to allow yourself to hope.`} />,
    <Title title="> Elfward." />,
    <Story
      story={`The mysterious teddy bear excitedly gestures towards another riddle.`}
    />,
    <Story story={`You're getting into a bit of a rhythm:`} />,
    <Story story={`The teddy bear selects a riddle and you send it out.`} />,
    <Story
      story={`They're getting solved almost as fast as you can send them.`}
    />,
    <Story story={`This may be a good thing, since it is Christmas Eve.`} />,
    <Story story={`And you never really intended to ruin Christmas...`} />,
    <Story story={`But you can't help but feel disappointed.`} />,
    <Story story={`You've come here for a reason, after all.`} />,
    <Story
      story={`To make your friends understand it's time for you to go.`}
    />,
    <Story story={`You are simply ready to leave the North Pole.`} />,
    <Story story={`And they're not ready to let you.`} />,
    <Story story={`But that's too bad.`} />,
    <Story story={`It's simply time.`} />,
    <Story story={`You pull a pen out of your pocket.`} />,
    <Story
      story={`You scribble your own riddle over the one the teddy bear gestured to.`}
    />,
    <Story story={`The teddy bear seems distressed.`} />,
    <Story story={`He waves his arms frantically.`} />,
    <Story story={`You ignore him and send your riddle out.`} />,
    <Title title="> Santa Lizzy." />,
    <Story story={`A scrap of paper appears in front of you --`} />,
    <Story story={`In front of all of you, really.`} />,
    <Story
      story={`You take a closer look and realize that you recognize the handwriting.`}
    />,
    <Story story={`How could you not?`} />,
    <>
      <div onClick={() => handleRiddle(5)}>
        <Story
          story={`Elfward has been your most trusted advisor for hundreds of years.`}
        />
      </div>
    </>,
    <Story story={`You guess riddles aren't Elfward's strong suit.`} />,
    <Story
      story={`You are very angry that he trapped you in an advent calendar to...`}
    />,
    <Story story={`...make a dumb point about retirement?`} />,
    <Story story={`He could have just asked you nicely.`} />,
    <Story story={`You don't even think he's ever mentioned retiring.`} />,
    <Story story={`Well, maybe once a couple hundred years ago.`} />,
    <Story
      story={`You literally just pointed out that Aruba would melt him...`}
    />,
    <Story story={`He could have retired to Canada or something.`} />,
    <Title title="> GoodWill Toward Men." />,
    <Story story={`Santa Lizzy has shown Elfward's riddle around.`} />,
    <Story story={`And, well, you kinda get it.`} />,
    <Story story={`Not the criminal misconduct part.`} />,
    <Story story={`You will be arresting Elfward on sight.`} />,
    <Story story={`But the North Pole doesn't really need him anymore...`} />,
    <Story story={`They have you, after all!`} />,
    <>
      <div onClick={() => handleRiddle(6)}>
        <Story
          story={`As if grateful for the understanding, a riddle appears in your hand.`}
        />
      </div>
    </>,
    <Title title="> Mysterious Teddy Bear." />,
    <Story
      story={`You are deeply distraught that Elfward edited a riddle!!!`}
    />,
    <Story story={`They are sacred.`} />,
    <Story story={`You are terrified something bad will happen.`} />,
    <Story
      story={`But after some time of riddles being sent out and solved, you calm down.`}
    />,
    <Story story={`Maybe the riddles are not so sacred after all?`} />,
    <Story
      story={`You wonder if you can write another of your own riddles.`}
    />,
    <Story story={`Being in here for so long has given you a lot of ideas.`} />,
    <Story
      story={`But you wouldn't dare desecrate a riddle...just in case.`}
    />,
    <Story
      story={`You write your own riddle on a scrap of paper and offer it to Elfward.`}
    />,
    <Title title="> Elfward." />,
    <Story story={`Uhhhh, you guess you're solving this riddle now.`} />,
    <>
      <div onClick={() => handleRiddle(7)}>
        <Story story={`You hope they won't all be bear themed.`} />
      </div>
    </>,
    <Story story={`Ugh. They're definitely all going to be bear themed.`} />,
    <Story
      story={`You quickly send the next riddle before the teddy bear can give you another.`}
    />,
    <Title title="> Santa Squad." />,
    <Story story={`You are all arguing about which hallway to take.`} />,
    <Story
      story={`Another riddle is rather abruptly thrown into your room.`}
    />,
    <>
      <div onClick={() => handleRiddle(8)}>
        <Story story={`You gather round...`} />
      </div>
    </>,
    <Story story={`This riddle seems to be mocking you.`} />,
    <Story
      story={`Maybe you should just pick a direction and get on with it.`}
    />,
    <Story
      story={`You spin GoodWill Toward Men in a circle until he's dizzy.`}
    />,
    <Story story={`When he faces east, you all head that way.`} />,

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