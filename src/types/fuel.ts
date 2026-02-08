export type FuelType = 'petrol' | 'diesel' | 'cng';

export interface FuelPrice {
  type: FuelType;
  pricePerUnit: number;
  unit: string;
}

export interface TripCostInput {
  distance: number;
  mileage: number;
  fuelType: FuelType;
  isRoundTrip: boolean;
}

export interface TripCostResult {
  fuelNeeded: number;
  totalCost: number;
  distance: number;
}
