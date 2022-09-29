import { ReactNode, isValidElement } from "react";

export function Tooltip({
  tip,
  children,
}: {
  tip: string;
  children: ReactNode;
}) {
  if (!children) {
    return null;
  }

  return (
    <span className="group z-10 inline relative">
      {underlineWhenTextOnly(children)}
      <div className="hidden group-hover:flex max-w-full min-w-fit whitespace-nowrap absolute bottom-full left-1/2 mb-0.5 pb-1 -translate-x-1/2">
        <div
          className="relative bg-slate-800 text-center text-slate-50 text-xs px-1.5 py-1 rounded-lg border border-slate-50"
          data-reach-alert="true"
        >
          {tip}
        </div>
      </div>
    </span>
  );
}

function underlineWhenTextOnly(children: ReactNode) {
  if (isValidElement(children)) {
    return children;
  }

  return (
    <span className="underline decoration-dotted decoration-2 underline-offset-4 decoration-slate-400 dark:decoration-slate-500">
      {children}
    </span>
  );
}
