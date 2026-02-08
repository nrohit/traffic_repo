import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders fine calculator page', () => {
  render(<App />);
  expect(screen.getByText('Fine Calculator')).toBeInTheDocument();
});
