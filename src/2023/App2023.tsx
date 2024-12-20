import { FC, useState } from "react";
import "./App2023.css";
import Tree from "./components/tree/tree.component";
import { ThanksgivingJourney } from "./components/journey/thanksgiving-journey.component";
import { ChristmasEveJourney } from "./components/journey/christmas-eve-journey.component";
import { ChristmasJourney } from "./components/journey/christmas-journey.component";
import { Travel } from "./components/travel/travel.component";
// import Home from "./components/home/home.component";

interface App2023Props {
  setShowMain: (showMain: boolean) => void;
  setShowSelf: (showSelf: boolean) => void;
}

const App2023: FC<App2023Props> = ({ setShowSelf, setShowMain }) => {
  const [showTree, setShowTree] = useState(true);
  const [showThanksgiving, setShowThanksgiving] = useState(false);
  const [showChristmasEve, setShowChristmasEve] = useState(false);
  const [showChristmas, setShowChristmas] = useState(false);

  return (
    <main className="main2023">
      {/* <Home setShowMain={setShowMain} setShowElement={setShowSelf} /> */}
      {showTree && (
        <Tree
          showTree={showTree}
          setShowTree={setShowTree}
          showChristmas={showChristmas}
          setShowChristmas={setShowChristmas}
          showThanksgiving={showThanksgiving}
          setShowThanksgiving={setShowThanksgiving}
          setShowChristmasEve={setShowChristmasEve}
          showChristmasEve={showChristmasEve}
        />
      )}
      {showThanksgiving && (
        <Travel
          showTree={showTree}
          setShowTree={setShowTree}
          showJourney={showThanksgiving}
          setShowJourney={setShowThanksgiving}
          journeyName="Thanksgiving"
          JourneyComponent={ThanksgivingJourney}
        />
      )}
      {showChristmasEve && (
        <Travel
          showTree={showTree}
          setShowTree={setShowTree}
          showJourney={showChristmasEve}
          setShowJourney={setShowChristmasEve}
          journeyName="Christmas Eve"
          JourneyComponent={ChristmasEveJourney}
        />
      )}
      {showChristmas && (
        <Travel
          showTree={showTree}
          setShowTree={setShowTree}
          showJourney={showChristmas}
          setShowJourney={setShowChristmas}
          journeyName="Christmas"
          JourneyComponent={ChristmasJourney}
        />
      )}
    </main>
  );
};

export default App2023;
