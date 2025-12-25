import { Journey2025 } from "../journey/journey-2025.component";
import styles from "./travel.module.css";
import { FC } from "react";
import { TravelShell } from "../../components/travel-shell/travel-shell.component";

export const Travel2025: FC = () => {
  return (
    <>
      <TravelShell appClassName={styles.app} appHeaderClassName={styles.appHeader}>
        <Journey2025 handleEnd={() => {}} />
      </TravelShell>
    </>
  );
};
