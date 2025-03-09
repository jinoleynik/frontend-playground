import React, { useState, useEffect } from "react";

const generateGrid = (size: number) => {
  const numbers = Array.from(
    { length: (size * size) / 2 },
    (_, i) => (i + 1) * 2
  );
  const pairs = [...numbers, ...numbers].sort(() => Math.random() - 0.5);
  return pairs;
};

export default function MatchingGame() {
  const [size, setSize] = useState(3);
  const [grid, setGrid] = useState<number[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [time, setTime] = useState(10);
  const [running, setRunning] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [lastMatchTime, setLastMatchTime] = useState<number | null>(null);

  useEffect(() => {
    if (running && time > 0) {
      const timer = setInterval(() => setTime((t) => t - 1), 1000);
      return () => clearInterval(timer);
    } else if (time === 0) {
      setRunning(false);
      setGameOver(true);
    }
  }, [running, time]);

  const startGame = () => {
    setSize(3);
    setGrid(generateGrid(3));
    setMatched([]);
    setSelected([]);
    setTime(10);
    setScore(0);
    setRunning(true);
    setGameStarted(true);
    setGameOver(false);
    setLastMatchTime(null);
  };

  const handleClick = (index: number) => {
    if (matched.includes(index)) return;

    setSelected((prevSelected) => {
      if (prevSelected.includes(index)) {
        return prevSelected.filter((i) => i !== index);
      } else if (prevSelected.length < 2) {
        return [...prevSelected, index];
      }
      return prevSelected;
    });
  };

  useEffect(() => {
    if (selected.length === 2) {
      const [first, second] = selected;
      if (grid[first] === grid[second]) {
        setMatched((prevMatched) => [...prevMatched, first, second]);
        setScore((prevScore) => prevScore + 1);

        const currentTime = Date.now();
        if (lastMatchTime && currentTime - lastMatchTime < 1000) {
          setTime((prevTime) => prevTime + 4);
        } else {
          setTime((prevTime) => prevTime + 2);
        }
        setLastMatchTime(currentTime);
      }
      setTimeout(() => setSelected([]), 500);
    }
  }, [selected]);

  useEffect(() => {
    if (matched.length === grid.length && grid.length > 0) {
      setTimeout(() => {
        if (size < 10) {
          setSize(size + 1);
        }
        setGrid(generateGrid(size + 1));
        setMatched([]);
        setSelected([]);
        setLastMatchTime(null);
        setTime((prevTime) => prevTime + 10);
      }, 1000);
    }
  }, [matched]);

  if (!gameStarted) {
    return (
      <div className="flex flex-col items-center p-4">
        <h1 className="text-2xl font-bold mb-4">Matching Game</h1>
        <button
          onClick={startGame}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg text-lg"
        >
          Start Game
        </button>
      </div>
    );
  }

  if (gameOver) {
    return (
      <div className="flex flex-col items-center p-4">
        <h1 className="text-2xl font-bold mb-4">Game Over</h1>
        <p className="text-lg mb-4">Score: {score}</p>
        <button
          onClick={startGame}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg text-lg"
        >
          New Game
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-4">
      <div className="text-lg font-bold mb-4">
        Time: {time}s | Score: {score}
      </div>
      <div
        className="grid gap-2"
        style={{
          gridTemplateColumns: `repeat(${size}, 50px)`,
          gridTemplateRows: `repeat(${size}, 50px)`,
        }}
      >
        {grid.map((num, index) => (
          <button
            key={index}
            className={`w-12 h-12 flex items-center justify-center border rounded text-lg font-bold ${
              matched.includes(index)
                ? "bg-green-300 text-transparent"
                : selected.includes(index)
                ? "bg-blue-300"
                : "bg-gray-200"
            }`}
            onClick={() => handleClick(index)}
            disabled={matched.includes(index)}
          >
            {matched.includes(index) ? "" : num}
          </button>
        ))}
      </div>
    </div>
  );
}
