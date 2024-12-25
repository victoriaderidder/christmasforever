import React, { FC, useState } from "react";
import cookie from "../assets/img/cookie.png";
import styles from "./cookie-clicker.module.css";

interface CookieClickerProps {
  setShowStory: (showList: boolean) => void;
}

const CookieClicker: FC<CookieClickerProps> = ({ setShowStory }) => {
  const [counter, setCounter] = useState(1);
  const [max, setMax] = useState(false);

  const cookieImg = (
    <>
      <img
        src={cookie}
        className={styles.cookie}
        alt="cookie"
        unselectable="on"
      />
    </>
  );

  const movingCookieImg = (
    <>
      <img
        src={cookie}
        className={styles.movingCookie}
        alt="cookie"
        unselectable="on"
      />
    </>
  );

  const handleClick = () => {
    counter === 500 && setMax(true);
    max ? setCounter(counter - 1) : setCounter(counter + 1);
    max && counter === 2 && setShowStory(true);
  };

  return (
    <div style={{ display: "flex" }} className={styles.unselectable}>
      {counter > 1 &&
        Array.from({ length: counter + counter }, (_, i) => (
          <div className={`${styles.cookieMover} ${styles.unselectable}`}>
            <div
              className={`${styles.cookieMover2} ${styles.unselectable}`}
              onClick={handleClick}
            >
              {movingCookieImg}
            </div>
          </div>
        ))}
      {counter === 1 && !max && (
        <div className={styles.cookie} onClick={handleClick}>
          {cookieImg}
        </div>
      )}
    </div>
  );
};

export default CookieClicker;
