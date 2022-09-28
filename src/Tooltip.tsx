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
    <div className="group relative inline-block">
      {underlineWhenTextOnly(children)}
      <div
        role="tooltip"
        className="min-w-[10ch] max-w-[32ch] z-5 absolute hidden group-hover:flex -translate-y-full -top-[4px] px-2 py-1 rounded-lg text-center text-white text-sm bg-gray-700"
      >
        {tip}
      </div>
    </div>
  );
}

function underlineWhenTextOnly(children: ReactNode) {
  if (isValidElement(children)) {
    return children;
  }

  return <span className="underline decoration-dotted">{children}</span>;
}
