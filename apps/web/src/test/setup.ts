// Polyfills for JSDOM
class IO {
  root: Element | null;
  constructor() {
    this.root = null;
  }
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}

// @ts-ignore
global.IntersectionObserver = IO as unknown as typeof IntersectionObserver;

import '@testing-library/jest-dom/vitest';
