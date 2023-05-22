import clsx from 'clsx';
import React, { ReactNode } from 'react';

export function CardGroup({
  children,
  cols = 2,
  className,
}: {
  children: ReactNode;
  cols?: 1 | 2 | 3 | 4;
  className?: string;
}) {
  return (
    <div className={clsx(`not-prose grid sm:grid-cols-${cols} gap-x-4`, className)}>{children}</div>
  );
}
