import { Journey2025 } from "../journey/journey-2025.component";
import styles from "./travel.module.css";
import { FC } from "react";

export const Travel2025: FC = () => {
  return (
    <>
      <div className={styles.app}>
        <div className={styles.appHeader}>
          <div className="journey">
            <Journey2025 handleEnd={() => {}} />
          </div>
        </div>
      </div>
    </>
  );
};
