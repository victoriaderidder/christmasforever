import { FC } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./App2025.module.css";
import Title from "../components/title.component";

const App2025: FC = () => {
  const navigate = useNavigate();

  const handleStartJourney = () => {
    navigate("/2025/0");
  };

  return (
    <div className={styles.app2025}>
      <div onClick={handleStartJourney} className={styles.startJourney}>
        <Title title="interlude." plain />
      </div>
    </div>
  );
};

export default App2025;
