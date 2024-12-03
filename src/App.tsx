import { useState } from "react";
import "./App.css";
import App2023 from "./App2023";
import Box from "./components/box/box.component";

function App() {
  const [showMain, setShowMain] = useState(true);
  const [show2023, setShow2023] = useState(false);
  const handleClick = (setShowYear: any) => {
    setShowYear(true);
    setShowMain(false);
  };

  return (
    <main className="main">
      {showMain && (
        <div
          //className={styles.present1}
          onClick={() => handleClick(setShow2023)}
        >
          <Box
            width={125}
            height={125}
            backgroundColor={"#DC4D01"}
            borderColor={"#8B4000"}
            text={"🦃"}
            textColor={"white"}
          />
        </div>
      )}
      {show2023 && (
        <App2023 setShowMain={setShowMain} setShowSelf={setShow2023} />
      )}
    </main>
  );
}

export default App;
