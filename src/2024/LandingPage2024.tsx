import {
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Snowfall from "react-snowfall";
import App2020 from "2020/App2020";
import App2022 from "2022/App2022";
import App2023 from "2023/App2023";
import App2024 from "2024/App2024";
import Box from "components/box.component";
import { useAudio } from "audio/audio.hooks";
import { AUDIO_PATHS } from "audio/audio.utils";
import { useEffect } from "react";
import styles from "./LandingPage2024.module.css";

function App() {
  const { stopAllAudio } = useAudio(AUDIO_PATHS);
  const RouteChangeHandler = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
      if (location.pathname === "/christmasforever") {
        navigate("/");
        return;
      }

      const stopAudio = async () => {
        try {
          await stopAllAudio();
        } catch (e) {
          console.warn("stopAllAudio failed", e);
        }
      };

      stopAudio();
    }, [location.pathname, navigate]);

    return null;
  };

  return (
    <>
      <RouteChangeHandler />
      <main className={styles.main}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Snowfall snowflakeCount={125} />
                <Link to="/2023" className="year-box">
                  <Box
                    width={125}
                    height={125}
                    backgroundColor={"#D4AF37"}
                    borderColor={"#DAA520"}
                    text={"2023"}
                    textColor={"white"}
                  />
                </Link>
                <a
                  href="https://victoriaderidder.github.io/christmas2022/"
                  target="_blank"
                  rel="noreferrer"
                  className="year-box"
                >
                  {" "}
                  <Box
                    width={125}
                    height={125}
                    backgroundColor={"#D4AF37"}
                    borderColor={"#DAA520"}
                    text={"2022"}
                    textColor={"white"}
                  />
                </a>
                <Link
                  to="/2024"
                  className={`${styles.yearBox} ${styles.thisYear}`}
                >
                  <Box
                    width={250}
                    height={250}
                    backgroundColor={"#D4AF37"}
                    borderColor={"#DAA520"}
                    text={"2024"}
                    textColor={"white"}
                    fontSize={100}
                  />
                </Link>
                <a
                  href="https://victoriaderidder.github.io/achristmaschallenge//"
                  target="_blank"
                  rel="noreferrer"
                  className={styles.yearBox}
                >
                  <Box
                    width={125}
                    height={125}
                    backgroundColor={"#D4AF37"}
                    borderColor={"#DAA520"}
                    text={"2021"}
                    textColor={"white"}
                  />
                </a>
                <Link to="/2020" className={styles.yearBox}>
                  <Box
                    width={125}
                    height={125}
                    backgroundColor={"#D4AF37"}
                    borderColor={"#DAA520"}
                    text={"2020"}
                    textColor={"white"}
                  />
                </Link>
              </>
            }
          />
        </Routes>
      </main>
    </>
  );
}

export default App;
