import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Pinball Locations Near Me header', () => {
  render(<App />);
  const linkElement = screen.getByText(/Pinball Locations Near Me/i);
  expect(linkElement).toBeInTheDocument();
});
