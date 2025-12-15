import { FC, useState } from "react";
import Home from "../components/home.component";
import styles from "./App2025.module.css";
import Title from "../components/title.component";
import { Journey2025 } from "./journey/journey-2025.component";
import { Travel2025 } from "./travel/travel.component";

const App2025: FC = () => {
  const [showJourney, setShowJourney] = useState(false);

  return (
    <div className={styles.app2025}>
      {/* <Home /> */}
      {!showJourney ? (
        <div onClick={() => setShowJourney(true)} style={{ cursor: "pointer" }}>
          <Title title="interlude." plain />
        </div>
      ) : (
        <Travel2025 />
      )}
    </div>
  );
};

export default App2025;
