import { FuelPrice } from '../types/fuel';

export const defaultFuelPrices: FuelPrice[] = [
  { type: 'petrol', pricePerUnit: 104.61, unit: 'litre' },
  { type: 'diesel', pricePerUnit: 87.32, unit: 'litre' },
  { type: 'cng', pricePerUnit: 76.59, unit: 'kg' },
];

export const fuelTypeLabels: Record<string, string> = {
  petrol: 'Petrol',
  diesel: 'Diesel',
  cng: 'CNG',
};
