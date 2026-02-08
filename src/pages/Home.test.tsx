import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from './Home';

function renderWithRouter() {
  return render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );
}

describe('Home', () => {
  it('renders the portal title', () => {
    renderWithRouter();
    expect(
      screen.getByText('Indian Traffic Rules Portal')
    ).toBeInTheDocument();
  });

  it('displays all feature cards', () => {
    renderWithRouter();
    expect(screen.getByText('Fine Calculator')).toBeInTheDocument();
    expect(screen.getByText('Traffic Signs Guide')).toBeInTheDocument();
    expect(screen.getByText('Trip Cost Calculator')).toBeInTheDocument();
    expect(screen.getByText('Emergency Contacts')).toBeInTheDocument();
  });

  it('links to correct routes', () => {
    renderWithRouter();
    expect(
      screen.getByText('Fine Calculator').closest('a')
    ).toHaveAttribute('href', '/fine-calculator');
    expect(
      screen.getByText('Traffic Signs Guide').closest('a')
    ).toHaveAttribute('href', '/traffic-signs');
    expect(
      screen.getByText('Trip Cost Calculator').closest('a')
    ).toHaveAttribute('href', '/trip-cost');
    expect(
      screen.getByText('Emergency Contacts').closest('a')
    ).toHaveAttribute('href', '/emergency');
  });
});
