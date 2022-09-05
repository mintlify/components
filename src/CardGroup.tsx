import { ReactNode } from "react";

export function CardGroup({
  children,
  cols = 2,
}: {
  children: ReactNode;
  cols?: 1 | 2 | 3 | 4;
}) {
  return <div className={`grid sm:grid-cols-${cols} gap-x-4`}>{children}</div>;
}
