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
      <div className="hidden group-hover:flex max-w-full min-w-fit whitespace-nowrap absolute bottom-full left-1/2 mb-1 pb-1 -translate-x-1/2">
        <div
          className="relative bg-slate-800 text-center text-slate-50 text-xs px-1.5 py-1 rounded-lg"
          data-reach-alert="true"
        >
          {tip}
          <svg
            aria-hidden="true"
            width="16"
            height="6"
            viewBox="0 0 16 6"
            className="text-slate-800 absolute top-full left-1/2 -mt-px -ml-2"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M15 0H1V1.00366V1.00366V1.00371H1.01672C2.72058 1.0147 4.24225 2.74704 5.42685 4.72928C6.42941 6.40691 9.57154 6.4069 10.5741 4.72926C11.7587 2.74703 13.2803 1.0147 14.9841 1.00371H15V0Z"
              fill="currentColor"
            ></path>
          </svg>
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
