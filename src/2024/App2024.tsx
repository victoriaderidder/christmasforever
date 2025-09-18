import { FC } from "react";
import "./App2024.css";
import { Travel2024 } from "./travel/travel.component";
import Home from "../components/home.component";

const App2024: FC = () => {
  return (
    <main className="main2024">
      <Home />
      <Travel2024 />
    </main>
  );
};

export default App2024;
