import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import EmergencyContacts from './EmergencyContacts';

function renderWithRouter() {
  return render(
    <BrowserRouter>
      <EmergencyContacts />
    </BrowserRouter>
  );
}

describe('EmergencyContacts', () => {
  it('renders the page header', () => {
    renderWithRouter();
    expect(screen.getByText('Emergency Contacts')).toBeInTheDocument();
  });

  it('displays national emergency numbers', () => {
    renderWithRouter();
    expect(screen.getByText('National Emergency Numbers')).toBeInTheDocument();
    expect(screen.getByLabelText('Call Police at 100')).toBeInTheDocument();
    expect(screen.getByLabelText('Call Ambulance at 108')).toBeInTheDocument();
    expect(screen.getByText('Fire Brigade')).toBeInTheDocument();
    expect(screen.getByText('Emergency Response (ERSS)')).toBeInTheDocument();
  });

  it('renders call links with tel: href for national numbers', () => {
    renderWithRouter();
    const policeLink = screen.getByLabelText('Call Police at 100');
    expect(policeLink).toHaveAttribute('href', 'tel:100');
  });

  it('shows state selector', () => {
    renderWithRouter();
    expect(screen.getByLabelText('Select state')).toBeInTheDocument();
  });

  it('shows state-specific contacts when a state is selected', () => {
    renderWithRouter();

    userEvent.selectOptions(screen.getByLabelText('Select state'), 'DL');

    expect(screen.getByText('Delhi Traffic Police')).toBeInTheDocument();
    expect(screen.getByText('CATS Ambulance')).toBeInTheDocument();
  });

  it('shows different contacts for a different state', () => {
    renderWithRouter();

    userEvent.selectOptions(screen.getByLabelText('Select state'), 'MH');

    expect(screen.getByText('Maharashtra Highway Police')).toBeInTheDocument();
    expect(screen.getByText('Mumbai Traffic Police')).toBeInTheDocument();
  });

  it('renders call links for state contacts', () => {
    renderWithRouter();

    userEvent.selectOptions(screen.getByLabelText('Select state'), 'DL');

    const callLink = screen.getByLabelText(
      'Call Delhi Traffic Police at 011-25844444'
    );
    expect(callLink).toHaveAttribute('href', 'tel:011-25844444');
  });

  it('has a back to home link', () => {
    renderWithRouter();
    expect(screen.getByLabelText('Back to home')).toBeInTheDocument();
  });
});
