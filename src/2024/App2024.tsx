import { FC, useState } from "react";
import "./App2024.css";
import { ThanksgivingJourney } from "../2023/components/journey/thanksgiving-journey.component";
import { Travel } from "../2023/components/travel/travel.component";
// import Home from "./components/home/home.component";

interface App2024Props {
  setShowMain: (showMain: boolean) => void;
  setShowSelf: (showSelf: boolean) => void;
}

const App2024: FC<App2024Props> = ({ setShowSelf, setShowMain }) => {
  const [showTree, setShowTree] = useState(true);
  const [showThanksgiving, setShowThanksgiving] = useState(false);

  return (
    <main className="main2024">
      {/* <Home setShowMain={setShowMain} setShowElement={setShowSelf} /> */}
      <Travel
        showTree={showTree}
        setShowTree={setShowTree}
        showJourney={showThanksgiving}
        setShowJourney={setShowThanksgiving}
        journeyName="Thanksgiving"
        JourneyComponent={ThanksgivingJourney}
      />
    </main>
  );
};

export default App2024;
