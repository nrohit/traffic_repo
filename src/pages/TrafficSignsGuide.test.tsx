import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import TrafficSignsGuide from './TrafficSignsGuide';
import { trafficSigns } from '../data/trafficSigns';

function renderWithRouter() {
  return render(
    <BrowserRouter>
      <TrafficSignsGuide />
    </BrowserRouter>
  );
}

describe('TrafficSignsGuide', () => {
  it('renders the page header', () => {
    renderWithRouter();
    expect(screen.getByText('Traffic Signs Guide')).toBeInTheDocument();
  });

  it('displays all traffic signs by default', () => {
    renderWithRouter();
    trafficSigns.forEach((sign) => {
      expect(screen.getByText(sign.name)).toBeInTheDocument();
    });
  });

  it('filters signs by search query', () => {
    renderWithRouter();
    userEvent.type(
      screen.getByPlaceholderText('Search traffic signs...'),
      'stop'
    );
    expect(screen.getByText('Stop')).toBeInTheDocument();
    expect(screen.queryByText('Give Way')).not.toBeInTheDocument();
  });

  it('filters signs by category', () => {
    renderWithRouter();
    const filterGroup = screen.getByRole('radiogroup');
    userEvent.click(within(filterGroup).getByText('Warning'));

    expect(screen.getByText('Sharp Curve Ahead')).toBeInTheDocument();
    expect(screen.queryByText('Stop')).not.toBeInTheDocument();
    expect(screen.queryByText('Hospital')).not.toBeInTheDocument();
  });

  it('shows no results message for empty search', () => {
    renderWithRouter();
    userEvent.type(
      screen.getByPlaceholderText('Search traffic signs...'),
      'xyznonexistent'
    );
    expect(
      screen.getByText('No signs found matching your search.')
    ).toBeInTheDocument();
  });

  it('displays sign shape and color info', () => {
    renderWithRouter();
    expect(screen.getByText(/Octagon/)).toBeInTheDocument();
    expect(screen.getByText(/Red with white text/)).toBeInTheDocument();
  });

  it('has a back to home link', () => {
    renderWithRouter();
    expect(screen.getByLabelText('Back to home')).toBeInTheDocument();
  });
});
