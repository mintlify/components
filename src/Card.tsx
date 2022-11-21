import { ReactNode } from "react";
import clsx from "clsx";
import isAbsoluteUrl from "is-absolute-url";

export function Card({
  title,
  icon,
  className,
  href,
  onClick,
  children,
}: {
  /** Large title above children */
  title?: string;

  /** Icon to the top-left of the title */
  icon?: ReactNode;

  /** Additional classes */
  className?: string;

  /** Link to make the entire card clickable */
  href?: string;

  /** Function to trigger when the card is clicked */
  onClick?: any;

  children?: ReactNode;
}) {
  // Use an <a> tag if we are linking to things
  const Tag = href ? "a" : "div";

  const openLinksInNewTab = isAbsoluteUrl(href ?? "");
  const newTabProps = openLinksInNewTab
    ? { target: "_blank", rel: "noreferrer" }
    : {};

  return (
    <Tag
      className={clsx(
        "block not-prose font-normal group relative my-2 ring-2 ring-transparent rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden px-6 py-5 w-full",
        href && "cursor-pointer",
        className
      )}
      href={href}
      onClick={onClick}
      {...newTabProps}
    >
      {icon ? <div className="h-6 w-6">{icon}</div> : null}
      <h2
        className={clsx(
          "font-semibold text-base text-slate-800 dark:text-white",
          icon !== null && icon !== undefined && "mt-4"
        )}
      >
        {title}
      </h2>
      <span
        className={clsx(
          "mt-1 font-normal",
          title
            ? "text-slate-600 dark:text-slate-400"
            : "text-slate-700 dark:text-slate-300"
        )}
      >
        {children}
      </span>
    </Tag>
  );
}
