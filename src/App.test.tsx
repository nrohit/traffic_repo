import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders home page with portal title', () => {
  render(<App />);
  expect(screen.getByText('Indian Traffic Rules Portal')).toBeInTheDocument();
});
