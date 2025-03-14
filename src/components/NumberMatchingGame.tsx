import React, { useState, useEffect } from "react";
import { GameProps } from "./types";

const generateGrid = (size: number) => {
  const numbers = Array.from(
    { length: (size * size) / 2 },
    (_, i) => (i + 1) * 2
  );
  return [...numbers, ...numbers].sort(() => Math.random() - 0.5);
};

export default function NumberMatchingGame({ onGameOver }: GameProps) {
  const [size, setSize] = useState(3);
  const [grid, setGrid] = useState<number[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [time, setTime] = useState(10);
  const [running, setRunning] = useState(true);
  const [score, setScore] = useState(0);
  const [lastMatchTime, setLastMatchTime] = useState<number | null>(null);

  useEffect(() => {
    if (running && time > 0) {
      const timer = setInterval(() => setTime((t) => t - 1), 1000);
      return () => clearInterval(timer);
    } else if (time === 0) {
      setRunning(false);
      onGameOver(score);
    }
  }, [running, time, onGameOver, score]);

  useEffect(() => {
    setGrid(generateGrid(3));
  }, []);

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
  }, [selected, grid, lastMatchTime]);

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
  }, [matched, grid.length, size]);

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
        {grid.map((value, index) => (
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
            {matched.includes(index) ? "" : value}
          </button>
        ))}
      </div>
    </div>
  );
} 