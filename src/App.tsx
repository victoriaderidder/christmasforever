import {
  Routes,
  Route,
  Link,
  useLocation,
  BrowserRouter as Router,
  useNavigate,
} from "react-router-dom";
import Snowfall from "react-snowfall";
import App2020 from "2020/App2020";
import App2022 from "2022/App2022";
import App2023 from "2023/App2023";
import App2024 from "2024/App2024";
import LandingPage2024 from "2024/LandingPage2024";
import App2025 from "2025/App2025";
import { Journey2025 } from "2025/journey/journey-2025.component";
import HotChocolateRiddle from "2025/components/hot-chocolate-riddle";
import MovingCookieRiddle from "2025/components/moving-cookie-riddle/moving-cookie-riddle";
import PeppermintStickRiddle from "2025/components/peppermint-stick-riddle/peppermint-stick-riddle";
import MazeRiddle from "2025/components/maze-riddle";
import PotionRiddle from "2025/components/potion-riddle/potion-riddle";
import BookshelfRiddle from "2025/components/bookshelf-riddle/bookshelf-riddle";
import { RiddleRouteWrapper } from "2025/components/riddle-route-wrapper";
import Box from "components/box.component";
import Home from "components/home.component";
import Star from "components/star.component";
import TreeVisual from "./components/tree-visual.component";
import { useAudio } from "./audio/audio.hooks";
import { AUDIO_PATHS } from "./audio/audio.utils";
import { useEffect } from "react";
import "./App.css";
import "./2025/App2025.css";

const RouteChangeHandler = ({
  stopAllAudio,
}: {
  stopAllAudio: () => Promise<void> | void;
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/christmasforever") {
      navigate("/");
      return;
    }

    if (location.pathname === "/") {
      stopAllAudio();
    }
  }, [location.pathname, navigate, stopAllAudio]);

  return null;
};

function App() {
  const { stopAllAudio } = useAudio(AUDIO_PATHS);

  const riddleRoutes2025: Array<{
    path: string;
    redBackground?: boolean;
    render: (onComplete: () => void) => JSX.Element;
  }> = [
    {
      path: "/2025/hot-chocolate-riddle",
      render: (onComplete) => <HotChocolateRiddle onComplete={onComplete} />,
    },
    {
      path: "/2025/moving-cookie-riddle",
      redBackground: false,
      render: (onComplete) => <MovingCookieRiddle onComplete={onComplete} />,
    },
    {
      path: "/2025/peppermint-stick-riddle",
      render: (onComplete) => <PeppermintStickRiddle onComplete={onComplete} />,
    },
    {
      path: "/2025/maze-riddle",
      render: (onComplete) => <MazeRiddle onComplete={onComplete} />,
    },
    {
      path: "/2025/potion-riddle",
      render: (onComplete) => <PotionRiddle onComplete={onComplete} />,
    },
    {
      path: "/2025/bookshelf-riddle",
      render: (onComplete) => <BookshelfRiddle onComplete={onComplete} />,
    },
  ];

  return (
    <Router basename={process.env.PUBLIC_URL || "/christmasforever"}>
      <RouteChangeHandler stopAllAudio={stopAllAudio} />
      <Home />
      <main className="main">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Snowfall snowflakeCount={125} />
                <Link to="/2025" className="year-box" id="this-year">
                  <div className="star-glow">
                    <div className="star-glow__backdrop" aria-hidden />
                    <div className="star-glow__star">
                      <Star
                        width={250}
                        height={250}
                        backgroundColor={"#D4AF37"}
                        borderColor={"#DAA520"}
                        text={"2025"}
                        textColor={"white"}
                        fontSize={50}
                      />
                    </div>
                  </div>
                </Link>

                <TreeVisual />

                <div className="bottom-row" aria-hidden={false}>
                  <Link to="/2024" className="year-box">
                    <Box
                      width={125}
                      height={125}
                      backgroundColor={"#D4AF37"}
                      borderColor={"#DAA520"}
                      text={"2024"}
                      textColor={"white"}
                      isPresent={true}
                      realistic={true}
                    />
                  </Link>
                  <Link to="/2023" className="year-box">
                    <Box
                      width={125}
                      height={125}
                      backgroundColor={"#D4AF37"}
                      borderColor={"#DAA520"}
                      text={"2023"}
                      textColor={"white"}
                      isPresent={true}
                      realistic={true}
                    />
                  </Link>
                  <a
                    href="https://victoriaderidder.github.io/christmas2022/"
                    target="_blank"
                    rel="noreferrer"
                    className="year-box"
                  >
                    <Box
                      width={125}
                      height={125}
                      backgroundColor={"#D4AF37"}
                      borderColor={"#DAA520"}
                      text={"2022"}
                      textColor={"white"}
                      isPresent={true}
                      realistic={true}
                    />
                  </a>
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
                      isPresent={true}
                      realistic={true}
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
                      isPresent={true}
                      realistic={true}
                    />
                  </Link>
                </div>
              </>
            }
          />
          <Route path="/2020" element={<App2020 />} />
          <Route path="/2022" element={<App2022 />} />
          <Route path="/2023" element={<App2023 />} />
          <Route path="/2024/landing" element={<LandingPage2024 />} />
          <Route path="/2024" element={<App2024 />} />
          <Route path="/2025" element={<App2025 />} />
          <Route path="/2025/:step" element={<Journey2025 />} />
          {riddleRoutes2025.map(({ path, redBackground, render }) => (
            <Route
              key={path}
              path={path}
              element={
                <RiddleRouteWrapper redBackground={redBackground}>
                  {(onComplete) => render(onComplete)}
                </RiddleRouteWrapper>
              }
            />
          ))}
        </Routes>
      </main>
    </Router>
  );
}

export default App;
