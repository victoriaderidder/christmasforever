import { FC, useState } from "react";
import Home from "../components/home.component";
import "./App2025.css";
import Title from "../components/title.component";
import { Journey2025 } from "./journey/journey-2025.component";

const App2025: FC = () => {
  const [showJourney, setShowJourney] = useState(false);

  return (
    <div className={`app2025`}>
      <Home />
      {!showJourney ? (
        <div onClick={() => setShowJourney(true)} style={{ cursor: "pointer" }}>
          <Title title="interlude." plain />
        </div>
      ) : (
        <Journey2025 handleEnd={() => setShowJourney(false)} audioRefs={{}} />
      )}
    </div>
  );
};

export default App2025;
