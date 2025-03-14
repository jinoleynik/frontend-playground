export interface ConversionCategory {
    name: string;
    units: {
        [key: string]: number| string;
    };
    baseUnit: string;
}

export interface ConversionResult {
    value: number;
    unit: string;
    formatted: string;
}