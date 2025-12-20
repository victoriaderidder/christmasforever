import Riddle from "../../../components/riddle/riddle.component";
import KrampusEyesRiddle from "../../components/krampus-eyes-riddle";
import MovingCookieRiddle from "../../components/moving-cookie-riddle/moving-cookie-riddle";
import HotChocolateRiddle from "../../components/hot-chocolate-riddle";
import BookshelfRiddle from "../../components/bookshelf-riddle/bookshelf-riddle";
import PotionRiddle from "../../components/potion-riddle/potion-riddle";
import MazeRiddle from "../../components/maze-riddle";

export const handle2025Riddle = (
  riddle: number,
  setShowStory: any,
  setRiddle: any,
  song?: any,
  previousSong?: any,
  playSong?: any
) => {
  setShowStory(false);
  switch (riddle) {
    case 1:
      setRiddle(
        <KrampusEyesRiddle
          onComplete={(won: boolean) => {
            setRiddle(<></>);
            setShowStory(true);
          }}
        />
      );
      break;
    case 2:
      setRiddle(
        <MovingCookieRiddle
          onComplete={(won: boolean) => {
            setRiddle(<></>);
            setShowStory(true);
          }}
        />
      );
      break;
    case 3:
      setRiddle(
        <HotChocolateRiddle
          onComplete={(won: boolean) => {
            setRiddle(<></>);
            setShowStory(true);
          }}
        />
      );
      break;
    case 4:
      setRiddle(
        <BookshelfRiddle
          onComplete={(won: boolean) => {
            setRiddle(<></>);
            setShowStory(true);
          }}
        />
      );
      break;
    case 6:
      setRiddle(
        <PotionRiddle
          onComplete={(won: boolean, quality?: number) => {
            setRiddle(<></>);
            setShowStory(true);
          }}
        />
      );
      break;
    case 7:
      setRiddle(
        <MazeRiddle
          onComplete={(won: boolean) => {
            setRiddle(<></>);
            setShowStory(true);
          }}
        />
      );
      break;
    case 5:
      setRiddle(
        <Riddle
          question={
            <>
              In the realm where shadows creep
              <br />I gallop through the fields of sleep.
              <br />A steed of darkness, wild and free
              <br />
              Bearing fears you cannot flee.
            </>
          }
          answer={["nightmare"]}
          setShowElement={setShowStory}
        />
      );
      break;
    default:
      return null;
  }
};
