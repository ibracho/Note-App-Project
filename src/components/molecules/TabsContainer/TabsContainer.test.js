import { render, screen } from '@testing-library/react';
import TabsContainer from './TabsContainer';

test('renders correctly', () => {
  const {container} = render(<TabsContainer tabs={['home', 'business', 'personal']} />);
  const firstTab = screen.getByText(/Home/i);
  const secondTab = screen.getByText(/Business/i);
  expect(firstTab.classList.contains('tab--selected')).toBe(true);
  expect(secondTab.classList.contains('tab--selected')).toBe(false);
  expect(container.firstChild.classList.contains('tabs-container')).toBe(true);
});