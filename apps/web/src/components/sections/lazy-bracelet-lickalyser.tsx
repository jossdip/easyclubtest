'use client';

import dynamic from 'next/dynamic';

const Inner = dynamic(
  () => import('./bracelet-lickalyser-section').then((m) => m.BraceletLickalyserSection),
  { ssr: false, loading: () => null },
);

export function LazyBraceletLickalyser(): JSX.Element | null {
  return <Inner />;
}
