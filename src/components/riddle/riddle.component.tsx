import { FC } from "react";
import Guess from "../guess.component";
import styles from "./riddle.module.css";

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
      <div className={styles.riddle}>
        <span className={styles.question}>
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
