import { render, screen } from '@testing-library/react';
import React from 'react';

import { Hero } from './hero';

describe('Hero', () => {
  it('renders eyebrow and title', () => {
    render(<Hero />);
    expect(screen.getByText(/POS • IA • NF525/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      /Révolutionnez votre vie nocturne/i,
    );
  });
});
