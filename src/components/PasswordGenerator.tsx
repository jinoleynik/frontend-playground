import React, { useState } from 'react';
import { PasswordOptions } from '../types';

const PasswordGenerator: React.FC = () => {
    const [password, setPassword] = useState<string>('');
    const [options, setOptions] = useState<PasswordOptions>({
        length: 12,
        includeUppercase: true,
        includeLowercase: true,
        includeNumbers: true,
        includeSpecial: true,
    });

    const generatePassword = () => {
        const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lowercase = 'abcdefghijklmnopqrstuvwxyz';
        const numbers = '0123456789';
        const special = '!@#$%^&*()_+-=[]{}|;:,.<>?';

        let chars = '';
        if (options.includeUppercase) chars += uppercase;
        if (options.includeLowercase) chars += lowercase;
        if (options.includeNumbers) chars += numbers;
        if (options.includeSpecial) chars += special;

        if (chars === '') {
            setPassword('Please select at least one character type');
            return;
        }

        let generatedPassword = '';
        for (let i = 0; i < options.length; i++) {
            const randomIndex = Math.floor(Math.random() * chars.length);
            generatedPassword += chars[randomIndex];
        }
        setPassword(generatedPassword);
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Password Generator</h2>
            
            <div className="mb-4">
                <label className="block mb-2">
                    Password Length: {options.length}
                    <input
                        type="range"
                        min="8"
                        max="32"
                        value={options.length}
                        onChange={(e) => setOptions({
                            ...options,
                            length: parseInt(e.target.value)
                        })}
                        className="w-full"
                    />
                </label>
            </div>

            <div className="space-y-2 mb-4">
                <label className="flex items-center">
                    <input
                        type="checkbox"
                        checked={options.includeUppercase}
                        onChange={(e) => setOptions({
                            ...options,
                            includeUppercase: e.target.checked
                        })}
                        className="mr-2"
                    />
                    Include Uppercase Letters
                </label>
                <label className="flex items-center">
                    <input
                        type="checkbox"
                        checked={options.includeLowercase}
                        onChange={(e) => setOptions({
                            ...options,
                            includeLowercase: e.target.checked
                        })}
                        className="mr-2"
                    />
                    Include Lowercase Letters
                </label>
                <label className="flex items-center">
                    <input
                        type="checkbox"
                        checked={options.includeNumbers}
                        onChange={(e) => setOptions({
                            ...options,
                            includeNumbers: e.target.checked
                        })}
                        className="mr-2"
                    />
                    Include Numbers
                </label>
                <label className="flex items-center">
                    <input
                        type="checkbox"
                        checked={options.includeSpecial}
                        onChange={(e) => setOptions({
                            ...options,
                            includeSpecial: e.target.checked
                        })}
                        className="mr-2"
                    />
                    Include Special Characters
                </label>
            </div>

            <button
                onClick={generatePassword}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
            >
                Generate Password
            </button>

            {password && (
                <div className="mt-4">
                    <div className="p-3 bg-gray-100 rounded break-all">
                        {password}
                    </div>
                    <button
                        onClick={() => navigator.clipboard.writeText(password)}
                        className="mt-2 w-full bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition-colors"
                    >
                        Copy to Clipboard
                    </button>
                </div>
            )}
        </div>
    );
};

export default PasswordGenerator;