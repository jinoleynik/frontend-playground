import React, { useState, useEffect, useCallback } from "react";

export interface ColorInfo {
  hex: string;
  rgb: string;
  hsl: string;
}

export interface SavedColor {
  id: string;
  color: ColorInfo;
  timestamp: number;
}

const ColorPicker: React.FC = () => {
  const [selectedColor, setSelectedColor] = useState<string>("#1e90ff");

  const [colorInfo, setColorInfo] = useState<ColorInfo>({
    hex: "#1e90ff",
    rgb: "rgb(30, 144, 255)",
    hsl: "hsl(210, 100%, 56%)",
  });
  const [savedColors, setSavedColors] = useState<SavedColor[]>(
    JSON.parse(localStorage.getItem("colorPalette") || "[]") as SavedColor[]
  );

  // Load saved colors from localStorage on component mount
  useEffect(() => {
    const saved = localStorage.getItem("colorPalette");
    if (saved) {
      setSavedColors(JSON.parse(saved));
    }
  }, []);

  // Save colors to localStorage whenever savedColors changes
  useEffect(() => {
    localStorage.setItem("colorPalette", JSON.stringify(savedColors));
  }, [savedColors]);

  const updateColorInfo = (hex: string) => {
    // Convert hex to RGB
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    // Convert RGB to HSL
    const r1 = r / 255;
    const g1 = g / 255;
    const b1 = b / 255;
    const max = Math.max(r1, g1, b1);
    const min = Math.min(r1, g1, b1);
    let h = 0,
      s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r1:
          h = (g1 - b1) / d + (g1 < b1 ? 6 : 0);
          break;
        case g1:
          h = (b1 - r1) / d + 2;
          break;
        case b1:
          h = (r1 - g1) / d + 4;
          break;
      }
      h /= 6;
    }

    setColorInfo({
      hex: hex,
      rgb: `rgb(${r}, ${g}, ${b})`,
      hsl: `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(
        l * 100
      )}%)`,
    });
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setSelectedColor(newColor);
    updateColorInfo(newColor);
  };

  const handleRandomColor = () => {
    const randomColor =
      "#" +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0");
    setSelectedColor(randomColor);
    updateColorInfo(randomColor);
  };

  const handleSaveColor = () => {
    const newColor: SavedColor = {
      id: Date.now().toString(),
      color: colorInfo,
      timestamp: Date.now(),
    };
    setSavedColors((prev) => [...prev, newColor]);
  };

  const handleRemoveColor = (id: string) => {
    setSavedColors((prev) => prev.filter((color) => color.id !== id));
  };

  const handleHexInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let hex = e.target.value;

    // Ensure hex starts with #
    if (!hex.startsWith("#")) {
      hex = "#" + hex;
    }

    setSelectedColor(hex);
    // Validate hex color format
    const isValidHex = /^#[0-9A-Fa-f]{6}$/.test(hex);

    if (isValidHex) {
      updateColorInfo(hex);
    }
  };

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    // Space key for random color
    if (event.code === 'Space' && 
        !(event.target instanceof HTMLInputElement || event.target instanceof HTMLButtonElement)) {
      event.preventDefault();
      handleRandomColor();
    }
    
    // Ctrl + S for saving color
    if (event.code === 'KeyS' && (event.ctrlKey || event.metaKey)) {
      event.preventDefault();
      handleSaveColor();
    }
  }, [handleSaveColor]);  // Empty dependency array since we don't use any external values

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Color Picker</h2>

      <div className="space-y-4">
        <div className="flex space-x-4 items-center">
          <input
            type="color"
            value={selectedColor}
            onChange={handleColorChange}
            className="w-20 h-20 cursor-pointer"
          />
          <input
            type="text"
            value={selectedColor}
            onChange={handleHexInput}
            placeholder="#000000"
            className="px-3 py-2 border rounded w-32 font-mono text-sm"
            maxLength={7}
          />
          <button
            onClick={handleRandomColor}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Random Color
          </button>
        </div>

        <div
          className="h-32 rounded-lg shadow-inner"
          style={{ backgroundColor: selectedColor }}
        />

        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="font-semibold">HEX:</span>
            <span className="font-mono">{colorInfo.hex}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">RGB:</span>
            <span className="font-mono">{colorInfo.rgb}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">HSL:</span>
            <span className="font-mono">{colorInfo.hsl}</span>
          </div>
        </div>

        <button
          onClick={() => navigator.clipboard.writeText(colorInfo.hex)}
          className="w-full py-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
        >
          Copy HEX Code
        </button>
      </div>

      <div className="mt-6">
        <button
          onClick={handleSaveColor}
          className="w-full py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors mb-4"
        >
          Save to Palette
        </button>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Saved Colors</h3>
          {savedColors.length === 0 ? (
            <p className="text-gray-500 text-sm">No colors saved yet</p>
          ) : (
            <div className="grid grid-cols-4 gap-2">
              {savedColors.map((saved) => (
                <div key={saved.id} className="relative group">
                  <div
                    className="w-full h-12 rounded cursor-pointer"
                    style={{ backgroundColor: saved.color.hex }}
                    onClick={() => {
                      setSelectedColor(saved.color.hex);
                      setColorInfo(saved.color);
                    }}
                  />
                  <button
                    onClick={() => handleRemoveColor(saved.id)}
                    className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ×
                  </button>
                  <span className="text-xs text-center block mt-1 truncate">
                    {saved.color.hex}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-500">
        <p>Keyboard shortcuts:</p>
        <ul className="list-disc list-inside">
          <li>Press <kbd className="px-2 py-1 bg-gray-100 rounded">Space</kbd> for random color</li>
          <li>Press <kbd className="px-2 py-1 bg-gray-100 rounded">Ctrl</kbd> + <kbd className="px-2 py-1 bg-gray-100 rounded">S</kbd> to save to palette</li>
        </ul>
      </div>
    </div>
  );
};

export default ColorPicker;
