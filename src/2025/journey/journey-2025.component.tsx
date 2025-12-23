import { useAudio } from "../../audio/audio.hooks";
import { AUDIO_PATHS } from "../../audio/audio.utils";
import Story from "../../components/story.component";
import Title from "../../components/title.component";
import Spotlight from "../../components/spotlight.component";
import { handle2025Riddle } from "./utils/2025-riddle-utils";
import { useState, useEffect } from "react";
import styles from "../App2025.module.css";

export interface Journey2025Props {
  handleEnd: any;
}

export const Journey2025 = ({ handleEnd }: Journey2025Props) => {
  const [showStory, setShowStory] = useState(true);
  const [riddle, setRiddle] = useState(<></>);
  const [redBg, setRedBg] = useState(false);
  const [index, setIndex] = useState(0);

  const { audioRefs, playSong, stopAllAudio } = useAudio(AUDIO_PATHS);

  useEffect(() => {
    index === 0 && playSong(audioRefs.fire.current);
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
    // <Story story={`it was one of those mortals who helped to defeat you...`} />,
    // <Story story={`trapping you in this cave.`} />,
    // <Story story={`doomed to be alone forever.`} />,
    // <Story story={`but oh, how that light calls you.`} />,
    // <Story story={`you haven't seen light since...`} />,
    // <Story story={`.....`} />,
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
    <Story story={`You know what always numbs your feelings?`} />,
    <>
      <div onClick={() => handle2025Riddle(3, setShowStory, setRiddle)}>
        <Story story={`That's right! Hot chocolate.`} />
      </div>
    </>,
    <Story story={`That hot chocolate wasn't calming at all...`} />,
    <Story story={`You feel even worse now.`} />,
    <Story story={`You decide to go find your Head Elf.`} />,
    <Story story={`He should know what to do.`} />,
    <>
      <div
        onClick={() =>
          playSong(audioRefs?.alarm?.current, audioRefs?.krampus?.current)
        }
      >
        <Title title={`> Elfward.`} />
      </div>
    </>,
    <Story story={`An alarm is going off somewhere.`} />,
    <Story story={`You've been trying to find it for twenty minutes.`} />,
    <Story story={`It's so loud it's interfering with toy production.`} />,
    <Story story={`And you have no time for that,`} />,
    <Story story={`not with Christmas Eve tomorrow!`} />,
    <Story
      story={`You've narrowed your search to a bookshelf at the end of the room.`}
    />,
    <Story story={`You know one of these books opens a secret room.`} />,
    <>
      <div onClick={() => handle2025Riddle(4, setShowStory, setRiddle)}>
        <Story story={`The only question is which one...`} />
      </div>
    </>,
    <Story story={`The bookshelf swings open, revealing a dingy room.`} />,
    <Story story={`There's only one alarm here.`} />,
    <Story story={`Terror fills you as you realize you know what it is.`} />,
    <Title title={`> GoodWill Toward Men.`} />,
    <Story story={`You're gathering your army.`} />,
    <Story story={`Not because you've been told to or anything.`} />,
    <Story story={`But you'd know that sound anywhere...`} />,
    <Story
      story={`When you were briefly Head Elf, you'd familiarized yourself with all possible alarms.`}
    />,
    <Story story={`Though this was one you'd never expected to go off.`} />,
    <Story
      story={`When you heard it, you rushed straight to Santa's Workshop.`}
    />,
    <Story story={`You immediately stopped all toy production.`} />,
    <Story
      story={`Sorry if Sally on the Nice List doesn't get her dolly...`}
    />,
    <Story story={`BUT THIS IS VERY SERIOUS!!!`} />,
    <Story story={`Somehow, Krampus has been freed.`} />,
    <Story
      story={`And he wants nothing more than to destroy Christmas forever.`}
    />,
    <Story story={`Obviously you won't let that happen.`} />,
    <Story story={`A large group of elves stand before you.`} />,
    <>
      <div onClick={() => handle2025Riddle(5, setShowStory, setRiddle)}>
        <Story story={`What will you say to convince them to join you?`} />
      </div>
    </>,
    <Story story={`Krampus is nothing less than a nightmare.`} />,
    <Story story={`He will stop at nothing to take over the North Pole.`} />,
    <Story story={`And he'll destroy much more than just Christmas.`} />,
    <Story story={`Will you help save our home?!`} />,
    <Title title={`> La Befellena.`} />,
    <Story story={`You feel the alarm deep within your soul.`} />,
    <Story
      story={`Many years ago, you helped the first Santa defeat Krampus.`}
    />,
    <Story story={`You devised the system to trap him in that cave.`} />,
    <Story story={`And you created the alarm you'd hoped to never hear.`} />,
    <Story story={`Your magic has failed.`} />,
    <Story story={`Somehow, Krampus is coming.`} />,
    <Story story={`You need to make things right.`} />,
    <Story story={`You've gathered materials to make a potion.`} />,
    <Story story={`If Krampus drinks it, he'll lose all his magic.`} />,
    <Story
      story={`You just need to add the ingredients in the right order...`}
    />,
    <>
      <div onClick={() => handle2025Riddle(6, setShowStory, setRiddle)}>
        <Story story={`What order was that again?`} />
      </div>
    </>,
    <Story story={`You hold up the potion triumphantly!`} />,
    <Story story={`Now you just have to get Krampus to drink it.`} />,
    <Story story={`That might be easier said than done...`} />,
    <Title title=">Mysterious Teddy Bear." />,
    <Story story={`Things are strange and things are dark.`} />,
    <Story story={`Chilly air seeps through your fur.`} />,
    <Story story={`You have the sensation of speeding, flying.`} />,
    <Story story={`It reminds you of riding Santa's sleigh.`} />,
    <Story story={`But this is different.`} />,
    <Story story={`You are flying, but there are no other toys here.`} />,
    <Story story={`You hear the wind whistling...and something else.`} />,
    <Story story={`Hundreds of voices, weeping, all at the same time.`} />,
    <Story story={`You lift your head up and see Him.`} />,
    <Story story={`The creature with the red eyes.`} />,
    <Story story={`And he sees you.`} />,
    <Story story={`You hear his words echo in your stuffed head.`} />,
    <Story story={`Don't worry, little bear.`} italic />,
    <>
      <div onClick={() => handle2025Riddle(7, setShowStory, setRiddle)}>
        <Story story={`Soon Christmas will be ours...`} italic />
      </div>
    </>,
    <Story story={`You realize some amount of time has passed.`} />,
    <Story story={`You see the North Pole in the distance...`} />,
    <Story story={`And then you know nothing but darkness.`} />,
    <Title title={`> Santa Lizzy.`} />,
    <Story story={`THE alarm is going off.`} />,
    <Story story={`Krampus is on his way here, to the North Pole.`} />,
    <Story story={`And you can feel that he's close.`} />,
    <Story story={`You and Elfward run through the halls.`} />,
    <Story story={`You warn everyone you see.`} />,
    <Story story={`Elves run every which way.`} />,
    <Story story={`Some seek shelter, some seek to defend their home.`} />,
    <Story story={`And you?`} />,
    <Story story={`You seek...`} />,
    <>
      <div onClick={() => handle2025Riddle(2, setShowStory, setRiddle)}>
        <Story story={`A cookie.`} />
      </div>
    </>,
    <Story story={`Aha! Another magic cookie!`} />,
    <Story story={`If only you knew what to do with it...`} />,
    <Title title={`> GoodWill Toward Men.`} />,
    <Story story={`Something lands hard on the ground outside.`} />,
    <Story story={`It must be Krampus.`} />,
    <Story story={`Your army stands ready to defend.`} />,
    <Story story={`But with what? They have no weapons...`} />,
    <Story story={`You take a look around.`} />,
    <Story story={`The toys will be no good.`} />,
    <Story story={`But the peppermint sticks...`} />,
    <Story
      story={`(The ones handmade, lovingly, by specialized elf bakers...)`}
    />,
    <Story story={`Those you can sharpen to a point.`} />,
    <Story story={`But surely you must standardize these weapons!`} />,
    <>
      <div onClick={() => handle2025Riddle(8, setShowStory, setRiddle)}>
        <Story
          story={`How many red stripes should each peppermint stick have?`}
        />
      </div>
    </>,
    <Story story={`Yes! 98 is the perfect number!`} />,
    <Story story={`You quickly begin passing them out to your army.`} />,

    <Title title={`> Elfward.`} />,
    <Story story={`You and Santa Lizzy rush into the Workshop.`} />,
    <Story
      story={`You're pleased to find the defense portion of things has been handled.`}
    />,
    <Story story={`But you wonder if it will be enough.`} />,
    <Story
      story={`You are not old enough to remember the last time Krampus was here.`}
    />,
    <Story story={`But you've heard stories.`} />,
    <Story story={`Stories of death, of destruction.`} />,
    <Story story={`Of nothing the elves did being enough.`} />,
    <Story story={`You hear a commotion beginning outside.`} />,
    <Story story={`And you know to be afraid.`} />,
    <Story story={`But this is your home.`} />,
    <Story story={`You take the sharpened candycane offered to you.`} />,
    <Story story={`And you stand ready.`} />,
    <Story story={`There comes a banging on the door.`} />,
    <Story story={`You are Head Elf.`} />,
    <Story story={`But most of all, you are a music appreciator.`} />,
    <>
      <div
        onClick={() =>
          handle2025Riddle(
            9,
            setShowStory,
            setRiddle,
            audioRefs?.wizardsInWinter?.current,
            audioRefs?.krampus?.current
          )
        }
      >
        <Story story={`And this fight could certainly use some fresh music.`} />
      </div>
    </>,
    <Story story={`Ahhhh. Now there's a song.`} />,

    <Title title={`> Mysterious Teddy Bear.`} />,
    <Story story={`You are in the North Pole.`} />,
    <Story story={`Your second home.`} />,
    <Story story={`A place where everyone has always been kind to you.`} />,
    <Story story={`Yet you are destroying it.`} />,
    <Story story={`You and the creature fell candycane posts.`} />,
    <Story story={`He smashes the entrance to Santa's Workshop.`} />,
    <Story story={`Together, you rush in.`} />,
    <Story story={`You're met by elves with pointy candycane weapons.`} />,
    <Story story={`They seem to bounce harmlessly off His fur.`} />,
    <Story story={`Elves in His way are thrown to the side.`} />,
    <Story story={`You know, somehow, that He is here for the toys.`} />,
    <Story story={`The wrapped presents are His first target.`} />,
    <Story story={`He destroys them with an inhuman speed.`} />,
    <Story story={`The weeping you heard on the sleigh surrounds you.`} />,
    <Story story={`It seems to get louder with every package destroyed.`} />,
    <Story story={`And you are here...`} />,
    <Story story={`Unable to stop yourself from joining in.`} />,

    <Title title={`> La Befellena.`} />,
    <Story story={`You rush into the Workshop with your potion.`} />,
    <Story story={`It's nothing but chaos.`} />,
    <Story story={`Elves are fighting left and right.`} />,
    <Story story={`Damaged and destroyed toys litter the ground.`} />,
    <Story story={`And there he is, just as you remember him.`} />,
    <Story story={`Krampus.`} />,
    <Story story={`Just as wrathful and filled with rage as ever.`} />,
    <Story story={`You stand amidst the pandemonium with no plan.`} />,
    <Story story={`How can you trick Krampus into taking the potion?`} />,
    <Story story={`You see Santa Lizzy nearby.`} />,
    <Story story={`She tries desperately to rescue packages.`} />,
    <Story story={`To save toys and to save Christmas.`} />,
    <Story story={`And you have an idea.`} />,

    <Title title={`> Santa Lizzy.`} />,
    <Story story={`La Befellena shoves her way towards you.`} />,
    <Story story={`She holds a vial in her hand.`} />,
    <Story story={`Krampus was paying you no mind before.`} />,
    <Story story={`But it's like he senses La Befellena's presence.`} />,
    <Story story={`He whips around and turns towards you.`} />,
    <Story story={`You see the Mysterious Teddy Bear on his back.`} />,
    <Story story={`His little button eyes are empty.`} />,
    <Story story={`Krampus lurches towards you.`} />,
    <Story story={`La Befellena thrusts the vial into your hand.`} />,
    <Story story={`She shouts, "Quick! Drink this!"`} />,
    <Story story={`You uncork the vial and lift it to your mouth...`} />,
    <Story story={`But it's too late.`} />,
    <Story
      story={`The Mysterious Teddy Bear snatches the vial from your hand.`}
    />,
    <Story story={`You try to grab him, but he's too quick.`} />,
    <Story story={`He places the vial in Krampus's hand.`} />,
    <Story story={`"We can't let him drink that!" La Befellena cries.`} />,
    <Story story={`"It will strengthen his magic!"`} />,
    <Story story={`Krampus smiles, or at least you think he does.`} />,
    <Story story={`He swallows the potion in one gulp.`} />,

    <Title title={`> Mysterious Teddy Bear.`} />,
    <Story story={`You snap back into your body.`} />,
    <Story story={`You don't know where you've been.`} />,
    <Story story={`But you feel like yourself in a way you've never known.`} />,
    <Story story={`The creature roars with fury.`} />,
    <Story story={`But he holds no power over you anymore.`} />,
    <Story story={`You scramble off his shoulder.`} />,
    <Story story={`The horrible weeping has stopped.`} />,
    <Story story={`Out of Krampus floods...`} />,
    <Story story={`Light.`} />,
    <Story story={`Hundreds of shimmering spirits.`} />,
    <Story story={`The souls of every toy he's ever destroyed.`} />,
    <Story story={`They swirl around the Workshop like snowflakes.`} />,
    <Story story={`Free at last.`} />,
    <Story story={`Then they turn and surround Krampus.`} />,
    <Story story={`He howls in terror as .`} />,

    <Story story={`And you...`} />,
    <Story story={`You feel the weight of what you've done.`} />,
    <Story story={`The destruction you helped cause.`} />,
    <Story story={`You look around at the devastation.`} />,
    <Story story={`The shattered toys.`} />,
    <Story story={`The wounded elves.`} />,
    <Story story={`Will they ever forgive you?`} />,
    <Story story={`Can you ever forgive yourself?`} />,

    // mysterious teddy bear is himself again
    // for the first time, he feels sad feelings in his soul
    // how could he hurt his friends? what's wrong with him?
    // will they ever trust him again?
    // the north pole is in tatters...
    // christmas will continue, but not all children will get their toys
    // santa lizzy is so sad
    // la befellena...magics the toys' spirits into new bodies??
    // a magic spell we must all participate in to win our shirts
    // i email an image to each participant related to their shirts
    // and then: we've saved christmas!
    // <>
    //   <div onClick={() => handle2025Riddle(2, setShowStory, setRiddle)}>
    //     <Story story={`In the darkness, all you see are glowing eyes...`} />
    //   </div>
    // </>,
    <>
      <span>Ending placeholder!</span>
    </>,
  ];

  // TODO: fix ornaments on tree
  // TODO: push to GH pages
  // TODO: redo readme
  return (
    <>
      {showStory ? (
        redBg ? (
          <div
            className={`story ${styles["story-fullscreen-red"]}`}
            onClick={increment}
          >
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
          className={`story ${redBg && styles["story-fullscreen-red"]}`}
          style={{ padding: "24px", textAlign: "center" }}
        >
          {riddle}
        </div>
      )}
    </>
  );
};
