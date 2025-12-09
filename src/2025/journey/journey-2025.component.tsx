import { useAudio } from "../../audio/audio.hooks";
import { AUDIO_PATHS } from "../../audio/audio.utils";
import Story from "../../components/story.component";
import Title from "../../components/title.component";
import Spotlight from "../../components/spotlight.component";
import { handle2025Riddle } from "./utils/2025-riddle-utils";
import { useState, useEffect } from "react";
import "../App2025.css";

export interface Journey2025Props {
  handleEnd: any;
  audioRefs?: any;
}

export const Journey2025 = ({ handleEnd }: Journey2025Props) => {
  const [showStory, setShowStory] = useState(true);
  const [riddle, setRiddle] = useState(<></>);
  const [redBg, setRedBg] = useState(false);
  const [index, setIndex] = useState(0);

  const { audioRefs, playSong, stopAllAudio } = useAudio(AUDIO_PATHS);

  useEffect(() => {
    playSong(audioRefs.fire.current);
  }, []);

  const increment = () => {
    index === storyArray?.length - 1 ? handleEnd() : setIndex(index + 1);
  };

  const handleSwitchToRed = () => {
    setRedBg(true);
    playSong(audioRefs?.krampus?.current, audioRefs?.fire?.current);
  };

  const storyArray = [
    // <Title title="> к̴̷̴̭͈̫̫̃̇̓́͟͝р̷̡̦͎͈͋̑ͥ͘͢͢͞ͅα̴̴̴̡̢͕̭ͥͮ̒́μ̵̴̟ͥ̀̎̊ͨ́͠п̴̪̱̤̺̦̃̂̒͑͂̀͜͢͞͝͠у̷̸̷̸̢̖͉̜̲͇̎͐͠͞σ̸̫͔͍̀̍̑͝͠͠͝." />,
    // <Story story={`you have lost yourself.`} />,
    // <Story story={`you know only rage.`} />,
    // <Story story={`you remember only fury.`} />,
    // <Story story={`the darkness is eternal.`} />,
    // <Story story={`centuries of you`} />,
    // <Story story={`alone`} />,
    // <Story story={`in the dark.`} />,
    // <Story story={`but now?`} />,
    // <Story story={`a light...`} />,
    // <Story story={`something flickering`} />,
    // <Story story={`far away`} />,
    // <Story story={`in the corner`} />,
    // <Story story={`of the...`} />,
    // <Story story={`cave?`} />,
    // <Story story={`yes...the cave.`} />,
    // <Story story={`you remember now.`} />,
    // <Title title=">Krampus." />,
    // <Story story={`for that is your name,`} />,
    // <Story story={`isn't it?`} />,
    // <Story story={`you are the spirit of Christmas.`} />,
    // <Story story={`the rightful one.`} />,
    // <Story story={`a true ancient.`} />,
    // <Story story={`not like these mortals,`} />,
    // <Story story={`dressed up in red and playing pretend.`} />,
    // <Story story={`though many years ago,`} />,
    // <Story story={`it was one of those mortals who defeated you...`} />,
    // <Story story={`trapping you in this cave.`} />,
    // <Story story={`doomed to be alone forever.`} />,
    // <Story story={`but oh, how that light calls you.`} />,
    // <Story story={`you haven't seen light since...`} />,
    // <Story story={`and so your mouth,`} />,
    // <Story story={`used to nothing but screams of rage,`} />,
    // <Story story={`attempts to call out.`} />,
    // <Story story={`Is someone there?`} />,
    // <Title title=">Mysterious Teddy Bear." />,
    // <Story story={`You don't know why you're here.`} />,
    // <Story story={`It's as though your body was possessed...`} />,
    // <Story story={`As if your tiny legs walked here all on their own.`} />,
    // <Story story={`But you don't remember the walk.`} />,
    // <Story story={`You remember being home.`} />,
    // <Story story={`And you remember the darkness...`} />,
    // <Story story={`This darkness.`} />,
    // <Story story={`The howling, the screaming.`} />,
    // <Story story={`Noises of a beast...`} />,
    // <Story story={`Of something inhuman.`} />,
    // <Story story={`Terrified, you'd fumbled in your bear pockets.`} />,
    // <Story story={`Struck a match.`} />,
    // <Story story={`Lit a fire.`} />,
    // <Story story={`And the noises ceased.`} />,
    // <>
    //   <div onClick={() => handle2025Riddle(1, setShowStory, setRiddle)}>
    //     <Story story={`In the darkness, all you see are glowing eyes...`} />
    //   </div>
    // </>,
    <>
      <div onClick={() => handleSwitchToRed()}>
        <Story story={`Oh my god.`} />
      </div>
    </>,
    // <Title title={`> Santa Lizzy.`} />,
    // <Story story={`It's the day before Christmas Eve, and everything is...`} />,
    // <Story story={`...fine.`} />,
    // <Story story={`No catastrophes, no surprise parties.`} />,
    // <Story story={`For the first time since you became Santa,`} />,
    // <Story story={`everything is proceeding as planned.`} />,
    // <Story story={`It feels unnatural.`} />,
    // <Story
    //   story={`You're sure it's just because you're used to things going wrong.`}
    // />,
    // <Story
    //   story={`But you can't shake the feeling that something really is wrong.`}
    // />,
    // <Story story={`But it's fine. Everything is fine.`} />,
    // <Story story={`Maybe you should try to distract yourself.`} />,
    // <Story story={`You know what always numbs your feelings?`} />,
    // <>
    //   <div onClick={() => handle2025Riddle(3, setShowStory, setRiddle)}>
    //     <Story story={`That's right! Hot chocolate.`} />
    //   </div>
    // </>,
    // <Story story={`That hot chocolate wasn't calming at all...`} />,
    // <Story story={`You feel even worse now.`} />,
    // <Story story={`You decide to go find your Head Elf.`} />,
    // <Story story={`He should know what to do.`} />,
    // <>
    //   <div
    //     onClick={() =>
    //       playSong(audioRefs?.alarm?.current, audioRefs?.krampus?.current)
    //     }
    //   >
    //     <Title title={`> Elfward.`} />
    //   </div>
    // </>,
    // <Story story={`An alarm is going off somewhere.`} />,
    // <Story story={`You've been trying to find it for twenty minutes.`} />,
    // <Story story={`It's so loud it's interfering with toy production.`} />,
    // <Story story={`And you have no time for that,`} />,
    // <Story story={`not with Christmas Eve tomorrow!`} />,
    <>
      <div onClick={() => handle2025Riddle(4, setShowStory, setRiddle)}>
        <Story story={`You stare in horror at the alarm.`} />
      </div>
    </>,
    <Story story={`That's where Santa Lizzy finds you.`} />,
    <Title title={`> GoodWill Toward Men.`} />,
    <Story story={`You're gathering your army.`} />,
    <Story story={`Not because you've been told to or anything.`} />,
    <Story story={`But you'd know that sound anywhere...`} />,
    <Story
      story={`When you were briefly Head Elf, you'd familiarized yourself with all possible alarms.`}
    />,
    <Story story={`Though this was one you'd never expected to go off.`} />,
    <Story story={`Toy production has ground to a halt.`} />,
    <Story
      story={`Sorry if Sally on the Nice List doesn't get her dolly...`}
    />,
    <Story story={`BUT THIS IS VERY SERIOUS!!!`} />,
    <Story story={`Somehow, Krampus has been freed.`} />,
    <Story
      story={`And he wants nothing more than to destroy Christmas forever.`}
    />,

    // <>
    //   <div onClick={() => handle2025Riddle(2, setShowStory, setRiddle)}>
    //     <Story story={`In the darkness, all you see are glowing eyes...`} />
    //   </div>
    // </>,
    <>
      <span>Ending placeholder!</span>
    </>,
  ];

  return (
    <>
      {showStory ? (
        redBg ? (
          <div className="story story-fullscreen-red" onClick={increment}>
            {storyArray[index]}
          </div>
        ) : (
          <Spotlight radius={80}>
            <div className="story" onClick={increment}>
              {storyArray[index]}
            </div>
          </Spotlight>
        )
      ) : (
        <div
          className="riddle-container"
          style={{ padding: "24px", textAlign: "center" }}
        >
          {riddle}
        </div>
      )}
    </>
  );
};
