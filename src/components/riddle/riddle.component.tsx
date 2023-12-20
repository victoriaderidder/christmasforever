import { FC } from "react";
import Guess from "../guess/guess.component";

interface RiddleProps {
  setShowElement: (showList: boolean) => void;
  answer: string[];
  question: any;
}

const Riddle: FC<RiddleProps> = ({ setShowElement, answer, question }) => {
  return (
    <>
      <div className="riddle">
        <span className="question">
          <p>{question}</p>
        </span>

        <p>{<Guess setShowElement={setShowElement} answer={answer} />}</p>
      </div>
    </>
  );
};

export default Riddle;
