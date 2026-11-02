import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the GreenLeaf welcome message and navigation', () => {
  render(<App />);
  expect(
    screen.getByRole('heading', {
      name: /welcome to greenleaf community garden/i,
    })
  ).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /home/i })).toHaveAttribute(
    'href',
    '#home'
  );
});
