import { render, screen, fireEvent } from '@testing-library/react';
import Tab from './Tab';

test('renders correctly', () => {
  render(<Tab text="home"/>);
  const tab = screen.getByText(/Home/i);
  expect(tab).toBeInTheDocument();
});

test('calls onClick prop when clicked', () => {
  const handleClick = jest.fn()
  render(<Tab text="home" handleTabClick={handleClick}/>);
  fireEvent.click(screen.getByText(/home/i));
  expect(handleClick).toHaveBeenCalledTimes(1);
})
