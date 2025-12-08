import Riddle from "../../../components/riddle/riddle.component";
import KrampusEyesRiddle from "../krampus-eyes-riddle";

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
    default:
      return null;
  }
};
