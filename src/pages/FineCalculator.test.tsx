import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import FineCalculator from './FineCalculator';
import { violations } from '../data/violations';

function renderWithRouter() {
  return render(
    <BrowserRouter>
      <FineCalculator />
    </BrowserRouter>
  );
}

function getTotalFineText(): string {
  // The total fine is the bold red text next to "Total Fine" label
  const totalLabel = screen.getByText('Total Fine');
  const container = totalLabel.closest('div')!;
  return within(container).getByText(/^₹/).textContent ?? '';
}

describe('FineCalculator', () => {
  it('renders the page header', () => {
    renderWithRouter();
    expect(screen.getByText('Fine Calculator')).toBeInTheDocument();
    expect(
      screen.getByText(/Motor Vehicles \(Amendment\) Act/)
    ).toBeInTheDocument();
  });

  it('displays all violations by default', () => {
    renderWithRouter();
    violations.forEach((v) => {
      expect(screen.getByText(v.name)).toBeInTheDocument();
    });
  });

  it('shows empty summary when no violations selected', () => {
    renderWithRouter();
    expect(
      screen.getByText(/No violations selected/)
    ).toBeInTheDocument();
  });

  it('filters violations by search query', () => {
    renderWithRouter();

    const searchInput = screen.getByPlaceholderText('Search violations...');
    userEvent.type(searchInput, 'helmet');

    expect(screen.getByText('Not Wearing Helmet')).toBeInTheDocument();
    expect(screen.queryByText('Not Wearing Seatbelt')).not.toBeInTheDocument();
  });

  it('filters violations by category', () => {
    renderWithRouter();

    const filterGroup = screen.getByRole('radiogroup');
    const duiButton = within(filterGroup).getByText('DUI / Impairment');
    userEvent.click(duiButton);

    expect(screen.getByText('Drunk Driving')).toBeInTheDocument();
    expect(screen.queryByText('Not Wearing Helmet')).not.toBeInTheDocument();
  });

  it('adds a violation and updates the summary', () => {
    renderWithRouter();

    userEvent.click(screen.getByLabelText('Add Jumping Red Light'));

    expect(screen.getByText('Fine Summary')).toBeInTheDocument();
    expect(getTotalFineText()).toBe('₹5,000');
  });

  it('increments violation count on multiple adds', () => {
    renderWithRouter();

    const addButton = screen.getByLabelText('Add Illegal Parking');
    userEvent.click(addButton);
    userEvent.click(addButton);

    expect(getTotalFineText()).toBe('₹1,000');
    expect(
      screen.getByLabelText('Illegal Parking selected 2 times')
    ).toHaveTextContent('2');
  });

  it('removes a violation via the violation card minus button', () => {
    renderWithRouter();

    userEvent.click(screen.getByLabelText('Add Jumping Red Light'));
    userEvent.click(screen.getByLabelText('Add Illegal Parking'));

    expect(getTotalFineText()).toBe('₹5,500');

    const removeButtons = screen.getAllByLabelText('Remove Jumping Red Light');
    userEvent.click(removeButtons[0]);

    expect(getTotalFineText()).toBe('₹500');
  });

  it('clears all violations', () => {
    renderWithRouter();

    userEvent.click(screen.getByLabelText('Add Drunk Driving'));
    userEvent.click(screen.getByLabelText('Add Over Speeding'));

    userEvent.click(screen.getByText('Clear All'));

    expect(screen.getByText(/No violations selected/)).toBeInTheDocument();
  });

  it('clears search input when X button is clicked', () => {
    renderWithRouter();

    const searchInput = screen.getByPlaceholderText('Search violations...');
    userEvent.type(searchInput, 'helmet');

    expect(screen.queryByText('Not Wearing Seatbelt')).not.toBeInTheDocument();

    userEvent.click(screen.getByLabelText('Clear search'));

    expect(screen.getByText('Not Wearing Seatbelt')).toBeInTheDocument();
  });

  it('shows no results message when search matches nothing', () => {
    renderWithRouter();

    userEvent.type(
      screen.getByPlaceholderText('Search violations...'),
      'xyznonexistent'
    );

    expect(
      screen.getByText('No violations found matching your search.')
    ).toBeInTheDocument();
  });

  it('calculates total for multiple different violations', () => {
    renderWithRouter();

    // Drunk Driving (10000) + Not Wearing Seatbelt (1000) + Illegal Parking (500)
    userEvent.click(screen.getByLabelText('Add Drunk Driving'));
    userEvent.click(screen.getByLabelText('Add Not Wearing Seatbelt'));
    userEvent.click(screen.getByLabelText('Add Illegal Parking'));

    expect(getTotalFineText()).toBe('₹11,500');
  });
});
