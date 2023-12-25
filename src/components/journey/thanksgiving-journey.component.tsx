import { useState } from "react";
import Story from "../story/story.component";
import Title from "../title/title.component";
import { JourneyProps } from "./journey.types";

export const ThanksgivingJourney = ({ handleEnd }: JourneyProps) => {
  const [index, setIndex] = useState(Number);

  const increment = () => {
    index === storyArray?.length - 1 ? handleEnd() : setIndex(index + 1);
  };

  const storyArray = [
    <Title title="> A Thanksgiving Day long ago." />,
    <Story story={`You all gather round the Thanksgiving table.`} />,
    <Story story={`Everybody is here:`} />,
    <Title title="Santa Lizzy," />,
    <Title title="GoodWill Toward Men," />,
    <Title title="Elfward," />,
    <Title title="And we couldn't forget La Befellena." />,
    <Story
      story={`Hundreds of years have passed since your last adventure.`}
    />,
    <Story
      story={`That adventure being, of course, the one where Santa was kidnapped!!!`}
    />,
    <Story
      story={`Surely you couldn't have forgotten such a glorious tale.`}
    />,
    <Story
      story={`But since it has been a few centuries, you all might need a quick recap.`}
    />,
    <Story story={`All of you except for GoodWill Toward Men, that is!`} />,
    <Story story={`He remembers everything perfectly.`} />,
    <Title title="> GoodWill Toward Men." />,
    <Story story={`You'll take it from here.`} />,
    <Story story={`It was a dark and stormy Christmas.`} />,
    <Story story={`A Christmas that was almost ruined.`} />,
    <Story story={`Thanks to the dastardly actions of one Charles Calvin!`} />,
    <Story story={`He'd wanted to be Santa so desperately...`} />,
    <Story story={`He was willing to kill for it!`} />,
    <Story story={`Luckily, GoodWill Toward Men was here to save the day.`} />,
    <Story story={`Also some other people were there.`} />,
    <Story story={`But who's the head elf here?`} />,
    <Story story={`That's right. It's you.`} />,
    <Title title="> Elfward." />,
    <Story story={`You used to be the head elf.`} />,
    <Story
      story={`You were so tired after saving Santa that you'd thought of retiring.`}
    />,
    <Story
      story={`It took you a couple hundred years, but you finally did!`}
    />,
    <Story
      story={`You were so excited to live out the rest of your immortal days in Aruba.`}
    />,
    <Story story={`You might have noticed you are not in Aruba.`} />,
    <Story
      story={`Your friends insisted you stay in the very temperate North Pole.`}
    />,
    <Story story={`Apparently Aruba is "too warm" for elves.`} />,
    <Story story={`No matter...you're perfectly happy here.`} />,
    <Story story={`Doing nothing.`} />,
    <Story story={`For hundreds of years.`} />,
    <Title title="> Santa Lizzy." />,
    <Story
      story={`You really have your hands full with GoodWill Toward Men as head elf.`}
    />,
    <Story
      story={`He really, really, really, really, really cares about his job.`}
    />,
    <Story story={`Fortunately, you have Elfward to keep him in line.`} />,
    <Story
      story={`You and La Befellena have been happily co-Santaing for centuries now.`}
    />,
    <Story story={`It's honestly so great.`} />,
    <Story
      story={`You've heard that previous Santas would have breakdowns every Thanksgiving.`}
    />,
    <Story story={`Sharing the load really reduces the stress.`} />,
    <Story story={`But still...`} />,
    <Story story={`You really should start checking that list.`} />,
    <Title title="> La Befellena." />,
    <Story story={`You've made the list!`} />,
    <Story story={`You've checked it twice!`} />,
    <Story story={`You're making toys!`} />,
    <Story story={`You're living your best life!`} />,
    <Story story={`Being a co-Santa is everything you've ever dreamed of.`} />,
    <Story story={`You're so happy you caused all that drama so long ago!`} />,
    <Story
      story={`It's your 400th Thanksgiving as a full North Pole citizen.`}
    />,
    <Story
      story={`As is tradition, you ask everybody what they're thankful for.`}
    />,
    <Title title="> GoodWill Toward Men." />,
    <Story story={`GRATEFUL TO BE HEAD ELF.`} />,
    <Story story={`You're, um, very grateful to be head elf.`} />,
    <Title title="> Santa Lizzy." />,
    <Story
      story={`You're grateful for 31 relaxing days until the big night.`}
    />,
    <Story story={`31 days to make toys,`} />,
    <Story story={`31 days to read letters,`} />,
    <Story
      story={`31 days to get your affairs in order in case you fall off a roof...`}
    />,
    <Story story={`Oh gosh, maybe you are a bit stressed.`} />,
    <Story story={`But grateful!!!`} />,
    <Title title="> La Befellena." />,
    <Story
      story={`You could spend hours telling everybody what you're grateful for!`}
    />,
    <Story story={`But they cut you off after just five minutes.`} />,
    <Story story={`You're grateful they love you enough to stop you.`} />,
    <Title title="> Elfward." />,
    <Story story={`You tell everyone you're grateful for their friendship.`} />,
    <Story
      story={`In fact, you're so grateful that you got everybody a gift!`}
    />,
    <Story story={`You pull it out from under your chair.`} />,
    <Story story={`It's an ornate wooden advent calendar.`} />,
    <Story
      story={`You've spent the past year hand carving it just for them.`}
    />,
    <Story story={`Everybody oohs and aahs over it.`} />,
    <Story story={`They pass it around to get a better look.`} />,
    <Title title="> Santa Lizzy." />,
    <Story story={`Each of you is represented in the advent calendar.`} />,
    <Story story={`You run your hand gently over the carving of yourself.`} />,
    <Story story={`You're really impressed!`} />,
    <Story story={`You didn't know Elfward had such talent.`} />,
    <Story
      story={`La Befellena is hovering over your shoulder, dying to see.`}
    />,
    <Story story={`You pass her the advent calendar.`} />,
    <Story story={`When her hand touches it –`} />,
    <Story story={`...`} />,
    <Story story={`................`} />,
    <Story story={`?`} />,
    <Title title="> GoodWill Toward Men." />,
    <Story
      story={`Santa Lizzy and La Befellena have vanished into thin air.`}
    />,
    <Story story={`Not to worry, you are assessing the situation!`} />,
    <Story story={`You were in motion as soon as they disappeared.`} />,
    <Story story={`You stand over the advent calendar.`} />,
    <Story story={`Elfward is right behind you, looking stricken.`} />,
    <Story story={`You know this couldn't be his fault.`} />,
    <Story
      story={`You ask him where this advent calendar really came from.`}
    />,
    <Title title="> Elfward." />,
    <Story story={`You did carve this advent calendar...`} />,
    <Story story={`But you didn't make it.`} />,
    <Story story={`You found the base in the enchanted objects vault.`} />,
    <Story story={`You have no idea how long it had been there.`} />,
    <Story
      story={`But you knew you had to carve the likenesses for it to work.`}
    />,
    <Story
      story={`Honestly, you're just grateful La Befellena didn't recognize it...`}
    />,
    <Story story={`Whatever it is.`} />,
    <Story
      story={`You grab the advent calendar before GoodWill Toward Men can stop you.`}
    />,
    <Story story={`And then you're gone too.`} />,
    <Title title="> GoodWill Toward Men." />,
    <Story story={`You stare at the advent calendar on the ground.`} />,
    <Story story={`They need you here at the North Pole.`} />,
    <Story story={`But Santa needs you more!`} />,
    <Story story={`Once again, it is entirely up to you to save Christmas.`} />,
    <Story story={`Everybody is literally so lucky they have you.`} />,
    <Story story={`You bravely grab the advent calendar!`} />,
    <Story story={`Nothing happens.`} />,
    <Story
      story={`It takes you no less than three minutes to figure out how to work it.`}
    />,
    <Story story={`No matter!`} />,
    <Story story={`You're off to save Christmas!`} />,
    <Story story={`TO BE CONTINUED...`} />,
  ];
  return (
    <>
      <div className="story" onClick={increment}>
        {storyArray[index]}
      </div>
    </>
  );
};
