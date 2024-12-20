import { FC } from "react";
import Guess from "../guess.component";
import "./riddle.module.css";

interface RiddleProps {
  setShowElement: (showList: boolean) => void;
  answer: string[];
  question: any;
  songHandling?: any;
  song1?: any;
  song2?: any;
}

const Riddle: FC<RiddleProps> = ({
  setShowElement,
  answer,
  question,
  songHandling,
  song1,
  song2,
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
              songHandling={songHandling}
              song1={song1}
              song2={song2}
            />
          }
        </p>
      </div>
    </>
  );
};

export default Riddle;
