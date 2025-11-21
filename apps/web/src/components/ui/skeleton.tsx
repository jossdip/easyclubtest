import * as React from 'react';

import { cn } from '@/lib/utils';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn('bg-foreground/10 animate-pulse rounded-md', className)}
      aria-busy
      aria-live="polite"
      {...props}
    />
  );
}
