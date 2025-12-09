import Riddle from "../../../components/riddle/riddle.component";
import KrampusEyesRiddle from "../../components/krampus-eyes-riddle";
import MovingObjectRiddle from "../../components/moving-object-riddle";
import HotChocolateHeat from "../hot-chocolate-heat";

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
        <HotChocolateHeat
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
