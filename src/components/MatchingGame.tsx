import React, { useState } from "react";
import { GameMode } from "./types";
import NumberMatchingGame from "./NumberMatchingGame";
import ColorMatchingGame from "./ColorMatchingGame";

export default function MatchingGame({ type }: { type: "numbers" | "colors" }) {
  const [mode, setMode] = useState<GameMode>(type || "numbers");
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  const handleGameOver = (finalScore: number) => {
    setScore(finalScore);
    setGameOver(true);
    setGameStarted(false);
  };

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
  };

  if (!gameStarted) {
    return (
      <div className="flex flex-col items-center p-4">
        <h1 className="text-2xl font-bold mb-4">Matching Game</h1>
        {gameOver && <p className="text-lg mb-4">Final Score: {score}</p>}
        <div className="flex gap-4 mb-4">
          <button
            onClick={() => setMode("numbers")}
            className={`px-4 py-2 rounded-lg text-lg ${
              mode === "numbers"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Numbers
          </button>
          <button
            onClick={() => setMode("colors")}
            className={`px-4 py-2 rounded-lg text-lg ${
              mode === "colors"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Colors
          </button>
        </div>
        <button
          onClick={startGame}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg text-lg"
        >
          Start Game
        </button>
      </div>
    );
  }

  return mode === "numbers" ? (
    <NumberMatchingGame onGameOver={handleGameOver} />
  ) : (
    <ColorMatchingGame onGameOver={handleGameOver} />
  );
}
