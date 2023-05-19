import clsx from 'clsx';
import React, { ReactNode } from 'react';

export function ImageGroup({
  children,
  cols = 2,
  className,
}: {
  children: ReactNode;
  cols?: number;
  className?: string;
}) {
  return (
    <div className={clsx(`not-prose grid sm:grid-cols-${cols} gap-4`, className)}>{children}</div>
  );
}
