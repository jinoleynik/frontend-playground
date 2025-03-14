import React, { useState } from 'react';

// Add new interface for expanded state
interface ExpandedState {
  [key: string]: boolean;
}

interface Conversion {
  name: string;
  convert: (value: number) => number;
  unit: string;
  category: string;
}

const conversions: Conversion[] = [
  // Length
  { name: 'Meters to Feet', convert: (m) => m * 3.28084, unit: 'ft', category: 'Length' },
  { name: 'Feet to Meters', convert: (ft) => ft / 3.28084, unit: 'm', category: 'Length' },
  { name: 'Meters to Inches', convert: (m) => m * 39.3701, unit: 'in', category: 'Length' },
  { name: 'Inches to Meters', convert: (inch) => inch / 39.3701, unit: 'm', category: 'Length' },
  { name: 'Meters to Yards', convert: (m) => m * 1.09361, unit: 'yd', category: 'Length' },
  { name: 'Yards to Meters', convert: (yd) => yd / 1.09361, unit: 'm', category: 'Length' },
  { name: 'Meters to Miles', convert: (m) => m * 0.000621371, unit: 'mi', category: 'Length' },
  { name: 'Miles to Meters', convert: (mi) => mi / 0.000621371, unit: 'm', category: 'Length' },
  { name: 'Meters to Kilometers', convert: (m) => m / 1000, unit: 'km', category: 'Length' },
  { name: 'Kilometers to Meters', convert: (km) => km * 1000, unit: 'm', category: 'Length' },
  
  // Weight
  { name: 'Kilograms to Pounds', convert: (kg) => kg * 2.20462, unit: 'lb', category: 'Weight' },
  { name: 'Pounds to Kilograms', convert: (lb) => lb / 2.20462, unit: 'kg', category: 'Weight' },
  { name: 'Kilograms to Ounces', convert: (kg) => kg * 35.274, unit: 'oz', category: 'Weight' },
  { name: 'Ounces to Kilograms', convert: (oz) => oz / 35.274, unit: 'kg', category: 'Weight' },
  { name: 'Kilograms to Grams', convert: (kg) => kg * 1000, unit: 'g', category: 'Weight' },
  { name: 'Grams to Kilograms', convert: (g) => g / 1000, unit: 'kg', category: 'Weight' },
  

  // Volume
  { name: 'Liters to Gallons', convert: (l) => l * 0.264172, unit: 'gal', category: 'Volume' },
  { name: 'Gallons to Liters', convert: (gal) => gal / 0.264172, unit: 'L', category: 'Volume' },
  { name: 'Liters to Quarts', convert: (l) => l * 1.05669, unit: 'qt', category: 'Volume' },
  { name: 'Quarts to Liters', convert: (qt) => qt / 1.05669, unit: 'L', category: 'Volume' },
  { name: 'Liters to Cubic Meters', convert: (l) => l / 1000, unit: 'm³', category: 'Volume' },
  { name: 'Cubic Meters to Liters', convert: (m3) => m3 * 1000, unit: 'L', category: 'Volume' },
  { name: 'Liters to Milliliters', convert: (l) => l * 1000, unit: 'mL', category: 'Volume' },
  { name: 'Milliliters to Liters', convert: (ml) => ml / 1000, unit: 'L', category: 'Volume' },
  
  // Temperature
  { name: 'Celsius to Fahrenheit', convert: (c) => (c * 9/5) + 32, unit: '°F', category: 'Temperature' },
  { name: 'Fahrenheit to Celsius', convert: (f) => (f - 32) * 5/9, unit: '°C', category: 'Temperature' },
  { name: 'Celsius to Kelvin', convert: (c) => c + 273.15, unit: 'K', category: 'Temperature' },
  { name: 'Kelvin to Celsius', convert: (k) => k - 273.15, unit: '°C', category: 'Temperature' },

  // Fuel Consumption
  { 
    name: 'MPG to L/100km', 
    convert: (mpg) => 235.215 / mpg, // 235.215 is the conversion factor
    unit: 'L/100km', 
    category: 'Fuel Consumption' 
  },
  { 
    name: 'L/100km to MPG', 
    convert: (lper100) => 235.215 / lper100,
    unit: 'MPG', 
    category: 'Fuel Consumption' 
  },
  { 
    name: 'MPG (UK) to L/100km', 
    convert: (mpg) => 282.481 / mpg, // UK gallons are different
    unit: 'L/100km', 
    category: 'Fuel Consumption' 
  },
  { 
    name: 'L/100km to MPG (UK)', 
    convert: (lper100) => 282.481 / lper100,
    unit: 'MPG (UK)', 
    category: 'Fuel Consumption' 
  },
];

const UnitConverter: React.FC = () => {
  const [value, setValue] = useState<string>('36');
  const [expandedCategories, setExpandedCategories] = useState<ExpandedState>({
    'Length': true,      // Default expanded states
    'Weight': true,
    'Volume': true,
    'Temperature': true,
    'Fuel Consumption': true
  });

  const formatNumber = (num: number): string => {
    return num.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  // Group conversions by category
  const groupedConversions = conversions.reduce((acc, conversion) => {
    if (!acc[conversion.category]) {
      acc[conversion.category] = [];
    }
    acc[conversion.category].push(conversion);
    return acc;
  }, {} as Record<string, Conversion[]>);

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg">
      <div className="sticky top-0 z-10 bg-white">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Universal Converter</h2>
          
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="p-3 border rounded w-full text-lg"
            placeholder="Enter a number"
          />
        </div>
      </div>

      <div className="p-6 pt-0">
        {Object.entries(groupedConversions).map(([category, categoryConversions]) => (
          <div key={category} className="mb-4 border rounded-lg overflow-hidden">
            <button
              onClick={() => toggleCategory(category)}
              className="w-full p-4 text-left bg-gray-100 hover:bg-gray-200 transition-colors flex justify-between items-center"
            >
              <h3 className="text-xl font-semibold text-gray-700">{category}</h3>
              <svg
                className={`w-6 h-6 transform transition-transform ${
                  expandedCategories[category] ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                expandedCategories[category] 
                  ? 'max-h-[2000px] opacity-100' 
                  : 'max-h-0 opacity-0'
              }`}
            >
              <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categoryConversions.map((conversion, index) => {
                  const inputValue = parseFloat(value) || 0;
                  const result = conversion.convert(inputValue);
                  
                  return (
                    <div
                      key={index}
                      className="p-4 border rounded bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <div className="text-sm text-gray-600 mb-1">
                        {conversion.name}
                      </div>
                      <div className="text-xl font-semibold">
                        {formatNumber(result)} {conversion.unit}
                      </div>
                      <div className="text-sm text-gray-500">
                        {value} → {formatNumber(result)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UnitConverter;