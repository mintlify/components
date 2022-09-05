import { ReactNode } from "react";

export function CardGroup({
  children,
  cols = 2,
}: {
  children: ReactNode;
  cols?: 1 | 2 | 3 | 4;
}) {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-${cols} gap-x-4`}>
      <span className="hidden sm:grid-cols-1 sm:grid-cols-2 sm:grid-cols-3"></span>
      {children}
    </div>
  );
}
