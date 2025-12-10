import Riddle from "../../../components/riddle/riddle.component";
import KrampusEyesRiddle from "../../components/krampus-eyes-riddle";
import MovingObjectRiddle from "../../components/moving-object-riddle";
import HotChocolateRiddle from "../../components/hot-chocolate-riddle";
import BookshelfRiddle from "../../components/bookshelf-riddle";

export const handle2025Riddle = (
  riddle: number,
  setShowStory: any,
  setRiddle: any
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
        <MovingObjectRiddle
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
    default:
      return null;
  }
};
