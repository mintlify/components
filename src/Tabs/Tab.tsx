import { ReactNode } from "react";
import clsx from "clsx";

export default function Tab({
  title,
  isActive = true,
  children,
}: {
  title: string;
  isActive?: boolean;
  children?: ReactNode;
}) {
  return (
    <>
      <h2
        className={clsx(
          "flex text-sm leading-6 font-semibold whitespace-nowrap pt-3 pb-2.5 -mb-px max-w-max border-b",
          isActive
            ? "text-primary dark:text-primary-light border-current"
            : "text-slate-900 border-transparent hover:border-slate-300 dark:text-slate-200 dark:hover:border-slate-700"
        )}
      >
        {title}
      </h2>
      {children ? (
        <div className="prose dark:prose-dark">{children}</div>
      ) : null}
    </>
  );
}
