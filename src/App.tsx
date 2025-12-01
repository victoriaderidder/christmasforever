import {
  Routes,
  Route,
  Link,
  useLocation,
  HashRouter,
  useNavigate,
} from "react-router-dom";
import Snowfall from "react-snowfall";
import App2020 from "2020/App2020";
import App2022 from "2022/App2022";
import App2023 from "2023/App2023";
import App2024 from "2024/App2024";
import Box from "components/box.component";
import { useAudio } from "./audio/audio.hooks";
import { AUDIO_PATHS } from "./audio/audio.utils";
import { useEffect } from "react";
import "./App.css";

function App() {
  const { stopAllAudio } = useAudio(AUDIO_PATHS);
  const RouteChangeHandler = () => {
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
      const handleRouteChange = async () => {
        console.log("Route changed to:", location.pathname);
        await stopAllAudio();
      };

      if (location.pathname === "/christmasforever") {
        navigate("/");
      }

      if (location.pathname === "/") {
        handleRouteChange();
        window.addEventListener("popstate", handleRouteChange);
        return () => window.removeEventListener("popstate", handleRouteChange);
      }
    }, [location.pathname]);

    return null;
  };

  return (
    <HashRouter>
      <RouteChangeHandler />
      <main className="main">
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
                <Link to="/2022" className="year-box">
                  <Box
                    width={125}
                    height={125}
                    backgroundColor={"#D4AF37"}
                    borderColor={"#DAA520"}
                    text={"2022"}
                    textColor={"white"}
                  />
                </Link>
                <Link to="/2024" className="year-box" id="this-year">
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
                  className="year-box"
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
                <Link to="/2020" className="year-box">
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
          <Route path="/2020" element={<App2020 />} />
          <Route path="/2022" element={<App2022 />} />
          <Route path="/2023" element={<App2023 />} />
          <Route path="/2024" element={<App2024 />} />
        </Routes>
      </main>
    </HashRouter>
  );
}

export default App;
