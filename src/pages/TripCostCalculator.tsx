import React, { useState, useMemo } from 'react';
import { ArrowLeft, Fuel, Route, Gauge, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FuelType } from '../types/fuel';
import { defaultFuelPrices, fuelTypeLabels } from '../data/fuelPrices';
import { calculateTripCost } from '../utils/tripCost';

const TripCostCalculator: React.FC = () => {
  const [distance, setDistance] = useState('');
  const [mileage, setMileage] = useState('');
  const [fuelType, setFuelType] = useState<FuelType>('petrol');
  const [isRoundTrip, setIsRoundTrip] = useState(false);

  const result = useMemo(() => {
    const dist = parseFloat(distance);
    const mil = parseFloat(mileage);
    if (isNaN(dist) || isNaN(mil)) return null;
    return calculateTripCost(
      { distance: dist, mileage: mil, fuelType, isRoundTrip },
      defaultFuelPrices
    );
  }, [distance, mileage, fuelType, isRoundTrip]);

  const currentPrice = defaultFuelPrices.find((p) => p.type === fuelType);

  const handleReset = () => {
    setDistance('');
    setMileage('');
    setFuelType('petrol');
    setIsRoundTrip(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="text-gray-500 hover:text-gray-700"
              aria-label="Back to home"
            >
              <ArrowLeft size={24} />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Trip Cost Calculator
              </h1>
              <p className="text-sm text-gray-500 mt-0.5">
                Estimate fuel cost for your trip based on distance and vehicle
                mileage
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-5">
          {/* Distance */}
          <div>
            <label
              htmlFor="distance"
              className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1"
            >
              <Route size={16} />
              Distance (km)
            </label>
            <input
              id="distance"
              type="number"
              min="0"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              placeholder="Enter distance in kilometers"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg
                focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Mileage */}
          <div>
            <label
              htmlFor="mileage"
              className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1"
            >
              <Gauge size={16} />
              Vehicle Mileage (km/l or km/kg)
            </label>
            <input
              id="mileage"
              type="number"
              min="0"
              value={mileage}
              onChange={(e) => setMileage(e.target.value)}
              placeholder="Enter your vehicle's mileage"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg
                focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Fuel Type */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Fuel size={16} />
              Fuel Type
            </label>
            <div className="flex gap-3" role="radiogroup" aria-label="Fuel type">
              {defaultFuelPrices.map((fp) => (
                <button
                  key={fp.type}
                  onClick={() => setFuelType(fp.type)}
                  role="radio"
                  aria-checked={fuelType === fp.type}
                  className={`flex-1 px-3 py-2 rounded-lg border text-sm font-medium
                    transition-colors ${
                      fuelType === fp.type
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                    }`}
                >
                  <div>{fuelTypeLabels[fp.type]}</div>
                  <div
                    className={`text-xs mt-0.5 ${
                      fuelType === fp.type ? 'text-blue-200' : 'text-gray-400'
                    }`}
                  >
                    ₹{fp.pricePerUnit}/{fp.unit}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Round Trip Toggle */}
          <div className="flex items-center justify-between">
            <label
              htmlFor="round-trip"
              className="text-sm font-medium text-gray-700"
            >
              Round trip
            </label>
            <button
              id="round-trip"
              role="switch"
              aria-checked={isRoundTrip}
              onClick={() => setIsRoundTrip(!isRoundTrip)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full
                transition-colors ${
                  isRoundTrip ? 'bg-blue-600' : 'bg-gray-300'
                }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white
                  transition-transform ${
                    isRoundTrip ? 'translate-x-6' : 'translate-x-1'
                  }`}
              />
            </button>
          </div>

          {/* Reset */}
          <button
            onClick={handleReset}
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
          >
            <RotateCcw size={14} />
            Reset
          </button>
        </div>

        {/* Result */}
        {result && (
          <div className="mt-6 bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Trip Estimate
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-600">Total Distance</p>
                <p className="text-xl font-bold text-gray-900">
                  {result.distance} km
                </p>
                {isRoundTrip && (
                  <p className="text-xs text-gray-500">round trip</p>
                )}
              </div>
              <div className="text-center p-3 bg-amber-50 rounded-lg">
                <p className="text-sm text-gray-600">Fuel Needed</p>
                <p className="text-xl font-bold text-gray-900">
                  {result.fuelNeeded} {currentPrice?.unit}
                </p>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <p className="text-sm text-gray-600">Estimated Cost</p>
                <p className="text-xl font-bold text-green-700">
                  ₹{result.totalCost.toLocaleString('en-IN')}
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default TripCostCalculator;
