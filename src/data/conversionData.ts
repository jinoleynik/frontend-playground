import { ConversionCategory } from '../types/UnitConverterTypes';

export const conversionCategories: { [key: string]: ConversionCategory } = {
    length: {
        name: 'Length',
        baseUnit: 'meter',
        units: {
            kilometer: 1000,
            meter: 1,
            centimeter: 0.01,
            millimeter: 0.001,
            mile: 1609.34,
            yard: 0.9144,
            foot: 0.3048,
            inch: 0.0254
        }
    },
    weight: {
        name: 'Weight',
        baseUnit: 'kilogram',
        units: {
            tonne: 1000,
            kilogram: 1,
            gram: 0.001,
            milligram: 0.000001,
            pound: 0.453592,
            ounce: 0.0283495
        }
    },
    temperature: {
        name: 'Temperature',
        baseUnit: 'celsius',
        units: {
            celsius: 1,
            fahrenheit: 'special',
            kelvin: 'special'
        }
    }
};