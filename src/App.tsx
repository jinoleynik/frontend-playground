import React from "react";
import "./styles/index.css";
import MatchingGame from "./components/MatchingGame"; 
import PasswordGenerator from "./components/PasswordGenerator";
import JsonToCsv from "./components/JSONtoCSV";
import ColorPicker from "./components/ColorPicker";
import UnitConverter from "./components/UnitConverter";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Apps = [
  "MatchingGame",
  "MatchingGameColor",
  "JSONtoCSV",
  "CSVtoJSON",
  "Pixel",
  "Calculator",
  "ColorPicker",
  "PasswordGenerator",
  "DiceRoller",
  "UnitConverter"
] as const;
type TApps = (typeof Apps)[number];

const App: React.FC = () => {
  const [currentApp, setCurrentApp] = React.useState<TApps>("MatchingGame");
  const [drawerOpen, setDrawerOpen] = React.useState(true);
  return (
    <div className="App h-svh">
      <div className="flex flex-row items-center p-2 shadow-md z-20 relative">
        <span
          className="px-2 py-1 cursor-pointer text-xl hover:bg-gray-200"
          onClick={() => setDrawerOpen(!drawerOpen)}
        >
          &#9776;
        </span>

        <h1 className="text-3xl font-bold  p-2">
          Playground of react, frontend and algorithms
        </h1>
      </div>
      <div className="flex flex-row">
        <div className="relative">
         
            <ul className="flex flex-col min-w-[20%] bg-white shadow-md z-10 overflow-auto">
              {Apps.map((app) => (
                <li
                  key={app}
                  className={`p-2 cursor-pointer shadow-xs ${
                    currentApp === app ? "bg-gray-300" : ""
                  }`}
                  onClick={() => {
                    setCurrentApp(app);
                  }}
                >
                  {app}
                </li>
              ))}
            </ul>
        
        </div>

        <div className="flex-1">
          {currentApp === "MatchingGame" && <MatchingGame type="numbers" />}
          {currentApp === "MatchingGameColor" && <MatchingGame type="colors" />}
          {currentApp === "PasswordGenerator" && <PasswordGenerator />}
          {currentApp === "JSONtoCSV" && <JsonToCsv />}
          {currentApp === "ColorPicker" && <ColorPicker />}
          {currentApp === "UnitConverter" && <UnitConverter />}
        </div>
      </div>
    </div>
  );
};

export default App;
