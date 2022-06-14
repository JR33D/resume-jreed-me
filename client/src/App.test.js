import { render, screen } from '@testing-library/react';
import App from './App';

test('renders download resume link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Download Resume/i);
  expect(linkElement).toBeInTheDocument();
});