import React from "react";
import AgeCalculator from "./components/AgeCalculator";

function App() {
  return (
    <div
      className="min-h-screen flex items-center justify-center 
    bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100
     dark:bg-gradient-to-br dark:from-[#0f2027] dark:via-[#203a43] dark:to-[#2c5364] animate-[pulseBg_10s_infinite]  p-8
  "
    >
      <AgeCalculator />
    </div>
  );
}

export default App;
