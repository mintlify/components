import React, { ReactNode } from 'react';

export function ImageGroup({ children, cols = 2 }: { children: ReactNode; cols?: 1 | 2 }) {
  return <div className={`not-prose grid sm:grid-cols-${cols} gap-4`}>{children}</div>;
}
