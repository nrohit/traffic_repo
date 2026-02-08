import { TripCostInput, TripCostResult } from '../types/fuel';
import { FuelPrice } from '../types/fuel';

export function calculateTripCost(
  input: TripCostInput,
  fuelPrices: FuelPrice[]
): TripCostResult | null {
  if (input.distance <= 0 || input.mileage <= 0) {
    return null;
  }

  const price = fuelPrices.find((p) => p.type === input.fuelType);
  if (!price) {
    return null;
  }

  const effectiveDistance = input.isRoundTrip
    ? input.distance * 2
    : input.distance;
  const fuelNeeded = effectiveDistance / input.mileage;
  const totalCost = fuelNeeded * price.pricePerUnit;

  return {
    fuelNeeded: Math.round(fuelNeeded * 100) / 100,
    totalCost: Math.round(totalCost * 100) / 100,
    distance: effectiveDistance,
  };
}
