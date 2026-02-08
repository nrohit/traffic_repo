import { calculateTripCost } from './tripCost';
import { FuelPrice } from '../types/fuel';

const mockPrices: FuelPrice[] = [
  { type: 'petrol', pricePerUnit: 100, unit: 'litre' },
  { type: 'diesel', pricePerUnit: 80, unit: 'litre' },
  { type: 'cng', pricePerUnit: 75, unit: 'kg' },
];

describe('calculateTripCost', () => {
  it('calculates one-way trip cost', () => {
    const result = calculateTripCost(
      { distance: 200, mileage: 20, fuelType: 'petrol', isRoundTrip: false },
      mockPrices
    );
    expect(result).toEqual({
      fuelNeeded: 10,
      totalCost: 1000,
      distance: 200,
    });
  });

  it('calculates round trip cost (doubles distance)', () => {
    const result = calculateTripCost(
      { distance: 100, mileage: 20, fuelType: 'petrol', isRoundTrip: true },
      mockPrices
    );
    expect(result).toEqual({
      fuelNeeded: 10,
      totalCost: 1000,
      distance: 200,
    });
  });

  it('uses correct fuel price for diesel', () => {
    const result = calculateTripCost(
      { distance: 100, mileage: 25, fuelType: 'diesel', isRoundTrip: false },
      mockPrices
    );
    expect(result).toEqual({
      fuelNeeded: 4,
      totalCost: 320,
      distance: 100,
    });
  });

  it('uses correct fuel price for CNG', () => {
    const result = calculateTripCost(
      { distance: 150, mileage: 30, fuelType: 'cng', isRoundTrip: false },
      mockPrices
    );
    expect(result).toEqual({
      fuelNeeded: 5,
      totalCost: 375,
      distance: 150,
    });
  });

  it('returns null for zero distance', () => {
    const result = calculateTripCost(
      { distance: 0, mileage: 20, fuelType: 'petrol', isRoundTrip: false },
      mockPrices
    );
    expect(result).toBeNull();
  });

  it('returns null for zero mileage', () => {
    const result = calculateTripCost(
      { distance: 100, mileage: 0, fuelType: 'petrol', isRoundTrip: false },
      mockPrices
    );
    expect(result).toBeNull();
  });

  it('returns null for negative distance', () => {
    const result = calculateTripCost(
      { distance: -50, mileage: 20, fuelType: 'petrol', isRoundTrip: false },
      mockPrices
    );
    expect(result).toBeNull();
  });

  it('rounds fuel and cost to 2 decimal places', () => {
    const result = calculateTripCost(
      { distance: 100, mileage: 7, fuelType: 'petrol', isRoundTrip: false },
      mockPrices
    );
    // 100/7 = 14.285714..., cost = 1428.571...
    expect(result?.fuelNeeded).toBe(14.29);
    expect(result?.totalCost).toBe(1428.57);
  });
});
