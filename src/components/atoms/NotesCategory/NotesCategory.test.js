import { render, screen } from '@testing-library/react';
import NotesCategory from './NotesCategory';

test('renders home category', () => {
  render(<NotesCategory category="home"/>);
  const categoryElement = screen.getByText(/Home/i);
  expect(categoryElement).toBeInTheDocument();
});

test('renders personal category', () => {
    render(<NotesCategory category="personal"/>);
    const categoryElement = screen.getByText(/Personal/i);
    expect(categoryElement).toBeInTheDocument();
});

test('renders business category', () => {
    render(<NotesCategory category="business"/>);
    const categoryElement = screen.getByText(/Business/i);
    expect(categoryElement).toBeInTheDocument();
});