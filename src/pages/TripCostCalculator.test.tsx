import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import TripCostCalculator from './TripCostCalculator';

function renderWithRouter() {
  return render(
    <BrowserRouter>
      <TripCostCalculator />
    </BrowserRouter>
  );
}

describe('TripCostCalculator', () => {
  it('renders the page header', () => {
    renderWithRouter();
    expect(screen.getByText('Trip Cost Calculator')).toBeInTheDocument();
  });

  it('shows fuel type buttons with prices', () => {
    renderWithRouter();
    expect(screen.getByText('Petrol')).toBeInTheDocument();
    expect(screen.getByText('Diesel')).toBeInTheDocument();
    expect(screen.getByText('CNG')).toBeInTheDocument();
  });

  it('calculates trip cost for petrol', () => {
    renderWithRouter();

    userEvent.type(screen.getByLabelText(/Distance/), '200');
    userEvent.type(screen.getByLabelText(/Mileage/), '15');

    // 200/15 = 13.33 litres, 13.33 * 104.61 = ~1394.8
    expect(screen.getByText('Trip Estimate')).toBeInTheDocument();
    expect(screen.getByText('200 km')).toBeInTheDocument();
    expect(screen.getByText('13.33 litre')).toBeInTheDocument();
  });

  it('doubles distance for round trip', () => {
    renderWithRouter();

    userEvent.type(screen.getByLabelText(/Distance/), '100');
    userEvent.type(screen.getByLabelText(/Mileage/), '20');

    // One way: 100km
    expect(screen.getByText('100 km')).toBeInTheDocument();

    // Enable round trip
    userEvent.click(screen.getByRole('switch'));

    // Round trip: 200km
    expect(screen.getByText('200 km')).toBeInTheDocument();
    expect(screen.getByText('round trip')).toBeInTheDocument();
  });

  it('switches fuel type', () => {
    renderWithRouter();

    userEvent.type(screen.getByLabelText(/Distance/), '100');
    userEvent.type(screen.getByLabelText(/Mileage/), '25');

    // Default is petrol, switch to diesel
    const fuelGroup = screen.getByRole('radiogroup');
    userEvent.click(screen.getByText('Diesel'));

    // 100/25 = 4 litres, 4 * 87.32 = 349.28
    expect(screen.getByText('4 litre')).toBeInTheDocument();
  });

  it('resets all fields', () => {
    renderWithRouter();

    userEvent.type(screen.getByLabelText(/Distance/), '100');
    userEvent.type(screen.getByLabelText(/Mileage/), '20');
    expect(screen.getByText('Trip Estimate')).toBeInTheDocument();

    userEvent.click(screen.getByText('Reset'));

    expect(screen.queryByText('Trip Estimate')).not.toBeInTheDocument();
  });

  it('does not show result with empty inputs', () => {
    renderWithRouter();
    expect(screen.queryByText('Trip Estimate')).not.toBeInTheDocument();
  });

  it('has a back to home link', () => {
    renderWithRouter();
    expect(screen.getByLabelText('Back to home')).toBeInTheDocument();
  });
});
