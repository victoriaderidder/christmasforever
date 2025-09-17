import { FC } from "react";
import Guess from "../guess.component";
import "./riddle.module.css";

interface RiddleProps {
  setShowElement: (showList: boolean) => void;
  answer: string[];
  question: any;
  song?: any;
  previousSong?: any;
}

const Riddle: FC<RiddleProps> = ({
  setShowElement,
  answer,
  question,
  song,
  previousSong,
}) => {
  return (
    <>
      <div className="riddle">
        <span className="question">
          <p>{question}</p>
        </span>

        <p>
          {
            <Guess
              setShowElement={setShowElement}
              answer={answer}
              song={song}
              previousSong={previousSong}
            />
          }
        </p>
      </div>
    </>
  );
};

export default Riddle;
