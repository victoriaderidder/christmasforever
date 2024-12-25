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
  silentNight: any;
  lastChristmas: any;
  jbr: any;
  chipmunk: any;
  circus: any;
}

export const Journey2024 = ({
  handleEnd,
  playSong,
  finale,
  krampus,
  angels,
  silentNight,
  lastChristmas,
  jbr,
  chipmunk,
  circus,
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
      story={`You're running so fast you barely notice the tree in front of --`}
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
    <Story
      story={`After the events of last year, you've happily retired to Banff.`}
    />,
    <Story
      story={`You're enjoying your retirement, but you find yourself a little...`}
    />,
    <Story story={`Bored?`} />,
    <Story story={`It turns out that you really miss having things to do.`} />,
    <Story story={`So you're here for Santa's surpise party.`} />,
    <Story story={`And you may just decide to stay.`} />,
    <Story story={`The head elf election is coming up next year...`} />,
    <Story story={`You're thinking of tossing your hat back in the ring!`} />,
    <Story story={`Of course, you do have a bit of image rehab to do.`} />,
    <Story
      story={`Damage control after your unfortunate little advent disaster.`}
    />,
    <Story story={`What you need is a big splash.`} />,
    <Story story={`Something to make everybody forget your transgressions.`} />,
    <Story story={`Especially Santa Lizzy.`} />,
    <Story story={`The only question is what you should do?`} />,
    <>
      <div onClick={() => handle2024Riddle(5, setShowStory, setRiddle)}>
        <Story story={`You really need to think it over...`} />
      </div>
    </>,
    <Story story={`Of course! The surprise party.`} />,
    <Story
      story={`You just need to come up with an extra special surprise!`}
    />,
    <Title title="> Santa Lizzy." />,
    <Story story={`Well, you've put it off as long as possible.`} />,
    <Story story={`The elves will be anxiously awaiting your arrival.`} />,
    <Story story={`You sigh...`} />,
    <Story story={`It's not that you don't appreciate their efforts.`} />,
    <Story
      story={`And it's not that you don't think 5 years is a great milestone!`}
    />,
    <Story story={`But Christmas is in just two days!`} />,
    <Story story={`You have so little time left to prepare.`} />,
    <Story
      story={`And you're pretty sure a lot of elf effort has gone into this.`}
    />,
    <Story story={`You'd rather they spend time on the children.`} />,
    <Story story={`Still, they've been working hard to celebrate you.`} />,
    <Story
      story={`So you get up off your sleigh and head towards the workshop.`}
    />,
    <>
      <div
        onClick={() =>
          handle2024Riddle(6, setShowStory, setRiddle, playSong, angels, jbr)
        }
      >
        <Story
          story={`A song plays faintly in the distance, getting louder as you go...`}
        />
      </div>
    </>,
    <Title title="> La Befellena." />,
    <Story story={`Jingle bell, jingle bell, jingle bell rock!`} />,
    <Story story={`You've chosen the perfect entrance song for Santa.`} />,
    <Story story={`You sing along happily.`} />,
    <Story story={`The workshop is perfectly decorated.`} />,
    <Story story={`The lights are dim.`} />,
    <Story story={`The elves are hiding, waiting to surprise Santa.`} />,
    <Story story={`Well, most of them.`} />,
    <Title title="> GoodWill Toward Men." />,
    <Story story={`NOBODY is getting inside this surprise party.`} />,
    <Story story={`Well, except Santa.`} />,
    <Story story={`Everybody inside has been personally screened by you.`} />,
    <Story story={`There will be no criminals this year!!!`} />,
    <Story story={`But what's this?`} />,
    <Story story={`The sound of Jingle Bell Rock catches your ear.`} />,
    <Story story={`This is an obvious security violation!!!`} />,
    <Story
      story={`How can you be expected to keep watch with such a rocking song??`}
    />,
    <Story story={`You can't stop yourself from dancing along.`} />,
    <Story story={`EVERYBODY KNOWS THIS!!!`} />,
    <Story
      story={`IT IS EXACTLY THE WEAKNESS A CRIMINAL WOULD EXPLOIT!!!!!`}
    />,
    <>
      <div
        onClick={() =>
          handle2024Riddle(
            7,
            setShowStory,
            setRiddle,
            playSong,
            jbr,
            silentNight
          )
        }
      >
        <Story story={`You rush to the record player to change it...`} />
      </div>
    </>,
    <Title title="> Mysterious Teddy Bear." />,
    <Story
      story={`You don't really understand the concept of a surprise party.`}
    />,
    <Story story={`You are not hiding with the elves.`} />,
    <Story story={`But that's okay, because you are a bear.`} />,
    <Story story={`You naturally sit with your teddy bear brethren.`} />,
    <Story story={`(However, strangely, none of them talk back...)`} />,
    <Story story={`What you do understand the concept of is sadness.`} />,
    <Story story={`This song is slow and sleepy.`} />,
    <Story story={`It's making you sad!`} />,
    <Story story={`:(.`} />,
    <Story
      story={`You don't think Santa would want to be sad at her party.`}
    />,
    <Story story={`You get up and toddle over to the record player.`} />,
    <Story story={`You sure hope you remember how to use this thing...`} />,
    <Story
      story={`You start by pulling out the current record and smashing it.`}
    />,
    <>
      <div
        onClick={() =>
          handle2024Riddle(
            8,
            setShowStory,
            setRiddle,
            playSong,
            silentNight,
            chipmunk
          )
        }
      >
        <Story story={`There! Now nobody will be sad!`} />
      </div>
    </>,
    <Title title="> Elfward." />,
    <Story story={`Good god this song is terrible.`} />,
    <Story story={`Did La Befellena put this on?`} />,
    <Story story={`You didn't realize she had such terrible taste.`} />,
    <Story story={`Though you do see her across the room, looking frantic.`} />,
    <Story story={`Maybe she doesn't like this song either.`} />,
    <Story
      story={`This may be your chance to win everyone over with your superior music taste!`}
    />,
    <Story
      story={`Turning this song off can't possibly make your public opinion any worse, anyway.`}
    />,
    <Story story={`Santa's footsteps sound in the hallway outside.`} />,
    <Story story={`Time is short!`} />,
    <>
      <div
        onClick={() =>
          handle2024Riddle(
            9,
            setShowStory,
            setRiddle,
            playSong,
            chipmunk,
            krampus
          )
        }
      >
        <Story story={`You rush over to the record player...`} />
      </div>
    </>,
    <Title title="> La Befellena." />,
    <Story story={`Oh my god your party is ruined.`} />,
    <Story story={`IT'S RUINED.`} />,
    <Story story={`This party has been perfectly planned!`} />,
    <Story
      story={`And it all starts with Santa walking in to the perfect beat!`}
    />,
    <Story story={`If the entrance song is wrong, the party is wrong.`} />,
    <Story story={`You stare out in despair.`} />,
    <Story
      story={`There's no way you can make it to the record player in time.`}
    />,
    <Story story={`But this is Santa's workshop.`} />,
    <Story story={`You are standing near a small pile of sports equipment.`} />,
    <Story
      story={`If you can't change the song, you can at least turn it off.`}
    />,
    <Story story={`(It's risky, but you hope Santa will understand.)`} />,
    <Story
      story={`You pick up a frisbee and throw it at the record player!`}
    />,
    <Title title="> Elfward." />,
    <Story story={`You are still standing at the record player.`} />,
    <Story
      story={`You're enjoying your music with a nice whiskey in your hand.`}
    />,
    <Story story={`A frisbee flies towards your face --`} />,
    <Title title="> GoodWill Toward Men." />,
    <Story story={`You are not just security.`} />,
    <Story story={`You are the BEST security.`} />,
    <Story story={`You see the frisbee flying towards Elfward.`} />,
    <Story story={`You would never let harm befall any elf!`} />,
    <Story story={`Even one that trapped you in an advent calendar!`} />,
    <Story story={`You race forward and tackle Elfward to the ground!`} />,
    <Story story={`Well, into the record player.`} />,
    <Story story={`As it falls, the plug pulls out of the wall.`} />,
    <Story story={`Elfward's drink flies out of his hand!`} />,
    <Story story={`It drenches the plug and the outlet.`} />,
    <Story story={`Sparks fly!`} />,
    <Story story={`The lights in the workshop flicker, then go out.`} />,
    <Story story={`The record player shatters on the ground!`} />,
    <Story story={`You and Elfward are in a pile of broken glass!`} />,
    <Story story={`But at least he didn't get hit with the frisbee.`} />,
    <Title title="> Santa Lizzy." />,
    <Story
      story={`You were outside the workshop, listening to the music changing.`}
    />,
    <Story story={`You were pretty sure there was some bullshit going on.`} />,
    <Story story={`You hoped they'd work it out before you went in...`} />,
    <Story story={`But now everything is dark, and there's some screaming.`} />,
    <Story story={`You reach for the door handle to go inside.`} />,
    <Story story={`But the lock is electronic...`} />,
    <Story story={`It bricks at you uselessly.`} />,
    <Story story={`There is a backup code you can enter though.`} />,
    <>
      <div onClick={() => handle2024Riddle(10, setShowStory, setRiddle)}>
        <Story story={`You just have to remember what it is...`} />
      </div>
    </>,
    <Story story={`The door swings open.`} />,
    <Story story={`It's chaos in there!`} />,
    <Story story={`They're going to need your leadership.`} />,
    <Story story={`You carefully make your way inside...`} />,
    <Title title="> Mysterious Teddy Bear." />,
    <Story story={`Whoa!!!`} />,
    <Story story={`A lot just happened!!!!!`} />,
    <Story story={`You can't see anything.`} />,
    <Story
      story={`You try to check on your stuffed bear friends, but they're still mute.`}
    />,
    <Story story={`You carefully dangle off the shelf you're sitting on.`} />,
    <Story
      story={`As you toddle through the workshop, you hear lots of noise.`}
    />,
    <Story story={`Is this a surprise party?`} />,
    <Story story={`You sure are surprised!`} />,
    <Story story={`You thought you'd see Santa and all your friends.`} />,
    <Story story={`This isn't what you'd hoped it would be.`} />,
    <>
      <div
        onClick={() =>
          handle2024Riddle(
            12,
            setShowStory,
            setRiddle,
            playSong,
            krampus,
            lastChristmas
          )
        }
      >
        <Story
          story={`You think back to a time when everything was perfect...`}
        />
      </div>
    </>,
    <Story story={`Yep! Nothing bad happened last year, that's for sure!`} />,
    <Title title="> La Befellena." />,
    <Story story={`You saw what happened as if in slow motion.`} />,
    <Story
      story={`All the fighting over the song has blown the electricity.`}
    />,
    <Story story={`And if there's no power...`} />,
    <Story story={`The elves can't finish making the toys!`} />,
    <Story story={`The sleigh can't be packed in the dark!`} />,
    <Story story={`CHRISTMAS WILL BE RUINED!!!!!`} />,
    <Story story={`You have absolutely no idea what to do!`} />,
    <Story story={`Maybe you can help get the lights back on?`} />,
    <Story story={`Of course, you know nothing about wires...`} />,
    <Story
      story={`But you can at least light up this room with your magic.`}
    />,
    <>
      <div onClick={() => handle2024Riddle(11, setShowStory, setRiddle)}>
        <Story story={`What was that spell again?`} />
      </div>
    </>,
    <Story story={`"LET THERE BE LIGHT!"`} />,
    <Story story={`And the room is flooded with a soft blue glow.`} />,
    <Title title="> Elfward." />,
    <Story story={`You can finally see well enough to pull yourself up.`} />,
    <Story story={`Glass shards coat your clothes and hair.`} />,
    <Story story={`You absolutely hate GoodWill Toward Men.`} />,
    <Story story={`This settles it: you have to be head elf again.`} />,
    <Story story={`But your image rehab...`} />,
    <Story story={`Is just not going as well as you'd hoped.`} />,
    <Story story={`In fact, many elves are staring at you.`} />,
    <Story story={`GoodWill Toward Men still lies on the floor.`} />,
    <Story
      story={`It's starting to look a little bit like YOU put HIM there.`}
    />,
    <Story story={`Oh no. This is not good.`} />,
    <Story story={`Worse, Santa Lizzy is heading your way...`} />,
    <Title title="> Santa Lizzy." />,
    <Story
      story={`You see Elfward and GoodWill Toward Men in some sort of disaster pile.`}
    />,
    <Story
      story={`They seem like good candidates to tell you what just happened.`}
    />,
    <Story story={`You get over and Elfward fills you in...`} />,
    <Story story={`He's sure to emphasize that it's not HIS fault.`} />,
    <Story story={`You don't really care whose fault it is.`} />,
    <Story story={`This is by all accounts a disaster.`} />,
    <Story
      story={`It seems like there's been one every year since you became Santa...`}
    />,
    <Story story={`Is it something about you?`} />,
    <Story story={`Maybe it's your leadership?`} />,
    <Story
      story={`You did for some reason allow GoodWill Toward Men to become head elf.`}
    />,
    <Story story={`And you let Elfward trap you in an advent calendar.`} />,
    <Story
      story={`And if you'd said something, there would have been no surprise party!`}
    />,
    <Story story={`Maybe you need to be a little more forceful.`} />,
    <Story
      story={`In that spirit, you tell Elfward to go fetch you a special item...`}
    />,
    <Story
      story={`You tell GoodWill Toward Men to get up and accompany Elfward...`}
    />,
    <Story story={`And you start leading the elves in Christmas carols.`} />,
    <Story story={`Soon, everybody is calming down.`} />,
    <Story story={`Phew!`} />,
    // <Title title="> Mysterious Teddy Bear." />,
    // <Story story={`You love singing carols, but you're still feeling a little worried...`} />,
    // <Story story={`You wish there was something you could do to help!`} />,
    <Title title="> GoodWill Toward Men." />,
    <Story
      story={`You are quite sure that absolutely none of this is your fault.`}
    />,
    <Story story={`You provide the best security in the entire North Pole.`} />,
    <Story
      story={`It's not your fault Elfward was stupid enough to stand in front of a frisbee!`}
    />,
    <Story
      story={`You explain all this to him as you fumble through the dark to Santa's office.`}
    />,
    <Story story={`He simply seethes in silence.`} />,
    <Story story={`(You take this as acquiescence.)`} />,
    <Story story={`When you reach the office, the door is locked.`} />,
    <Story story={`But once again, there's a backup code...`} />,
    <>
      <div onClick={() => handle2024Riddle(13, setShowStory, setRiddle)}>
        <Story story={`If you can remember it.`} />
      </div>
    </>,
    <Story story={`Why is a single letter so hard to remember?!?!?`} />,
    <Story story={`Anyway, the door opens.`} />,
    <Title title="> Elfward." />,
    <Story story={`You shove your way in ahead of GoodWill Toward Men.`} />,
    <Story story={`There's no way you won't be the one to save Christmas.`} />,
    <Story story={`You quickly spot what you're looking for.`} />,
    <Story story={`You grab it off Santa's desk and begin hustling back.`} />,
    <Story
      story={`GoodWill Toward Men rushes after you, complaining all the way!`}
    />,
    <Title title="> Santa Lizzy." />,
    <Story
      story={`Elfward rushes into the workshop, waving something in the air.`}
    />,
    <Story story={`It's your magic cookie!`} />,
    <Story
      story={`You are not wondering how a magical teleportation cookie can help you here.`}
    />,
    <Story story={`This is a different cookie.`} />,
    <Story story={`It's certainly distinct from your other magic cookie.`} />,
    <Story story={`No, it's not the same at all!`} />,
    <Story story={`This cookie is single use only.`} />,
    <Story story={`It was specially baked for you many centuries ago...`} />,
    <Story story={`And it can save Christmas when nothing else can.`} />,
    <Story story={`You take the cookie in your hands.`} />,
    <Story story={`Of course, you can't resist a small lick.`} />,
    <Story story={`The flavor is...`} />,
    <Story story={`Macguffin?`} />,
    <Story story={`Mmmm. Delicious!`} />,
    <>
      <div
        onClick={() =>
          handle2024Riddle(
            4,
            setShowStory,
            setRiddle,
            playSong,
            lastChristmas,
            circus
          )
        }
      >
        <Story story={`You take the cookie in your hands and crumble it!`} />
      </div>
    </>,
    <>
      <div onClick={() => playSong(finale, circus)}>
        <Story story={`The lights turn back on!`} />
      </div>
    </>,
    <Story story={`The elves cheer.`} />,
    <Story story={`Christmas is saved!`} />,
    <Title title="> La Befellena." />,
    <Story story={`Your surprise party, of course, is ruined.`} />,
    <Story story={`But it seems like everybody had a pretty good time.`} />,
    <Story story={`You're already planning the 10 year celebration.`} />,
    <Story story={`Surely nothing will go wrong then!`} />,
    <Title title="> Elfward." />,
    <Story
      story={`It seems public opinion has finally turned in your favor!`}
    />,
    <Story
      story={`You made sure everybody would see you giving the cookie to Santa.`}
    />,
    <Story story={`Elves smile at you and wave.`} />,
    <Story
      story={`You definitely have a chance in the next head elf election!`}
    />,
    <Title title="> GoodWill Toward Men." />,
    <Story story={`You scowl at everyone suspiciously.`} />,
    <Story story={`And everybody scowls at you.`} />,
    <Story story={`What else is new?`} />,
    <Story story={`This is why you were voted head elf:`} />,
    <Story story={`You won't allow yourself to be swayed by "friendship."`} />,
    <Title title="> Mysterious Teddy Bear." />,
    <Story story={`Yay! Your friends are all together again!`} />,
    <Story
      story={`This isn't what you thought a surprise party would be...`}
    />,
    <Story story={`But you're still glad you came.`} />,
    <Story story={`You give all your friends lots of hugs.`} />,
    <Story story={`And on Christmas Eve, when Santa gets on her sleigh...`} />,
    <Story story={`You get to ride home with her.`} />,
    <>
      <span>What could be more magical than that?</span>
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
