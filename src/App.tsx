import "./App.css";
import Tree from "./components/tree/tree.component";
import { ThanksgivingJourney } from "./components/journey/thanksgiving-journey.component";
import { ChristmasEveJourney } from "./components/journey/christmas-eve-journey.component";
import { ChristmasJourney } from "./components/journey/christmas-journey.component";
import { Travel } from "./components/travel/travel.component";
import useGlobalState from "./hooks/global-state";

function App() {
  const {
    showThanksgiving,
    showChristmas,
    showChristmasEve,
    showTree,
    setShowChristmas,
    setShowChristmasEve,
    setShowThanksgiving,
    setShowTree,
  } = useGlobalState();

  return (
    <main className="main">
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
          storyArray={ThanksgivingJourney}
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
}

export default App;
