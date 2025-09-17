import { FC } from "react";
import "./App2024.css";
import { Travel2024 } from "./travel/travel.component";
// import Home from "./components/home/home.component";

interface App2024Props {
  setShowMain: (showMain: boolean) => void;
  setShowSelf: (showSelf: boolean) => void;
}

const App2024: FC<App2024Props> = ({ setShowSelf, setShowMain }) => {
  return (
    <main className="main2024">
      {/* <Home setShowMain={setShowMain} setShowElement={setShowSelf} /> */}
      <Travel2024 temp={true} />
    </main>
  );
};

export default App2024;
