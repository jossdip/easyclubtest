'use client';

import * as React from 'react';

import { useTheme } from '@/components/providers/theme-provider';

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const next = theme === 'light' ? 'dark' : 'light';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={className}
      aria-label={`Activer le thème ${next}`}
      title={`Activer le thème ${next}`}
    >
      <span className="sr-only">Basculer le thème</span>
      {/* Simple icon swap using text for zero-dependency */}
      <span aria-hidden>{theme === 'light' ? '🌙' : '☀️'}</span>
    </button>
  );
}
