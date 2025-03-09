import React from "react";
import "./styles/index.css";
import MatchingGame from "./components/MatchingGame";

const App: React.FC = () => {
  return (
    <div className="App">
      <h1 className="text-3xl font-bold underline">
        Welcome to My Vite Project!
      </h1>

      <MatchingGame />
    </div>
  );
};

export default App;
