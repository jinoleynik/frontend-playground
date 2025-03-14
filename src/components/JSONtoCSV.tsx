import React, { useState } from 'react'; 

interface JsonToCsvProps {
  fileName?: string;
}

const JsonToCsv: React.FC<JsonToCsvProps> = ({ fileName = 'export.csv' }) => {
    const [jsonInput, setJsonInput] = useState<string>('');
    const [csvOutput, setCsvOutput] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [customFileName, setCustomFileName] = useState<string>(fileName);

    const convertJsonToCsv = () => {
        try {
            // Parse JSON input
            const jsonArray = JSON.parse(jsonInput);

            // Validate if it's an array
            if (!Array.isArray(jsonArray)) {
                throw new Error('Input must be an array of objects');
            }

            // Get headers from the first object (first level only)
            const headers = Object.keys(jsonArray[0]);

            // Create CSV content
            const csvRows = [
                // Headers row
                headers.join(','),
                // Data rows
                ...jsonArray.map(item => 
                    headers.map(header => {
                        const value = item[header];
                        // Handle values that might contain commas
                        return typeof value === 'string' && value.includes(',') 
                            ? `"${value}"`
                            : value;
                    }).join(',')
                )
            ];

            const csvContent = csvRows.join('\n');
            setCsvOutput(csvContent);
            setError('');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Invalid JSON input');
            setCsvOutput('');
        }
    };

    const downloadCsv = () => {
        if (!csvOutput) return;

        const blob = new Blob([csvOutput], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        
        link.setAttribute('href', url);
        link.setAttribute('download', customFileName);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">JSON to CSV Converter</h2>
            
            <div className="mb-4">
                <label className="block mb-2">
                    Output Filename:
                    <input
                        type="text"
                        value={customFileName}
                        onChange={(e) => setCustomFileName(e.target.value)}
                        className="w-full p-2 border rounded mt-1"
                        placeholder="Enter filename (e.g., export.csv)"
                    />
                </label>
            </div>

            <div className="mb-4">
                <label className="block mb-2">
                    Paste JSON Array:
                    <textarea
                        value={jsonInput}
                        onChange={(e) => setJsonInput(e.target.value)}
                        className="w-full h-48 p-2 border rounded mt-1 font-mono"
                        placeholder='[{"name": "John", "age": 30}, {"name": "Jane", "age": 25}]'
                    />
                </label>
            </div>

            <div className="mb-4">
                <button
                    onClick={convertJsonToCsv}
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors mr-2"
                >
                    Convert to CSV
                </button>
                {csvOutput && (
                    <button
                        onClick={downloadCsv}
                        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors"
                    >
                        Download CSV
                    </button>
                )}
            </div>

            {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                    {error}
                </div>
            )}

            {csvOutput && (
                <div className="mb-4">
                    <label className="block mb-2">
                        CSV Output:
                        <textarea
                            value={csvOutput}
                            readOnly
                            className="w-full h-48 p-2 border rounded mt-1 font-mono bg-gray-50"
                        />
                    </label>
                </div>
            )}
        </div>
    );
};

export default JsonToCsv;