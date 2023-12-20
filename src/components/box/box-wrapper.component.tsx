import { Dispatch, SetStateAction } from "react";
import Box from "./box.component";
import styles from "./box-wrapper.module.css";

interface BoxWrapperProps {
  showTree: boolean;
  setShowTree: Dispatch<SetStateAction<boolean>>;
  showThanksgiving?: boolean;
  setShowThanksgiving?: Dispatch<SetStateAction<boolean>>;
  showChristmasEve?: boolean;
  setShowChristmasEve?: Dispatch<SetStateAction<boolean>>;
  showChristmas?: boolean;
  setShowChristmas?: Dispatch<SetStateAction<boolean>>;
}
const BoxWrapper = ({
  showTree,
  setShowTree,
  showThanksgiving,
  setShowThanksgiving,
  showChristmasEve,
  setShowChristmasEve,
  showChristmas,
  setShowChristmas,
}: BoxWrapperProps) => {
  const handleClick = (setShowJourney: any, showJourney: any) => {
    setShowJourney(!showJourney);
    setShowTree(!showTree);
  };

  const today = new Date().toJSON().slice(0, 10);

  return (
    <div className={styles.presentContainer}>
      <div
        className={styles.present1}
        onClick={() => handleClick(setShowThanksgiving, showThanksgiving)}
      >
        <Box
          width={125}
          height={125}
          backgroundColor={"#DC4D01"}
          borderColor={"#8B4000"}
          text={"🦃"}
          textColor={"white"}
        />
      </div>
      <div
        className={styles.present2}
        onClick={() => handleClick(setShowChristmasEve, showChristmasEve)}
      >
        <Box
          width={125}
          height={125}
          backgroundColor={"#00873E"}
          borderColor={"#004C23"}
          text={"🦌🛷"}
          textColor={"white"}
        />
      </div>
      <div
        className={styles.present3}
        onClick={() =>
          today >= "2023-12-25" && handleClick(setShowChristmas, showChristmas)
        }
      >
        <Box
          width={125}
          height={125}
          backgroundColor={"#c30f16"}
          borderColor={"#8b0000"}
          text={"🎄"}
          textColor={"white"}
        />
      </div>
    </div>
  );
};

export default BoxWrapper;
