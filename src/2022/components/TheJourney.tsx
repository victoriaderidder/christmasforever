import React, { useEffect, useState } from "react";
import Title from "../../components/title.component";
import Story from "./Story";
import snowflake from "../assets/img/snowflake.png";
import "../styles/TheJourney.css";
import CookieClicker from "./CookieClicker";
import ShoppingList from "./ShoppingList";
import Captcha from "./Captcha";
import Guess from "./Guess";
import Stone from "./Stone";
import Riddle from "./Riddle";
import Combination from "./Combination";
import Menu from "./Menu";
import { useAudio } from "../../audio/audio.hooks";
import { AUDIO_PATHS } from "../../audio/audio.utils";

export default function Travel(this: any) {
  const [index, setIndex] = useState(0);
  const [bgColor, setBgColor] = useState("#282c34");
  const [showCookie, setShowCookie] = useState(false);
  const [showKnight, setShowKnight] = useState(false);
  const [showList, setShowList] = useState(false);
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [showStone, setShowStone] = useState(false);
  const [showWordSearch, setShowWordSearch] = useState(false);
  const [showRiddle, setShowRiddle] = useState(false);
  const [showRiddle2, setShowRiddle2] = useState(false);
  const [showRiddle3, setShowRiddle3] = useState(false);
  const [showCombination, setShowCombination] = useState(false);
  const [showEnding, setShowEnding] = useState(false);
  let [cookieCounter, setCookieCounter] = useState(0);

  const { audioRefs, playSong } = useAudio(AUDIO_PATHS);

  const playAndChange = (song: HTMLAudioElement, color: string) => {
    playSong(song);
    setBgColor(color);
  };

  const increment = () => {
    setIndex(index + 1);
  };

  const startCookie = (cookieCount: number) => {
    setCookieCounter(cookieCount);
    setShowCookie(true);
    playSong(audioRefs.circus.current);
  };

  const cookieIncrement = () => {
    setCookieCounter(cookieCounter + 1);
    cookieCounter === 100 && setShowCookie(false);
    cookieCounter === 100 && playSong(audioRefs.krampus.current);
  };

  useEffect(() => {
    !showCookie && playSong(audioRefs.krampus.current);
  }, [showCookie]);

  useEffect(() => {
    bgColor === "#282c34" && playSong(audioRefs.krampus.current);
  }, [bgColor]);

  const showStory = () => {
    setShowCookie(false);
    setShowKnight(false);
    setShowCaptcha(false);
    setShowCombination(false);
    setShowList(false);
    setShowEnding(false);
    setShowRiddle(false);
    setShowRiddle2(false);
    setShowRiddle3(false);
    setShowStone(false);
    setShowWordSearch(false);
  };

  const story = [
    <React.Fragment key={"beginnings"}>
      <div className="spinner-container">
        <img
          src={snowflake}
          id="snowflake"
          alt="snowflake"
          onClick={() => playSong(audioRefs.krampus.current)}
        />
      </div>
    </React.Fragment>,
    <Title title="> Santa Lizzy." />,
    <Story story={`You wake up.`} />,
    <Story story={`This is not the North Pole.`} />,
    <Story story={`Not anymore.`} />,
    <Story story={`It's dark and you're disoriented.`} />,
    <Story story={`You try to remember how you got here.`} />,
    <Story
      story={`You'd been getting ready for your first ever Christmas as Santa.`}
    />,
    <Story story={`It was late at night.`} />,
    <Story story={`You'd gone out to check on the reindeer.`} />,
    <Story story={`Comet had seemed nervous and upset.`} />,
    <Story story={`You remember trying to soothe him...`} />,
    <Story story={`...`} />,
    <Story story={`......`} />,
    <Story story={`..............................`} />,
    <Story story={`...And then what?`} />,
    <Story story={`Your head really hurts...`} />,
    <Story story={`Suddenly, across the room, a door bursts open!`} />,
    <Story story={`Light floods the room...`} />,

    <>
      <div
        onClick={() => playAndChange(audioRefs.deckTheHalls.current, "#C30F16")}
      >
        <Title title="> Elfward." />
      </div>
    </>,
    <>
      <div onClick={() => playAndChange(audioRefs.krampus.current, "#282c34")}>
        <Story bgColor={true} story={`Yay! You're at the North Pole!!!`} />
      </div>
    </>,
    <Story
      story={`Except Santa is missing and Christmas is ruined and everything is absolutely terrible.`}
    />,
    <Story story={`This should be the most magical time of the year.`} />,
    <Story
      story={`Up until two days ago, you were busy helping Santa get ready for her first Christmas!`}
    />,
    <Story
      story={`You'd barely left the new Santa's side since she started.`}
    />,
    <Story
      story={`You were so excited to help bring joy to children everywhere!`}
    />,
    <Story story={`And now...and now...`} />,
    <Story story={`Oh, woe! It is simply too terrible to speak of!`} />,
    <Story story={`Anyway, the workshop is in crisis.`} />,
    <Story story={`Everybody is absolutely losing it.`} />,
    <Story story={`YOU ARE ALSO LOSING IT!!!!!!`} />,
    <Story story={`...But as head elf, you need to keep it together.`} />,
    <Story story={`After all, if you don't, who will?`} />,
    <Story story={`Will?`} />,
    <Story story={`Will..`} />,
    <Story story={`Is nowhere to be found.`} />,
    <Story story={`Great.`} />,

    <Title title="> GoodWill Toward Men." />,
    <Story story={`(Your friends call you Will.)`} />,
    <Story
      story={`You are not exactly the head elf, but you tend to get shit done.`}
    />,
    <Story
      story={`You've, um, "questioned" every single elf in the workshop.`}
    />,
    <Story
      story={`Some would say interrogated, but those people need to stuff it.`}
    />,
    <Story story={`SANTA IS MISSING THIS IS AN EMERGENCY`} />,
    <Story story={`Anyway, one of your victims...`} />,
    <Story story={`...uh, one of the elves...`} />,
    <Story
      story={`...mentioned seeing Santa heading towards the stables before she disappeared.`}
    />,
    <Story story={`You are leaving no stone unturned.`} />,
    <Story story={`And no pile of reindeer dung unturned either!`} />,
    <Story
      story={`You're shoveling through every single pile of crap in this stable.`}
    />,
    <Story
      story={`You're pretty sure this dedication will pay off at the next head elf election.`}
    />,
    <Story
      story={`(You lost the last one due to politics and people being generally terrified of you.)`}
    />,
    <Story story={`Anyway, you're digging, and digging, and digging.`} />,
    <Story story={`Something shiny catches your eye...`} />,

    <Title title="> Santa Lizzy." />,
    <Story story="A shadowy figure stands in the doorway." />,
    <Story story={`"So. You're finally awake."`} />,
    <Story story="The figure comes into view..." />,
    <Story story={`He looks familiar, but you can't quite place him.`} />,
    <Story story={`"Where am I?" you ask.`} />,
    <Story story={`"Don't worry about that," he says.`} />,
    <Story story={`Yet, somehow, you are worried about that. Strange.`} />,
    <Story story={`"Why have you brought me here?" you ask.`} />,
    <Story story={`"You know why you're here."`} />,
    <Story story={`Wow. This guy is just the worst.`} />,
    <Story story={`"Refresh my memory?"`} />,
    <Story story={`He slams his hand against the wall.`} />,
    <Story story={`"You killed my father!"`} />,
    <Story story="What? You did not." />,
    <Story story={`"You're wearing his coat!"`} />,
    <Story story={`And that's when you realize how you know him...`} />,
    <Story story={`"Charlie?" you ask incredulously.`} />,
    <Story story={`Yep. It's Charlie Calvin. Like from The Santa Clause.`} />,
    <Story
      story={`He's a couple of decades older, but it's definitely him.`}
    />,
    <Story story={`"It's Charles now," he says.`} />,
    <Story
      story={`"I didn't kill your father," you say. "There was this robot — "`}
    />,
    <Story story={`Charles does not believe your frankly ridiculous story.`} />,
    <Story story={`"I was always supposed to be the next Santa," he says.`} />,
    <Story story={`"That coat you're wearing belongs to me."`} />,
    <Story
      story={`For some mysterious reason, you just don't feel this guy would make a great Santa.`}
    />,
    <Story
      story={`Luckily, you know that for the Santa Clause to activate, the coat can't be taken by force.`}
    />,
    <Story
      story={`You'd have to willingly give it to him, and there's no way you're going to do that...`}
    />,
    <Story story={`"That's fine," he says. "I can be patient."`} />,
    <Story story={`And with that, he leaves, closing the door behind him.`} />,
    <Story story={`You are once again alone in the dark.`} />,

    <Title title="> Elfward." />,
    <Story story={`You sit miserably at your desk.`} />,
    <Story story={`You've called everyone you can think to call.`} />,
    <Story story={`You've looked everywhere you can think to look.`} />,
    <Story
      story={`Christmas Eve is tomorrow, and Santa is nowhere to be found.`}
    />,
    <Story story={`Of course there is no one who can replace Santa.`} />,
    <Story story={`NO ONE!`} />,
    <Story story={`But...`} />,
    <Story
      story={`The previous Santa's kid knows everything there is to know about being Santa.`}
    />,
    <Story story={`You might have to see if he can fill in.`} />,
    <Story
      story={`Also you would have to make sure nobody finds out about this.`}
    />,
    <Story story={`It would probably ruin Christmas or something.`} />,
    <Story story={`But you are getting super desperate.`} />,
    <Story story={`Something on Santa's desk catches your eye.`} />,
    <Story story={`It's...a shopping list?`} key={"listRiddle"} />,
    <>
      <div onClick={() => setShowList(true)}>
        <Story story={`That's weird. Santa doesn't shop...`} />
      </div>
    </>,
    <Story story={`Hmmm. Santa's magic cookie.`} />,
    <Story story={`It can always get Santa home again.`} />,
    <Story story={`Which means she must not have it with her...`} />,
    <Story story={`Or it was taken from her.`} />,
    <Story story={`You stand up quickly.`} />,
    <Story story={`You need to find that cookie.`} />,

    <Title title="> Will." />,
    <Title title="> WILL." />,
    <Title title="> GoodWill Toward Men?" />,
    <Story story={`Wow. Are we not friends?`} />,
    <Story story={`You pull the shiny object out of the reindeer dung.`} />,
    <Story story={`It's a wrapped present.`} />,
    <Story
      story={`It's not addressed to you, but desperate times call for desperate measures.`}
    />,
    <>
      <div onClick={() => setShowWordSearch(true)}>
        <Story story={`You tear the package open...`} />
      </div>
    </>,
    <Story
      story={`Well, you do remember showing Santa a captcha last year.`}
    />,
    <Story
      story={`(That's right. You're the elf that considered betraying her.)`}
    />,
    <Story
      story={`(But to be fair, you totally would have been on Robot Santa's nice list.)`}
    />,
    <Story
      story={`Anyway, you are very dedicated to personally finding Santa.`}
    />,
    <Story
      story={`(The elf election is only 300 years away and you need to look good.)`}
    />,
    <Story story={`You think you know where that captcha is.`} />,
    <Story story={`You hustle off in search of it.`} />,

    <Title title="> Santa Lizzy." />,
    <Story story={`You're not sure how long you've been alone in the dark.`} />,
    <Story story={`You tug at the door.`} />,
    <Story
      story={`You run your hands along the walls, searching for another opening.`}
    />,
    <Story story={`But there's nothing.`} />,
    <Story story={`Discouraged, you sit back down.`} />,
    <Story
      story={`You're an adventurer at heart, and it pains you to just wait to be rescued.`}
    />,
    <Story story={`But what else can you do?`} />,
    <Story
      story={`You scuff your boots against the dirt on the ground, creating a nice groove.`}
    />,
    <Story story={`Suddenly, you hit something...solid.`} />,
    <Story story={`Much more solid than dirt.`} />,
    <Story story={`You quickly dig it up.`} />,
    <Story
      story={`You carry the object to the sliver of light coming through the door.`}
    />,
    <Story story={`Your heart is in your throat as you realize...`} />,
    <Story story={`It's just a freaking rock.`} />,
    <Story story={`You hate it here.`} />,
    <Story
      story={`You raise the stupid rock to throw it at the stupid door.`}
    />,
    <Story story={`But wait!`} key={"stoneRiddle"} />,
    <>
      <div onClick={() => setShowStone(true)}>
        <Story story={`There's some sort of writing on the other side!`} />
      </div>
    </>,
    <Story story={`PRESS TO ACTIVATE.`} />,
    <Story story={`You press the stone until your fingers hurt.`} />,
    <Story
      story={`You scour the cell for something, anything else to press.`}
    />,
    <Story story={`But you find nothing.`} />,
    <Story story={`Great. So that was a complete waste of time.`} />,
    <Story story={`At least you had nothing better to do.`} />,

    <Title title="> Elfward." />,
    <Story story={`You are in the Magical Room for Mystical Artifacts.`} />,
    <Story
      story={`You pace up and down the aisles, looking for Santa's magical cookie.`}
    />,
    <Story story={`You wish elves were a bit more organized.`} />,
    <Story story={`Fnally, you find the spot where the cookie should be.`} />,
    <Story
      story={`(You can tell because there's a label that simply reads COOKIE.)`}
    />,
    <Story story={`In the cookie's place is a mysterious wrapped package.`} />,
    <>
      <div onClick={() => setShowKnight(true)}>
        <Story story={`You pick it up...`} />
      </div>
    </>,
    <Story story={`Your blood runs cold.`} />,
    <Story story={`There's only one person who could have done this.`} />,

    <Title title="> GoodWill Toward Men." />,
    <Story story={`You find the captcha buried in a chest of mementos.`} />,
    <Story
      story={`The chest is lovingly filled with treasures accumulated over the years.`}
    />,
    <Story story={`You're not really a sentimental person.`} />,
    <Story
      story={`Which is why you found this chest of mementos in Santa's chambers.`}
    />,
    <Story story={`What she doesn't know won't hurt her.`} />,
    <Story story={`Also, must I remind you that`} />,
    <Story story={`SANTA IS MISSING THIS IS AN EMERGENCY`} />,
    <Story story={`?!??!?!?!?!??!`} />,
    <Story story={`No. I didn't think so.`} />,
    <Story story={`You understand the urgency of the situation.`} />,
    <Story
      story={`You take a look at the captcha and notice something has changed...`}
    />,
    <Story story={`There's something scrawled on the back:`} />,
    <Story story={`"What's wrong with this picture?"`} />,
    <Story
      story={`It seems that someone is interfering with your investigation.`}
    />,
    <Story story={`Possibly a rival for head elf?`} />,
    <Story story={`You WILL get to the bottom of this.`} />,
    <Story story={`Or your name isn't Will!`} />,
    <Story story={`Haha.`} />,
    <Story story={`(Please let me call you Will.)`} />,
    <Story story={`You have no time for my foolish games!`} />,
    <React.Fragment key={"captchaRiddle"}>
      <div onClick={() => setShowCaptcha(true)}>
        <Story story={`You study the captcha intently...`} />
      </div>
    </React.Fragment>,
    <Story
      story={`It does seem that someone has haphazardly erased the N from your clever captcha.`}
    />,
    <Story story={`Turning NOEL into NO ELLEN.`} />,
    <Story story={`You are not pleased with this vandalism.`} />,
    <Story
      story={`Nor are you pleased with the idea of involving LA BEFELLENA.`}
    />,
    <Story
      story={`She is a mystical old witch who lives in the forest and hasn't been seen for 1000 years.`}
    />,
    <Story story={`You would prefer not to see her for 1000 more.`} />,

    <Title title="> La Befellena." />,
    <Story
      story={`You are a mystical old witch who lives in the forest and hasn't been seen for 1000 years.`}
    />,
    <Story
      story={`Hasn't been seen by the elves, that is. You see yourself just fine.`}
    />,
    <Story story={`You are basically an Italian Santa Claus.`} />,
    <Story
      story={`You've been doing the job perfectly fine for over a millennium.`}
    />,
    <Story
      story={`And yet when the time came for a new Santa, he passed the coat to a child?`}
    />,
    <Story story={`Insane.`} />,
    <Story story={`Unfair.`} />,
    <Story
      story={`That should be you in Charlie Calvin's little jail cell.`}
    />,
    <Story story={`Yes, you know where Santa is.`} />,
    <Story
      story={`Unlike everybody else in the North Pole, you are actually a powerful magical being.`}
    />,
    <Story story={`You could just tell the elves where Santa is.`} />,
    <Story story={`But there's still time until Christmas Eve.`} />,
    <Story story={`And they should have to come to you.`} />,
    <Story story={`You are sick and tired of the disrespect.`} />,
    <Story story={`Either they give you the esteem you deserve, or you...`} />,
    <Story story={`Well, you haven't gotten that far yet.`} />,
    <Story
      story={`Maybe you'll leave Santa to rot and do the job yourself.`}
    />,
    <Story story={`Then you'd finally get some appreciation around here.`} />,

    <Title title="> Elfward." />,
    <Story
      story={`You're racing towards the forest when you run smack into GoodWill Toward Men.`}
    />,
    <Story story={`(Of course, you're allowed to call him Will.)`} />,
    <Story story={`:(`} />,
    <Story story={`You quickly tell him about the puzzle you found.`} />,
    <Story
      story={`You tell him you're sure La Befellena must be behind it all -`}
    />,
    <Story story={`Santa's disappearance, the missing cookie, everything.`} />,
    <Story
      story={`And how you're certain she'll have Santa hidden within her lair.`}
    />,
    <Story
      story={`When you're done, Will tells you everything he's learned.`}
    />,
    <Story story={`He's also convinced La Befellena is involved.`} />,
    <Story story={`Together, you head towards her lair.`} />,
    <Story story={`(It's actually just a cottage.)`} />,
    <Story story={`You reach the spot where her cottage should be.`} />,
    <Story story={`Nothing is there but an empty plot of land.`} />,
    <Story
      story={`It's untouched by the snow that covers the rest of the ground.`}
    />,
    <Story
      story={`You reach out to touch it, but your hand is stopped by something...magical.`}
    />,

    <Title title="> GoodWill Toward Men." />,
    <Story story={`You've seen this before.`} />,
    <Story story={`This isn't your first tango with La Befellena.`} />,
    <Story story={`You know her cottage is warded - protected by magic.`} />,
    <Story story={`You declare your intent to enter.`} />,
    <Story story={`The empty air before you shimmers.`} />,
    <Story story={`It speaks in a loud, booming voice:`} />,
    <React.Fragment key={"riddleRiddles"}>
      <div onClick={() => setShowRiddle(true)}>
        <Story
          story={`"Those who wish to enter must answer me these riddles three."`}
        />
      </div>
    </React.Fragment>,
    <>
      <div onClick={() => setShowRiddle2(true)}>
        <Story story={`It speaks again:`} />
      </div>
    </>,
    <>
      <div onClick={() => setShowRiddle3(true)}>
        <Story story={`And once more:`} />
      </div>
    </>,
    <Story story={`The shimmering seems to get stronger.`} />,
    <Story
      story={`With a loud pop, La Befellena's cottage appears in the opening.`}
    />,
    <Story story={`You don't knock before throwing the door open.`} />,
    <Story story={`Elfward is right behind you.`} />,
    <Story story={`Perhaps a bit annoyed that you've led this charge.`} />,
    <Story story={`But you always deserved to be head elf anyway...`} />,

    <Title title="> La Befellena." />,
    <Story
      story={`You're just minding your own business when two elves burst into your home.`}
    />,
    <Story story={`You knew they were coming, of course.`} />,
    <Story story={`(Powerful magical being, remember?)`} />,
    <Story story={`Besides, this is what you wanted.`} />,
    <Story
      story={`You wouldn't have gone to all this trouble if you weren't expecting some payoff.`}
    />,
    <Story story={`You left puzzles for Santa and the elves...`} />,
    <Story story={`You disfigured GoodWill Toward Men's little captcha...`} />,
    <Story story={`Even stole the magic cookie.`} />,
    <Story story={`And now it's all led to this.`} />,
    <Story story={`They're going to beg you for help.`} />,
    <Story story={`You're going to save the day.`} />,
    <Story
      story={`Finally, you'll be a valued part of Christmas just like you deserve.`}
    />,
    <Story story={`It's all going according to plan!`} />,
    <Story
      story={`You weren't really expecting them to burst into your house though.`}
    />,
    <Story
      story={`Surely the future Savior of Christmas deserves a polite knock.`}
    />,

    <Title title="> Elfward." />,
    <Story story={`Normally you're a polite elf.`} />,
    <Story
      story={`You don't win the head elf election by breaking down doors.`}
    />,
    <Story
      story={`And under normal circumstances, you'd be willing to have a nice chat.`}
    />,
    <Story
      story={`But tomorrow is Christmas Eve, Santa is missing, blah blah blah...`}
    />,
    <Story story={`There's no time for manners!`} />,
    <Story story={`"Tell us where Santa is!" you demand.`} />,

    <Title title="> GoodWill Toward Men." />,
    <Story story={`'Tell us where Santa is'? Please.`} />,
    <Story story={`You'll find Santa yourself.`} />,
    <Story
      story={`You're ripping open doors and tearing through cupboards.`}
    />,
    <Story
      story={`La Befellena stands still, looking rather shell-shocked.`}
    />,
    <Story story={`Well, what did she expect?!`} />,

    <Title title="> La Befellena." />,
    <Story story={`You...did not expect this.`} />,
    <Story
      story={`Do these smarmy little jerks actually think you're responsible for Santa's disappearance?`}
    />,
    <Story story={`You've never heard something more absurd.`} />,
    <Story
      story={`Of course, everyone knows you've always wanted to be Santa.`}
    />,
    <Story story={`But kidnapping her?`} />,
    <Story story={`Tears come to your eyes.`} />,
    <Story
      story={`You've been keeping Christmas magic alive for a millennium and this is what they think of you.`}
    />,
    <Story story={`This is how they treat you.`} />,
    <Story story={`It's true that you didn't rescue Santa immediately...`} />,
    <Story
      story={`But this is the first time you've spoken to another person in centuries.`}
    />,
    <Story story={`You just wanted to be involved.`} />,

    <Title title="> Elfward." />,
    <Story story={`La Befellena is crying and you are horrified.`} />,
    <Story story={`You should have known better.`} />,
    <Story story={`Always, always be polite!`} />,
    <Story story={`Stupid!!!`} />,
    <Story story={`You order Will to stop destroying her home.`} />,
    <Story story={`Kindly, politely, you ask La Befellena what's wrong.`} />,
    <Story
      story={`She confesses to everything - the games, knowing where Santa is.`}
    />,
    <Story
      story={`She holds out the magic cookie and she asks for forgiveness.`}
    />,
    <Story
      story={`Will angrily opens his mouth to say HELL NO, but you shush him.`}
    />,
    <Story story={`You're thinking about the puzzle she left for you.`} />,
    <Story
      story={`'If you want your precious cookie back, you'd better give me the thing I lack.'`}
    />,
    <Story story={`She meant respect...`} />,
    <Story story={`But what she really lacks is community.`} />,
    <Story
      story={`You feel just terrible that she's been all alone in the woods for so long.`}
    />,
    <Story story={`Of course, there's no time to waste.`} />,
    <Story story={`Santa needs to get this cookie.`} />,
    <Story story={`It takes three, so you all stand together...`} />,
    <Story story={`And you send it to Santa.`} />,
    <Story story={`Then you head back to the workshop.`} />,
    <Story story={`(You invite La Befellena to come with you, of course.)`} />,
    <Story story={`And she gratefully accepts.`} />,
    <Story
      story={`Now that Santa has the cookie, Christmas will surely be saved!`}
    />,
    <Story story={`You hope you'll see Santa soon!`} />,

    <Title title="> Santa Lizzy." />,
    <Story story={`You feel something drop into your coat pocket.`} />,
    <Story story={`Your heart leaps!`} />,
    <Story story={`You quickly pull out the magic cookie.`} />,
    <Story story={`You're briefly overjoyed.`} />,
    <Story story={`But then your brow furrows.`} />,
    <Story story={`You're a brand new Santa.`} />,
    <Story story={`You've never had to use the magic cookie before.`} />,
    <Story story={`You're struggling to remember how it works.`} />,
    <Story story={`You try biting it, but it's as hard as stone.`} />,
    <Story story={`Wait...stone?`} />,
    <Story story={`Right! Press to activate!`} />,
    <Story
      story={`You vaguely remember Elfward telling you something like that.`}
    />,
    <Story story={`And that to avoid accidental activation...`} />,
    <Story
      story={`It has to be pressed something like...`}
      key={"cookieClicker"}
    />,
    <>
      <div onClick={() => startCookie(0)}>
        <Story story={`A hundred times?`} />
      </div>
    </>,
    <Story
      story={`You're in the middle of pressing the cookie when the door bursts open!`}
    />,
    <Story story={`Charles Calvin stands in the doorway, triumphant.`} />,
    <Story story={`"I knew you had that cookie," he says.`} />,
    <Story story={`"Now give it to me!"`} />,
    <Story story={`He lunges towards you!`} />,
    <Story story={`You dodge and run out the door.`} />,
    <Story story={`Charles is right behind you!`} />,
    <React.Fragment key={"cookieClickerTwo"}>
      <div onClick={() => startCookie(21)}>
        <Story
          story={`You keep frantically pressing the cookie, but it's hard when you're moving so much...`}
        />
      </div>
    </React.Fragment>,
    <Story story={`The cookie begins to glow and pulse!`} />,
    <Story story={`You feel Charles' hand roughly grab your shoulder...`} />,
    <Story story={`And then you're gone!`} />,
    <Story
      story={`You find yourself in your workshop, surrounded by weeping elves.`}
    />,
    <Story story={`When the elves see you, they begin to cheer!`} />,
    <Story story={`But you're filled with dread.`} />,
    <Story story={`Charles Calvin's hand is still gripping your shoulder.`} />,
    <Story story={`You whip to face him, but he's already running away.`} />,
    <Story
      story={`You try to run after him, but you're surrounded by adoring elves...`}
    />,

    <Title title="> GoodWill Toward Men." />,
    <Story story={`You know a security breach when you see one.`} />,
    <Story
      story={`You're not sure how the Calvin kid got here, but you rush after him.`}
    />,
    <Story story={`Unfortunately, you have little legs.`} />,
    <Story story={`Charles reaches the present room and slams the door.`} />,
    <Story story={`You tug at the doorknob, but it's locked.`} />,
    <Story story={`Why does this door even have a lock?`} />,
    <Story story={`Well, that's a great question.`} />,
    <Story
      story={`You felt it compromised security for just any elf to have unlimited present access.`}
    />,
    <Story
      story={`You did not foresee the possibility that people just...wouldn't lock the door.`}
    />,
    <Story
      story={`You hope this won't hurt you in the next head elf election.`}
    />,
    <Story story={`Elfward and Santa catch up to you.`} />,
    <Story story={`La Befellena is hot on their heels.`} />,
    <Story story={`(She's just happy to be involved.)`} />,
    <Story story={`Alarms start ringing in the present room!`} />,
    <Story story={`Charles is destroying the presents.`} />,
    <Story story={`He's going to ruin Christmas!`} />,
    <Story story={`You have to get in there right away.`} />,
    <Story
      story={`Unfortunately, none of you knows the combination to the lock.`}
    />,
    <Story
      story={`(Yet another oversight in the whole 'lock the present room' idea.)`}
    />,
    <Story
      story={`You don't have time to find somebody who might know the password!`}
    />,
    <React.Fragment key={"combinationRiddle"}>
      <div onClick={() => setShowCombination(true)}>
        <Story story={`You all gather around the lock...`} />
      </div>
    </React.Fragment>,
    <Story story={`One partridge in a pear tree...`} />,
    <Story story={`Two turtle doves...`} />,
    <Story story={`And five gold rings!`} />,
    <Story story={`Yes! That's it!`} />,
    <Story story={`You unlock the door and rush in.`} />,
    <Story story={`You tackle Charles, but again, you're pretty small.`} />,
    <Story
      story={`Luckily, Elf Security heard the alarms and is here to help.`}
    />,
    <Story story={`They take him down...`} />,
    <Story
      story={`But it's pretty well known that you were the one responsible.`}
    />,
    <Story
      story={`You definitely have a chance in the next head elf election!`}
    />,
    <React.Fragment key={"ending"}>
      <div
        onClick={() => playAndChange(audioRefs.deckTheHalls.current, "#C30F16")}
      >
        <Story story={`Oh, and of course...`} />
      </div>
    </React.Fragment>,
    <Story bgColor={true} story={`Christmas is saved!`} />,

    <Title title="> Elfward." />,
    <Story
      bgColor={true}
      story={`You might actually endorse Will in the next head elf election.`}
    />,
    <Story
      bgColor={true}
      story={`This has been so stressful. And during the Christmas season, no less!`}
    />,
    <Story
      bgColor={true}
      story={`You were happier when you were making toys.`}
    />,
    <Story
      bgColor={true}
      story={`Nevertheless, you're pleased everything turned out okay.`}
    />,
    <Story bgColor={true} story={`Charles only destroyed a few presents.`} />,
    <Story
      bgColor={true}
      story={`You quickly set the elves to work on making replacements.`}
    />,

    <Title title="> La Befellena." />,
    <Story bgColor={true} story={`Wow, this has been so exciting!`} />,
    <Story
      bgColor={true}
      story={`You're welcomed into the North Pole with open arms.`}
    />,
    <Story
      bgColor={true}
      story={`Santa offers to let you make the rounds with her this Christmas Eve as a thanks for your help.`}
    />,
    <Story
      bgColor={true}
      story={`You couldn't be more delighted to accept!`}
    />,

    <Title title="> Santa Lizzy." />,
    <Story bgColor={true} story={`Wow...what an ordeal.`} />,
    <Story
      bgColor={true}
      story={`You're grateful to everyone who helped rescue you.`}
    />,
    <Story
      bgColor={true}
      story={`The next day, you enter your sleigh, piled high with gifts.`}
    />,
    <Story
      bgColor={true}
      story={`The elves cheer as you and La Befellena rise into the air.`}
    />,
    <Story bgColor={true} story={`"On Comet, on Cupid!" you shout.`} />,
    <Story
      bgColor={true}
      story={`"On Donner and Blitzen!" La Befellena shouts.`}
    />,
    <>
      <div onClick={() => setShowEnding(true)}>
        <Story
          bgColor={true}
          story={`And the elves heard you both exclaim, as you drove out of sight...`}
        />
      </div>
    </>,
  ];

  const menuMap = [
    story.findIndex((item) => item.key === "beginnings"),
    story.findIndex((item) => item.key === "listRiddle"),
    story.findIndex((item) => item.key === "stoneRiddle"),
    story.findIndex((item) => item.key === "captchaRiddle"),
    story.findIndex((item) => item.key === "riddleRiddles"),
    story.findIndex((item) => item.key === "cookieClicker"),
    story.findIndex((item) => item.key === "cookieClickerTwo"),
    story.findIndex((item) => item.key === "combinationRiddle"),
    story.findIndex((item) => item.key === "ending"),
  ];

  return (
    <>
      <div className="App" style={{ backgroundColor: bgColor }}>
        <div className="Menu-bar">
          <Menu
            bgColor={bgColor}
            items={menuMap}
            setIndex={setIndex}
            showStory={showStory}
            setBgColor={setBgColor}
          />
        </div>
        <div className="App-header">
          {!showCookie &&
            !showList &&
            !showWordSearch &&
            !showCaptcha &&
            !showStone &&
            !showKnight &&
            !showRiddle &&
            !showRiddle2 &&
            !showRiddle3 &&
            !showCombination &&
            !showEnding && (
              <div
                className="journey"
                onClick={increment}
                style={{ backgroundColor: bgColor }}
              >
                {story[index]}
              </div>
            )}
          {showCookie && (
            <div className="cookieClicker">
              {cookieCounter < 20 && (
                <div className="cookie" onClick={cookieIncrement}>
                  <CookieClicker />
                </div>
              )}
              {cookieCounter === 20 && <div>Uh oh.</div>}
              {cookieCounter > 20 && (
                <div className="cookieMover">
                  <div
                    className="cookieMover2 unselectable"
                    onClick={cookieIncrement}
                  >
                    <CookieClicker />
                  </div>
                </div>
              )}
              <p>
                {cookieCounter !== 20 ? (
                  <div className="unselectable">{cookieCounter}</div>
                ) : (
                  <div onClick={() => setShowCookie(false)}>
                    <Story story={`Now what?`} />
                  </div>
                )}
              </p>
            </div>
          )}
          {showList && (
            <div className="shoppingList">
              <ShoppingList setShowElement={setShowList} answer={["cookie"]} />
            </div>
          )}
          {showWordSearch ? (
            <div className={"wordSearch"} style={{ marginBottom: "100px" }}>
              <Guess setShowElement={setShowWordSearch} answer={["captcha"]} />
            </div>
          ) : null}
          {showCaptcha && (
            <div className="captcha">
              <Captcha setShowElement={setShowCaptcha} answer={["no ellen"]} />
            </div>
          )}
          {showStone && (
            <div className="stone">
              <Stone
                setShowElement={setShowStone}
                answer={["press to activate"]}
              />
            </div>
          )}
          {showKnight && (
            <div className="knight">
              You're pretty sure you need to use spaces here.
              <p>
                <Guess
                  setShowElement={setShowKnight}
                  answer={[
                    `if you want your precious cookie back then youd better give me the thing i lack`,
                    `if you want your precious cookie back then you'd better give me the thing i lack`,
                  ]}
                />
              </p>
            </div>
          )}
          {showRiddle && (
            <div className="riddle">
              <Riddle
                setShowElement={setShowRiddle}
                id={1}
                answer={["water"]}
              />
            </div>
          )}
          {showRiddle2 && (
            <div className="riddle2">
              <Riddle
                setShowElement={setShowRiddle2}
                id={2}
                answer={["christmas tree"]}
              />
            </div>
          )}
          {showRiddle3 && (
            <div className="riddle3">
              <Riddle
                setShowElement={setShowRiddle3}
                id={3}
                answer={["snowglobe", "snow globe"]}
              />
            </div>
          )}
          {showCombination && (
            <div className="combination">
              <Combination
                setShowElement={setShowCombination}
                answer={["125", "1 2 5"]}
              />
            </div>
          )}
          {showEnding && (
            <div className="finale">
              {`"Merry Christmas to all, and to all a good night!"`}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
